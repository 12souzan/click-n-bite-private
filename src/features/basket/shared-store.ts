import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import type { BasketItem } from "./types"

export interface SharedBasketStore {
	items: BasketItem[]
	setItems: (items: BasketItem[]) => void
	updateQuantity: (itemId: string, quantity: number) => void
	removeItem: (itemId: string) => void
	getTotalPrice: () => number
	getTotalItems: () => number
	getTotalCalories: () => number
}

export const createSharedBasketStore = (restaurantSlug: string) => {
	return create<SharedBasketStore>()(
		persist(
			(set, get) => ({
				items: [],
				setItems: (items) => set({ items }),

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

				removeItem: (itemId) =>
					set(({ items }) => ({
						items: items.filter((item) => item.id !== itemId)
					})),

				getTotalPrice: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
				getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
				getTotalCalories: () => get().items.reduce((total, item) => total + (item.calories || 0) * item.quantity, 0)
			}),
			{
				name: `clicknbite-shared-basket-${restaurantSlug}`,
				storage: createJSONStorage(() => localStorage),
				version: 1
			}
		)
	)
}
