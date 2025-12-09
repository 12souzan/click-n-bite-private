"use client"

//#region Import
import { useCallback } from "react"
import { Check, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { getClientLocale } from "@/lib/i18n/get-client-locale"
//#endregion

export const LanguageSwitcher = () => {
	const currentLocale = getClientLocale()

	const onSelectChange = useCallback((locale: string) => {
		if (typeof window !== "undefined") {
			document.cookie = `locale=${locale}; path=/`
			window.location.reload()
		}
	}, [])

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size='icon'>
					<Globe />
					<span className='sr-only'>Switch language</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='space-y-1'>
				{locales.map(({ code, flag, label }) => (
					<DropdownMenuItem
						key={code}
						data-active={code === currentLocale}
						onClick={() => onSelectChange(code)}
						className='text-muted-foreground data-[active=true]:text-foreground flex cursor-pointer items-center justify-between gap-2 data-[active=true]:cursor-default data-[active=true]:bg-purple-200/60 data-[active=true]:font-bold'>
						<span className='flex items-center gap-2'>
							<span className='w-5 text-center'>{flag}</span>
							<span>{label}</span>
						</span>

						{code === currentLocale && <Check className='size-4 text-purple-500' />}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

const locales = [
	{ code: "en", flag: "🇺🇸", label: "English" },
	{ code: "ar", flag: "🇸🇦", label: "العربية" }
]
