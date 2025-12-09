import { ThemeSwitcher } from "../common/theme-switcher"
import AppLogo from "@/components/common/logo"
import { LanguageSwitcher } from "../common/language-switcher"

export const TenantHeader = () => (
	<header className='bg-background sticky top-0 z-20'>
		<div className='custom-container flex items-center justify-between py-4'>
			<AppLogo />

			<div className='flex items-center gap-2.5'>
				<ThemeSwitcher />
				<LanguageSwitcher />
			</div>
		</div>
	</header>
)
