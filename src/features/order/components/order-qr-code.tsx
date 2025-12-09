"use client"

//#region Import
import { useCallback, useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { getOrderShareUrl } from "../utils"
import { useTranslations } from "next-intl"
import { BasketCreateRequest } from "@/features/basket/service"
import { useBasketStore } from "@/features/basket/store"
import { useParams } from "next/navigation"
// //#endregion
interface OrderQRCodeProps {
	size?: number
	tenantId: string
}

export const OrderQRCode = ({ size = 150, tenantId }: OrderQRCodeProps) => {
	const t = useTranslations("order.qrCode")

	const [copied, setCopied] = useState(false)

	const [shareUrl, setShareUrl] = useState<string>("")

	const items = useBasketStore((state) => state.items)

	const params = useParams()

	const slug = params.slug as string

	const generateAndCopyUrl = useCallback(async () => {
		try {
			let url = shareUrl

			const basketData: BasketCreateRequest = {
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

			if (!url) {
				const linkId = await getOrderShareUrl(tenantId, basketData)

				url = `${window.location.origin}/menu/${slug}?linkId=${linkId}`
				setShareUrl(url)
				console.log("Generated full URL:", url)
			}

			// Copy to clipboard
			if (typeof navigator === "undefined") {
				console.warn("Clipboard not available in this environment")

				return
			}

			if (navigator.clipboard?.writeText) {
				await navigator.clipboard.writeText(url)
			} else {
				const textArea = document.createElement("textarea")

				textArea.value = url
				textArea.style.position = "fixed"
				textArea.style.opacity = "0"
				document.body.appendChild(textArea)
				textArea.select()

				const successful = document.execCommand("copy")

				document.body.removeChild(textArea)

				if (!successful) {
					throw new Error("Legacy copy failed")
				}
			}

			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch (err) {
			console.error("Failed to generate or copy URL:", err)
			alert("Could not copy to clipboard. Please try again.")
		}
	}, [shareUrl, items])

	return (
		<div className='flex flex-col items-center'>
			<div className='rounded-lg bg-white p-3 shadow-sm'>
				<QRCodeSVG values={shareUrl} size={size} value={""} />
			</div>
			<p className='mt-2 text-center text-sm text-gray-500 dark:text-gray-400'>{t("scanToView")}</p>
			<Button variant='outline' size='sm' className='mt-2 text-xs' onClick={generateAndCopyUrl}>
				{copied ? (
					<>
						<Check className='size-3' /> {t("copied")}
					</>
				) : (
					<>
						<Copy className='size-3' /> {t("copyLink")}
					</>
				)}
			</Button>
		</div>
	)
}
