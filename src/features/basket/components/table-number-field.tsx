"use client"

import { Input } from "@/components/ui/input"
import { useCallback } from "react"
import { useBasketStore } from "../store"

export const TableNumberField = () => {
	const tableNumber = useBasketStore((state) => state.tableNumber)

	const setTableNumber = useBasketStore((state) => state.setTableNumber)

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value

			const intRegex = /^[0-9]*$/

			if (intRegex.test(value)) {
				const parsedValue = isNaN(parseInt(value)) ? null : parseInt(value)

				setTableNumber(parsedValue)
			}
		},
		[setTableNumber]
	)

	return (
		<Input
			id='table-number'
			type='text'
			placeholder='Table #'
			value={tableNumber ?? ""}
			onChange={handleChange}
			// className='h-8 w-[84px] rounded-sm bg-white px-2 transition-all'
			className='focus-visible:!ring-offset h-8 w-[84px] rounded-none border-0 border-b border-gray-300 !bg-transparent px-1 py-1 text-center text-base text-[16px] !outline-none focus:border-b focus:border-gray-300 focus-visible:!ring-0'
		/>
	)
}
