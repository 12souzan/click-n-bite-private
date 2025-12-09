import { cn } from "@/utils/cn"
import { cva, VariantProps } from "class-variance-authority"
import { LucideIcon } from "lucide-react"

interface SectionBadgeProps extends VariantProps<typeof badgeVariants> {
	icon: LucideIcon
	children: React.ReactNode
	className?: string
}

const badgeVariants = cva("mb-6 inline-flex items-center gap-2 rounded-full border  px-4 py-2 ", {
	variants: {
		variant: {
			gradient:
				"text-blue-600 dark:text-blue-200 border-blue-200 dark:border-blue-700 bg-gradient-to-br rtl:bg-gradient-to-bl from-white via-blue-100 to-pink-200 dark:from-blue-900 dark:via-blue-800 dark:to-purple-900 animate-gradient-background",
			orange:
				"bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-900"
		}
	},
	defaultVariants: {
		variant: "gradient"
	}
})

export const SectionBadge = ({ icon: Icon, children, className, variant }: SectionBadgeProps) => (
	<div className={cn(badgeVariants({ variant }), className)}>
		<Icon className='size-4' />
		<span className='text-sm font-medium'>{children}</span>
	</div>
)
