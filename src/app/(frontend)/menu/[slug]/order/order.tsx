"use client"
//#region Import
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { OrderDetails } from "@/features/order/components/order-details"
import { OrderQRCode } from "@/features/order/components/order-qr-code"
import { AnimatePresence } from "motion/react"
import { MotionDiv } from "@/components/motion/motion-div"
import { OrderActions } from "@/features/order/components/order-actions"
import Link from "next/link"
import { expandVariants } from "@/lib/motion/configs"
import { OrderDetailsSkeleton } from "@/features/order/components/order-details-skeleton"
import { useParams } from "next/navigation"
import { ROUTES } from "@/next.routes"
import type { FetchedTenantData } from "@/features/menu/types"
import { useTranslations } from "next-intl"
import { DecodedOrderData, OrderItem } from "@/features/order/types"
import { getOrderFromLocalStorage } from "@/features/checkout/utils"

//#endregion

interface OrderProps extends FetchedTenantData {
	id: string
	whatsappNumber?: string | null
}

export const Order = ({ id, whatsappNumber, tenantId, ...response }: OrderProps) => {
	const { slug } = useParams<{ slug: string }>()

	const t = useTranslations("order.notFound")

	const [isLoading, setIsLoading] = useState(true)

	const [isQRVisible, setIsQRVisible] = useState(false)

	const [orderData, setOrderData] = useState<DecodedOrderData | null>(null)

	const [loadError, setLoadError] = useState(false)

	useEffect(() => {
		const loadOrder = () => {
			try {
				const basketData = getOrderFromLocalStorage(slug)

				if (basketData && basketData.state && basketData.state.items && Array.isArray(basketData.state.items)) {
					const orderData: DecodedOrderData = {
						items: basketData.state.items.map((item: OrderItem) => ({
							id: item.id,
							name: item.name,
							price: item.price,
							quantity: item.quantity,
							categoryId: item.categoryId || "unknown",
							comment: item.comment || ""
						})),
						tableNumber: basketData.state.tableNumber,
						orderId: basketData.state.orderId,
						orderNumber: null
					}

					setOrderData(orderData)
				} else {
					console.error("Invalid basket data structure:", basketData)
					setLoadError(true)
				}
			} catch (error) {
				console.error("Failed to load order from localStorage:", error)
				setLoadError(true)
			} finally {
				setIsLoading(false)
			}
		}

		loadOrder()
	}, [slug])

	if (isLoading) return <OrderDetailsSkeleton />

	if (loadError || !orderData) {
		return (
			<div className='flex-center flex-1 flex-col p-4'>
				<div className='max-w-md text-center'>
					<h1 className='mb-4 text-2xl font-bold'>{t("title")}</h1>
					<p className='mb-6 text-gray-600 dark:text-gray-300'>{t("description")}</p>
					<Button asChild className='bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600'>
						<Link href={`${ROUTES.MENU}/${slug}`}>{t("returnToMenu")}</Link>
					</Button>
				</div>
			</div>
		)
	}

	return (
		<div className='mx-auto w-full max-w-2xl flex-1 p-4 print:p-0'>
			<OrderActions
				toggleQr={() => setIsQRVisible((prev) => !prev)}
				isQRVisible={isQRVisible}
				orderData={orderData}
				encodedOrderId={id}
				whatsappNumber={whatsappNumber}
				isSummaryVisible={true}
				tenantId={tenantId}
				print={true}
				{...response}
			/>

			<AnimatePresence mode='wait'>
				{isQRVisible && (
					<MotionDiv
						variants={expandVariants}
						initial='hidden'
						animate='visible'
						exit='hidden'
						className='flex justify-center overflow-hidden pt-4'>
						<OrderQRCode size={180} tenantId={tenantId} />
					</MotionDiv>
				)}
			</AnimatePresence>
			<OrderDetails orderData={orderData} {...response} tenantId={tenantId} />
		</div>
	)
}
