import { cn } from "@/utils/cn"

interface ItemPriceProps {
	price: number
	className?: string
}

export const ItemPrice = ({ price, className }: ItemPriceProps) => (
	<span className={cn("font-mono", className)}>${price.toFixed(2)}</span>
)
