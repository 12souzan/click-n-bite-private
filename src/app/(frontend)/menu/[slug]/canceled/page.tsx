"use client"
import { XCircle, ShoppingCart } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { ROUTES } from "@/next.routes"
import { useTranslations } from "next-intl"

const PaymentCancelled = () => {
	const router = useRouter()

	const { slug } = useParams<{ slug: string }>()

	const t = useTranslations("PaymentCancelled")

	const handleGoToMenu = () => {
		router.push(`${ROUTES.MENU}/${slug}/`)
	}

	return (
		<div className='flex min-h-screen flex-col items-center justify-center bg-white p-4 dark:bg-black'>
			<div className='w-full max-w-[600px] rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-lg backdrop-blur-lg dark:border-white/20 dark:bg-white/10'>
				<div className='mb-6 flex justify-center'>
					<div className='relative'>
						<XCircle className='h-16 w-16 text-red-500 dark:text-red-400' />
						<div className='absolute inset-0 animate-pulse rounded-full bg-red-400/20'></div>
					</div>
				</div>

				<h2 className='mb-2 text-2xl font-bold text-gray-800 dark:text-white'>{t("title")}</h2>
				<p className='mb-6 text-gray-600 dark:text-gray-300'>{t("description")}</p>

				<div className='mb-6 rounded-xl border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-500/20 dark:bg-yellow-500/10'>
					<div className='mb-2 flex items-center justify-center text-yellow-600 dark:text-yellow-400'>
						<span className='font-semibold'>{t("helpTitle")}</span>
					</div>
					<p className='text-sm text-yellow-700 dark:text-yellow-300'>{t("helpDescription")}</p>
				</div>

				<div className='space-y-3'>
					<h4 className='text-sm font-semibold text-gray-600 dark:text-gray-300'>{t("actionTitle")}</h4>

					<button
						onClick={handleGoToMenu}
						className='flex w-full cursor-pointer items-center justify-center rounded-lg bg-gray-600 py-3 text-white transition-all duration-200 hover:bg-gray-700 hover:shadow-md'>
						<ShoppingCart className='mr-2 h-5 w-5' />
						{t("backToMenuButton")}
					</button>
				</div>

				<div className='mt-4 text-xs text-gray-400 dark:text-gray-500'>{t("footerText")}</div>
			</div>
		</div>
	)
}

export default PaymentCancelled
