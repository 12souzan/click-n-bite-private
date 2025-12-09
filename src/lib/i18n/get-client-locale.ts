"use client"

export function getClientLocale(): string {
	if (typeof window !== "undefined") {
		const match = document.cookie.match(/locale=(\w+)/)

		return match ? match[1] : "en" // fallback
	}

	return "en"
}
