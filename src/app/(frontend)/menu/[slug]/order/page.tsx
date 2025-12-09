import { fetchTenantData } from "@/features/menu/service"
import { Order } from "./order"
import { fetchTenantContact } from "@/features/contact/service"

export default async function OrderPage({ params }: { params: Promise<{ id: string; slug: string }> }) {
	const { id, slug } = await params

	const response = await fetchTenantData(slug)

	let whatsappNumber = null

	try {
		const { contactInfo } = await fetchTenantContact(slug)

		whatsappNumber = contactInfo?.whatsapp
	} catch (err) {
		console.log("Error fetching whatsapp number: ", err)
		whatsappNumber = null
	}

	return <Order id={id} whatsappNumber={whatsappNumber} {...response} tenantId={response.tenantId} />
}
