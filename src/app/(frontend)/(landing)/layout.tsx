import { LandingFooter } from "@/components/landing/landing-footer"
import { LandingHeader } from "@/components/landing/landing-header"

export default function LandingLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className='flex min-h-screen flex-col bg-gradient-to-br from-blue-50 to-purple-50 rtl:bg-gradient-to-bl dark:from-gray-900 dark:to-gray-800'>
			<LandingHeader />
			{children}
			<LandingFooter />
		</main>
	)
}
