"use client"

//#region Import
import { Label } from "@/components/ui/label"
import { cn } from "@/utils/cn"
import { Slot } from "@radix-ui/react-slot"
import { createContext, useContext, useId } from "react"
import {
	Controller,
	type ControllerRenderProps,
	type FieldPath,
	type FieldValues,
	FormProvider,
	type Path,
	useFormContext
} from "react-hook-form"
//#endregion

type FormFieldContextValue<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = { name: TName }

const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue)

const useFormField = () => {
	const fieldContext = useContext(FormFieldContext)

	const itemContext = useContext(FormItemContext)

	const { formState, getFieldState } = useFormContext()

	const fieldState = getFieldState(fieldContext.name, formState)

	if (!fieldContext) throw new Error("useFormField should be used within <FormField>")

	const { id } = itemContext

	return {
		formDescriptionId: `${id}-form-item-description`,
		formItemId: `${id}-form-item`,
		formMessageId: `${id}-form-item-message`,
		id,
		name: fieldContext.name,
		...fieldState
	}
}

type FormItemContextValue = { id: string }

const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue)

const FormItem = ({ className, ...props }: React.ComponentProps<"div">) => {
	const id = useId()

	return (
		<FormItemContext.Provider value={{ id }}>
			<div className={cn("space-y-2", className)} {...props} />
		</FormItemContext.Provider>
	)
}

const FormLabel = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof Label>) => {
	const { error, formItemId } = useFormField()

	return <Label className={cn(error && "text-destructive", className)} htmlFor={formItemId} {...props} />
}

const FormControl = (props: React.ComponentPropsWithoutRef<typeof Slot>) => {
	const { error, formDescriptionId, formItemId, formMessageId } = useFormField()

	return (
		<Slot
			aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
			aria-invalid={!!error}
			id={formItemId}
			{...props}
		/>
	)
}

const FormMessage = ({ children, className, ...props }: React.ComponentProps<"p">) => {
	const { error, formMessageId } = useFormField()

	const body = error ? String(error?.message) : children

	if (!body) return null

	return (
		<p
			className={cn("text-destructive !mt-2 !-mb-0.5 ps-2 text-[13px] leading-none font-medium", className)}
			id={formMessageId}
			{...props}>
			{body}
		</p>
	)
}

interface FormFieldProps<TFieldValues extends FieldValues, TName extends Path<TFieldValues>> {
	name: TName
	label?: React.ReactNode
	required?: boolean
	className?: string
	labelClassName?: string
	messageClassName?: string
	children: (field: ControllerRenderProps<TFieldValues, TName>) => React.ReactNode
	hideError?: boolean
}

// eslint-disable-next-line react-refresh/only-export-components
export function createTypedForm<TFieldValues extends FieldValues>() {
	function FormField<TName extends Path<TFieldValues>>(props: FormFieldProps<TFieldValues, TName>) {
		const { name, label, required, className, labelClassName, messageClassName, children, hideError } = props

		const { control } = useFormContext<TFieldValues>()

		return (
			<FormFieldContext.Provider value={{ name }}>
				<Controller
					name={name}
					control={control}
					render={({ field }) => (
						<FormItem className={cn("relative", className)} aria-required={required}>
							{label && (
								<FormLabel className={labelClassName}>
									{label} {required && <span className='text-blue-600'>*</span>}
								</FormLabel>
							)}
							<FormControl>{children(field)}</FormControl>
							{!hideError && <FormMessage className={messageClassName} />}
						</FormItem>
					)}
				/>
			</FormFieldContext.Provider>
		)
	}

	return { FormField }
}

export { FormProvider as Form, FormMessage }
