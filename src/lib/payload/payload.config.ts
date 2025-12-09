//#region Import
import { getServerSideURL } from "@/utils/getURL"
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres"
import path from "path"
import { buildConfig, type PayloadRequest, type SharpDependency } from "payload"
import sharp from "sharp"
import { fileURLToPath } from "url"
import { defaultLexical } from "./fields/defaultLexical"
import { Media } from "./collections/media"
import { plugins } from "./plugins"
import { Categories } from "./collections/categories"
import { MenuItems } from "./collections/menu-items"
import { locales, defaultLocale } from "@/lib/i18n"
import { Tenants } from "./collections/tenants"
import { Users } from "./collections/users"
import { ContactSettings } from "./collections/contact-settings"
import ExternalOrders from "./collections/external-orders"
//#endregion

const filename = fileURLToPath(import.meta.url)

const dirname = path.dirname(filename)

export default buildConfig({
	admin: {
		components: {
			beforeDashboard: ["@/components/payload/before-dashboard"],
			beforeLogin: ["@/components/payload/before-login"],
			graphics: {
				Logo: "@/components/common/logo"
				// Icon: "@/components/payload/icon"
			}
		},
		importMap: {
			baseDir: path.resolve(dirname)
		},
		livePreview: {
			breakpoints: [
				{
					height: 667,
					label: "Mobile",
					name: "mobile",
					width: 375
				},
				{
					height: 1024,
					label: "Tablet",
					name: "tablet",
					width: 768
				},
				{
					height: 900,
					label: "Desktop",
					name: "desktop",
					width: 1440
				}
			]
		},
		user: Users.slug
	},
	collections: [Media, Users, Categories, MenuItems, Tenants, ContactSettings, ExternalOrders],
	cors: [getServerSideURL()].filter(Boolean),
	db: vercelPostgresAdapter({
		pool: {
			connectionString: process.env.POSTGRES_URL || ""
		},
		idType: "uuid"
	}),
	editor: defaultLexical,
	endpoints: [],
	globals: [],
	localization: {
		locales,
		defaultLocale,
		fallback: true
	},
	plugins,
	secret: process.env.PAYLOAD_SECRET!,
	sharp: sharp as SharpDependency,
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts")
	},
	jobs: {
		access: {
			run: ({ req }: { req: PayloadRequest }): boolean => {
				// Allow logged in users to execute this endpoint (default)
				if (req.user) return true

				// If there is no logged in user, then check
				// for the Vercel Cron secret to be present as an
				// Authorization header:
				const authHeader = req.headers.get("authorization")

				return authHeader === `Bearer ${process.env.CRON_SECRET}`
			}
		},
		tasks: []
	}
})
