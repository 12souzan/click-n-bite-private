import { DollarSign } from "lucide-react"
import React from "react"
import { useTranslations } from "next-intl"

interface SuccessDetailsProps {
	orderNumber: number
	tableNumber: string | number
	status: string
}

const SuccessDetails: React.FC<SuccessDetailsProps> = ({ orderNumber, tableNumber, status }) => {
	const t = useTranslations("SuccessPayment")

	return (
		<div className='relative mb-8 overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-blue-50 p-6 shadow-sm dark:border-gray-600 dark:from-gray-700/20 dark:to-gray-800/50'>
			<div className='absolute top-0 right-0 h-16 w-16 rounded-bl-3xl bg-gradient-to-bl from-green-500/10 to-transparent'></div>

			<h3 className='mb-5 flex items-center justify-center text-xl font-semibold text-gray-800 dark:text-white'>
				{t("orderDetails")}
			</h3>

			<div className='space-y-4'>
				<div className='flex flex-row items-center justify-between border-b border-gray-100 py-2 dark:border-gray-700'>
					<span className='font-medium text-gray-600 dark:text-gray-300'>{t("orderNumber")}:</span>
					<span className='rounded-lg border border-gray-200 bg-white px-3 py-1 font-mono font-semibold text-gray-800 shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white'>
						{orderNumber}
					</span>
				</div>

				<div className='flex items-center justify-between border-b border-gray-100 py-2 dark:border-gray-700'>
					<span className='font-medium text-gray-600 dark:text-gray-300'>{t("tableNumber")}:</span>
					<span className='rounded-lg border border-gray-200 bg-white px-3 py-1 font-semibold text-gray-800 shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white'>
						{tableNumber}
					</span>
				</div>

				<div className='flex items-center justify-between py-2'>
					<span className='font-medium text-gray-600 dark:text-gray-300'>{t("status")}:</span>
					<span className='flex items-center gap-1.5 rounded-lg border border-green-200 bg-gradient-to-br from-green-100 to-emerald-100 p-2 font-semibold text-green-500 shadow-inner drop-shadow-md dark:border-green-800/30 dark:from-green-900/30 dark:to-emerald-900/20 dark:text-green-400'>
						<DollarSign className='h-4 w-4' />
						{status}
					</span>
				</div>
			</div>
		</div>
	)
}

export default SuccessDetails
