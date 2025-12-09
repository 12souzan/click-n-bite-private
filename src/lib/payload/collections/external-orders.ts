import { CollectionConfig } from "payload"

const ExternalOrders: CollectionConfig = {
	slug: "external-orders",
	admin: {
		components: {
			beforeListTable: [
				{
					path: "@/components/payload/orders.tsx"
				}
			]
		}
	},
	access: {
		read: () => true,
		create: () => false,
		update: () => true,
		delete: () => false
	},
	fields: []
}

export default ExternalOrders
