import type { CollectionConfig } from "payload"
import { validatePhoneNumber } from "@/utils/validate"
import { getUserTenantID } from "../utils"
import type { TenantUser } from "../types"

export const ContactSettings: CollectionConfig = {
	slug: "contact-settings",
	admin: {
		useAsTitle: "tenant",
		description: "Manage contact settings for your restaurant"
	},
	access: {
		create: async ({ req }) => {
			const tenantID = getUserTenantID(req.user as TenantUser)

			if (!tenantID) return false

			// Check if this tenant already has contact settings
			const existing = await req.payload.find({
				collection: "contact-settings",
				where: { tenant: { equals: tenantID } },
				limit: 1
			})

			// Only allow create if no existing settings found
			return existing.docs.length === 0
		}
	},
	fields: [
		{
			type: "group",
			name: "restaurantInfo",
			label: "Restaurant Info",
			fields: [
				{
					name: "name",
					type: "text",
					label: "Restaurant Name",
					required: true
				},
				{
					name: "slogan",
					type: "text",
					label: "Slogan",
					required: false,
					admin: {
						description:
							"Write a catchy slogan for your restaurant. It will be displayed underneath the restaurant name."
					}
				},
				{
					name: "shortBio",
					type: "textarea",
					label: "Short Bio",
					required: false,
					maxLength: 220,
					admin: {
						description: "Write a short bio describing your restaurant, the value it offers. Make it unique and catchy."
					}
				}
			]
		},
		{
			type: "group",
			name: "contactInfo",
			label: "Main Contact Info",
			fields: [
				{
					name: "email",
					type: "email",
					label: "Email Address",
					required: true
				},
				{
					name: "phone",
					type: "text",
					label: "Phone Number",
					validate: validatePhoneNumber,
					required: true
				},
				{
					name: "whatsapp",
					type: "text",
					label: "WhatsApp Number",
					validate: validatePhoneNumber,
					required: true
				}
			]
		},
		{
			name: "socialLinks",
			label: "Social Links",
			type: "array",
			minRows: 1,
			fields: [
				{
					name: "socialItem",
					type: "select",
					required: true,
					options: [
						{ label: "Facebook", value: "facebook" },
						{ label: "Instagram", value: "instagram" },
						{ label: "YouTube", value: "youtube" },
						{ label: "LinkedIn", value: "linkedin" },
						{ label: "TikTok", value: "tiktok" },
						{ label: "X", value: "x" }
					]
				},
				{
					name: "url",
					type: "text",
					required: true
				}
			]
		},
		{
			name: "branches",
			label: "Branches",
			type: "array",
			minRows: 1,
			unique: true,
			fields: [
				{
					name: "name",
					type: "text",
					label: "Branch Name",
					required: true
				},
				{
					name: "address",
					type: "textarea",
					required: true
				},
				{
					name: "phone",
					type: "text",
					required: true,
					validate: validatePhoneNumber
				},
				{
					name: "email",
					type: "email",
					required: true
				},
				{
					name: "mapUrl",
					type: "text",
					label: "Google Maps Embed URL",
					required: true
				},
				{
					name: "image",
					type: "upload",
					relationTo: "media",
					required: false
				},
				{
					name: "openingHours",
					label: "Opening Hours",
					type: "json",
					required: true,
					admin: {
						components: {
							Field: {
								path: "@/components/payload/opening-hours-field"
							}
						},
						description: "Set your business opening hours for different days of the week"
					},
					defaultValue: [
						{
							days: "mon-fri",
							openingTime: "09:00",
							closingTime: "17:00"
						}
					]
				}
			]
		}
	],
	hooks: {
		beforeOperation: [
			async ({ operation, args }) => {
				if (operation !== "create") return

				const { req } = args

				const tenantID = getUserTenantID(req.user)

				if (!tenantID) throw new Error("Missing tenant ID")

				const existing = await req.payload.find({
					collection: "contact-settings",
					where: { tenant: { equals: tenantID } },
					limit: 1
				})

				if (existing.docs.length > 0) {
					throw new Error("Contact settings already exist for this tenant.")
				}
			}
		]
	},
	indexes: [
		{
			fields: ["tenant"],
			unique: true // Enforce one document per tenant
		}
	]
}
