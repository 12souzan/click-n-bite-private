import { getPayload } from "@/lib/payload/utils"
import type { ContactSetting, TenantsSelect } from "@payload-types"
import { notFound } from "next/navigation"
import { demoContactInfo } from "@/data/demo"

export const fetchTenantContact = async (slug: string): Promise<ContactSetting> => {
	if (slug === "demo") return demoContactInfo as ContactSetting

	const payload = await getPayload()

	const tenantResult = await payload.find({
		collection: "tenants",
		where: { slug: { equals: slug } },
		select: { id: true } as unknown as TenantsSelect<true>,
		depth: 1,
		limit: 1
	})

	if (!tenantResult || !tenantResult.docs.length) notFound()

	const tenant = tenantResult.docs[0]

	const contactRes = await payload.find({
		collection: "contact-settings",
		where: { tenant: { equals: tenant.id } },
		limit: 1
	})

	if (!contactRes || !contactRes.docs.length) notFound()

	return contactRes.docs[0]
}
