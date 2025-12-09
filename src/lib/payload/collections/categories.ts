import type { CollectionConfig } from "payload"

export const Categories: CollectionConfig = {
	slug: "categories",
	admin: {
		useAsTitle: "name",
		defaultColumns: ["name", "order", "color", "updatedAt"]
	},
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
			localized: true
		},
		{
			name: "order",
			type: "number",
			label: "Display Order",
			required: true,
			unique: true,
			min: 0,
			admin: {
				description: "Categories with lower numbers appear first. Leave blank to add at the end.",
				step: 1
			},
			validate: (value: number | undefined | null) => {
				if (value && value < 1) return "Order must be 1 or higher"

				return true
			}
		},
		{
			name: "iconAndColor",
			type: "ui",
			label: "Icon & Color Selection",
			admin: {
				components: {
					Field: {
						path: "@/components/payload/icon-color-picker-field",
						clientProps: {
							iconPath: "icon",
							colorPath: "color"
						}
					}
				}
			}
		},
		{
			name: "icon",
			type: "text",
			required: true,
			admin: {
				hidden: true // Hidden since it's handled by the combined component
			}
		},
		{
			name: "color",
			type: "text",
			required: true,
			defaultValue: "#3B82F6",
			admin: {
				hidden: true // Hidden since it's handled by the combined component
			},
			validate: (value: unknown) => {
				const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/

				if (!hexRegex.test(value as string)) {
					return "Please enter a valid hex color (e.g., #FF0000)"
				}

				return true
			}
		},
		{
			name: "subcategories",
			type: "array",
			label: "Subcategories",
			minRows: 1,
			fields: [
				{
					name: "name",
					type: "text",
					required: true,
					localized: true
				}
			]
		}
	],
	defaultSort: "order",
	hooks: {
		beforeChange: [
			async ({ data, operation, req }) => {
				// Auto-assign order for new categories
				if (operation === "create" && !data.order) {
					// Get the highest order number
					const categories = await req.payload.find({
						collection: "categories",
						sort: "-order",
						limit: 1
					})

					const highestOrder = categories.docs.length > 0 ? categories.docs[0].order : 0

					data.order = highestOrder + 1
				}

				// Handle order conflicts for updates
				if (operation === "update" && data.order) {
					const existingCategory = await req.payload.find({
						collection: "categories",
						where: {
							and: [{ order: { equals: data.order } }, { id: { not_equals: data.id } }]
						}
					})

					// If there's a conflict, shift other categories
					if (existingCategory.docs.length > 0) {
						const categoriesToShift = await req.payload.find({
							collection: "categories",
							where: {
								and: [{ order: { greater_than_equal: data.order } }, { id: { not_equals: data.id } }]
							},
							sort: "order"
						})

						// Shift all categories with order >= new order
						for (const category of categoriesToShift.docs) {
							await req.payload.update({
								collection: "categories",
								id: category.id,
								data: { order: category.order + 1 }
							})
						}
					}
				}
			}
		]
	},
	versions: {
		drafts: {
			autosave: {
				interval: 3000
			}
		},
		maxPerDoc: 50
	}
}
