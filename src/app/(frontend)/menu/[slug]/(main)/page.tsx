import { MenuDisplay } from "@/features/menu/components/menu-display"
import { CategoriesHeader } from "@/features/category/components/categories-header"
import { fetchTenantData } from "@/features/menu/service"
import { Basket } from "@/features/basket/components/basket"
import { fetchSharedBasket } from "@/features/basket/service"

interface MenuPageProps {
	params: Promise<{ slug: string }>
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function MenuPage({ params, searchParams }: MenuPageProps) {
	const { slug } = await params

	const resolvedSearchParams = await searchParams

	const linkId = resolvedSearchParams.linkId as string | undefined

	const hasLinkId = !!linkId

	const { categories, menuItems, tenantId } = await fetchTenantData(slug)

	let sharedBasketItems = undefined

	if (hasLinkId && linkId) {
		try {
			const sharedBasket = await fetchSharedBasket(tenantId, linkId)

			sharedBasketItems = sharedBasket.items
		} catch (error) {
			console.log("API failed, using dummy data as fallback", error)
			sharedBasketItems = []
		}
	}

	return (
		<>
			<CategoriesHeader categories={categories} />

			<section className='custom-container relative z-10 flex flex-grow flex-col gap-6 py-6'>
				<MenuDisplay menuItems={menuItems} />
			</section>

			<Basket
				slug={slug}
				categories={categories}
				menuItems={menuItems}
				tenantId={tenantId}
				initialItems={sharedBasketItems}
			/>
		</>
	)
}
