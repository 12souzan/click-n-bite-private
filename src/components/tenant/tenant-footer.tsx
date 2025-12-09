"use client"

import { Mail } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DevelopedBy } from "../common/developed-by"
import { ROUTES } from "@/next.routes"
import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"

export const TenantFooter = () => {
	const t = useTranslations("landing.application")

	const { slug } = useParams<{ slug: string }>()

	return (
		<footer className='border-border bg-foreground/5 border-t py-5'>
			<div className='custom-container'>
				<div className='flex-center flex-col gap-4'>
					<Button
						variant='outline'
						asChild
						className='border-blue-200 text-blue-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/30 dark:hover:text-blue-300'>
						<Link href={`${slug}${ROUTES.CONTACT}`} className='flex items-center gap-2'>
							<Mail />
							{t("actions.contact")}
						</Link>
					</Button>

					<DevelopedBy />
				</div>
			</div>
		</footer>
	)
}
