export interface SharedBasketResponse {
	id: string
	shareLinkId: string
	createdAt: string
	expiresAt: string
}

export interface BasketCreateRequest {
	totalItems: number
	totalPrice: number
	totalCalories: number
	currency: string
	basketItems: Array<{
		menuItemId: string
		quantity: number
		comment?: string
		price: number
	}>
}

export interface BasketCreateResponse {
	id: string
	totalItems: number
	totalPrice: number
	totalCalories: number
	currency: string
	basketItems: Array<{
		id: string
		menuItemId: string
		menuItemName: string
		categoryId: string
		categoryName: string
		quantity: number
		comment: string
		price: number
	}>
	shareLinkId: string
}

export async function fetchSharedBasket(tenantId: string, linkId: string) {
	const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/${tenantId}/baskets/share/${linkId}`

	try {
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})

		if (!response.ok) {
			const errorText = await response.text()

			console.log("Error response body:", errorText)
			throw new Error(`HTTP ${response.status}: ${response.statusText}. Body: ${errorText}`)
		}

		const data = await response.json()

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const transformedItems = (data.basketItems || []).map((item: any) => {
			return {
				id: item.menuItemId,
				name: item.menuItemName,
				price: item.price || 0,
				calories: item?.calories || 0,
				quantity: item.quantity,
				comment: item.comment || "",
				categoryId: item.categoryId,
				categoryName: item.categoryName || ""
			}
		})

		console.log("transformedItems", transformedItems)
		console.log("data", data)

		return {
			items: transformedItems,
			id: data.id,
			createdAt: data.createdAt,
			createdBy: data.createdBy,
			totalPrice: data.totalPrice
		}
	} catch (error) {
		console.error("Fetch error details:", error)
		throw error
	}
}

export const createBasketAndGetLinkId = async (
	tenantId: string,
	basketData: BasketCreateRequest
): Promise<{ linkId: string; basketId: string }> => {
	try {
		console.log("basket data send to backend:", basketData)
		const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${tenantId}/baskets`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(basketData)
		})

		if (!response.ok) {
			const errorText = await response.text()

			console.error("Error response body:", errorText)
			throw new Error(`Failed to create basket: ${response.statusText}`)
		}

		const data: BasketCreateResponse = await response.json()

		return {
			linkId: data.shareLinkId,
			basketId: data.id
		}
	} catch (error) {
		console.error("Error creating basket:", error)
		throw error
	}
}

export const updateSharedBasket = async (
	tenantId: string,
	linkId: string,
	basketData: BasketCreateRequest
): Promise<BasketCreateResponse> => {
	try {
		console.log("Updating shared basket with linkId:", linkId)
		console.log("Basket data for update:", basketData)

		const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${tenantId}/baskets?shareLinkId=${linkId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(basketData)
		})

		if (!response.ok) {
			const errorText = await response.text()

			console.error("Error response body:", errorText)
			throw new Error(`Failed to update basket: ${response.status} ${response.statusText}`)
		}

		const data: BasketCreateResponse = await response.json()

		console.log("Basket updated successfully:", data)

		return data
	} catch (error) {
		console.error("Error updating shared basket:", error)
		throw error
	}
}
