/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { useState, useEffect } from "react"
import { AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/next.routes"
import { handlePayment, type PaymentMethod } from "@/features/checkout/payment-handler"
import { getOrderFromLocalStorage } from "@/features/checkout/utils"
import CheckoutSelectionSkeleton from "./checkout_sekelton"
import { CheckoutHeader } from "./checkout-header"
import { OrderSummary } from "./order-summary"
import { PaymentMethods } from "./payment-method"
import type { FetchedTenantData } from "@/features/menu/types"
import { useTranslations } from "next-intl"
import { processOrderService } from "@/features/order/create-update-order"
import { toast } from "sonner"

interface CheckoutSelectionClientProps {
	slug: string
	tenantId: string
	tenantData: FetchedTenantData
}

export default function CheckoutSelectionClient({ slug, tenantData, tenantId }: CheckoutSelectionClientProps) {
	const [order, setOrder] = useState<any>(null)

	const [isProcessing, setIsProcessing] = useState(false)

	const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null)

	const [error, setError] = useState<string | null>(null)

	const [isLoading, setIsLoading] = useState(true)

	const router = useRouter()

	const t = useTranslations("checkout")

	const handleGoBack = () => router.back()

	useEffect(() => {
		const loadOrder = async () => {
			try {
				const orderData = getOrderFromLocalStorage(slug)

				if (orderData) {
					setOrder(orderData.state)
				} else {
					// setError(t("noOrderError"));
					setError("noOrderError")
				}
			} catch (error) {
				console.error("Failed to load order:", error)
				setError(t("loadOrderError"))
			} finally {
				setIsLoading(false)
			}
		}

		loadOrder()
	}, [t])

	const handleSelectMethod = async (method: PaymentMethod) => {
		setSelectedMethod(method)
		setIsProcessing(true)
		setError(null)

		try {
			const processedOrder = await processOrderService({
				orderData: order,
				menuItems: tenantData.menuItems || [],
				categories: tenantData.categories || [],
				tenantId,
				slug
			})

			if (processedOrder) {
				setOrder(processedOrder)
			}

			const success = await handlePayment(method, slug, tenantId !== undefined ? tenantId : undefined)

			if (success) {
				if (method === "cash") {
					setTimeout(() => {
						setIsProcessing(false)
						router.push(`${ROUTES.MENU}/${slug}/success`)
						toast.success(t("orderCreated"))
					}, 500)
				} else {
					setIsProcessing(false)
					router.push(`${ROUTES.MENU}/${slug}/success`)
					toast.success(t("orderCreated"))
				}
			} else {
				throw new Error("Payment processing failed")
			}
		} catch (error) {
			toast.error(t("orderCreatedError"))
			console.error("Payment failed:", error)
			setIsProcessing(false)
			setSelectedMethod(null)
			setError(`${t("paymentFailed")}: ${error}`)
		}
	}

	if (isLoading) {
		return <CheckoutSelectionSkeleton />
	}

	if (error && !order) {
		return (
			<div className='flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 dark:bg-black'>
				<div className='w-full max-w-md'>
					<div className='rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl shadow-blue-100/50 dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-900/30'>
						<div className='mb-4 flex items-center justify-center rounded-xl bg-red-100 p-4 text-red-600 dark:bg-red-900/30 dark:text-red-400'>
							<AlertCircle className='mr-2 h-6 w-6' />
							<p>{error}</p>
						</div>
						<Button
							onClick={() => router.push(`${ROUTES.MENU}/${slug}`)}
							className='w-full rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 py-3 text-white hover:from-blue-600 hover:to-indigo-700'>
							{t("returnToMenu")}
						</Button>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className='m-4 mx-auto flex max-w-md flex-1 flex-col justify-center space-y-3'>
			{error && (
				<div className='flex items-center rounded-2xl border border-red-200 bg-red-100 p-4 text-red-600 dark:border-red-800 dark:bg-red-900/30 dark:text-red-400'>
					<AlertCircle className='mr-2 h-5 w-5 flex-shrink-0' />
					<p className='text-sm'>{error}</p>
				</div>
			)}

			<CheckoutHeader
				onGoBack={handleGoBack}
				orderData={order}
				{...tenantData}
				menuItems={tenantData.menuItems || []}
			/>
			<OrderSummary orderData={order} {...tenantData} menuItems={tenantData.menuItems || []} />

			<PaymentMethods
				methods={["card", "whish", "cash"]}
				selectedMethod={selectedMethod}
				isProcessing={isProcessing}
				onSelectMethod={handleSelectMethod}
			/>
		</div>
	)
}
