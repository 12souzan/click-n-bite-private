import { Category } from "@/lib/payload/types"

export interface OrderItem {
	id: string
	name?: string
	price?: number
	categoryId: string
	quantity: number
	comment: string
	calories?: number
}

export interface DecodedOrderData {
	items: OrderItem[]
	tableNumber?: number | null
	orderId: string | null
	status?: string
	orderNumber?: number | null
	categories?: Category[]
	basketId?: string | null
}

export interface ResolvedOrderItem extends OrderItem {
	name: string
	price: number
}

export interface ResolvedOrderData {
	items: ResolvedOrderItem[]
	totalPrice: number
	totalItems: number
	tableNumber?: number | null
}
