import { cn } from "@/utils/cn"
import {
	LucideCalendar,
	LucideChefHat,
	LucideDumbbell,
	LucideFlame,
	LucideGlobe,
	type LucideIcon,
	LucideMilk,
	LucideLeaf,
	LucideStar,
	LucideNut
} from "lucide-react"
import { MenuItemTag } from "../types"
import { useTranslations } from "next-intl"

export const TagBadge = ({ tag, className }: { tag: MenuItemTag; className?: string }) => {
	const t = useTranslations("menu.menuItems.tags")

	const Icon = tagIconMap.get(tag)

	const color = tagColorMap.get(tag)

	if (!Icon) return null

	return (
		<span className={cn("flex w-max items-center gap-1 rounded-full border px-2 py-1 text-xs", color, className)}>
			<Icon className='size-4' />
			<p>{t(tag)}</p>
		</span>
	)
}

const tagIconMap = new Map<MenuItemTag, LucideIcon>([
	[MenuItemTag.SPICY, LucideFlame],
	[MenuItemTag.POPULAR, LucideStar],
	[MenuItemTag.VEGETARIAN, LucideLeaf],
	[MenuItemTag.VEGAN, LucideLeaf],
	[MenuItemTag.GLUTEN_FREE, LucideGlobe],
	[MenuItemTag.DAIRY_FREE, LucideMilk],
	[MenuItemTag.NUT_FREE, LucideNut],
	[MenuItemTag.HIGH_PROTEIN, LucideDumbbell],
	[MenuItemTag.LOW_CALORIE, LucideDumbbell],
	[MenuItemTag.CHEFS_SPECIAL, LucideChefHat],
	[MenuItemTag.SEASONAL, LucideCalendar]
])

const tagColorMap = new Map<MenuItemTag, string>([
	[MenuItemTag.SPICY, "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 border-red-300 dark:border-red-800"],
	[
		MenuItemTag.POPULAR,
		"bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100 border-amber-300 dark:border-amber-800"
	],
	[
		MenuItemTag.VEGETARIAN,
		"bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 border-green-300 dark:border-green-800"
	],
	[
		MenuItemTag.VEGAN,
		"bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 border-green-300 dark:border-green-800"
	],
	[
		MenuItemTag.GLUTEN_FREE,
		"bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 border-yellow-300 dark:border-yellow-800"
	],
	[
		MenuItemTag.DAIRY_FREE,
		"bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 border-blue-300 dark:border-blue-800"
	],
	[
		MenuItemTag.NUT_FREE,
		"bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100 border-purple-300 dark:border-purple-800"
	],
	[
		MenuItemTag.HIGH_PROTEIN,
		"bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 border-green-300 dark:border-green-800"
	],
	[
		MenuItemTag.LOW_CALORIE,
		"bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 border-blue-300 dark:border-blue-800"
	],
	[
		MenuItemTag.CHEFS_SPECIAL,
		"bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 border-yellow-300 dark:border-yellow-800"
	],
	[
		MenuItemTag.SEASONAL,
		"bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100 border-orange-300 dark:border-orange-800"
	]
])
