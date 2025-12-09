"use client"

//#region Import
import { cn } from "@/utils/cn"
import {
	Content,
	Group,
	Icon,
	Item,
	ItemIndicator,
	ItemText,
	Portal,
	Root,
	ScrollDownButton,
	ScrollUpButton,
	Trigger,
	Value,
	Viewport
} from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"
//#endregion

interface SelectProps<T> extends Omit<React.ComponentProps<typeof Root>, "value" | "onValueChange" | "className"> {
	invalid?: boolean
	options: { disabled?: boolean; label: React.ReactNode | string; value: T }[]
	placeholder?: string
	position?: React.ComponentProps<typeof Content>["position"]
	value?: T
	onValueChange: (value: T) => void
	classNames?: {
		placeholder?: string
		trigger?: string
		content?: string
		item?: string
	}
}

/**
 * @description A select component that allows the user to select an option from a list.
 * @param invalid - Whether the select is invalid.
 * @param options - The options to display in the select.
 * @param placeholder - The placeholder text to display in the select.
 * @param position - The position of the select.
 * @param className - The className of the select.
 * @param value - The value of the select.
 * @param onValueChange - The function to call when the value changes.
 * @example
 * 	```tsx
 * 	<Select
 * 		invalid={!!formState.errors.color}
 * 		onValueChange={field.onChange}
 * 		options={Options}
 * 		placeholder='Select an option'
 * 		value={field.value || ""}
 * 	/>
 * 	```
 */
export const Select = <T,>({
	invalid,
	options,
	placeholder,
	position = "popper",
	classNames,
	value,
	onValueChange,
	...props
}: SelectProps<T>) => (
	<Root {...props} value={value as string} onValueChange={onValueChange as (value: string) => void}>
		<Trigger
			className={cn(
				"border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				invalid && "border-destructive",
				value && "border-blue-600 bg-blue-50/70 dark:border-blue-400 dark:bg-blue-900/20",
				classNames?.trigger
			)}>
			{!value ? (
				<p className={cn("text-muted-foreground", classNames?.placeholder)}>{placeholder}</p>
			) : (
				<Value placeholder={placeholder} />
			)}
			<Icon asChild>
				<ChevronDownIcon className='size-4 opacity-50' />
			</Icon>
		</Trigger>

		<Portal>
			<Content
				className={cn(
					"bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
					classNames?.content,
					position === "popper" &&
						"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1"
				)}
				position={position}>
				<ScrollUpButton className='flex cursor-default items-center justify-center py-1'>
					<ChevronUpIcon className='size-4' />
				</ScrollUpButton>
				<Viewport
					className={cn(
						"p-1",
						position === "popper" &&
							"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
					)}>
					<Group className='space-y-0.5'>
						{options.map((option) => (
							<Item
								className={cn(
									"focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-pointer items-center gap-2 rounded-sm py-1.5 ps-2 pe-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
									classNames?.item
								)}
								disabled={option?.disabled}
								key={option.value as string}
								value={option.value as string}>
								<span className='flex-center absolute end-2 size-3.5'>
									<ItemIndicator>
										<CheckIcon className='size-4' />
									</ItemIndicator>
								</span>
								<ItemText>{option.label}</ItemText>
							</Item>
						))}
					</Group>
				</Viewport>

				<ScrollDownButton className='flex cursor-default items-center justify-center py-1'>
					<ChevronDownIcon className='size-4' />
				</ScrollDownButton>
			</Content>
		</Portal>
	</Root>
)
