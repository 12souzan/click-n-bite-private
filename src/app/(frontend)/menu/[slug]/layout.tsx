import { TenantFooter } from "@/components/tenant/tenant-footer"
import { TenantHeader } from "@/components/tenant/tenant-header"

export default function TenantLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className='bg-background relative flex min-h-screen flex-col'>
			<TenantHeader />
			{children}
			<TenantFooter />
		</main>
	)
}
