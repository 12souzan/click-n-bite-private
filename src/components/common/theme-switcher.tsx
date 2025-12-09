"use client"

import { Moon, Sun, Laptop } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"

export const ThemeSwitcher = () => {
	const [mounted, setMounted] = useState(false)

	const { setTheme, theme } = useTheme()

	const t = useTranslations("general.theme")

	// useEffect only runs on the client, so now we can safely show the UI
	useEffect(() => setMounted(true), [])

	if (!mounted) return null

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size='icon'>
					{theme === "light" ? <Sun key='light' /> : theme === "dark" ? <Moon key='dark' /> : <Laptop key='system' />}
					<span className='sr-only'>Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem onClick={() => setTheme("light")} className='flex items-center gap-2'>
					<Sun className='size-4' />
					<span>{t("light")}</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("dark")} className='flex items-center gap-2'>
					<Moon className='size-4' />
					<span>{t("dark")}</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("system")} className='flex items-center gap-2'>
					<Laptop className='size-4' />
					<span>{t("system")}</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
