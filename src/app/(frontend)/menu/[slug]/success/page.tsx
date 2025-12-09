import { fetchTenantData } from "@/features/menu/service"
import { fetchTenantContact } from "@/features/contact/service"
import SuccessPaymentClient from "./success"

export default async function SuccessPaymentPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params

	const response = await fetchTenantData(slug)

	let whatsappNumber = null

	try {
		const { contactInfo } = await fetchTenantContact(slug)

		console.log("contactInfo", contactInfo)

		whatsappNumber = contactInfo?.whatsapp
	} catch (err) {
		console.log("Error fetching whatsapp number: ", err)
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		whatsappNumber = null
	}

	return <SuccessPaymentClient tenantId={response.tenantId} />
}
