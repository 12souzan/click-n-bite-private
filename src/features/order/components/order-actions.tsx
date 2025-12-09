"use client"

//#region Import
import { useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Printer, Share2, QrCode } from "lucide-react"
import Link from "next/link"
import type { DecodedOrderData } from "../types"
import { formatOrderForWhatsApp, getOrderShareUrl } from "../utils"
import { WhatsappIcon } from "@/assets/whatsapp-icon"
import { ROUTES } from "@/next.routes"
import { useParams, usePathname } from "next/navigation"
import type { FetchedTenantData } from "@/features/menu/types"
import { onError } from "@/utils/response-message"
import { useTranslations } from "next-intl"
import { useBasketStore } from "@/features/basket/store"
// import { Categories } from "@/lib/payload/collections/categories"
// import { MenuItem } from "@/features/menu/components/menu-item"
//#endregion

interface OrderActionsProps extends Pick<FetchedTenantData, "categories" | "menuItems" | "tenantId"> {
	toggleQr: () => void
	isQRVisible: boolean
	orderData: DecodedOrderData
	encodedOrderId: string
	whatsappNumber?: string | null
	isSummaryVisible: boolean
	print: boolean
}

export const OrderActions = ({
	toggleQr,
	isQRVisible,
	orderData,
	encodedOrderId,
	whatsappNumber,
	isSummaryVisible = true,
	print = true,
	tenantId,
	...response
}: OrderActionsProps) => {
	const { slug } = useParams<{ slug: string }>()

	const pathname = usePathname()

	const t = useTranslations("order.actions")

	const items = useBasketStore((state) => state.items)

	const getShareUrl = useCallback(async () => {
		const basketData = {
			totalItems: items.reduce((total, item) => total + item.quantity, 0),
			totalPrice: items.reduce((total, item) => total + item.price * item.quantity, 0),
			totalCalories: items.reduce((total, item) => total + (item.calories || 0) * item.quantity, 0),
			currency: "USD",
			basketItems: items.map((item) => ({
				menuItemId: item.id,
				quantity: item.quantity,
				comment: item.comment || "",
				price: item.price
			}))
		}

		const linkId = await getOrderShareUrl(tenantId, basketData)

		const basePath = pathname.replace("/order", "")

		return `${window.location.origin}${basePath}?linkId=${linkId}`
	}, [items, tenantId])

	const handleShare = useCallback(async () => {
		if (typeof navigator !== "undefined" && navigator.share) {
			try {
				const shareUrl = await getShareUrl()

				await navigator.share({
					title: "Order Summary",
					url: shareUrl
				})
			} catch (err) {
				console.error("Failed to share:", err)
			}
		} else {
			console.warn("Web Share API not supported on this device")
		}
	}, [getShareUrl])

	const handleShareWhatsApp = useCallback(async () => {
		if (!whatsappNumber) {
			onError("WhatsApp number not found")

			return
		}

		const linkId = await getShareUrl()

		const orderUrl = `${window.location.origin}/menu/${slug}?linkId=${linkId}`

		const message = formatOrderForWhatsApp({
			orderData,
			categories: response.categories,
			menuItems: response.menuItems,
			orderUrl
		})

		const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

		window.open(whatsappUrl, "_blank")
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [orderData, encodedOrderId, response.categories, response.menuItems, whatsappNumber, onError])

	return (
		<div className='flex flex-col gap-4 print:hidden'>
			<div className='flex items-center justify-between'>
				<Button asChild variant='outline' size='sm' title='Back to Menu'>
					<Link href={`${ROUTES.MENU}/${slug}`} replace>
						<ArrowLeft className='size-4' />
						<span className='sr-only'>Back to Menu</span>
					</Link>
				</Button>

				<div className='flex gap-1.5 sm:gap-2'>
					<Button onClick={toggleQr} variant='outline' size='sm'>
						<QrCode className='size-4' />
						<span className='hidden sm:block'>{isQRVisible ? t("hideQR") : t("showQR")}</span>
					</Button>

					{whatsappNumber && (
						<Button
							onClick={handleShareWhatsApp}
							variant='outline'
							size='sm'
							className='border-green-200 text-green-600 hover:border-green-300 hover:bg-green-100 hover:text-green-700 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900/30 dark:hover:text-green-300'>
							<WhatsappIcon className='size-4' />
							<span className='hidden sm:block'>{t("whatsapp")}</span>
						</Button>
					)}

					<Button onClick={handleShare} variant='outline' size='sm'>
						<Share2 className='size-4' />
						<span className='hidden sm:block'>{t("share")}</span>
					</Button>
					{print && (
						<Button onClick={() => window.print()} variant='outline' size='sm'>
							<Printer className='size-4' />
							<span className='hidden sm:block'>{t("print")}</span>
						</Button>
					)}
				</div>
			</div>
			{isSummaryVisible && (
				<div className='rounded-md bg-white p-2.5 dark:bg-gray-800/50'>
					<p className='text-start text-xs text-gray-500 sm:text-base dark:text-gray-400'>{t("orderSummary")}</p>
				</div>
			)}
		</div>
	)
}
