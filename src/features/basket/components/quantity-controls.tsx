// "use client"

// //#region Import
// import { Plus, Minus } from "lucide-react"

// import { MotionDiv } from "@/components/motion/motion-div"
// import { Button } from "@/components/ui/button"
// import { blurIn } from "@/lib/motion/configs"
// import { MotionSpan } from "@/components/motion/motion-span"
// import { memo, useCallback } from "react"
// import { useBasketStore } from "../store"
// import { cn } from "@/utils/cn"
// // //#endregion

// interface QuantityControlsProps {
// 	quantity: number
// 	id: string
// 	className?: string
// }

// export const QuantityControls = memo(({ quantity, id, className }: QuantityControlsProps) => {
// 	const updateQuantity = useBasketStore((state) => state.updateQuantity)

// 	const incrementQuantity = useCallback(() => updateQuantity(id, quantity + 1), [id, quantity, updateQuantity])

// 	const decrementQuantity = useCallback(() => updateQuantity(id, quantity - 1), [id, quantity, updateQuantity])

// 	return (
// 		<MotionDiv
// 			key='quantity-controls'
// 			{...blurIn}
// 			className={cn(
// 				"flex w-max items-center justify-between rounded-md bg-gray-100 p-1 dark:bg-gray-700/40",
// 				className
// 			)}>
// 			<Button
// 				onClick={decrementQuantity}
// 				size='sm'
// 				variant='outline'
// 				className='h-max p-0.5'
// 				aria-label='Decrease quantity'>
// 				<Minus />
// 			</Button>

// 			<MotionSpan
// 				className='px-2 text-sm font-medium will-change-transform'
// 				key={quantity}
// 				initial={{ scale: 1.2 }}
// 				animate={{ scale: 1 }}
// 				transition={{ type: "spring", stiffness: 300 }}>
// 				{quantity}
// 			</MotionSpan>

// 			<Button
// 				onClick={incrementQuantity}
// 				size='sm'
// 				variant='outline'
// 				className='h-max p-0.5'
// 				aria-label='Increase quantity'>
// 				<Plus />
// 			</Button>
// 		</MotionDiv>
// 	)
// })

// QuantityControls.displayName = "QuantityControls"

"use client"

//#region Import
import { Plus, Minus } from "lucide-react"

import { MotionDiv } from "@/components/motion/motion-div"
import { Button } from "@/components/ui/button"
import { blurIn } from "@/lib/motion/configs"
import { MotionSpan } from "@/components/motion/motion-span"
import { memo, useCallback } from "react"
import { useBasketStore, useSharedBasketStore } from "../store"
import { cn } from "@/utils/cn"
// //#endregion

interface QuantityControlsProps {
	quantity: number
	id: string
	className?: string
	variant?: "default" | "shared"
}

export const QuantityControls = memo(({ quantity, id, className, variant = "default" }: QuantityControlsProps) => {
	const updateQuantity = useBasketStore((state) => state.updateQuantity)

	const updateSharedQuantity = useSharedBasketStore((state) => state.updateQuantity)

	const updateFunction = variant === "shared" ? updateSharedQuantity : updateQuantity

	const incrementQuantity = useCallback(() => updateFunction(id, quantity + 1), [id, quantity, updateFunction])

	const decrementQuantity = useCallback(() => updateFunction(id, quantity - 1), [id, quantity, updateFunction])

	return (
		<MotionDiv
			key='quantity-controls'
			{...blurIn}
			className={cn(
				"flex w-max items-center justify-between rounded-md bg-gray-100 p-1 dark:bg-gray-700/40",
				className
			)}>
			<Button
				onClick={decrementQuantity}
				size='sm'
				variant='outline'
				className='h-max p-0.5'
				aria-label='Decrease quantity'>
				<Minus />
			</Button>

			<MotionSpan
				className='px-2 text-sm font-medium will-change-transform'
				key={quantity}
				initial={{ scale: 1.2 }}
				animate={{ scale: 1 }}
				transition={{ type: "spring", stiffness: 300 }}>
				{quantity}
			</MotionSpan>

			<Button
				onClick={incrementQuantity}
				size='sm'
				variant='outline'
				className='h-max p-0.5'
				aria-label='Increase quantity'>
				<Plus />
			</Button>
		</MotionDiv>
	)
})

QuantityControls.displayName = "QuantityControls"
