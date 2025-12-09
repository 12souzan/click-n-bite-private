import { FetchedTenantData } from "@/features/menu/types"
import { DecodedOrderData } from "@/features/order/types"
import { resolveOrderData } from "@/features/order/utils"
import { useTranslations } from "next-intl"

interface OrderSummaryProps extends FetchedTenantData {
	orderData: DecodedOrderData
}
export const OrderSummary = ({ orderData, menuItems }: OrderSummaryProps) => {
	const t = useTranslations("checkout.orderSummary")

	const displayData = resolveOrderData({ orderData, menuItems: menuItems || [] })

	return (
		<div className='relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50 px-6 py-3 dark:border-gray-700 dark:from-gray-900 dark:to-gray-800 dark:shadow-gray-900/50'>
			<div className='absolute -top-4 -right-4 h-24 w-24 rounded-full bg-blue-200/30 blur-xl dark:bg-blue-900/20'></div>
			<div className='absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-purple-200/30 blur-xl dark:bg-purple-900/20'></div>
			<div className='space-y-4'>
				<div className='flex items-center justify-between'>
					<span className='text-[16px] font-semibold text-gray-600 dark:text-gray-300'>{t("total")}:</span>
					<span className='text-xl font-bold text-black dark:text-white'>${displayData.totalPrice.toFixed(2)}</span>
				</div>
			</div>
			<div className='flex items-center justify-between pt-1'>
				<span className='text-[14px] font-semibold text-gray-800 dark:text-white'>
					{displayData.totalItems} {t("item", { count: displayData.totalItems })}
				</span>
			</div>
		</div>
	)
}
