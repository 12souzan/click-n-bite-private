/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order } from "@/lib/payload/types"
import { DecodedOrderData, ResolvedOrderItem } from "./types"
import { resolveOrderData } from "./utils"
import { getOrderFromLocalStorage, updateLocalStorageOrder } from "../checkout/utils"
import { getSlugFromUrl, getStoreInstance } from "../basket/store"

export const getBasketStore = (restaurantSlug?: string) => {
	const currentSlug = restaurantSlug || getSlugFromUrl()

	return getStoreInstance(currentSlug)
}

export interface ProcessOrderParams {
	orderData: DecodedOrderData & { status?: string }
	menuItems: any[]
	categories: any[]
	tenantId: string
	slug: string
}

export interface OrderPayload {
	tableNumber: string
	totalItems: number
	totalCalories: number
	totalPrice: number
	currency: string
	categories: {
		name: string
		totalItems: number
		totalCalories: number
		totalPrice: number
		items: {
			name: string
			quantity: number
			instructions: string
			totalPrice: number
			totalCalories: number
		}[]
	}[]
}

export const processOrderService = async ({
	orderData,
	menuItems,
	categories,
	tenantId,
	slug
}: ProcessOrderParams): Promise<Order> => {
	const tenantEndpointId = slug === "demo" ? "8e1b5e02-5a52-46f6-9104-d2cf3a4d81b7" : tenantId

	if (orderData.status === "PAID") {
		throw new Error("Order is already paid and cannot be modified")
	}

	if (!tenantEndpointId) {
		throw new Error("Tenant ID not found")
	}

	const resolvedOrder = resolveOrderData({ orderData, menuItems })

	const itemsWithCalories: (ResolvedOrderItem & { calories: number })[] = resolvedOrder.items.map((item) => ({
		...item,
		calories: Math.floor(Math.random() * 500) + 100
	}))

	const itemsByCategory = itemsWithCalories.reduce(
		(acc, item) => {
			if (!acc[item.categoryId]) {
				acc[item.categoryId] = []
			}

			acc[item.categoryId].push(item)

			return acc
		},
		{} as Record<string, typeof itemsWithCalories>
	)

	const orderPayload: OrderPayload = {
		tableNumber: resolvedOrder.tableNumber?.toString() || "22223",
		totalItems: resolvedOrder.totalItems,
		totalCalories: itemsWithCalories.reduce((sum, item) => {
			return sum + item.calories * item.quantity
		}, 0),
		totalPrice: resolvedOrder.totalPrice,
		currency: "USD",
		categories: Object.entries(itemsByCategory).map(([categoryId, categoryItems]) => {
			const category = categories.find((c) => c.id === Number(categoryId))

			return {
				name: category?.name || "Other",
				totalItems: categoryItems.reduce((sum, item) => sum + item.quantity, 0),
				totalCalories: categoryItems.reduce((sum, item) => {
					return sum + item.calories * item.quantity
				}, 0),
				totalPrice: categoryItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
				items: categoryItems.map((item) => ({
					name: item.name,
					quantity: item.quantity,
					instructions: item.comment || "",
					totalPrice: item.price * item.quantity,
					totalCalories: item.calories * item.quantity
				}))
			}
		})
	}

	const storedOrder = getOrderFromLocalStorage(slug)

	const existingOrderId = storedOrder?.state?.orderId

	let url: string

	let method: string

	if (existingOrderId) {
		try {
			const checkResponse = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/tenants/${tenantEndpointId}/orders/${existingOrderId}`
			)

			if (checkResponse.ok) {
				const existingOrder = await checkResponse.json()

				if (existingOrder.status === "PAID") {
					throw new Error("Order is already paid and cannot be modified")
				}
			}
		} catch (error) {
			console.log("Could not check order status, proceeding with update", error)
		}

		url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/tenants/${tenantEndpointId}/orders/${existingOrderId}`
		method = "PUT"
	} else {
		url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/tenants/${tenantEndpointId}/orders`
		method = "POST"
	}

	const response = await fetch(url, {
		method,
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(orderPayload)
	})

	if (!response.ok) {
		if (existingOrderId && response.status === 404) {
			const newUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/tenants/${tenantEndpointId}/orders`

			const newResponse = await fetch(newUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(orderPayload)
			})

			if (!newResponse.ok) {
				throw new Error(`HTTP error! status: ${newResponse.status}`)
			}

			const newOrderResponse = await newResponse.json()

			updateLocalStorageOrder(
				{
					...orderData,
					orderId: newOrderResponse.id,
					status: newOrderResponse.status
				},
				slug
			)

			const basketStore = getBasketStore(slug)

			basketStore.getState().setOrderId(newOrderResponse.id)

			return newOrderResponse
		}

		throw new Error(`HTTP error! status: ${response.status}`)
	}

	const orderResponse = await response.json()

	updateLocalStorageOrder(
		{
			...orderData,
			orderId: orderResponse.id
		},
		slug
	)

	const basketStore = getBasketStore(slug)

	basketStore.getState().setOrderId(orderResponse.id)

	return orderResponse
}
