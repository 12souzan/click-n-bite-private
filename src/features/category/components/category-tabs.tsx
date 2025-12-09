"use client"

//#region Import
import { cn } from "@/utils/cn"
import { useCategoryStore } from "../store"
import { Button } from "@/components/ui/button"
import { SubcategoryTabs } from "./subcategory-tabs"
import type { Category } from "@payload-types"
import { AllowedIconName, ICON_MAP } from "../constants"
import { Utensils } from "lucide-react"
import { memo, useMemo } from "react"
//#endregion

export const CategoryTabs = memo(({ categories }: { categories: Category[] }) => (
	<div className='flex-center max-w-full flex-1 flex-col gap-4 overflow-hidden pt-1 pb-4 sm:gap-5'>
		<div className='scrollbar-hide ring-border/70 flex max-w-full items-center gap-2 overflow-x-auto p-2.5 shadow-sm ring-1 sm:rounded-lg sm:shadow-md'>
			{categories.map((category) => (
				<CategoryTab key={category.id} {...category} />
			))}
		</div>

		<SubcategoryTabs />
	</div>
))

CategoryTabs.displayName = "CategoryTabs"

const CategoryTab = memo((category: Category) => {
	const { id, name, icon } = category

	const selectedCategory = useCategoryStore((state) => state.selectedCategory)

	const setSelectedCategory = useCategoryStore((state) => state.setSelectedCategory)

	const isActive = useMemo(() => selectedCategory?.id === id, [selectedCategory, id])

	const Icon = useMemo(() => ICON_MAP.get(icon as AllowedIconName) ?? Utensils, [icon])

	const style = useMemo(() => (isActive ? { backgroundColor: category.color } : {}), [isActive, category.color])

	return (
		<Button
			key={id}
			onClick={() => setSelectedCategory(category)}
			variant='ghost'
			size='lg'
			style={style}
			className={cn(
				"h-max flex-col p-2",
				isActive
					? `pointer-events-none text-white shadow-md`
					: "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
			)}>
			{Icon && <Icon className='size-5' />}
			<span className='text-xs font-medium sm:text-sm sm:leading-[14px]'>{name}</span>
		</Button>
	)
})

CategoryTab.displayName = "CategoryTab"
