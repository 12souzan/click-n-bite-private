import { MotionDiv } from "@/components/motion/motion-div"
import { PaymentMethod } from "../utils"
import PaymentCard from "./payment-card"
import { useTranslations } from "next-intl"

interface PaymentMethodsProps {
	methods: PaymentMethod[]
	selectedMethod: PaymentMethod | null
	isProcessing: boolean
	onSelectMethod: (method: PaymentMethod) => void
}

export const PaymentMethods = ({ methods, selectedMethod, isProcessing, onSelectMethod }: PaymentMethodsProps) => {
	const t = useTranslations("checkout.card.method")

	return (
		<div className='relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-6 dark:border-gray-700 dark:from-gray-900 dark:to-gray-800 dark:shadow-gray-900/50'>
			<div className='absolute -top-4 -right-4 h-24 w-24 rounded-full bg-blue-200/30 blur-xl dark:bg-blue-900/20'></div>
			<div className='absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-purple-200/30 blur-xl dark:bg-purple-900/20'></div>

			<div className='flex flex-col'>
				<div className='py-4 text-center'>
					<h1 className='text-2xl font-bold text-gray-800 dark:text-white'>{t("title")}</h1>
					<p className='mt-1 text-sm text-gray-600 dark:text-gray-300'>{t("subtitle")}</p>
				</div>
			</div>

			<div className='relative z-10 grid grid-cols-1 gap-2'>
				{methods.map((method) => (
					<PaymentCard
						key={method}
						method={method}
						isProcessing={isProcessing}
						isSelected={selectedMethod === method}
						onClick={() => onSelectMethod(method)}
					/>
				))}
			</div>

			{isProcessing && (
				<MotionDiv
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					className='mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4 text-center backdrop-blur-sm dark:border-blue-700 dark:bg-blue-900/20'>
					<div className='flex items-center justify-center gap-3 text-blue-600 dark:text-blue-300'>
						<div className='h-5 w-5 animate-spin rounded-full border-b-2 border-blue-600 dark:border-blue-300'></div>
						<span className='font-medium'>{t("Processing")}</span>
					</div>
				</MotionDiv>
			)}
		</div>
	)
}
