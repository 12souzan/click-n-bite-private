import { CheckCircle, CreditCard, DollarSign } from "lucide-react"
import { PaymentMethod } from "../utils"
import Image from "next/image"
import { useTranslations, useLocale } from "next-intl"

interface PaymentCardProps {
	method: PaymentMethod
	isSelected: boolean
	isProcessing: boolean
	onClick: () => void
}

const PaymentCard = ({ method, isSelected, isProcessing, onClick }: PaymentCardProps) => {
	const t = useTranslations("checkout.card.method")

	const locale = useLocale()

	const isRTL = locale === "ar"

	const getMethodDetails = () => {
		switch (method) {
			case "card":
				return {
					icon: CreditCard,
					label: t("card.label"),
					description: t("card.description"),
					selectedClass:
						"border-blue-400 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/20 shadow-lg shadow-blue-200/50 dark:shadow-blue-800/20",
					iconClass: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white",
					animation: "animate-pulse-slow"
				}
			case "whish":
				return {
					icon: "/payment/whish.png",
					label: t("whish.label"),
					description: t("whish.description"),
					selectedClass:
						"border-[#eb0045] bg-gradient-to-br from-[#f03a6f] to-[#eb0045] dark:from-[#f03a6f] dark:to-[#eb0045] shadow-lg shadow-purple-200/50 dark:shadow-purple-800/20",
					iconClass: "bg-gradient-to-r from-[#f03a6f] to-[#eb0045] text-white",
					animation: "animate-bounce-slow"
				}
			case "cash":
				return {
					icon: DollarSign,
					label: t("cash.label"),
					description: t("cash.description"),
					selectedClass:
						"border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/20 shadow-lg shadow-green-200/50 dark:shadow-green-800/20",
					iconClass: "bg-gradient-to-r from-green-500 to-emerald-600 text-white",
					animation: "animate-ping-slow"
				}
			default:
				return {
					icon: CreditCard,
					label: method,
					description: t("default"),
					selectedClass:
						"border-gray-400 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-lg shadow-gray-200/50 dark:shadow-gray-800/20",
					iconClass: "bg-gradient-to-r from-gray-500 to-gray-600 text-white",
					animation: ""
				}
		}
	}

	const { icon: Icon, label, description, iconClass } = getMethodDetails()

	const isImageIcon = typeof Icon === "string"

	return (
		<button
			onClick={onClick}
			disabled={isProcessing}
			className={`group relative flex w-full cursor-pointer items-center gap-4 overflow-hidden rounded-2xl border-2 p-5 transition-all duration-300 ${
				isSelected
					? ``
					: "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-500"
			} ${isProcessing ? "cursor-not-allowed opacity-70" : ""} ${isRTL ? "flex-row-reverse" : "row"}`}>
			{isSelected && (
				<div
					className={`absolute ${isRTL ? "top-2 left-2" : "top-2 right-2"} flex h-5 w-5 items-center justify-center rounded-full bg-blue-500`}>
					<CheckCircle className='h-4 w-4 text-white' />
				</div>
			)}

			<div
				className={`absolute inset-0 bg-gradient-to-r from-transparent to-white/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:to-gray-900/30 ${
					isSelected ? "opacity-100" : ""
				} ${isRTL ? "-scale-x-100 transform" : ""}`}></div>

			<div className={`rounded-xl p-3 ${iconClass} relative z-10`}>
				{isImageIcon ? (
					<Image src={Icon} alt={label} width={32} height={32} className='h-8 w-8' />
				) : (
					<Icon className='h-8 w-8' />
				)}
			</div>

			<div className={`relative z-10 flex-1 ${isRTL ? "text-right" : "text-left"}`}>
				<h3 className='font-semibold text-gray-800 dark:text-white'>{label}</h3>
				<p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>{description}</p>
			</div>
		</button>
	)
}

export default PaymentCard
