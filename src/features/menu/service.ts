import { getPayload } from "@/lib/payload/utils"
import type { Category, MenuItem, TenantsSelect } from "@payload-types"
import { notFound } from "next/navigation"
import type { FetchedTenantData } from "./types"
import { demoCategories, demoMenuItems } from "@/data/demo"

export const fetchTenantData = async (slug: string): Promise<FetchedTenantData> => {
	if (slug === "demo") {
		return {
			categories: demoCategories as Category[],
			menuItems: demoMenuItems as MenuItem[],
			tenantId: "8e1b5e02-5a52-46f6-9104-d2cf3a4d81b7"
		}
	}

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

	const [categoriesRes, menuItemsRes] = await Promise.all([
		payload.find({
			collection: "categories",
			where: { tenant: { equals: tenant.id }, and: [{ _status: { equals: "published" } }] },
			sort: "order",
			limit: 100,
			depth: 2
		}),
		payload.find({
			collection: "menu-items",
			where: { tenant: { equals: tenant.id }, and: [{ _status: { equals: "published" } }] },
			limit: 100,
			// depth: 1
			depth: 2
		})
	])

	return {
		tenantId: tenant.id.toString(),
		categories: categoriesRes.docs,
		menuItems: menuItemsRes.docs
	}
}
