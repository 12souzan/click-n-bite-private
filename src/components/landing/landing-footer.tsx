import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import AppLogo from "../common/logo"
import { DevelopedBy } from "../common/developed-by"
import { ROUTES } from "@/next.routes"
import { legalLinks, navLinks } from "@/data/landing"
import { CalendlyButton } from "../common/calendly-button"
import { useTranslations } from "next-intl"

export const LandingFooter = () => {
	const t = useTranslations("landing.application")

	return (
		<footer className='border-border/60 relative border-t bg-gradient-to-br from-gray-50 to-white pt-16 pb-8 rtl:bg-gradient-to-bl dark:from-gray-900 dark:to-gray-800'>
			<div className='bg-grid-gray-100/50 dark:bg-grid-gray-800/50 absolute inset-0 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]' />

			<div className='custom-container relative space-y-12'>
				<div className='grid gap-12 lg:grid-cols-12'>
					<div className='space-y-2 lg:col-span-5'>
						<AppLogo />
						<p className='text-muted-foreground max-w-md text-sm sm:text-base'>{t("footer.logoDescription")}</p>

						{/* CTA Buttons */}
						<div className='mx-auto !mt-8 flex max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row'>
							<Button asChild variant='gradient'>
								<Link href={ROUTES.CONTACT}>
									<MessageCircle />
									{t("actions.contact")}
								</Link>
							</Button>

							<CalendlyButton />

							<Button asChild variant='outline' className='hover:border-primary hover:text-primary border-2'>
								<Link href={ROUTES.DEMO}>
									<span>🎯</span>
									{t("actions.demo")}
								</Link>
							</Button>
						</div>
					</div>

					<div className='grid grid-cols-2 gap-8 lg:col-span-4 lg:col-start-8'>
						<div className='space-y-4'>
							<h4 className='text-foreground text-lg font-semibold'>{t("footer.columns.product")}</h4>
							<nav className='flex flex-col gap-3'>
								{navLinks.map(({ label, href }) => (
									<Link href={href} key={label} className='text-muted-foreground hover:text-foreground border-animate'>
										{t(label)}
									</Link>
								))}
							</nav>
						</div>

						<div className='space-y-4'>
							<h4 className='text-foreground text-lg font-semibold'>{t("footer.columns.legal")}</h4>
							<nav className='flex flex-col gap-3'>
								{legalLinks.map(({ label, href }) => (
									<Link href={href} key={label} className='text-muted-foreground hover:text-foreground border-animate'>
										{t(label)}
									</Link>
								))}
							</nav>
						</div>
					</div>
				</div>

				<DevelopedBy className='border-border/50 border-t pt-8' />
			</div>
		</footer>
	)
}
