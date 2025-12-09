"use client"

//#region Import
import { useCallback } from "react"
import { ShoppingCart } from "lucide-react"
import { AnimatePresence } from "motion/react"
import { useBasketStore } from "../store"
import { useCategoryStore } from "@/features/category/store"
import { QuantityControls } from "./quantity-controls"
import { Button } from "@/components/ui/button"
import { MenuItem as MenuItemType } from "@payload-types"
import { onError } from "@/utils/response-message"
import { useTranslations } from "next-intl"
// //#endregion

export const BasketButton = ({ id, name, price, calories }: MenuItemType) => {
	const t = useTranslations("menu.menuItems")

	const addItem = useBasketStore((state) => state.addItem)

	const category = useCategoryStore((state) => state.selectedCategory)

	const items = useBasketStore((state) => state.items)

	const basketItem = items.find((i) => i.id === id)

	const quantity = basketItem?.quantity || 0

	const handleAddToBasket = useCallback(() => {
		if (!category?.id) {
			onError("Please select a category first")

			return
		}

		addItem({ id, name, price, categoryId: category.id, calories, categoryName: category.name })
	}, [addItem, category, id, name, price, calories])

	return (
		<AnimatePresence mode='wait'>
			{quantity === 0 ? (
				<Button
					key='add-button'
					onClick={handleAddToBasket}
					size='sm'
					className='ms-auto w-max font-normal whitespace-nowrap'>
					<ShoppingCart />
					{t("addToBasket")}
				</Button>
			) : (
				<QuantityControls quantity={quantity} id={id} className='ms-auto' />
			)}
		</AnimatePresence>
	)
}
