import type { MenuItem } from "@payload-types"

export interface BasketItem extends Pick<MenuItem, "id" | "name" | "price" | "calories"> {
	quantity: number
	categoryId: string
	categoryName: string
	comment: string
}
