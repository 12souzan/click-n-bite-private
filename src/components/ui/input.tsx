import { cn } from "@/utils/cn"
import { LucideIcon } from "lucide-react"

interface InputProps extends React.ComponentProps<"input"> {
	containerClassName?: string
	leftIcon?: LucideIcon
	actionButton?: React.ReactNode
}

export const Input = ({
	"aria-invalid": invalid,
	className,
	containerClassName,
	leftIcon: LeftIcon,
	actionButton,
	...props
}: InputProps) => (
	<div className={cn("group/input-field relative flex items-center", containerClassName)}>
		{LeftIcon && (
			<LeftIcon
				aria-invalid={invalid}
				className={cn(
					"transition-basic group-focus-within/input-field:text-foreground text-muted-foreground pointer-events-none absolute start-3 size-4 shrink-0",
					invalid && "!text-destructive"
				)}
			/>
		)}
		<input
			aria-invalid={invalid}
			data-slot='input'
			className={cn(
				"h-max w-full rounded-md p-2.5 text-sm",
				"file:text-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input transition-basic placeholder:text-muted-foreground autofill:text-muted-foreground flex border bg-transparent !outline-none file:bg-transparent file:text-sm file:font-medium autofill:shadow-[0_0_0px_1000px_#FFFFFF_inset] focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",

				"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-2",
				invalid &&
					"!placeholder:text-destructive !border-destructive !text-destructive !ring-destructive/20 autofill:!text-destructive dark:!text-destructive dark:!placeholder:text-destructive dark:!border-destructive dark:!ring-destructive/40",

				LeftIcon && "ps-10",
				actionButton && "pe-10",
				className
			)}
			{...props}
		/>
		{actionButton && (
			<div className='flex-center absolute inset-y-0 end-3 z-10 size-4 h-full shrink-0'>{actionButton}</div>
		)}
	</div>
)
