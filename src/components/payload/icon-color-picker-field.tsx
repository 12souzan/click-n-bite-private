"use client"

import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { useField, useFormFields } from "@payloadcms/ui"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ALLOWED_ICONS, AllowedIconName, ICON_MAP } from "@/features/category/constants"
import { Utensils, Palette } from "lucide-react"
import { cn } from "@/utils/cn"

const IconColorPicker = ({ iconPath, colorPath }: { iconPath: string; colorPath: string }) => {
	const [iconOpen, setIconOpen] = useState(false)

	const [colorOpen, setColorOpen] = useState(false)

	// Icon field
	const { value: iconValue, setValue: setIconValue } = useField({ path: iconPath })

	// Color field
	const { value: colorValue, setValue: setColorValue } = useField<string>({ path: colorPath })

	// Category name for preview
	const nameField = useFormFields(([fields]) => fields.name)

	const categoryName = (nameField?.value as string) || "Category Name"

	const currentColor = colorValue || "#3B82F6"

	const SelectedIcon = ICON_MAP.get(iconValue as AllowedIconName) ?? Utensils

	const predefinedColors = [
		"#EF4444",
		"#F97316",
		"#EAB308",
		"#22C55E",
		"#06B6D4",
		"#3B82F6",
		"#8B5CF6",
		"#EC4899",
		"#6B7280",
		"#1F2937",
		"#DC2626",
		"#059669"
	]

	const handleIconSelect = (iconName: AllowedIconName) => {
		setIconValue(iconName)
		setIconOpen(false)
	}

	const handleColorChange = (newColor: string) => {
		setColorValue(newColor)
	}

	return (
		<div className='space-y-4'>
			{/* Main Controls Row */}
			<div className='flex flex-col flex-wrap items-center gap-4 md:flex-row'>
				{/* Icon Picker */}
				<div>
					<Label className='block pb-[5px] text-[13px] leading-[20px] font-normal text-[var(--theme-elevation-800)]'>
						Select Icon <span className='text-red-500'>*</span>
					</Label>

					<Popover open={iconOpen} onOpenChange={setIconOpen}>
						<PopoverTrigger asChild>
							<Button
								variant='outline'
								type='button'
								className='!h-[65px] !w-56 rounded-[var(--style-radius-s)] border-[var(--theme-elevation-150)] bg-[var(--theme-input-bg)] text-[var(--theme-elevation-800)] hover:border-[var(--theme-elevation-250)] [&>svg]:!size-5'>
								<SelectedIcon />
								<span className='ms-2 text-sm'>Choose Icon</span>
							</Button>
						</PopoverTrigger>

						<PopoverContent
							sideOffset={4}
							side='bottom'
							align='start'
							className='z-50 grid max-h-[200px] w-[250px] grid-cols-5 gap-2 overflow-y-auto rounded-[var(--style-radius-s)] border border-[var(--theme-elevation-150)] bg-[var(--theme-input-bg)] p-2 shadow-xl'>
							{ALLOWED_ICONS.map((iconName) => {
								const Icon = ICON_MAP.get(iconName as AllowedIconName) ?? Utensils

								return (
									<Button
										key={iconName}
										variant='ghost'
										size='icon'
										type='button'
										title={iconName}
										onClick={() => handleIconSelect(iconName)}
										className={cn(
											"!size-14 !border-none bg-neutral-700 hover:bg-neutral-700/80 [&>svg]:!size-5",
											iconValue === iconName && "bg-primary text-white"
										)}>
										<Icon />
									</Button>
								)
							})}
						</PopoverContent>
					</Popover>
				</div>

				{/* Color Picker */}
				<div>
					<Label className='block pb-[5px] text-[13px] leading-[20px] font-normal text-[var(--theme-elevation-800)]'>
						Select Color <span className='text-red-500'>*</span>
					</Label>

					<Popover open={colorOpen} onOpenChange={setColorOpen}>
						<PopoverTrigger asChild>
							<Button
								variant='outline'
								type='button'
								className='flex !h-[65px] !w-56 gap-2 rounded-[var(--style-radius-s)] border-[var(--theme-elevation-150)] bg-[var(--theme-input-bg)] text-[var(--theme-elevation-800)] hover:border-[var(--theme-elevation-250)]'>
								<div className='size-5 rounded border border-gray-300' style={{ backgroundColor: currentColor }} />
								<Palette />
								<span className='text-sm'>Choose Color</span>
							</Button>
						</PopoverTrigger>

						<PopoverContent
							sideOffset={4}
							side='bottom'
							align='start'
							className='z-50 w-[280px] rounded-[var(--style-radius-s)] border border-[var(--theme-elevation-150)] bg-[var(--theme-input-bg)] p-4 shadow-xl'>
							<div className='space-y-4'>
								{/* Color Input */}
								<div className='flex items-center gap-3'>
									<input
										type='color'
										value={currentColor}
										onChange={(e) => handleColorChange(e.target.value)}
										className='h-12 w-12 cursor-pointer rounded border border-gray-300'
									/>
									<Input
										type='text'
										value={currentColor}
										onChange={(e) => handleColorChange(e.target.value)}
										placeholder='#3B82F6'
										className='flex-1 font-mono text-sm'
									/>
								</div>

								{/* Predefined Colors Grid */}
								<div>
									<span className='mb-2 block text-xs text-gray-600'>Quick Colors:</span>
									<div className='grid grid-cols-6 gap-2'>
										{predefinedColors.map((color) => (
											<button
												key={color}
												type='button'
												onClick={() => {
													handleColorChange(color)
													setColorOpen(false)
												}}
												className={cn(
													"h-10 w-10 cursor-pointer rounded border-2 transition-all hover:scale-110",
													currentColor === color ? "border-gray-800 ring-2 ring-gray-400" : "border-gray-300"
												)}
												style={{ backgroundColor: color }}
												title={color}
											/>
										))}
									</div>
								</div>
							</div>
						</PopoverContent>
					</Popover>
				</div>

				{/* Preview Card */}
				<div>
					<Label className='block pb-[5px] text-[13px] leading-[20px] font-normal text-[var(--theme-elevation-800)]'>
						Selected Category Preview
					</Label>

					<div
						className='flex-center h-[65px] w-56 flex-col gap-3 rounded-md p-4'
						style={{ backgroundColor: currentColor }}>
						<SelectedIcon className='size-6 shrink-0 text-white' />

						<span className='text-xs font-medium sm:text-sm sm:leading-[14px]'>{categoryName}</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default IconColorPicker
