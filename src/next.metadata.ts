import type { Metadata, Viewport } from "next"
import { env } from "./constants/env-variables"

const baseUrl = env.NEXT_PUBLIC_SERVER_URL

export const metadata: Metadata = {
	title: "clicknbite | built for the love of food",
	description:
		"With clicknbite, you can create a digital menu for your restaurant, cafe, or bar. It's easy to use, with a custom CMS to manage your menu and data.",
	metadataBase: new URL(baseUrl),
	keywords: [
		"clicknbite",
		"food",
		"menu",
		"restaurant",
		"cafe",
		"bar",
		"digital menu",
		"digital menu builder",
		"digital menu builder for restaurants",
		"digital menu builder for cafes",
		"digital menu builder for bars",
		"cms",
		"content management system",
		"content management system for restaurants",
		"content management system for cafes",
		"content management system for bars"
	],
	// manifest: "/manifest.json",
	alternates: {
		canonical: baseUrl,
		types: {
			"application/json": `${baseUrl}/sitemap.xml`
		}
	},
	openGraph: {
		title: "clicknbite | built for the love of food",
		description:
			"With clicknbite, you can create a digital menu for your restaurant, cafe, or bar. It's easy to use, with a custom CMS to manage your menu and data.",
		siteName: "clicknbite",
		images: [
			{
				alt: "clicknbite | built for the love of food",
				height: 630,
				url: `${baseUrl}/common/click-n-bite-og.png`,
				width: 1200
			}
		],
		type: "website",
		url: baseUrl,
		locale: "en_US"
	}
}

export const viewport: Viewport = {
	themeColor: "#000000",
	initialScale: 1,
	width: "device-width"
}
