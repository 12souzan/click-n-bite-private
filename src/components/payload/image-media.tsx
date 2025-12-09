"use client"

//#region Import
import type { StaticImageData } from "next/image"

import cssVariables from "@/cssVariables"
import { getClientSideURL } from "@/utils/getURL"
import NextImage from "next/image"

import { placeholderBlur } from "@/constants/general"
import type { Media } from "@payload-types"
import { useMemo, useState } from "react"
//#endregion

const { breakpoints } = cssVariables

export interface MediaProps {
	alt?: string
	className?: string
	fill?: boolean // for NextImage only
	loading?: "eager" | "lazy" // for NextImage only
	onClick?: () => void
	priority?: boolean // for NextImage only
	resource?: Media | null | number | string
	sizes?: string // for NextImage only
	src?: StaticImageData // for static media
}

export const ImageMedia = ({
	alt: altFromProps,
	className,
	fill,
	loading: loadingFromProps = "lazy",
	onClick,
	priority,
	resource,
	sizes: sizesFromProps,
	src: srcFromProps
}: MediaProps) => {
	const [isError, setIsError] = useState(false)

	const { src, width, height, alt } = useMemo(() => {
		if (srcFromProps) {
			return {
				src: srcFromProps,
				width: undefined, // Let NextImage handle it for StaticImageData
				height: undefined,
				alt: altFromProps || "image"
			}
		}

		// if (resource && typeof resource === "object") {
		// 	const { alt: altFromResource, height: fullHeight, url, width: fullWidth } = resource

		// 	console.log("resource image:", resource)
		// 	console.log("url:", url)
		// 	console.log("${getClientSideURL()}${url}:", `${getClientSideURL()}${url}`)

		// 	return {
		// 		// src: process.env.NODE_ENV === "production" ? `${getClientSideURL()}${url}` : url,
		// 		src: process.env.NODE_ENV === "production" ? `${getClientSideURL()}${url}` : url,
		// 		width: fullWidth || undefined,
		// 		height: fullHeight || undefined,
		// 		alt: altFromResource || altFromProps || ""
		// 	}
		// }
		if (resource && typeof resource === "object") {
			const { alt: altFromResource, height: fullHeight, url, width: fullWidth } = resource

			console.log("resource image:", resource)
			console.log("url:", url)

			let imageUrl = url

			if (url && url.startsWith("/api/media/file/")) {
				imageUrl = url.replace("/api/media/file/", "/media/")
			}

			console.log("Final image URL:", `${getClientSideURL()}${imageUrl}`)

			return {
				src: process.env.NODE_ENV === "production" ? `${getClientSideURL()}${imageUrl}` : imageUrl,
				width: fullWidth || undefined,
				height: fullHeight || undefined,
				alt: altFromResource || altFromProps || ""
			}
		}

		return {
			src: "/placeholder.svg",
			width: 200,
			height: 200,
			alt: altFromProps || "placeholder"
		}
	}, [srcFromProps, resource, altFromProps])

	const imageSrc = isError ? "/placeholder.svg" : src

	const imageWidth = isError ? 200 : width

	const imageHeight = isError ? 200 : height

	// NOTE: this is used by the browser to determine which image to download at different screen sizes
	const sizes = useMemo(
		() =>
			sizesFromProps ||
			Object.entries(breakpoints)
				.map(([, value]) => `(max-width: ${value}px) ${value}px`)
				.join(", "),
		[sizesFromProps]
	)

	return (
		<picture>
			<NextImage
				alt={alt}
				blurDataURL={placeholderBlur}
				className={className}
				fill={fill}
				height={!fill ? imageHeight : undefined}
				loading={loadingFromProps}
				onClick={onClick}
				placeholder='blur'
				priority={priority}
				quality={100}
				sizes={sizes}
				src={imageSrc as string}
				width={!fill ? imageWidth : undefined}
				onError={() => setIsError(true)}
				unoptimized={true}
			/>
		</picture>
	)
}
