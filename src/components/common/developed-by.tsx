import Link from "next/link"
import { CuboidIcon as Cube } from "lucide-react"
import { cn } from "@/utils/cn"
import { contactInfo } from "@/data/landing"
import { useTranslations } from "next-intl"

interface DevelopedByProps {
	className?: string
}

export const DevelopedBy = ({ className }: DevelopedByProps) => {
	const t = useTranslations("landing.application.footer")

	return (
		<div className={cn("flex flex-col items-center", className)}>
			<p className='text-sm text-gray-500 dark:text-gray-400'>
				{t("allRightsReserved", { year: new Date().getFullYear() })}
			</p>
			<p className='mt-1 inline-flex items-center gap-1.5 text-xs'>
				<span className='text-muted-foreground'>{t("developedBy")}</span>
				<Link
					href={contactInfo.poweredBy}
					target='_blank'
					rel='noopener noreferrer'
					className='transition-basic flex items-center gap-1 text-teal-600 hover:text-blue-700 dark:text-teal-400 dark:hover:text-blue-300'>
					<Cube className='mt-1 size-3' />
					<span className='border-animate text-current'>socialcube.ai</span>
				</Link>
			</p>
		</div>
	)
}
