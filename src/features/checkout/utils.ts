import { DecodedOrderData } from "../order/types"

export interface LocalStorageOrder {
	state: DecodedOrderData
	version: number
}

export type PaymentMethod = "card" | "cash" | "whish"

export const getOrderFromLocalStorage = (slug: string = "demo"): LocalStorageOrder | null => {
	if (typeof window === "undefined") return null

	try {
		const orderData = localStorage.getItem(`clicknbite-basket-${slug}`)

		if (!orderData) return null

		return JSON.parse(orderData)
	} catch (error) {
		console.error("Failed to parse order data from localStorage:", error)

		return null
	}
}

export const updateLocalStorageOrder = (
	orderData: DecodedOrderData & { orderId?: string },
	slug: string = "demo"
): void => {
	if (typeof window === "undefined") return

	try {
		const storedData = getOrderFromLocalStorage(slug)

		if (!storedData) {
			const newOrder: LocalStorageOrder = {
				state: {
					items: orderData.items || [],
					orderId: orderData.orderId || null,
					tableNumber: orderData.tableNumber
				},
				version: 1
			}

			localStorage.setItem(`clicknbite-basket-${slug}`, JSON.stringify(newOrder))

			return
		}

		storedData.state.items = orderData.items || []
		storedData.state.orderId = orderData.orderId || storedData.state.orderId
		storedData.state.tableNumber = orderData.tableNumber
		storedData.version = (storedData.version || 0) + 1

		localStorage.setItem(`clicknbite-basket-${slug}`, JSON.stringify(storedData))
	} catch (error) {
		console.error("Failed to update order in localStorage:", error)
	}
}

// export const clearOrderSession = (slug: string = "demo"): void => {
// 	if (typeof window === "undefined") return

// 	try {
// 		localStorage.removeItem(`clicknbite-basket-${slug}`)
// 	} catch (error) {
// 		console.error("Failed to clear order from localStorage:", error)
// 	}
// }
