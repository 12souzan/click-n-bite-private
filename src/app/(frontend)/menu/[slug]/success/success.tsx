"use client"
import { getOrderFromLocalStorage, LocalStorageOrder } from "@/features/checkout/utils"
import { CheckCircle } from "lucide-react"
import { useState, useEffect } from "react"
import SuccessDetails from "@/features/success/components/sucess-order-details"
import { SuccessPaymentSkeleton } from "@/features/success/components/success-sekelton"
import { useTranslations } from "next-intl"
import { fetchOrderById } from "@/features/order/get-specifique-order"
import { DecodedOrderData } from "@/features/order/types"

interface SuccessPaymentClientProps {
	tenantId: string
}

export default function SuccessPaymentClient({ tenantId }: SuccessPaymentClientProps) {
	const [orderData, setOrderData] = useState<LocalStorageOrder | null>(null)

	const [serverOrderData, setServerOrderData] = useState<DecodedOrderData | null>(null)

	const [isLoading, setIsLoading] = useState(true)

	const [error, setError] = useState<string | null>(null)

	const t = useTranslations("SuccessPayment")

	const statusT = useTranslations("OrderStatus")

	useEffect(() => {
		const loadOrderData = async () => {
			try {
				const localStorageData = getOrderFromLocalStorage()

				setOrderData(localStorageData)

				if (localStorageData?.state?.orderId && tenantId) {
					try {
						const serverOrder = await fetchOrderById(tenantId, localStorageData.state.orderId)

						setServerOrderData(serverOrder)
					} catch (err) {
						console.warn("Could not fetch order from server, using local data:", err)
					}
				}

				setIsLoading(false)
			} catch (err) {
				console.error("Error loading order data:", err)
				setError("Failed to load order data")
				setIsLoading(false)
			}
		}

		loadOrderData()
	}, [tenantId])

	if (isLoading) {
		return <SuccessPaymentSkeleton />
	}

	if (error || !orderData) {
		return (
			<div className='flex min-h-screen flex-col items-center justify-center p-4 dark:bg-black'>
				<div className='max-w-md text-center text-white'>
					<h1 className='mb-4 text-2xl font-bold'>{t("orderNotFound")}</h1>
					<p className='mb-6'>{error || t("orderNotFoundMessage")}</p>
				</div>
			</div>
		)
	}

	const orderNumber = serverOrderData?.orderNumber || orderData?.state?.orderNumber || 0

	const tableNumber = serverOrderData?.tableNumber || orderData?.state?.tableNumber || "Not specified"

	const orderStatus = serverOrderData?.status || "PENDING"

	const translatedStatus = statusT(orderStatus.toLowerCase())

	return (
		<div className='flex min-h-screen flex-col items-center justify-center p-4 dark:bg-black'>
			<div className='w-full max-w-[30rem]'>
				<div className='mt-4 overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-700/20'>
					<div className='relative mb-8 flex justify-center'>
						<div className='absolute inset-0 flex items-center justify-center'>
							<div className='h-14 w-14 animate-ping rounded-full bg-green-100 opacity-20 dark:bg-green-900/30'></div>
						</div>
						<div className='relative rounded-2xl border border-green-200 bg-gradient-to-br from-green-100 to-emerald-100 p-3 shadow-inner dark:border-green-800/30 dark:from-green-900/30 dark:to-emerald-900/20'>
							<CheckCircle className='h-10 w-10 text-green-500 drop-shadow-md dark:text-green-400' />
						</div>
					</div>

					<div className='relative mb-8 text-center'>
						<h2 className='mb-3 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-xl font-bold md:text-3xl dark:text-white'>
							{t("paymentSuccessful")}
						</h2>
						<p className='text-md text-gray-600 md:text-lg dark:text-gray-300'>{t("thankYouMessage")}</p>
					</div>

					<SuccessDetails tableNumber={tableNumber} orderNumber={orderNumber} status={translatedStatus} />

					<div className='border-t border-gray-200 pt-6 text-center dark:border-gray-700'>
						<p className='text-sm text-gray-500 dark:text-gray-400'>{t("showOrderNumber")}</p>
						<p className='mt-2 text-xs text-gray-400 dark:text-gray-500'>{t("enjoyMeal")}</p>
					</div>
				</div>
			</div>
			<style jsx>{`
				@keyframes fade-in {
					from {
						opacity: 0;
						transform: translateY(10px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
				.animate-fade-in {
					animation: fade-in 0.5s ease-out;
				}
			`}</style>
		</div>
	)
}
