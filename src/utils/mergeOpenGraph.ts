//#region Import
import type { Metadata } from "next"

import { getServerSideURL } from "./getURL"
//#endregion

const defaultOpenGraph: Metadata["openGraph"] = {
	description: "Bistro is a restaurant that serves delicious food for you",
	images: [{ url: `${getServerSideURL()}/default-OG.webp` }],
	siteName: "Bistro",
	title: "Bistro",
	type: "website"
}

export const mergeOpenGraph = (og?: Metadata["openGraph"]): Metadata["openGraph"] => {
	return {
		...defaultOpenGraph,
		...og,
		images: og?.images ? og.images : defaultOpenGraph?.images
	}
}
