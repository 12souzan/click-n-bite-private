import { Flame } from "lucide-react"
import { cn } from "@/utils/cn"

export const ItemCalories = ({ calories, className }: { calories?: number | null; className?: string }) => {
	if (!calories) return null

	return (
		<div className={cn("flex items-center gap-0.5 text-orange-600", className)}>
			<Flame className='size-3.5' />
			<p className='text-[13px] leading-none'>{calories} cal</p>
		</div>
	)
}
