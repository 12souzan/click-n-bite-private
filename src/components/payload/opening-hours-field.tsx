"use client"

import React, { useCallback, useMemo } from "react"
import { useField } from "@payloadcms/ui"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, Copy } from "lucide-react"
import { format, addMinutes, startOfDay } from "date-fns"
import { Badge } from "../ui/badge"

interface OpeningHour {
	days: string
	openingTime: string
	closingTime: string
}

export default function OpeningHoursField({ path }: { path: string }) {
	const { value, setValue } = useField<OpeningHour[]>({ path })

	const openingHours = useMemo(() => value || [], [value])

	const addOpeningHour = useCallback(() => setValue([...openingHours, newHour]), [openingHours, setValue])

	const updateOpeningHour = useCallback(
		(index: number, field: keyof OpeningHour, newValue: string) => {
			const updated = [...openingHours]

			updated[index] = { ...updated[index], [field]: newValue }
			setValue(updated)
		},
		[openingHours, setValue]
	)

	const removeOpeningHour = useCallback(
		(index: number) => {
			const updated = openingHours.filter((_, i) => i !== index)

			setValue(updated)
		},
		[openingHours, setValue]
	)

	const duplicateOpeningHour = useCallback(
		(index: number) => {
			const toDuplicate = openingHours[index]

			setValue([...openingHours, { ...toDuplicate }])
		},
		[openingHours, setValue]
	)

	return (
		<div className='space-y-4'>
			<div className='flex items-center justify-between'>
				<Label className='text-[13px] leading-[20px] font-normal text-[var(--theme-elevation-800)]'>
					Opening Hours <span className='text-red-500'>*</span>
				</Label>
			</div>

			<Tabs defaultValue='manual' className='w-full'>
				<TabsList className='grid !h-12 w-full grid-cols-2 gap-1.5 bg-neutral-200 dark:bg-neutral-700'>
					<TabsTrigger
						className='transition-basic cursor-pointer rounded-md !bg-[var(--theme-input-bg)] !text-white hover:border-[var(--theme-elevation-250)] focus-visible:border-blue-500 focus-visible:ring-blue-500/50 focus-visible:outline-blue-500 data-[state=active]:cursor-default data-[state=active]:!bg-white data-[state=active]:!text-neutral-900'
						value='manual'>
						⚙️ Manual Setup
					</TabsTrigger>
					<TabsTrigger
						className='transition-basic cursor-pointer rounded-md !bg-[var(--theme-input-bg)] !text-white hover:border-[var(--theme-elevation-250)] focus-visible:border-blue-500 focus-visible:ring-blue-500/50 focus-visible:outline-blue-500 data-[state=active]:cursor-default data-[state=active]:!bg-white data-[state=active]:!text-neutral-900'
						value='templates'>
						📅 Templates
					</TabsTrigger>
				</TabsList>

				{/* Manual Setup */}
				<TabsContent value='manual' className='space-y-4'>
					<Button
						className='transition-basic ms-auto !h-12 w-max rounded-[var(--style-radius-s)] border !border-[var(--theme-elevation-150)] !bg-[var(--theme-input-bg)] !text-[var(--theme-elevation-800)] hover:border-[var(--theme-elevation-250)] [&>svg]:!size-5'
						type='button'
						onClick={addOpeningHour}
						size='sm'
						disabled={openingHours.length >= 7}>
						<Plus className='me-1 size-3' />
						Add Hours
					</Button>

					{/* Opening Hours List */}
					<div className='space-y-3'>
						{openingHours.map((hour, index) => (
							<div
								key={index}
								className='!bg-[var(--theme-input-bg)]p-4 rounded-lg border !border-[var(--theme-elevation-150)] shadow-sm'>
								<div className='grid grid-cols-1 items-end gap-4 p-4 md:grid-cols-4'>
									{/* Days Selection */}
									<div>
										<Label className='block pb-[5px] text-[13px] leading-[20px] font-normal text-[var(--theme-elevation-800)]'>
											Days <span className='text-red-500'>*</span>
										</Label>
										<Select
											classNames={selectClassNames}
											options={DAYS_OPTIONS}
											placeholder='Select Days'
											value={hour.days}
											onValueChange={(value) => updateOpeningHour(index, "days", value)}
										/>
									</div>

									{/* Opening Time */}
									<div>
										<Label className='block pb-[5px] text-[13px] leading-[20px] font-normal text-[var(--theme-elevation-800)]'>
											Opening Time <span className='text-red-500'>*</span>
										</Label>
										<Select
											classNames={selectClassNames}
											options={TIME_OPTIONS.slice(0, 36)}
											placeholder='Select Opening Time'
											value={hour.openingTime}
											onValueChange={(value) => updateOpeningHour(index, "openingTime", value)}
										/>
									</div>

									{/* Closing Time */}
									<div>
										<Label className='block pb-[5px] text-[13px] leading-[20px] font-normal text-[var(--theme-elevation-800)]'>
											Closing Time <span className='text-red-500'>*</span>
										</Label>
										<Select
											classNames={selectClassNames}
											options={TIME_OPTIONS.slice(24)}
											placeholder='Select Closing Time'
											value={hour.closingTime}
											onValueChange={(value) => updateOpeningHour(index, "closingTime", value)}
										/>
									</div>

									{/* Actions */}
									<div className='flex gap-1'>
										<Button
											type='button'
											size='sm'
											onClick={() => duplicateOpeningHour(index)}
											className='transition-basic size-9 rounded-[var(--style-radius-s)] border !border-[var(--theme-elevation-150)] !bg-[var(--theme-input-bg)] p-0 !text-[var(--theme-elevation-800)] hover:border-[var(--theme-elevation-250)]'
											title='Duplicate'>
											<Copy className='size-3' />
										</Button>
										<Button
											type='button'
											variant='outline'
											size='sm'
											onClick={() => removeOpeningHour(index)}
											className='transition-basic size-9 rounded-[var(--style-radius-s)] border !border-[var(--theme-elevation-150)] !bg-[var(--theme-input-bg)] p-0 text-red-600 hover:border-[var(--theme-elevation-250)] hover:text-red-700'
											title='Remove'
											disabled={openingHours.length === 1}>
											<Trash2 className='size-3' />
										</Button>
									</div>
								</div>

								{/* Preview */}
								<div className='mt-3 border-t p-4'>
									<div className='flex items-center gap-2'>
										<Badge className={getDayColor(hour.days)}>
											{DAYS_OPTIONS.find((d) => d.value === hour.days)?.label}
										</Badge>
										<span className='text-sm text-neutral-400'>
											{formatTimeDisplay(hour.openingTime)} - {formatTimeDisplay(hour.closingTime)}
										</span>
									</div>
								</div>
							</div>
						))}
					</div>
				</TabsContent>

				{/* Quick Templates */}
				<TabsContent value='templates' className='space-y-4'>
					<div className='space-y-4'>
						<h3 className='text-sm font-medium'>Quick Templates</h3>

						<div className='space-y-2'>
							<Button
								type='button'
								className='transition-basic ms-auto h-auto w-full flex-col rounded-[var(--style-radius-s)] border !border-[var(--theme-elevation-150)] !bg-[var(--theme-input-bg)] p-3 !text-[var(--theme-elevation-800)] hover:!border-[var(--theme-elevation-250)]'
								onClick={() => setValue([weekdayHours])}>
								<div className='font-medium'>Standard Business Hours</div>
								<div className='text-xs text-gray-400'>Monday - Friday, 9:00 AM - 5:00 PM</div>
							</Button>

							<Button
								type='button'
								className='transition-basic ms-auto h-auto w-full flex-col rounded-[var(--style-radius-s)] border !border-[var(--theme-elevation-150)] !bg-[var(--theme-input-bg)] p-3 !text-[var(--theme-elevation-800)] hover:!border-[var(--theme-elevation-250)]'
								onClick={() => setValue(fullWeek)}>
								<div className='font-medium'>Restaurant Hours</div>
								<div className='text-xs text-gray-400'>Weekdays 10AM-10PM, Weekends 11AM-11PM</div>
							</Button>

							<Button
								type='button'
								className='transition-basic ms-auto h-auto w-full flex-col rounded-[var(--style-radius-s)] border !border-[var(--theme-elevation-150)] !bg-[var(--theme-input-bg)] p-3 !text-[var(--theme-elevation-800)] hover:!border-[var(--theme-elevation-250)]'
								onClick={() => setValue(retailHours)}>
								<div className='font-medium'>Retail Store Hours</div>
								<div className='text-xs text-gray-400'>Extended weekday & Saturday hours</div>
							</Button>

							<Button
								type='button'
								className='transition-basic ms-auto h-auto w-full flex-col rounded-[var(--style-radius-s)] border !border-[var(--theme-elevation-150)] !bg-[var(--theme-input-bg)] p-3 !text-[var(--theme-elevation-800)] hover:!border-[var(--theme-elevation-250)]'
								onClick={() => setValue([dailyHours])}>
								<div className='font-medium'>24/7 Operation</div>
								<div className='text-xs text-gray-500'>Open every day, all day</div>
							</Button>
						</div>
					</div>
				</TabsContent>
			</Tabs>

			{/* Summary Preview */}
			{openingHours.length > 0 && (
				<div className='rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-400 dark:bg-blue-900/20'>
					<div className='mb-2 text-sm font-medium text-blue-800 dark:text-blue-200'>📋 Schedule Summary</div>
					<div className='space-y-1'>
						{openingHours.map((hour, index) => (
							<div key={index} className='text-sm text-blue-700 dark:text-blue-200'>
								<span className='font-medium'>{DAYS_OPTIONS.find((d) => d.value === hour.days)?.label}:</span>{" "}
								{formatTimeDisplay(hour.openingTime)} - {formatTimeDisplay(hour.closingTime)}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

const weekdayHours: OpeningHour = {
	days: "mon-fri",
	openingTime: "09:00",
	closingTime: "17:00"
}

const fullWeek: OpeningHour[] = [
	{ days: "mon-fri", openingTime: "10:00", closingTime: "22:00" },
	{ days: "sat-sun", openingTime: "11:00", closingTime: "23:00" }
]

const retailHours: OpeningHour[] = [
	{ days: "mon-fri", openingTime: "09:00", closingTime: "21:00" },
	{ days: "saturday", openingTime: "09:00", closingTime: "22:00" },
	{ days: "sunday", openingTime: "11:00", closingTime: "19:00" }
]

const dailyHours: OpeningHour = {
	days: "daily",
	openingTime: "00:00",
	closingTime: "23:59"
}

const newHour: OpeningHour = {
	days: "monday",
	openingTime: "09:00",
	closingTime: "17:00"
}

const DAYS_OPTIONS = [
	{ label: "Monday", value: "monday", dayIndex: 1 },
	{ label: "Tuesday", value: "tuesday", dayIndex: 2 },
	{ label: "Wednesday", value: "wednesday", dayIndex: 3 },
	{ label: "Thursday", value: "thursday", dayIndex: 4 },
	{ label: "Friday", value: "friday", dayIndex: 5 },
	{ label: "Saturday", value: "saturday", dayIndex: 6 },
	{ label: "Sunday", value: "sunday", dayIndex: 0 },
	{ label: "Mon - Fri", value: "mon-fri", dayIndex: null },
	{ label: "Sat - Sun", value: "sat-sun", dayIndex: null },
	{ label: "Daily", value: "daily", dayIndex: null }
]

const generateTimeOptions = () => {
	const times = []

	const baseDate = startOfDay(new Date()) // Start at midnight

	// Generate 48 time slots (30-minute intervals for 24 hours)
	for (let i = 0; i < 48; i++) {
		const timeDate = addMinutes(baseDate, i * 30)

		const time24 = format(timeDate, "HH:mm")

		const time12 = format(timeDate, "h:mm a")

		times.push({
			label: time12,
			value: time24,
			display: time12
		})
	}

	return times
}

const TIME_OPTIONS = generateTimeOptions()

const formatTimeDisplay = (time24: string) => {
	const [hours, minutes] = time24.split(":").map(Number)

	const timeDate = new Date()

	timeDate.setHours(hours, minutes, 0, 0)

	return format(timeDate, "h:mm a")
}

const getDayColor = (day: string) => {
	const colors = {
		monday: "bg-blue-100 text-blue-800",
		tuesday: "bg-green-100 text-green-800",
		wednesday: "bg-yellow-100 text-yellow-800",
		thursday: "bg-purple-100 text-purple-800",
		friday: "bg-pink-100 text-pink-800",
		saturday: "bg-orange-100 text-orange-800",
		sunday: "bg-red-100 text-red-800",
		"mon-fri": "bg-indigo-100 text-indigo-800",
		"sat-sun": "bg-teal-100 text-teal-800",
		daily: "bg-gray-100 text-gray-800"
	}

	return colors[day as keyof typeof colors] || "bg-gray-100 text-gray-800"
}

const selectClassNames: React.ComponentProps<typeof Select>["classNames"] = {
	placeholder: "text-muted-foreground",
	trigger:
		"!h-12 !w-full rounded-[var(--style-radius-s)] !border-[var(--theme-elevation-150)] !bg-[var(--theme-input-bg)] text-[var(--theme-elevation-800)] hover:border-[var(--theme-elevation-250)] transition-basic [&>svg]:!size-5",
	content:
		"!w-full rounded-[var(--style-radius-s)] border border-[var(--theme-elevation-150)] bg-[var(--theme-input-bg)] p-1 shadow-xl",
	item: "hover:!bg-neutral-700 data-[state=checked]:!bg-neutral-700 transition-basic !rounded-md"
}
