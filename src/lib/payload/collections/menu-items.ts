import { MenuItemTag } from "@/features/menu/types"
import type { CollectionConfig } from "payload"

export const MenuItems: CollectionConfig = {
	slug: "menu-items",

	admin: {
		useAsTitle: "name",
		defaultColumns: ["name", "price", "category", "subcategory", "updatedAt"]
	},
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
			localized: true
		},
		{
			name: "description",
			type: "text",
			localized: true
		},
		{
			name: "images",
			label: "Images (Aspect Ratio 9:16 fits well)",
			type: "relationship",
			relationTo: "media",
			hasMany: true,
			required: true,
			admin: {
				description: "Upload or select at least one image."
			}
		},
		{
			name: "price",
			type: "number",
			required: true,
			localized: true
		},
		{
			name: "category",
			type: "relationship",
			relationTo: "categories",
			required: true
		},
		{
			name: "subcategory",
			label: "Subcategory",
			type: "text",
			required: true,
			admin: {
				components: {
					Field: {
						path: "@/components/payload/sub-categories-field"
					}
				}
			}
		},
		{
			name: "tags",
			label: "Tags",
			type: "select",
			hasMany: true,
			required: false,
			options: [
				{ label: "Spicy", value: MenuItemTag.SPICY },
				{ label: "Popular", value: MenuItemTag.POPULAR },
				{ label: "Vegetarian", value: MenuItemTag.VEGETARIAN },
				{ label: "Vegan", value: MenuItemTag.VEGAN },
				{ label: "Gluten Free", value: MenuItemTag.GLUTEN_FREE },
				{ label: "Dairy Free", value: MenuItemTag.DAIRY_FREE },
				{ label: "Nut Free", value: MenuItemTag.NUT_FREE },
				{ label: "High Protein", value: MenuItemTag.HIGH_PROTEIN },
				{ label: "Low Calorie", value: MenuItemTag.LOW_CALORIE },
				{ label: "Chef's Special", value: MenuItemTag.CHEFS_SPECIAL },
				{ label: "Seasonal", value: MenuItemTag.SEASONAL }
			],
			validate: (value) => {
				if (Array.isArray(value) && value.length > 3) {
					return "You can select up to 3 tags only"
				}

				return true
			},
			admin: {
				description: "Add one or more tags to describe this menu item"
			}
		},
		{
			name: "calories",
			label: "Calories (kcal)",
			type: "number",
			required: false,
			defaultValue: 0,
			admin: {
				description: "Enter the number of calories in kilocalories (kcal). Defaults to 0 if not specified."
			}
		}
	],
	versions: {
		drafts: {
			autosave: {
				interval: 3000
			}
		},
		maxPerDoc: 50
	}
}
