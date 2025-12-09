"use client"

//#region Import
import { Input } from "@/components/ui/input"
import { Building2Icon, MailIcon, PhoneIcon, UserIcon } from "lucide-react"
import { Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Suspense, useCallback, useEffect } from "react"
import { Form, createTypedForm } from "@/components/ui/form"
import { type ContactSchemaType, contactSchema } from "../schema"
import { Plan } from "../types"
import { useContactForm } from "../query"
import { Button } from "@/components/ui/button"
import { basePrice, annualPrice } from "@/constants/pricing"
import { useTranslations } from "next-intl"
//#endregion

const { FormField } = createTypedForm<ContactSchemaType>()

const FormContent = ({ onSuccess }: { onSuccess: () => void }) => {
	const t = useTranslations("contact.contactForm")

	const searchParams = useSearchParams()

	const { onContact, contactPending } = useContactForm()

	const form = useForm<ContactSchemaType>({
		resolver: zodResolver(contactSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			phone: "",
			restaurantName: "",
			message: ""
		}
	})

	useEffect(() => {
		const plan = searchParams.get("plan")

		if (plan) form.setValue("plan", plan as Plan)
	}, [searchParams, form])

	const handleSubmit = useCallback(
		(data: ContactSchemaType) => {
			onContact(data, {
				onSuccess: (res) => {
					console.log(res)

					if (!res.success && typeof res.error === "object") {
						const errors = res.error as Record<string, string[]>

						for (const field in errors) {
							form.setError(field as keyof ContactSchemaType, { message: errors[field][0] })
						}
					} else if (res.success) {
						onSuccess()
						form.reset()
					}
				}
			})
		},
		[onContact, form, onSuccess]
	)

	return (
		<>
			<h2 className='mb-6 text-2xl font-bold'>{t("title")}</h2>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-1 flex-col justify-between gap-6'>
					<div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
						<FormField name='firstName' required label={t("fields.firstName")}>
							{(field) => (
								<Input
									{...field}
									autoComplete='given-name'
									className='max-w-full px-4 py-3 md:w-[264px]'
									containerClassName='[&>svg]:size-5'
									leftIcon={UserIcon}
									placeholder={t("placeholders.firstName")}
								/>
							)}
						</FormField>

						<FormField name='lastName' required label={t("fields.lastName")}>
							{(field) => (
								<Input
									{...field}
									autoComplete='family-name'
									className='max-w-full px-4 py-3 md:w-[264px]'
									containerClassName='[&>svg]:size-5'
									leftIcon={UserIcon}
									placeholder={t("placeholders.lastName")}
								/>
							)}
						</FormField>
					</div>

					<div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
						<FormField name='email' label={t("fields.email")}>
							{(field) => (
								<Input
									{...field}
									autoComplete='email'
									className='max-w-full px-4 py-3 md:w-[264px]'
									containerClassName='[&>svg]:size-5'
									leftIcon={MailIcon}
									placeholder={t("placeholders.email")}
								/>
							)}
						</FormField>
						<FormField name='phone' label={t("fields.phone")}>
							{(field) => (
								<Input
									{...field}
									autoComplete='tel'
									className='max-w-full px-4 py-3 md:w-[264px]'
									containerClassName='[&>svg]:size-5'
									leftIcon={PhoneIcon}
									placeholder={t("placeholders.phone")}
								/>
							)}
						</FormField>
					</div>

					<div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
						<FormField name='restaurantName' required label={t("fields.restaurantName")}>
							{(field) => (
								<Input
									{...field}
									autoComplete='organization'
									className='max-w-full px-4 py-3 md:w-[264px]'
									containerClassName='[&>svg]:size-5'
									leftIcon={Building2Icon}
									placeholder={t("placeholders.restaurantName")}
								/>
							)}
						</FormField>

						<FormField name='plan' label={t("fields.plan")}>
							{(field) => (
								<Select
									classNames={{
										trigger: "md:w-[264px] w-full max-w-full px-4 py-3"
									}}
									placeholder={t("placeholders.plan")}
									options={planOptions(t)}
									value={field.value}
									onValueChange={field.onChange}
								/>
							)}
						</FormField>
					</div>

					<FormField name='message' label={t("fields.message")}>
						{(field) => (
							<Textarea
								className='h-32 w-full px-4 py-3 md:max-w-[550px]'
								rows={5}
								placeholder={t("placeholders.message")}
								{...field}
							/>
						)}
					</FormField>

					<Button
						type='submit'
						className='w-full'
						size='lg'
						variant='gradient'
						loading={contactPending}
						loadingText={t("actions.sending")}>
						{t("actions.send")}
					</Button>

					<p className='text-muted-foreground text-center text-sm'>{t("actions.privacyPolicy")}</p>
				</form>
			</Form>
		</>
	)
}

const planOptions = (t: ReturnType<typeof useTranslations>) => [
	{
		label: (
			<div className='flex items-center gap-2'>
				{t.rich("planOptions.monthly", {
					price: basePrice,
					span: (chunks) => <span className='text-sm text-blue-600 dark:text-blue-400'>{chunks}</span>
				})}
			</div>
		),
		value: Plan.MONTHLY
	},
	{
		label: (
			<div className='flex items-center gap-2'>
				{t.rich("planOptions.annually", {
					price: Math.round(annualPrice / 12),
					span: (chunks) => <span className='text-sm text-blue-600 dark:text-blue-400'>{chunks}</span>
				})}
			</div>
		),
		value: Plan.YEARLY
	}
]

export const ContactFormContent = ({ onSuccess }: { onSuccess: () => void }) => (
	<Suspense>
		<FormContent onSuccess={onSuccess} />
	</Suspense>
)
