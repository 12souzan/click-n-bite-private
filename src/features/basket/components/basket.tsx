"use client"

//#region Import
import { useMemo, useState, useCallback, useEffect } from "react"
import { ShoppingCart, Trash2, X, Utensils, FileDigit, Flame, DollarSign, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetFooter,
	SheetClose,
	SheetTrigger
} from "@/components/ui/sheet"
import { useBasketStore, useSharedBasketStore } from "../store"
import { MotionButton } from "@/components/motion/motion-button"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { QuantityControls } from "./quantity-controls"
import { fadeInWithScaleVariants } from "@/lib/motion/configs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BasketItemComment } from "./basket-item-comment"
import { ItemPrice } from "@/features/menu/components/item-price"
import { ItemCalories } from "@/features/menu/components/item-calories"
import { TableNumberField } from "./table-number-field"
import type { Media } from "@payload-types"
import { AllowedIconName, ICON_MAP } from "@/features/category/constants"
import { ROUTES } from "@/next.routes"
import type { FetchedTenantData } from "@/features/menu/types"
import { ImageMedia } from "@/components/payload/image-media"
import { useTranslations } from "next-intl"
import { BasketItem } from "../types"

//#endregion

interface BasketProps extends FetchedTenantData {
	slug: string
	initialItems?: BasketItem[]
}
export const Basket = ({ slug, categories, menuItems, initialItems }: BasketProps) => {
	const t = useTranslations("basket")

	const router = useRouter()

	const searchParams = useSearchParams()

	const linkId = searchParams.get("linkId")

	const hasLinkId = !!linkId

	const pathname = usePathname()

	const items = useBasketStore((state) => state.items)

	const removeItem = useBasketStore((state) => state.removeItem)

	const clearBasket = useBasketStore((state) => state.clearBasket)

	const getTotalItems = useBasketStore((state) => state.getTotalItems)

	const mergeItems = useBasketStore((state) => state.mergeItems)

	const sharedItems = useSharedBasketStore((state) => state.items)

	const setSharedItems = useSharedBasketStore((state) => state.setItems)

	const [isOpen, setIsOpen] = useState(false)

	const [isMounted, setIsMounted] = useState(false)

	const categoryIds = useMemo(() => categories.map(({ id }) => id.toString()), [categories])

	const [accordionValue, setAccordionValue] = useState<string[]>(categoryIds)

	const displayItems = hasLinkId ? sharedItems : items

	const totalDisplayItems = useMemo(
		() => displayItems.reduce((total, item) => total + item.quantity, 0),
		[displayItems]
	)

	const personalItemsCount = useMemo(getTotalItems, [getTotalItems, items])

	const itemsByCategory = useMemo(
		() =>
			displayItems.reduce(
				(acc, item) => {
					if (!acc[item.categoryId]) {
						acc[item.categoryId] = []
					}

					acc[item.categoryId].push(item)

					return acc
				},
				{} as Record<string, typeof displayItems>
			),
		[displayItems]
	)

	const getCategoryCalories = useCallback((categoryItems: BasketItem[]) => {
		const totalCalories = categoryItems.reduce((sum, item) => sum + (item.calories || 0) * item.quantity, 0)

		return totalCalories > 0 ? totalCalories : null
	}, [])

	const totalCalories = useMemo(
		() => displayItems.reduce((total, item) => total + (item.calories || 0) * item.quantity, 0),
		[displayItems]
	)

	const totalPrice = useMemo(
		() => displayItems.reduce((total, item) => total + item.price * item.quantity, 0),
		[displayItems]
	)

	const handleOpenPreview = useCallback(() => {
		setIsOpen(false)
		const url = hasLinkId ? `${ROUTES.MENU}/${slug}` : `${ROUTES.MENU}/${slug}/order`

		router.push(url)
	}, [router, slug, hasLinkId])

	const handleAddAllToCart = useCallback(() => {
		mergeItems(sharedItems)
		setIsOpen(false)
		router.push(`${ROUTES.MENU}/${slug}`)
	}, [sharedItems, mergeItems, router, slug])

	useEffect(() => {
		setIsMounted(true)

		return () => setIsMounted(false)
	}, [])

	useEffect(() => {
		if (hasLinkId && isMounted) {
			setIsOpen(true)
		}
	}, [hasLinkId, isMounted])

	useEffect(() => {
		if (hasLinkId && initialItems && initialItems.length > 0) {
			setSharedItems(initialItems)
		} else if (hasLinkId && (!initialItems || initialItems.length === 0)) {
			setSharedItems([])
		}
	}, [hasLinkId, initialItems, setSharedItems])

	if (!isMounted || pathname.startsWith("/order/")) return null

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			{!hasLinkId && (
				<SheetTrigger asChild>
					<MotionButton
						className='fixed end-6 bottom-6 z-30 h-max rounded-full p-3 shadow-lg'
						aria-label='Open basket'
						{...fadeInWithScaleVariants}>
						<ShoppingCart className='!size-6' />
						{personalItemsCount > 0 && (
							<span className='flex-center absolute -end-2 -top-2 size-6 rounded-full bg-red-500 text-xs text-white'>
								{personalItemsCount}
							</span>
						)}
					</MotionButton>
				</SheetTrigger>
			)}
			<SheetContent
				className={`prevent-selection flex w-full flex-col gap-0 p-0 sm:max-w-md ${hasLinkId ? "md:!h-[700px]" : ""}`}
				hasLinkId={hasLinkId}
				data-has-link-id={hasLinkId}
				side={hasLinkId ? "center" : "right"}>
				<SheetHeader className='border-border border-b p-4'>
					<SheetTitle className='text-xl font-semibold'>{hasLinkId ? t("titleshared") : t("title")}</SheetTitle>
				</SheetHeader>

				{totalDisplayItems === 0 ? (
					<div className='flex-center flex-grow flex-col p-4'>
						<ShoppingCart className='text-muted-foreground mb-4 h-12 w-12' />
						<p className='text-muted-foreground'>{t("empty")}</p>
						<SheetClose asChild>
							<Button variant='outline' className='mt-4'>
								{t("browseMenu")}
							</Button>
						</SheetClose>
					</div>
				) : (
					<>
						<Accordion
							type='multiple'
							className='flex-grow space-y-3 overflow-y-auto p-4'
							value={accordionValue}
							onValueChange={setAccordionValue}>
							{Object.entries(itemsByCategory).map(([categoryId, categoryItems]) => {
								const category = categories.find((c) => c.id === String(categoryId))

								const categoryTotal = categoryItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

								const itemCount = categoryItems.reduce((sum, item) => sum + item.quantity, 0)

								const Icon = ICON_MAP.get(category?.icon as AllowedIconName) ?? Utensils

								const categoryCalories = getCategoryCalories(categoryItems)

								return (
									<AccordionItem key={categoryId} value={categoryId} className='border-border/80 rounded-lg border'>
										<AccordionTrigger className='flex w-full items-center justify-between p-2.5 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800'>
											<div className='flex items-center'>
												{category && Icon && <Icon className='me-2 size-4 text-gray-700 dark:text-gray-300' />}
												<span className='font-medium'>{category ? category.name : "Other"}</span>
											</div>

											<div className='border-border/80 ms-auto -me-2 flex rounded-sm border'>
												<span className='text-muted-foreground border-border/80 border-e px-2 py-1 text-sm font-normal'>
													{t("itemsCount", { count: itemCount })}
												</span>

												{!!categoryCalories && (
													<ItemCalories className='border-border/80 border-e px-2 py-1' calories={categoryCalories} />
												)}

												<ItemPrice price={categoryTotal} className='px-2 py-1' />
											</div>
										</AccordionTrigger>

										<AccordionContent className='space-y-2.5 p-2.5 pt-1'>
											{categoryItems.map(({ id, name, price, quantity, comment, calories }) => {
												const menuItem = menuItems.find((i) => i.id === id)

												return (
													<div key={id} className='flex flex-col gap-3 rounded-lg bg-gray-50 p-2.5 dark:bg-gray-800'>
														<div className='flex justify-between gap-2'>
															<div className='flex flex-1 items-center gap-3'>
																<div className='relative size-12 flex-shrink-0 overflow-hidden rounded-md'>
																	<ImageMedia
																		resource={menuItem?.images[0] as Media}
																		className='size-12 object-cover'
																	/>
																</div>
																<div className='flex-1 font-medium'>
																	<h4>{name}</h4>
																	<div className='mt-1 flex justify-between'>
																		<QuantityControls
																			quantity={quantity}
																			id={id}
																			variant={hasLinkId ? "shared" : "default"}
																		/>
																		<div className='flex flex-col items-end'>
																			<ItemPrice price={price * quantity} />
																			{!!calories && <ItemCalories calories={calories * quantity} />}
																		</div>
																	</div>
																</div>
															</div>
															{!hasLinkId && (
																<Button
																	onClick={() => removeItem(id)}
																	variant='ghost'
																	className='text-muted-foreground h-max !p-0 hover:!bg-transparent hover:text-red-500 dark:hover:text-red-400'
																	aria-label='Remove item'
																	title='Remove item'>
																	<span className='sr-only'>Remove item</span>
																	<X className='size-4' />
																</Button>
															)}
														</div>

														{!hasLinkId && <BasketItemComment itemId={id} comment={comment} />}
													</div>
												)
											})}
										</AccordionContent>
									</AccordionItem>
								)
							})}
						</Accordion>

						<SheetFooter className='border-border space-y-2 border-t p-3 pt-3 pb-6'>
							<div className='overflow-hidden rounded-lg shadow-sm'>
								<table className='border-border w-full border text-sm'>
									<thead>
										<tr className='bg-muted'>
											{!hasLinkId && (
												<th className='text-foreground/70 border-border w-1/3 rounded-tl-lg border-r border-b px-3 py-2 text-start font-semibold dark:border-gray-700'>
													<div className='flex-center gap-1.5'>
														<FileDigit className='size-4' />
														<span className='text-sm leading-none'>{t("footer.tableNumber")}</span>
													</div>
												</th>
											)}
											<th className='text-foreground/70 border-border w-1/3 border-r border-b px-3 py-2 text-start font-semibold dark:border-gray-700'>
												<div className='flex-center gap-1.5'>
													<Flame className='size-4' />
													<span className='text-sm leading-none'>{t("footer.calories")}</span>
												</div>
											</th>
											<th className='text-foreground/70 border-border w-1/3 rounded-tr-lg border-b px-3 py-2 text-start font-semibold dark:border-gray-700'>
												<div className='flex-center !-ms-2 gap-1.5'>
													<DollarSign className='size-4' />
													<span className='text-sm leading-none'>{t("footer.total")}</span>
												</div>
											</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											{!hasLinkId && (
												<td className='border-border border-r px-3 py-2 align-middle'>
													<div className='flex-center gap-2'>
														<TableNumberField />
													</div>
												</td>
											)}
											<td className='border-border border-r px-3 py-2 align-middle'>
												<div className='flex-center gap-2'>
													{!!totalCalories ? (
														<ItemCalories
															calories={totalCalories}
															className='text-base text-amber-600 dark:text-amber-400'
														/>
													) : (
														<span className='text-muted-foreground'>—</span>
													)}
												</div>
											</td>
											<td className='px-3 py-2 align-middle'>
												<div className='flex-center gap-2'>
													<ItemPrice price={totalPrice} className='text-base font-bold' />
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							{!hasLinkId ? (
								<div className='grid grid-cols-2 gap-2'>
									<Button onClick={clearBasket} variant='outline' className='flex-center'>
										<Trash2 />
										{t("footer.actions.clear")}
									</Button>
									<Button onClick={handleOpenPreview}>
										<Eye />
										{t("footer.actions.preview")}
									</Button>
								</div>
							) : (
								<div className='grid grid-cols-2 gap-2'>
									<Button onClick={handleOpenPreview} variant='outline' className='flex-center'>
										<Eye />
										{t("footer.actions.YourCart")}
									</Button>
									<Button onClick={handleAddAllToCart} className='w-full'>
										<ShoppingCart />
										{t("footer.actions.addAllToCart")}
									</Button>
								</div>
							)}
						</SheetFooter>
					</>
				)}
			</SheetContent>
		</Sheet>
	)
}
