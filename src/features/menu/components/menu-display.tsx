"use client"

//#region Import
import { MotionDiv } from "@/components/motion/motion-div"
import { useMenuStore } from "../store"
import { useMemo } from "react"
import { useCategoryStore } from "@/features/category/store"
import { MenuItem } from "./menu-item"
import { MenuItemList } from "./menu-item-list"
import { containerVariants, fadeInVariants } from "@/lib/motion/configs"
import { Category, MenuItem as MenuItemType } from "@payload-types"
import { useTranslations } from "next-intl"
//#endregion

export const MenuDisplay = ({ menuItems }: { menuItems: MenuItemType[] }) => {
	const t = useTranslations("menu.menuItems")

	const viewMode = useMenuStore((state) => state.viewMode)

	const selectedCategory = useCategoryStore((state) => state.selectedCategory)

	const selectedSubcategory = useCategoryStore((state) => state.selectedSubcategory)

	const items = useMemo(() => {
		if (!selectedCategory) return []

		const categorizedItems = menuItems.filter(
			(item) =>
				(item.category as Category)?.id === selectedCategory.id &&
				(selectedSubcategory !== null ? item.subcategory === selectedSubcategory : true)
		)

		return categorizedItems
	}, [menuItems, selectedCategory, selectedSubcategory])

	return (
		<div>
			{!items?.length ? (
				<MotionDiv {...fadeInVariants} className='flex-center size-full flex-1'>
					<p className='text-muted-foreground text-lg tracking-wide uppercase'>{t("noItems")}</p>
				</MotionDiv>
			) : viewMode === "grid" ? (
				<div
					key='grid-view'
					{...containerVariants}
					className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3'>
					{items.map((menuItem) => (
						<MenuItem {...menuItem} key={menuItem.id} />
					))}
				</div>
			) : (
				<div key='list-view' {...containerVariants} className='flex flex-col !justify-start gap-2.5'>
					{items.map((menuItem) => (
						<MenuItemList {...menuItem} key={menuItem.id} />
					))}
				</div>
			)}
		</div>
	)
}
