/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
//#region Import
import { MessageSquare, Utensils, ShoppingCart } from "lucide-react"
import { useMemo } from "react"
import { MotionDiv } from "@/components/motion/motion-div"
import { resolveOrderData } from "../utils"
import { fadeInVariants } from "@/lib/motion/configs"
import { ItemPrice } from "@/features/menu/components/item-price"
import { AllowedIconName, ICON_MAP } from "@/features/category/constants"
import type { FetchedTenantData } from "@/features/menu/types"
import { useTranslations } from "next-intl"
import { ROUTES } from "@/next.routes"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

// //#endregion

interface OrderDetailsProps extends FetchedTenantData {
	orderData: any
}

export const OrderDetails = ({ orderData, menuItems, categories }: OrderDetailsProps) => {
	const t = useTranslations("order")

	const { slug } = useParams<{ slug: string }>()

	const router = useRouter()

	const isApiFormat = orderData.categories && Array.isArray(orderData.categories)

	const displayData = useMemo(() => {
		if (isApiFormat) {
			return orderData
		}

		const resolvedData = resolveOrderData({ orderData, menuItems })

		const itemsByCategory = resolvedData.items.reduce(
			(acc, item) => {
				if (!acc[item.categoryId]) {
					acc[item.categoryId] = []
				}

				acc[item.categoryId].push(item)

				return acc
			},
			{} as Record<string, typeof resolvedData.items>
		)

		const displayCategories = Object.entries(itemsByCategory).map(([categoryId, items]) => {
			const category = categories.find((c) => String(c.id) === String(categoryId))

			return {
				id: categoryId,
				name: category?.name || "Other",
				items: items.map((item) => ({
					...item,
					totalPrice: item.price * item.quantity
				}))
			}
		})

		return {
			categories: displayCategories,
			totalPrice: resolvedData.totalPrice
		}
	}, [orderData, menuItems, categories, isApiFormat])

	const processOrder = async () => {
		router.push(`${ROUTES.MENU}/${slug}/checkout`)
	}

	if (!displayData.categories || displayData.categories.length === 0) {
		return (
			<div className='p-4 text-center'>
				<p className='text-gray-500 dark:text-gray-400'>No items in your order</p>
			</div>
		)
	}

	return (
		<>
			<MotionDiv {...fadeInVariants} className='flex flex-col gap-2 py-4'>
				{displayData.categories.map((category: any) => {
					const categoryDetails = categories.find((c) => String(c.id) === String(category.id))

					const CategoryIcon = ICON_MAP.get(categoryDetails?.icon as AllowedIconName) ?? Utensils

					return (
						<div key={category.id} className='space-y-2 rounded-md bg-white p-2.5 dark:bg-gray-800/50'>
							<h3
								className='flex w-max items-center gap-2 rounded-sm px-2 py-1 text-sm font-medium text-black dark:text-white'
								style={{ backgroundColor: categoryDetails?.color }}>
								{categoryDetails && CategoryIcon && <CategoryIcon className='size-4' />}
								{category.name}
							</h3>

							<div className='space-y-2.5'>
								{category.items.map((item: any) => (
									<div key={item.id} className='rounded-lg bg-gray-50 p-2 sm:p-3 dark:bg-gray-700/20'>
										<div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
											<div className='flex-1'>
												<h4 className='space-x-1 font-medium'>
													<span className='text-muted-foreground'>{item.quantity}×</span>
													<span>{item.name}</span>
												</h4>
											</div>
											<div className='text-end sm:ms-4 sm:min-w-[100px]'>
												<ItemPrice price={item.totalPrice} />
												<div className='text-sm text-gray-500 dark:text-gray-400'>
													<ItemPrice price={item.price} /> {t("priceForEach")}
												</div>
											</div>
										</div>

										{item.comment && (
											<div className='mt-3 flex items-start gap-2 rounded-sm border border-amber-200 bg-white p-2 dark:border-amber-800 dark:bg-gray-800'>
												<MessageSquare className='mt-0.5 size-4 flex-shrink-0 text-amber-500 dark:text-amber-400' />
												<p className='text-sm text-gray-700 dark:text-gray-300'>{item.comment}</p>
											</div>
										)}
									</div>
								))}
							</div>
						</div>
					)
				})}
			</MotionDiv>

			<MotionDiv
				{...fadeInVariants}
				className='border-border sticky bottom-2 rounded-md border bg-white px-4 py-2 dark:bg-[#141a21]'>
				<div className='flex items-center justify-between pb-2 font-bold'>
					<span className=''>{t("footer.total")}:</span>
					<span className='font-mono'>${displayData.totalPrice.toFixed(2)}</span>
				</div>

				<div className='border-t border-gray-200/50 pt-2 text-center text-xs text-gray-500 dark:text-gray-400'>
					<p>{t("footer.thankYou")}</p>
					<p>{t("footer.checkoutCaption")}</p>
				</div>
			</MotionDiv>
			<MotionDiv className='print:hidden'>
				<Button
					onClick={processOrder}
					variant='default'
					className='!print:hidden my-4 h-[41px] w-full rounded-md border border-gray-200 bg-[#3170fc] hover:bg-blue-700 dark:border-gray-700 dark:bg-gray-800/50 dark:hover:bg-gray-800/50'>
					<div className='flex items-center gap-2 text-white'>
						<ShoppingCart className='h-4 w-4' />
						<span>{t("checkout")}</span>
					</div>
				</Button>
			</MotionDiv>
		</>
	)
}
