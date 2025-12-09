//#region Import
// import type { Tenant} from "@payload-types"
import type { Metadata } from "next"
// import type { OpenGraphType } from "next/dist/lib/metadata/types/opengraph-types"

// import { getServerSideURL } from "./getURL"
// import { mergeOpenGraph } from "./mergeOpenGraph"
//#endregion

// type Doc = Partial<Tenant>

// export const generateMeta = async ({ defaultSeo, doc }: { defaultSeo?: DefaultSeo; doc: Doc }): Promise<Metadata> => {
export const generateMeta = async (): Promise<Metadata> => {
	// const ogImage =
	// 	typeof doc?.meta?.image === "object" && doc.meta.image !== null && "url" in doc.meta.image
	// 		? `${getServerSideURL()}`
	// 		: defaultSeo?.openGraph?.images?.[0]?.url || ""

	// const title = doc?.meta?.title ? doc?.meta?.title + " | Bistro Website" : defaultSeo?.title || "Bistro Website"

	// return {
	// 	description: doc?.meta?.description ?? defaultSeo?.description ?? "Default description",
	// 	keywords: (defaultSeo?.keywords as string[]) || ["default", "keywords"],
	// 	openGraph: mergeOpenGraph({
	// 		description: doc?.meta?.description ?? defaultSeo?.openGraph?.description ?? "Default OpenGraph description",
	// 		images: ogImage
	// 			? [{ url: ogImage }]
	// 			: defaultSeo?.openGraph?.images?.map(({ url }) => ({ url })) || [{ url: "default-image-url" }],
	// 		locale: defaultSeo?.openGraph?.locale || "en_US",
	// 		siteName: (defaultSeo?.openGraph?.site_name as string) || "Default Site Name",
	// 		title,
	// 		type: (defaultSeo?.openGraph?.type as OpenGraphType) || "website",
	// 		url: Array.isArray(doc?.slug) ? doc?.slug.join("/") : (defaultSeo?.openGraph?.url ?? "/")
	// 	}),
	// 	robots: defaultSeo?.robots || "index,follow",
	// 	title,
	// 	twitter: {
	// 		card: defaultSeo?.twitter?.card || "summary",
	// 		creator: (defaultSeo?.twitter?.creator as string) || "@defaultCreator",
	// 		description:
	// 			defaultSeo?.twitter?.description ??
	// 			doc?.meta?.description ??
	// 			defaultSeo?.description ??
	// 			"Default Twitter description",
	// 		images: defaultSeo?.twitter?.images || [{ url: "default-twitter-image-url" }],
	// 		site: defaultSeo?.twitter?.site || "@defaultSite",
	// 		title: defaultSeo?.twitter?.title ?? title
	// 	} as Metadata["twitter"],
	// 	...defaultSeo?.additionalMetaTags
	// }

	return {
		title: "Bistro Restaurant"
	}
}
