import type { NextConfig } from "next"
import { withPayload } from "@payloadcms/next/withPayload"
import createNextIntlPlugin from "next-intl/plugin"
import redirects from "./redirects"

const withNextIntl = createNextIntlPlugin()

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
	? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
	: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"

const nextConfig: NextConfig = {
	compiler: {
		removeConsole: {
			exclude: process.env.NODE_ENV === "production" ? ["error"] : ["error", "warn", "info", "log"]
		}
	},
	images: {
		remotePatterns: [
			...[NEXT_PUBLIC_SERVER_URL].map((item) => {
				const url = new URL(item)

				return {
					hostname: url.hostname,
					protocol: url.protocol.replace(":", "")
				}
			}),
			{ hostname: "images.unsplash.com", protocol: "https" }
		]
	} as NextConfig["images"],
	reactStrictMode: true,
	unoptimized: true,
	redirects
}

const configWithIntl = withNextIntl(nextConfig)

export default withPayload(configWithIntl, { devBundleServerPackages: false })
