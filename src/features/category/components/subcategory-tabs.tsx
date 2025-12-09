"use client"

//#region Import
import { useMemo, memo } from "react"
import { cn } from "@/utils/cn"
import { Button } from "@/components/ui/button"

import { useCategoryStore } from "../store"
//#endregion

export const SubcategoryTabs = memo(() => {
	const selectedCategory = useCategoryStore((state) => state.selectedCategory)

	const selectedSubcategory = useCategoryStore((state) => state.selectedSubcategory)

	const setSelectedSubcategory = useCategoryStore((state) => state.setSelectedSubcategory)

	const style = useMemo(
		() =>
			selectedSubcategory === null
				? { backgroundColor: selectedCategory?.color, borderColor: selectedCategory?.color }
				: { backgroundColor: `${selectedCategory?.color}10`, borderColor: `${selectedCategory?.color}90` },
		[selectedSubcategory, selectedCategory?.color]
	)

	return (
		<div className={cn("scrollbar-hide prevent-selection flex max-w-full gap-2 overflow-x-auto px-2.5")}>
			<Button
				variant='ghost'
				key='all'
				onClick={() => setSelectedSubcategory(null)}
				style={style}
				className={cn(
					"border",
					selectedSubcategory === null
						? `pointer-events-none text-white`
						: "text-foreground hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
				)}>
				All Items
			</Button>

			{selectedCategory?.subcategories?.map((subcategory) => {
				const isActive = selectedSubcategory === subcategory.id

				const style = isActive
					? { backgroundColor: selectedCategory.color, borderColor: selectedCategory.color }
					: { backgroundColor: `${selectedCategory?.color}10`, borderColor: `${selectedCategory?.color}90` }

				return (
					<Button
						variant='ghost'
						key={subcategory.id}
						onClick={() => setSelectedSubcategory(subcategory.id!)}
						style={style}
						className={cn(
							"border",
							isActive
								? `pointer-events-none text-white`
								: "text-foreground hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
						)}>
						{subcategory.name}
					</Button>
				)
			})}
		</div>
	)
})

SubcategoryTabs.displayName = "SubcategoryTabs"
