"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import { cn } from "@/utils/cn"
import { env } from "@/constants/env-variables"
import React, { useCallback } from "react"
import { useTranslations } from "next-intl"

interface CalendlyButtonProps extends Omit<React.ComponentProps<typeof Button>, "onClick"> {
	showIcon?: boolean
}

export const CalendlyButton = ({ children, className, showIcon = true, ...props }: CalendlyButtonProps) => {
	const t = useTranslations("landing.application.actions")

	const openCalendly = useCallback(() => {
		window.open(env.NEXT_PUBLIC_CALENDLY_URL, "_blank")
	}, [])

	return (
		<Button
			onClick={openCalendly}
			variant='outline'
			className={cn("hover:border-primary hover:text-primary border-2", className)}
			{...props}>
			{showIcon && <Calendar />}
			{children || t("bookMeeting")}
		</Button>
	)
}
