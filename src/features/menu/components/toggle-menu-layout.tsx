"use client"

import { Grid, List } from "lucide-react"
import { useMenuStore } from "../store"
import { Button } from "@/components/ui/button"
import { useMemo } from "react"

export const ToggleMenuLayout = () => {
	const viewMode = useMenuStore((state) => state.viewMode)

	const toggleViewMode = useMenuStore((state) => state.toggleViewMode)

	const LayoutIcon = useMemo(() => layoutIconMap.get(viewMode), [viewMode])

	const layoutTitle = useMemo(() => layoutTitleMap.get(viewMode), [viewMode])

	return (
		<Button onClick={toggleViewMode} variant='outline' size='icon' title={layoutTitle} className='!px-2'>
			{LayoutIcon && <LayoutIcon />}
			<span className='sr-only'>{layoutTitle}</span>
		</Button>
	)
}

const layoutIconMap = new Map([
	["grid", Grid],
	["list", List]
])

const layoutTitleMap = new Map([
	["grid", "Grid View"],
	["list", "List View"]
])
