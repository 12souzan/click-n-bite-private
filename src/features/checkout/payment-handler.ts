import { getBasketStore } from "../basket/store"
import { DecodedOrderData } from "../order/types"
import { updateOrderStatus } from "./update-order"
import { getOrderFromLocalStorage } from "./utils"
import { ROUTES } from "@/next.routes"

interface StripePayload {
	successUrl: string
	cancelUrl: string
	tenantId: string
	orderId: string
}

interface WhishPayload {
	amount: number
	currency: string
	invoice: string
	externalId: number
	successRedirectUrl: string
	failureRedirectUrl: string
	orderId: string
	tenantId: string
}

export const calculateOrderTotal = (order: DecodedOrderData): number => {
	return order.items.reduce((total, item) => {
		return total + (item.price || 0) * item.quantity
	}, 0)
}

/**
 * Handle payment based on selected method
 */
export const handlePayment = async (
	method: "card" | "cash" | "whish",
	slug: string,
	tenantId?: string
): Promise<boolean> => {
	const localStorageOrder = getOrderFromLocalStorage(slug)

	if (!localStorageOrder) {
		console.error("No order found in localStorage")

		return false
	}

	const order = localStorageOrder.state as DecodedOrderData

	if (!order || !order.orderId) {
		console.error("Invalid order structure or missing orderId")

		return false
	}

	try {
		let success = false

		if (method === "card") {
			success = await handleStripePayment(order, slug, tenantId)
		} else if (method === "whish") {
			const totalPrice = calculateOrderTotal(order)

			success = await handleWhishPayment(totalPrice, order.orderId, tenantId, slug)
		} else if (method === "cash") {
			success = await handleCashPayment()
		}

		if (success) {
			const paymentMethodMap = {
				card: "CREDIT_CARD" as const,
				cash: "CASH" as const,
				whish: "WHISH" as const
			}

			const mappedMethod = paymentMethodMap[method]

			try {
				if (tenantId !== undefined && order.orderId) {
					await updateOrderStatus(order.orderId, tenantId, mappedMethod)
				} else {
					console.warn("tenantId or orderId is undefined, skipping order status update")
				}
			} catch (error) {
				console.warn("Order status update failed, but continuing with payment success", error)
			}

			try {
				const basketStore = getBasketStore(slug)

				basketStore.getState().clearBasket()
			} catch (error) {
				console.warn("Failed to clear basket, but payment was successful:", error)
			}
		}

		return success
	} catch (error) {
		console.error("Payment process failed:", error)
		throw error
	}
}

/**
 * Handle Stripe payment
 */
const handleStripePayment = async (order: DecodedOrderData, slug?: string, tenantId?: string): Promise<boolean> => {
	try {
		const restaurantSlug = slug || "default"

		if (!order.orderId || !tenantId) {
			throw new Error("Order ID and Tenant ID are required for Stripe payment")
		}

		const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin

		const successUrl = `${baseUrl}/${restaurantSlug}/success`

		const cancelUrl = `${baseUrl}/${restaurantSlug}/canceled`

		const payload: StripePayload = {
			successUrl: successUrl,
			cancelUrl: cancelUrl,
			orderId: order.orderId,
			tenantId: tenantId
		}

		const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stripe/create-checkout-session`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload)
		})

		if (!response.ok) {
			const errorText = await response.text()

			console.error("❌ Stripe backend returned error:", response.status, errorText)
			throw new Error(`Stripe backend error: ${response.status} - ${errorText}`)
		}

		const session = await response.json()

		const checkoutUrl = session.checkoutUrl || session.url

		if (!checkoutUrl) {
			console.error("No checkout URL returned from Stripe backend. Response:", session)
			throw new Error("No checkout URL received from Stripe")
		}

		window.location.href = checkoutUrl

		return true
	} catch (err) {
		console.error("Stripe payment flow failed:", err)
		throw err
	}
}

/**
 * Handle Whish payment
 */

const handleWhishPayment = async (
	totalPrice: number,
	orderId: string | null,
	tenantId?: string,
	slug?: string
): Promise<boolean> => {
	try {
		if (!tenantId) {
			throw new Error("Tenant ID is required for Whish payment")
		}

		const restaurantSlug = slug || "default"

		const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin

		const successRedirectUrl = `${baseUrl}${ROUTES.MENU}/${restaurantSlug}/success?orderId=${orderId}&tenantId=${tenantId}`

		const failureRedirectUrl = `${baseUrl}${ROUTES.MENU}/${restaurantSlug}/canceled?orderId=${orderId}&tenantId=${tenantId}`

		const payload: WhishPayload = {
			amount: totalPrice,
			currency: "USD",
			invoice: `order-${orderId || Date.now()}`,
			externalId: 1155,
			successRedirectUrl: successRedirectUrl,
			failureRedirectUrl: failureRedirectUrl,
			orderId: orderId || `temp-${Date.now()}`,
			tenantId: tenantId
		}

		const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/whish/create-checkout-session`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload)
		})

		if (!response.ok) {
			const errorText = await response.text()

			console.error("❌ WHISH backend returned error:", response.status, errorText)
			throw new Error(`WHISH backend error: ${response.status} - ${errorText}`)
		}

		const session = await response.json()

		if (session.status === true && session.data === null) {
			console.error("WHISH request succeeded but returned null data. Check backend logs.")
			throw new Error("WHISH payment setup failed - no checkout URL generated")
		}

		if (!session.data?.collectUrl) {
			console.error("No checkout URL returned from WHISH backend. Full response:", session)
			throw new Error("No WHISH checkout URL received")
		}

		window.location.href = session.data.collectUrl

		return true
	} catch (err) {
		console.error("WHISH Payment flow failed:", err)
		throw err
	}
}

/**
 * Handle Cash payment
 */
const handleCashPayment = async (): Promise<boolean> => {
	return true
}

export type PaymentMethod = "card" | "cash" | "whish"
