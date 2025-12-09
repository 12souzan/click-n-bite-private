"use client"

//#region Import
import { useState } from "react"
import { MotionDiv } from "../motion/motion-div"
import { Check, CreditCard } from "lucide-react"
import { Button } from "../ui/button"
import { SectionBadge } from "./section-badge"
import { slideUpVariants } from "@/lib/motion/configs"
import { cn } from "@/utils/cn"
import { annualDiscount, annualPrice, basePrice } from "@/constants/pricing"
import { pricingPlanFeatures } from "@/data/landing"
import { ROUTES } from "@/next.routes"
import { useTranslations } from "next-intl"
//#endregion

export const PricingSection = () => {
	const t = useTranslations("landing.pricing")

	const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly")

	const handlePricingSelect = (cycle: "monthly" | "annually") => {
		const plan = cycle === "monthly" ? "Professional Monthly" : "Professional Annual"

		window.location.href = `${ROUTES.CONTACT}?plan=${encodeURIComponent(plan)}`
	}

	return (
		<section id='pricing' className='py-20'>
			<div className='custom-container'>
				<div className='mb-16 text-center'>
					<SectionBadge icon={CreditCard}>{t("sectionBadge")}</SectionBadge>

					<h2 className='text-foreground mb-4 text-3xl font-bold md:text-4xl'>{t("title")}</h2>
					<p className='text-muted-foreground mx-auto mb-8 max-w-3xl text-xl'>{t("description")}</p>

					{/* Billing Toggle */}
					<div className='mb-8 inline-flex items-center gap-1 rounded-lg bg-gray-200/70 p-1 dark:bg-gray-800'>
						<button
							onClick={() => setBillingCycle("monthly")}
							data-active={billingCycle === "monthly"}
							className={cn(
								"transition-basic text-muted-foreground hover:bg-background/80 data-[active=true]:bg-background data-[active=true]:text-foreground cursor-pointer rounded-md px-6 py-2 text-sm font-medium data-[active=true]:cursor-default data-[active=true]:shadow-sm"
							)}>
							{t("billingCycle.monthly")}
						</button>
						<button
							onClick={() => setBillingCycle("annually")}
							data-active={billingCycle === "annually"}
							className={cn(
								"transition-basic text-muted-foreground hover:bg-background/50 data-[active=true]:bg-background data-[active=true]:text-foreground relative cursor-pointer rounded-md px-6 py-2 text-sm font-medium data-[active=true]:cursor-default data-[active=true]:shadow-sm"
							)}>
							{t("billingCycle.annually")}
							<span className='absolute -end-3 -top-3.5 rounded-full bg-green-500 px-2 py-0.5 text-xs text-white'>
								{t("billingCycle.discount", { discount: annualDiscount * 100 })}
							</span>
						</button>
					</div>
				</div>

				<MotionDiv
					{...slideUpVariants}
					className='bg-background/40 relative mx-auto max-w-lg overflow-hidden rounded-2xl p-8 shadow-xl'>
					{/* Background gradient */}
					<div className='absolute start-0 top-0 h-2 w-full bg-gradient-to-r from-blue-600 to-purple-600 rtl:bg-gradient-to-l'></div>

					<div className='mb-8 text-center'>
						<h3 className='text-foreground mb-2 text-2xl font-bold'>{t("plan.title")}</h3>
						<p className='text-muted-foreground mb-6'>{t("plan.description")}</p>

						<div className='mb-2 flex items-baseline justify-center'>
							<span className='text-foreground text-5xl font-bold'>
								{t.rich("plan.price", {
									price: billingCycle === "monthly" ? basePrice : Math.round(annualPrice / 12),
									span: (chunks) => <span className='text-muted-foreground ms-2 text-base font-normal'>{chunks}</span>
								})}
							</span>
						</div>

						{billingCycle === "annually" && (
							<p className='text-sm font-medium text-green-600 dark:text-green-400'>
								{t.rich("plan.discount", {
									price: annualPrice,
									discount: Math.round(basePrice * 12 - annualPrice)
								})}
							</p>
						)}
					</div>

					<ul className='mb-8 space-y-4'>
						{pricingPlanFeatures.map((feature, index) => (
							<li key={index} className='flex items-center'>
								<Check className='me-3 size-5 flex-shrink-0 text-green-500' />
								<span className='text-muted-foreground'>{t(feature)}</span>
							</li>
						))}
					</ul>

					<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
						<Button
							onClick={() => handlePricingSelect("monthly")}
							variant='outline'
							className='w-full py-6 text-lg'
							disabled={billingCycle !== "monthly"}>
							{billingCycle === "monthly"
								? t("plan.actions.monthly.getStarted")
								: t("plan.actions.monthly.switchToMonthly")}
						</Button>
						<Button
							onClick={() => handlePricingSelect("annually")}
							className='w-full bg-gradient-to-r from-blue-600 to-purple-600 py-6 text-lg hover:from-blue-700 hover:to-purple-700 rtl:bg-gradient-to-l'
							disabled={billingCycle !== "annually"}>
							{billingCycle === "annually"
								? t("plan.actions.annually.getStarted")
								: t("plan.actions.annually.switchToAnnual")}
						</Button>
					</div>

					<p className='mt-4 text-center text-sm text-gray-500 dark:text-gray-400'>{t("footerMessage")}</p>
				</MotionDiv>
			</div>
		</section>
	)
}
