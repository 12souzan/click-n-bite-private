import { LazyMotion } from "@/lib/motion/lazy-motion"
import "@/styles/globals.css"
import { POPPINS, KALAM } from "@/next.fonts"
import { DirectionProvider } from "@/providers/direction-provider"
import { getLangDir } from "rtl-detect"
import { ThemeProvider } from "@/providers/theme-provider"
import { ReactQueryProvider } from "@/lib/react-query/provider"
import { Toaster } from "@/components/ui/sonner"
import { NextIntlClientProvider } from "next-intl"
import { cookies } from "next/headers"

// eslint-disable-next-line react-refresh/only-export-components
export { metadata, viewport } from "@/next.metadata"

interface RootLayoutProps {
	children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
	const store = await cookies()

	const locale = store.get("locale")?.value || "en"

	const dir = getLangDir(locale)

	return (
		<html
			lang={locale}
			dir={dir}
			suppressHydrationWarning
			className={`${POPPINS.variable} ${KALAM.variable} antialiased`}>
			<head>
				<meta name='apple-mobile-web-app-title' content='clicknbite' />
			</head>
			<body suppressHydrationWarning>
				<NextIntlClientProvider>
					<DirectionProvider dir={dir}>
						<ThemeProvider>
							<LazyMotion>
								<ReactQueryProvider>{children}</ReactQueryProvider>
							</LazyMotion>

							<Toaster />
						</ThemeProvider>
					</DirectionProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}

// export const generateMetadata = async ({ params }: RootLayoutProps) => {
// 	const { locale } = await params

// 	if (!hasLocale(routing.locales, locale)) notFound()

// 	const t = await getTranslations("app")

// 	return {
// 		title: t("title"),
// 		description: t("subtitle")
// 	}
// }
