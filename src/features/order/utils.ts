/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Category, MenuItem } from "@payload-types"
import type { DecodedOrderData, ResolvedOrderData, ResolvedOrderItem } from "./types"
import { BasketCreateRequest, createBasketAndGetLinkId, updateSharedBasket } from "../basket/service"
import { getBasketStore } from "../basket/store"

/**
 * Decodes order data from shared URL
 * @param encodedData - The encoded order data as a string
 * @returns The decoded order data or null if decoding fails
 */
export const decodeOrderData = async (encodedData: string): Promise<DecodedOrderData | null> => {
	try {
		const orderData = JSON.parse(atob(encodedData))

		return orderData
	} catch (error) {
		console.error("Failed to decode order data:", error)

		return null
	}
}

/**
 * Encodes order data for sharing
 * @param orderData - The decoded order data to be encoded
 * @returns The encoded order data as a string
 */
export const encodeOrderData = (orderData: DecodedOrderData): string => btoa(JSON.stringify(orderData))

export const encodeMinimalOrderData = (orderId: string | number | null, tenantId: string): string => {
	return btoa(JSON.stringify({ orderId, tenantId }))
}

/**
 * Resolves order items with menu data
 * @param orderData - The decoded order data to be resolved
 * @returns The resolved order data with menu items to be displayed in the order details
 */

export const resolveOrderData = ({
	orderData,
	menuItems
}: {
	orderData: DecodedOrderData
	menuItems: MenuItem[]
}): ResolvedOrderData => {
	const resolvedItems: ResolvedOrderItem[] = []

	let totalPrice = 0

	let totalItems = 0

	const items = orderData.items || []

	for (const item of items) {
		const menuItem = menuItems.find((mi) => mi.id === item.id)

		if (menuItem) {
			const resolvedItem: ResolvedOrderItem = {
				...item,
				name: menuItem.name,
				price: menuItem.price
			}

			resolvedItems.push(resolvedItem)
			totalPrice += menuItem.price * item.quantity
			totalItems += item.quantity
		}
	}

	return {
		items: resolvedItems,
		totalPrice,
		totalItems,
		tableNumber: orderData.tableNumber
	}
}
/**
 * Gets the order share URL
 * @param orderId - The order ID
 * @param encodedData - The encoded order data
 * @returns The order share URL
 */

export const getOrderShareUrl = async (tenantId: string, basketData?: BasketCreateRequest): Promise<string> => {
	if (typeof window !== "undefined" && basketData) {
		try {
			console.log("tenant id in getOrder share:", tenantId)

			const { linkId: existingLinkId } = getBasketStore().getState()

			let linkId: string

			let basketId: string

			if (existingLinkId) {
				try {
					const updatedBasket = await updateSharedBasket(tenantId, existingLinkId, basketData)

					console.log("updatedBasket:", updatedBasket.shareLinkId)
					console.log("updatedBasket basketId:", updatedBasket.id)
					linkId = updatedBasket.shareLinkId
					basketId = updatedBasket.id
				} catch (updateError) {
					console.error("Failed to update basket, creating new one:", updateError)
					const result = await createBasketAndGetLinkId(tenantId, basketData)

					linkId = result.linkId
					basketId = result.basketId
				}
			} else {
				const result = await createBasketAndGetLinkId(tenantId, basketData)

				linkId = result.linkId
				basketId = result.basketId

				console.log("create linkId:", linkId)
				console.log("create basketId:", basketId)
			}

			if (basketId && linkId) {
				const { setBasketId, setLinkId } = getBasketStore().getState()

				setBasketId(basketId)
				setLinkId(linkId)
			}

			return linkId
		} catch (error) {
			console.error("Failed to process basket via API:", error)

			return ""
		}
	}

	return ""
}

/**
 * Formats order data for WhatsApp sharing
 * @param orderData - The decoded order data to be formatted
 * @returns The formatted order data as a string
 */
export const formatOrderForWhatsApp = ({
	orderData,
	categories,
	menuItems,
	orderUrl
}: {
	orderData: any
	categories: Category[]
	menuItems: MenuItem[]
	orderUrl: string
}): string => {
	const isApiFormat = orderData.categories && Array.isArray(orderData.categories)

	// Building the message
	let message = "*clicknbite - Order Summary*\n\n"

	// Add table number if exists
	if (orderData.tableNumber) {
		message += `*Table #${orderData.tableNumber}*\n\n`
	}

	if (isApiFormat) {
		// Use the API format directly
		orderData.categories.forEach((category: any) => {
			message += `*${category.name}*\n`
			category.items.forEach((item: any) => {
				message += `• ${item.quantity}× ${item.name}: $${item.totalPrice.toFixed(2)}\n`

				if (item.comment) {
					message += `   _Note: ${item.comment}_\n`
				}
			})

			message += "\n"
		})
	} else {
		const resolvedOrder = resolveOrderData({ orderData, menuItems })

		const itemsByCategory = resolvedOrder.items.reduce(
			(acc, item) => {
				if (!acc[item.categoryId]) {
					acc[item.categoryId] = []
				}

				acc[item.categoryId].push(item)

				return acc
			},
			{} as Record<string, typeof resolvedOrder.items>
		)

		Object.entries(itemsByCategory).forEach(([categoryId, items]) => {
			const category = categories.find((c) => c.id === String(categoryId))

			message += `*${category?.name || "Other"}*\n`

			items.forEach((item) => {
				message += `• ${item.quantity}× ${item.name}: $${(item.price * item.quantity).toFixed(2)}\n`

				if (item.comment) {
					message += `   _Note: ${item.comment}_\n`
				}
			})
			message += "\n"
		})
	}

	// Add total
	message += `*Total: $${orderData.totalPrice?.toFixed(2) || "0.00"}*\n\n`

	// Add order link with clear formatting
	message += "*View Your Order*\n"
	message += `_Click the link below_\n`
	message += `${orderUrl}\n\n`

	// Add footer
	message += "Thank you for dining with us!\n"
	message += "Shared from clicknbite Menu App"

	return message
}

export const generateLinkId = (): string => {
	return `${Math.random().toString(36).substr(2, 9)}-${Math.random().toString(36).substr(2, 9)}`
}
