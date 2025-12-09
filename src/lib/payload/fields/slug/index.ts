import type { CheckboxField, TextField } from "payload"

import { formatSlugHook } from "./formatSlug"

type Overrides = {
	checkboxOverrides?: Partial<CheckboxField>
	slugOverrides?: Partial<TextField>
}

type Slug = (fieldToUse?: string, overrides?: Overrides) => [TextField, CheckboxField]

export const slugField: Slug = (fieldToUse = "title", overrides = {}) => {
	const { checkboxOverrides, slugOverrides } = overrides

	const checkBoxField: CheckboxField = {
		admin: {
			hidden: true,
			position: "sidebar"
		},
		defaultValue: true,
		name: "slugLock",
		type: "checkbox",
		...checkboxOverrides
	}

	// Expect ts error here because of typescript mismatching Partial<TextField> with TextField
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	const slugField: TextField = {
		index: true,
		label: "Slug",
		name: "slug",
		type: "text",
		...(slugOverrides || {}),
		admin: {
			position: "sidebar",
			...(slugOverrides?.admin || {}),
			components: {
				Field: {
					clientProps: {
						checkboxFieldPath: checkBoxField.name,
						fieldToUse
					},
					path: "@/lib/payload/fields/slug/SlugComponent#SlugComponent"
				}
			}
		},
		hooks: {
			// Kept this in for hook or API based updates
			beforeValidate: [formatSlugHook(fieldToUse)]
		}
	}

	return [slugField, checkBoxField]
}
