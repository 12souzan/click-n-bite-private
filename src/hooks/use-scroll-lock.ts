"use client"

import { useEffect } from "react"

/**
 * Custom hook to lock/unlock body scroll
 * @param isLocked Whether the scroll should be locked
 */
export function useScrollLock(isLocked: boolean) {
	useEffect(() => {
		if (isLocked) {
			// Save the current body styles
			const originalOverflow = document.body.style.overflow

			const originalPaddingRight = document.body.style.paddingRight

			// Calculate scrollbar width to prevent layout shift
			const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

			// Lock scroll
			document.body.style.overflow = "hidden"

			// Add padding to prevent layout shift when scrollbar disappears
			if (scrollbarWidth > 0) {
				document.body.style.paddingRight = `${scrollbarWidth}px`
			}

			// Cleanup function to restore original styles
			return () => {
				document.body.style.overflow = originalOverflow
				document.body.style.paddingRight = originalPaddingRight
			}
		}
	}, [isLocked]) // Only re-run if isLocked changes
}
