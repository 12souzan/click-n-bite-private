import { isSuperAdmin } from "@/lib/payload/access"
import type { CollectionConfig } from "payload"
import type { TenantUser } from "../types"

export const Users: CollectionConfig = {
	slug: "users",
	auth: true,
	admin: {
		useAsTitle: "email"
	},
	access: {
		read: ({ req }) => isSuperAdmin(req.user as TenantUser),
		create: ({ req }) => isSuperAdmin(req.user as TenantUser),
		update: ({ req }) => isSuperAdmin(req.user as TenantUser),
		delete: ({ req }) => isSuperAdmin(req.user as TenantUser)
	},
	fields: [
		{
			name: "role",
			type: "select",
			defaultValue: "user",
			options: ["super-admin", "user"],
			access: {
				update: ({ req }) => isSuperAdmin(req.user as TenantUser)
			},
			admin: {
				position: "sidebar",
				hidden: true
			}
		},
		{
			name: "tenant",
			type: "relationship",
			relationTo: "tenants",
			required: false,
			admin: {
				condition: (_, __, { user }) => user?.role === "super-admin",
				position: "sidebar"
			}
		}
	],
	hooks: {
		beforeValidate: [
			async ({ data, req, operation }) => {
				if (operation === "create") {
					const count = await req.payload.count({ collection: "users" })

					// First ever user = super admin
					if (count.totalDocs === 0) {
						data!.role = "super-admin"
					}
				}

				return data
			}
		]
	}
}
