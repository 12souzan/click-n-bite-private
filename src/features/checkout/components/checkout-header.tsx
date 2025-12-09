/* eslint-disable @typescript-eslint/no-explicit-any */
import { FetchedTenantData } from "@/features/menu/types"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useTranslations } from "next-intl"

interface CheckoutHeaderProps extends FetchedTenantData {
	onGoBack: () => void
	orderData: any
}

export const CheckoutHeader = ({ orderData, onGoBack }: CheckoutHeaderProps) => {
	const t = useTranslations("checkout")

	return (
		<div className='mx-3 flex items-center justify-between'>
			<Button
				variant='outline'
				onClick={onGoBack}
				className={`flex items-center gap-2 rounded-lg border-gray-300 bg-white/80 px-1 py-0 transition-all duration-200 dark:border-none dark:bg-transparent`}>
				<ArrowLeft className='h-4 w-4' />
			</Button>
			{orderData?.tableNumber && (
				<div className='flex items-center gap-2 py-2'>
					<span className='text-[14px] font-medium text-gray-600 dark:text-gray-300'>{t("table")} :</span>
					<span className='text-[14px] font-semibold text-gray-800 dark:text-white'>{orderData.tableNumber}</span>
				</div>
			)}
		</div>
	)
}
