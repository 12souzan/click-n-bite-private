export type TenantUser = {
	tenant?: string | { id: string }
	role: "super-admin" | "user"
	email?: string
}

export interface OrderItem {
	id: number
	name: string
	quantity: number
	instructions: string
	totalPrice: number
	totalCalories: number
}

export interface Category {
	id: number
	name: string
	totalItems: number
	totalCalories: number
	totalPrice: number
	items: OrderItem[]
}

export interface Order {
	id: number
	tenantId: string
	status: string
	paymentMethod: string | null
	formattedTotalPrice: string
	orderNumber: string | null
	tableNumber: string
	totalItems: number
	totalCalories: number
	totalPrice: number
	currency: string
	items: OrderItem[]
	categories: Category[]
	createdAt: string
	updatedAt: string
	customerName?: string
	customerEmail?: string
	customerPhone?: string
}
