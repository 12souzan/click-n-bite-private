import { Order } from "@/lib/payload/types"
import { DecodedOrderData } from "./types"

export const fetchOrderById = async (tenantId: string, orderId: string): Promise<DecodedOrderData> => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tenants/${tenantId}/orders/${orderId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})

		if (!response.ok) {
			throw new Error(`Failed to fetch order: ${response.status} ${response.statusText}`)
		}

		const order = await response.json()

		return order
	} catch (error) {
		console.error("Error fetching order:", error)
		throw error
	}
}

/**
 * Fetches all orders for a tenant
 * @param tenantId - The tenant ID
 * @returns Promise with array of orders
 */
export const fetchAllOrders = async (tenantId: string): Promise<Order[]> => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tenants/${tenantId}/orders`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})

		if (!response.ok) {
			throw new Error(`Failed to fetch orders: ${response.status} ${response.statusText}`)
		}

		const orders = await response.json()

		return orders
	} catch (error) {
		console.error("Error fetching orders:", error)
		throw error
	}
}
