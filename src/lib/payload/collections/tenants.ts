import { CollectionConfig } from "payload"
import { isSuperAdmin } from "../access"
import { TenantUser } from "../types"

export const Tenants: CollectionConfig = {
	slug: "tenants",
	admin: {
		useAsTitle: "name",
		defaultColumns: ["name", "slug", "domain", "updatedAt"],
		hidden: ({ user }) => !isSuperAdmin(user as unknown as TenantUser)
	},
	access: {
		create: ({ req }) => isSuperAdmin(req.user as TenantUser),
		read: () => true,
		update: ({ req }) => isSuperAdmin(req.user as TenantUser),
		delete: ({ req }) => isSuperAdmin(req.user as TenantUser)
	},
	fields: [
		{
			name: "name",
			type: "text",
			required: true
		},
		{
			name: "slug",
			type: "text",
			required: true,
			unique: true,
			index: true,
			admin: {
				description: "Used for URLs. Example: /[slug]"
			}
		}
	]
} satisfies CollectionConfig
