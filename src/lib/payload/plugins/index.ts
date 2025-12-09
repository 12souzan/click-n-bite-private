//#region Import
import type { Tenant } from "@payload-types"
import type { GenerateTitle, GenerateURL } from "@payloadcms/plugin-seo/types"
import type { Plugin } from "payload"

import { getServerSideURL } from "@/utils/getURL"
import { seoPlugin } from "@payloadcms/plugin-seo"
// import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob"
import { customTenantPlugin } from "./custom-tenant-plugin"
//#end region

const generateTitle: GenerateTitle<Tenant> = ({ doc }) => {
	return doc?.name ? `${doc.name} | Bistro` : "Bistro"
}

const generateURL: GenerateURL<Tenant> = ({ doc }) => {
	const url = getServerSideURL()

	return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
	seoPlugin({ generateTitle, generateURL }),
	customTenantPlugin(["categories", "menu-items", "media", "contact-settings", "external-orders"])
	// ...(process.env.BLOB_READ_WRITE_TOKEN
	// 	? [
	// 			vercelBlobStorage({
	// 				collections: { ["media"]: true },
	// 				token: process.env.BLOB_READ_WRITE_TOKEN || ""
	// 			})
	// 		]
	// 	: [])
]
