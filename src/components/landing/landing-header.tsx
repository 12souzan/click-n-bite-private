"use client"

//#region Import
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, MessageCircle } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import AppLogo from "../common/logo"
import { LanguageSwitcher } from "../common/language-switcher"
import { ThemeSwitcher } from "../common/theme-switcher"
import { navLinks } from "@/data/landing"
import { ROUTES } from "@/next.routes"
import { cn } from "@/utils/cn"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { CalendlyButton } from "../common/calendly-button"
import { useTranslations } from "next-intl"
//#endregion

export function LandingHeader() {
	const t = useTranslations("landing.application")

	const pathname = usePathname()

	const isHome = pathname === "/"

	return (
		<header
			className={cn(
				"sticky top-0 z-50 bg-white shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-white/80 dark:bg-gray-900 supports-[backdrop-filter]:dark:bg-gray-900/80",
				isHome ? "h-20" : "h-16"
			)}>
			<div className='custom-container flex h-full items-center justify-between'>
				<AppLogo />

				{/* Desktop Navigation */}
				<div className='hidden items-center gap-4 md:flex lg:gap-6'>
					<div className='flex items-center gap-4 lg:gap-6'>
						{navLinks.map((link) => (
							<Link key={link.href} href={link.href} className='border-animate'>
								{t(link.label)}
							</Link>
						))}
					</div>

					<div className='flex items-center gap-2'>
						<ThemeSwitcher />
						<LanguageSwitcher />
					</div>
					<div className='flex items-center gap-2.5'>
						<Button asChild variant='outline'>
							<Link href={ROUTES.CONTACT}>{t("actions.contact")}</Link>
						</Button>
						<Button asChild variant='gradient'>
							<Link href={ROUTES.DEMO}>{t("actions.demo")}</Link>
						</Button>
					</div>
				</div>
				<Sheet>
					<SheetTrigger className='cursor-pointer md:hidden' asChild>
						<Button variant='ghost' size='icon' className='!size-10'>
							<Menu className='!size-6' />
							<span className='sr-only'>Menu</span>
						</Button>
					</SheetTrigger>

					<SheetContent side='right' className='w-full sm:max-w-xs'>
						<VisuallyHidden>
							<SheetHeader>
								<SheetTitle>Clicknbite Mobile Menu</SheetTitle>
							</SheetHeader>
						</VisuallyHidden>

						<div className='flex flex-col gap-6'>
							<div className='border-border flex items-center border-b px-2.5 py-4'>
								<AppLogo />
							</div>

							<div className='px-4 md:hidden'>
								<div className='flex flex-col gap-4'>
									{navLinks.map((link) => (
										<Link key={link.href} href={link.href} className='border-animate'>
											{t(link.label)}
										</Link>
									))}

									<div className='flex-center mt-6 gap-4'>
										<ThemeSwitcher />
										<LanguageSwitcher />
									</div>

									<div className='flex flex-col gap-3'>
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
							</div>
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	)
}
