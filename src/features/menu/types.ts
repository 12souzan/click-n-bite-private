import { Category, MenuItem } from "@payload-types"

export enum MenuItemTag {
	SPICY = "spicy",
	POPULAR = "popular",
	VEGETARIAN = "vegetarian",
	VEGAN = "vegan",
	GLUTEN_FREE = "gluten-free",
	DAIRY_FREE = "dairy-free",
	NUT_FREE = "nut-free",
	HIGH_PROTEIN = "high-protein",
	LOW_CALORIE = "low-calorie",
	CHEFS_SPECIAL = "chef-special",
	SEASONAL = "seasonal"
}

export interface FetchedTenantData {
	categories: Category[]
	menuItems: MenuItem[]
	tenantId: string
}
