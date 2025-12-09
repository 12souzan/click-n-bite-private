import CheckoutSelection from "@/features/checkout/components/checkout-selection"
import { fetchTenantData } from "@/features/menu/service"

export default async function CheckoutSelectionPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params

	const response = await fetchTenantData(slug)

	if (response.tenantId === undefined) {
		throw new Error("tenantId is required but was not provided")
	}

	return <CheckoutSelection slug={slug} tenantData={response} tenantId={response.tenantId} />
}
