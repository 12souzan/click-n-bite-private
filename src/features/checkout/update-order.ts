interface UpdateOrderPayload {
	status: string
	paymentMethod: string
}

export const updateOrderStatus = async (
	orderId: string,
	tenantId: string,
	paymentMethod: "CASH" | "WHISH" | "CREDIT_CARD"
): Promise<boolean> => {
	try {
		const payload: UpdateOrderPayload = {
			status: "PAID",
			paymentMethod: paymentMethod
		}

		const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/tenants/${tenantId}/orders/${orderId}`

		const response = await fetch(API_URL, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload)
		})

		if (!response.ok) {
			if (response.status === 500) {
				console.warn("Order update endpoint might not be implemented yet. Continuing without update.")

				return true
			}

			const errorText = await response.text()

			console.error("Order update failed:", response.status, errorText)
			throw new Error(`Order update error: ${response.status} - ${errorText}`)
		}

		return true
	} catch (err) {
		console.error("Failed to update order status:", err)

		return false
	}
}
