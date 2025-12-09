// Frontend component to display opening hours
"use client"

import { Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { format, getDay, parse, isWithinInterval } from "date-fns"

export interface OpeningHour {
	days: string
	openingTime: string
	closingTime: string
}

interface OpeningHoursDisplayProps {
	openingHours: OpeningHour[]
	className?: string
	compact?: boolean
}

export const OpeningHoursDisplay = ({ openingHours, className = "", compact = false }: OpeningHoursDisplayProps) => {
	if (!openingHours || openingHours.length === 0) {
		return (
			<div className={`text-muted-foreground ${className}`}>
				<Clock className='me-2 inline size-4' />
				Hours not available
			</div>
		)
	}

	const isOpen = isCurrentlyOpen(openingHours)

	if (compact) {
		return (
			<div className={`flex items-center gap-2 ${className}`}>
				<Clock className='size-4' />
				<Badge variant={isOpen ? "default" : "secondary"}>{isOpen ? "Open Now" : "Closed"}</Badge>
				<span className='text-sm text-neutral-600 dark:text-neutral-400'>
					{openingHours[0] && `${formatTime(openingHours[0].openingTime)} - ${formatTime(openingHours[0].closingTime)}`}
				</span>
			</div>
		)
	}

	return (
		<div className={`space-y-3 ${className}`}>
			<div className='flex items-center gap-2'>
				<Clock className='size-5 text-neutral-600 dark:text-neutral-400' />
				<h3 className='text-neutral-700 dark:text-neutral-300'>Opening Hours</h3>
				<Badge variant={isOpen ? "default" : "secondary"}>{isOpen ? "Open Now" : "Closed"}</Badge>
			</div>

			<div className='space-y-2'>
				{openingHours.map((schedule, index) => (
					<div key={index} className='bg-foreground/5 flex items-center justify-between rounded-lg p-3'>
						<span className='text-neutral-700 dark:text-neutral-300'>
							{DAYS_MAP[schedule.days as keyof typeof DAYS_MAP] || schedule.days}
						</span>
						<span className='text-neutral-600 dark:text-neutral-400'>
							{formatTime(schedule.openingTime)} - {formatTime(schedule.closingTime)}
						</span>
					</div>
				))}
			</div>
		</div>
	)
}

const DAYS_MAP = {
	monday: "Monday",
	tuesday: "Tuesday",
	wednesday: "Wednesday",
	thursday: "Thursday",
	friday: "Friday",
	saturday: "Saturday",
	sunday: "Sunday",
	"mon-fri": "Monday - Friday",
	"sat-sun": "Saturday - Sunday",
	daily: "Daily"
}

const formatTime = (time24: string) => {
	const [hours, minutes] = time24.split(":").map(Number)

	const timeDate = new Date()

	timeDate.setHours(hours, minutes, 0, 0)

	return format(timeDate, "h:mm a")
}

const isCurrentlyOpen = (openingHours: OpeningHour[]) => {
	const now = new Date()

	const currentDayIndex = getDay(now) // 0 = Sunday, 1 = Monday, etc.

	// Map day indices to day names that match our data structure
	const dayIndexToName: { [key: number]: string } = {
		0: "sunday",
		1: "monday",
		2: "tuesday",
		3: "wednesday",
		4: "thursday",
		5: "friday",
		6: "saturday"
	}

	const currentDayName = dayIndexToName[currentDayIndex]

	for (const schedule of openingHours) {
		const { days, openingTime, closingTime } = schedule

		let isValidDay = false

		if (days === "daily") {
			isValidDay = true
		} else if (days === "mon-fri") {
			// Monday (1) through Friday (5)
			isValidDay = currentDayIndex >= 1 && currentDayIndex <= 5
		} else if (days === "sat-sun") {
			// Saturday (6) and Sunday (0)
			isValidDay = currentDayIndex === 0 || currentDayIndex === 6
		} else {
			// Direct day match
			isValidDay = days === currentDayName
		}

		if (isValidDay) {
			// Create date objects for time comparison using date-fns
			const baseDate = format(now, "yyyy-MM-dd")

			const openTime = parse(`${baseDate} ${openingTime}`, "yyyy-MM-dd HH:mm", new Date())

			const closeTime = parse(`${baseDate} ${closingTime}`, "yyyy-MM-dd HH:mm", new Date())

			// Handle cases where closing time is past midnight (next day)
			if (closingTime < openingTime) {
				// If close time is earlier than open time, it means it closes the next day
				const nextDay = new Date(now)

				nextDay.setDate(nextDay.getDate() + 1)
				const closeTimeNextDay = parse(
					`${format(nextDay, "yyyy-MM-dd")} ${closingTime}`,
					"yyyy-MM-dd HH:mm",
					new Date()
				)

				// Check if current time is either after opening today OR before closing tomorrow
				return now >= openTime || now <= closeTimeNextDay
			}

			// Normal case: opening and closing on the same day
			return isWithinInterval(now, { start: openTime, end: closeTime })
		}
	}

	return false
}
