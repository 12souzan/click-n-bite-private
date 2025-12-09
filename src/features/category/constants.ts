import { Utensils, Coffee, Salad, Flame, IceCream, Leaf, Beer, Drumstick, Soup, Pizza, LucideIcon } from "lucide-react"

// export const categoryBgColorMap = new Map<string, string>([
// 	["breakfast", "bg-yellow-500"],
// 	["appetizers", "bg-blue-500"],
// 	["main-courses", "bg-green-500"],
// 	["desserts", "bg-red-500"],
// 	["beverages", "bg-purple-500"]
// ])

export const ALLOWED_ICONS = [
	"utensils",
	"coffee",
	"salad",
	"flame",
	"ice-cream",
	"leaf",
	"beer",
	"drumstick",
	"soup",
	"pizza"
] as const

export type AllowedIconName = (typeof ALLOWED_ICONS)[number]

export const ICON_MAP = new Map<AllowedIconName, LucideIcon>([
	["utensils", Utensils],
	["coffee", Coffee],
	["salad", Salad],
	["flame", Flame],
	["ice-cream", IceCream],
	["leaf", Leaf],
	["beer", Beer],
	["drumstick", Drumstick],
	["soup", Soup],
	["pizza", Pizza]
])
