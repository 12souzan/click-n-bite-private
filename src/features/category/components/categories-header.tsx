"use client"

//#region Import
import { ChevronDown, Utensils } from "lucide-react"
import { useCategoryStore } from "../store"
import { Button } from "@/components/ui/button"
import { cn } from "@/utils/cn"
import { useEffect, useMemo } from "react"
import { CategoryTabs } from "./category-tabs"
import { ToggleMenuLayout } from "@/features/menu/components/toggle-menu-layout"
import { Category } from "@payload-types"
import { AllowedIconName, ICON_MAP } from "../constants"
import { useTranslations } from "next-intl"
// //#endregion

export const CategoriesHeader = ({ categories }: { categories: Category[] }) => {
	const t = useTranslations("menu.categories")

	const categoriesVisible = useCategoryStore((state) => state.categoriesVisible)

	const toggleCategoriesVisibility = useCategoryStore((state) => state.toggleCategoriesVisibility)

	const selectedCategory = useCategoryStore((state) => state.selectedCategory)

	const setSelectedCategory = useCategoryStore((state) => state.setSelectedCategory)

	const selectedSubcategory = useCategoryStore((state) => state.selectedSubcategory)

	const ActiveTabIcon = useMemo(
		() => ICON_MAP.get(selectedCategory?.icon as AllowedIconName) ?? Utensils,
		[selectedCategory]
	)

	useEffect(() => {
		if (!selectedCategory && !!categories?.length) setSelectedCategory(categories[0])
	}, [categories, selectedCategory, setSelectedCategory])

	return (
		<div className='border-border bg-background sticky top-[64px] z-50 border-b backdrop-blur-md sm:top-[72px]'>
			<div className='custom-container p-0'>
				<div className='flex items-center justify-between px-4 pb-4'>
					{selectedCategory && (
						<div
							className={cn(
								"transition-basic flex h-8 shrink-0 items-center gap-1.5 overflow-hidden rounded-sm border border-gray-200 px-1.5 text-xs text-gray-700 ease-in-out sm:gap-2 sm:px-2 sm:text-sm dark:border-gray-800 dark:text-gray-300",
								categoriesVisible && "opacity-0"
							)}>
							{ActiveTabIcon && <ActiveTabIcon className='size-3.5 sm:size-4' />}
							<h2>{selectedCategory.name}</h2>
							{selectedSubcategory && (
								<>
									<span className='text-gray-400 dark:text-gray-500'>/</span>
									<h2>{selectedCategory.subcategories?.find((sub) => sub.id === selectedSubcategory)?.name}</h2>
								</>
							)}
						</div>
					)}

					<div className='ms-auto flex items-center gap-2'>
						<Button
							onClick={toggleCategoriesVisibility}
							variant='outline'
							className='gap-1 px-2 text-xs font-normal sm:gap-2 sm:px-3 sm:text-sm [&>svg]:!size-3.5 sm:[&>svg]:!size-4'>
							{t("title")}
							<ChevronDown className={cn("mt-0.5 shrink-0", categoriesVisible && "rotate-180")} />
						</Button>

						<ToggleMenuLayout />
					</div>
				</div>

				<div
					className={cn(
						"transition-basic overflow-hidden",
						categoriesVisible ? "h-[144px] opacity-100 sm:h-[146px]" : "h-0 opacity-0"
					)}>
					<CategoryTabs categories={categories} />
				</div>
			</div>
		</div>
	)
}
