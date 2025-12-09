"use client"

import { useState, useEffect } from "react"
import { useField, useFormFields } from "@payloadcms/ui"
import { Select } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface Category {
	id: string
	name: string
	subcategories: { id: string; name: string }[]
}

const SubcategorySelect = ({ path }: { path: string }) => {
	const { value, setValue } = useField<string>({ path })

	const categoryField = useFormFields(([fields]) => fields.category)

	const [subcategories, setSubcategories] = useState<Array<{ label: string; value: string }>>([])

	const [loading, setLoading] = useState(false)

	// Get the selected category ID
	const selectedCategoryId = categoryField?.value as string

	useEffect(() => {
		const fetchSubcategories = async () => {
			if (!selectedCategoryId) {
				setSubcategories([])
				setValue("") // Clear subcategory when no category is selected

				return
			}

			setLoading(true)

			try {
				// Fetch the specific category with its subcategories
				const response = await fetch(`/api/categories/${selectedCategoryId}`)

				if (!response.ok) {
					throw new Error("Failed to fetch category")
				}

				const category: Category = await response.json()

				// Map subcategories to select options
				const subcategoryOptions = category.subcategories?.map(({ name, id }) => ({ label: name, value: id })) || []

				setSubcategories(subcategoryOptions)

				// Clear the current subcategory value if it's not in the new options
				if (value && !subcategoryOptions.some((option) => option.value === value)) {
					setValue("")
				}
			} catch (error) {
				console.error("Error fetching subcategories:", error)
				setSubcategories([])
			} finally {
				setLoading(false)
			}
		}

		fetchSubcategories()
	}, [selectedCategoryId, setValue, value])

	return (
		<div className='mb-[var(--spacing-field)]'>
			<Label className='block pb-[5px] text-[13px] leading-[20px] font-normal text-[var(--theme-elevation-800)]'>
				Subcategory <span className='text-red-500'>*</span>
			</Label>
			<Select
				classNames={{
					placeholder: "text-muted-foreground",
					trigger:
						"!h-12 !w-full rounded-[var(--style-radius-s)] border-[var(--theme-elevation-150)] bg-[var(--theme-input-bg)] text-[var(--theme-elevation-800)] hover:border-[var(--theme-elevation-250)] transition-basic [&>svg]:!size-5",
					content:
						"!w-full rounded-[var(--style-radius-s)] border border-[var(--theme-elevation-150)] bg-[var(--theme-input-bg)] p-2 shadow-xl",
					item: "hover:!bg-neutral-700 data-[state=checked]:!bg-neutral-700 transition-basic"
				}}
				options={subcategories}
				placeholder={
					loading
						? "Loading subcategories..."
						: !selectedCategoryId
							? "Select a category first"
							: subcategories.length === 0
								? "No subcategories available"
								: "Select a subcategory"
				}
				value={value}
				onValueChange={(val) => setValue(val)}
				disabled={!selectedCategoryId || loading || subcategories.length === 0}
			/>
		</div>
	)
}

export default SubcategorySelect
