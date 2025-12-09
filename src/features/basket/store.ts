//#region Import
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { encodeOrderData } from "../order/utils"
import type { BasketItem } from "./types"
import { DecodedOrderData } from "../order/types"
import { createSharedBasketStore, SharedBasketStore } from "./shared-store"
//#endregion

export interface BasketStore {
	items: BasketItem[]
	orderId: string | null
	tableNumber: number | null
	basketId: string | null
	linkId: string | null
	addItem: (item: Omit<BasketItem, "quantity" | "comment">, quantity?: number) => void
	removeItem: (itemId: string) => void
	updateQuantity: (itemId: string, quantity: number) => void
	updateItemComment: (itemId: string, comment: string) => void
	clearBasket: () => void
	getTotalPrice: () => number
	getTotalItems: () => number
	getTotalCalories: () => number
	setOrderId: (orderId: string) => void
	getEncodedOrderData: (tableNumber?: number | null) => string | null
	setTableNumber: (tableNumber: number | null) => void
	mergeItems: (itemsToMerge: BasketItem[]) => void
	setBasketId: (basketId: string) => void
	setLinkId: (linkId: string) => void
}

export const createBasketStore = (restaurantSlug: string) => {
	return create<BasketStore>()(
		persist(
			(set, get) => ({
				basketId: null,
				linkId: null,
				items: [],
				orderId: null,
				tableNumber: null,

				addItem: (item) =>
					set(({ items }) => {
						const existingItem = items.find((i) => i.id === item.id)

						if (existingItem) {
							return {
								items: items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
							}
						}

						return {
							items: [...items, { ...item, quantity: 1, comment: "" }]
						}
					}),

				removeItem: (itemId) => set(({ items }) => ({ items: items.filter((item) => item.id !== itemId) })),

				updateQuantity: (itemId, quantity) =>
					set(({ items }) => {
						if (quantity <= 0) {
							return {
								items: items.filter((item) => item.id !== itemId)
							}
						}

						return {
							items: items.map((item) => (item.id === itemId ? { ...item, quantity } : item))
						}
					}),

				updateItemComment: (itemId, comment) =>
					set(({ items }) => ({
						items: items.map((item) => (item.id === itemId ? { ...item, comment } : item))
					})),

				clearBasket: () => set({ items: [], tableNumber: null }),

				getTotalPrice: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),

				getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),

				getTotalCalories: () => {
					return get().items.reduce((total, item) => total + (item.calories || 0) * item.quantity, 0)
				},

				setOrderId: (orderId) => set({ orderId }),

				getEncodedOrderData: (passedTableNumber) => {
					const items = get().items

					const orderId = get().orderId

					const tableNumber = passedTableNumber ?? get().tableNumber

					const orderData: DecodedOrderData = {
						orderId,
						items: items.map((item) => ({
							id: item.id,
							categoryId: item.categoryId,
							quantity: item.quantity,
							comment: item.comment
						})),
						tableNumber
					}

					return encodeOrderData(orderData)
				},

				setTableNumber: (tableNumber) => set({ tableNumber }),

				setBasketId: (basketId: string) => set({ basketId }),

				setLinkId: (linkId: string) => set({ linkId }),

				mergeItems: (itemsToMerge: BasketItem[]) =>
					set(({ items }) => {
						const mergedItems = [...items]

						itemsToMerge.forEach((newItem) => {
							const existingIndex = mergedItems.findIndex((item) => item.id === newItem.id)

							if (existingIndex >= 0) {
								mergedItems[existingIndex] = {
									...mergedItems[existingIndex],
									quantity: mergedItems[existingIndex].quantity + newItem.quantity
								}
							} else {
								mergedItems.push({ ...newItem, comment: "" })
							}
						})

						return { items: mergedItems }
					})
			}),
			{
				name: `clicknbite-basket-${restaurantSlug}`,
				storage: createJSONStorage(() => localStorage),
				partialize: (state) => ({
					basketId: state.basketId,
					linkId: state.linkId,
					items: state.items,
					orderId: state.orderId,
					tableNumber: state.tableNumber
				}),
				version: 1
			}
		)
	)
}

const storeInstances = new Map<string, ReturnType<typeof createBasketStore>>()

const sharedBasketStoreInstances = new Map<string, ReturnType<typeof createSharedBasketStore>>()

export const getSlugFromUrl = () => {
	if (typeof window !== "undefined") {
		const pathSegments = window.location.pathname.split("/").filter(Boolean)

		return pathSegments[1]
	}

	return "default"
}

export const getStoreInstance = (restaurantSlug?: string) => {
	const currentSlug = restaurantSlug || getSlugFromUrl()

	if (!storeInstances.has(currentSlug)) {
		storeInstances.set(currentSlug, createBasketStore(currentSlug))
	}

	return storeInstances.get(currentSlug)!
}

export const getBasketStore = (restaurantSlug?: string) => {
	const currentSlug = restaurantSlug || getSlugFromUrl()

	return getStoreInstance(currentSlug)
}

export const useBasketStore = <T>(selector: (state: BasketStore) => T): T => {
	const store = getStoreInstance()

	return store(selector)
}

export const getSharedBasketStoreInstance = (restaurantSlug?: string) => {
	const currentSlug = restaurantSlug || getSlugFromUrl()

	if (!sharedBasketStoreInstances.has(currentSlug)) {
		sharedBasketStoreInstances.set(currentSlug, createSharedBasketStore(currentSlug))
	}

	return sharedBasketStoreInstances.get(currentSlug)!
}

export const useSharedBasketStore = <T>(selector: (state: SharedBasketStore) => T): T => {
	const store = getSharedBasketStoreInstance()

	return store(selector)
}
