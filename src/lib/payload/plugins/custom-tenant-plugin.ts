import type { CollectionBeforeChangeHook, CollectionBeforeValidateHook, CollectionSlug, Plugin } from "payload"
import { TenantUser } from "../types"
import { isSuperAdmin } from "../access"
import { getUserTenantID } from "../utils"

export const customTenantPlugin = (collections: CollectionSlug[]): Plugin => {
	return (config) => {
		config.collections = config.collections?.map((collection) => {
			if (!collections.includes(collection.slug as CollectionSlug)) return collection

			collection.fields.unshift({
				name: "tenant",
				type: "relationship",
				relationTo: "tenants",
				required: true,
				admin: {
					position: "sidebar",
					condition: ({ user }) => isSuperAdmin(user as TenantUser)
				},
				access: {
					read: () => true,
					create: ({ req }) => isSuperAdmin(req.user as TenantUser),
					update: ({ req }) => isSuperAdmin(req.user as TenantUser)
				}
			})

			collection.access = {
				create: ({ req }) => !!getUserTenantID(req.user as TenantUser),
				...(collection.access || {}),
				read: ({ req }) => ({ tenant: { equals: getUserTenantID(req.user as TenantUser) } }),
				update: ({ req }) => ({ tenant: { equals: getUserTenantID(req.user as TenantUser) } }),
				delete: ({ req }) => ({ tenant: { equals: getUserTenantID(req.user as TenantUser) } })
			}

			collection.admin = {
				...(collection.admin || {}),
				hidden: ({ user }) => isSuperAdmin(user as unknown as TenantUser)
			}

			const assignTenantHook: CollectionBeforeChangeHook = async ({ req, data, operation }) => {
				if (operation === "create" && !isSuperAdmin(req.user as TenantUser)) {
					const tenantID = getUserTenantID(req.user as TenantUser)

					if (tenantID && !data.tenant) {
						data.tenant = tenantID
					}
				}

				return data
			}

			const beforeValidateHook: CollectionBeforeValidateHook = async ({ data, req }) => {
				if (!isSuperAdmin(req.user as TenantUser) && !data?.tenant) {
					const tenantID = getUserTenantID(req.user as TenantUser)

					if (tenantID) {
						data!.tenant = tenantID
					}
				}

				return data
			}

			collection.hooks = {
				...(collection.hooks || {}),
				beforeChange: [...(collection.hooks?.beforeChange || []), assignTenantHook],
				beforeValidate: [...(collection.hooks?.beforeValidate || []), beforeValidateHook]
			}

			return collection
		})

		return config
	}
}
