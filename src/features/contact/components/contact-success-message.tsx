import { CalendlyButton } from "@/components/common/calendly-button"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/next.routes"
import { CheckCircle, Home, Play, Star } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"

export const ContactSuccessMessage = () => {
	const t = useTranslations("contact.contactSuccess")

	return (
		<>
			<div className='rounded-md border border-green-600/20 bg-green-50/70 p-4 dark:bg-green-900/20'>
				<div className='flex-center mx-auto mb-6 size-16 rounded-full bg-green-100 dark:bg-green-900/30'>
					<CheckCircle className='size-8 text-green-600 dark:text-green-400' />
				</div>
				<h2 className='mb-4 text-center text-2xl font-bold'>{t("title")}</h2>
				<p className='text-foreground/60 mx-auto mb-6 max-w-md text-center'>{t("description")}</p>
			</div>

			<div className='flex flex-1 flex-col justify-center gap-4'>
				<h3 className='mb-6 text-xl font-semibold'>{t("nextSteps.title")}</h3>

				<div className='grid gap-4 md:grid-cols-2'>
					<Button asChild variant='gradient' className='h-auto flex-col gap-0 p-4 shadow-lg hover:shadow-xl'>
						<Link href={ROUTES.DEMO}>
							<Play className='mb-3 size-5 fill-current' />
							{t("nextSteps.actions.demo.title")}
							<p className='mt-0.5 text-sm !font-normal text-blue-100'>{t("nextSteps.actions.demo.description")}</p>
						</Link>
					</Button>

					<CalendlyButton
						variant='outline'
						className='h-auto flex-col gap-0 bg-transparent p-4 hover:border-purple-200 hover:bg-purple-50 [&>svg]:!mb-3 [&>svg]:!size-5 [&>svg]:!text-purple-600'>
						{t("nextSteps.actions.bookMeeting.title")}
						<p className='mt-0.5 text-sm !font-normal text-gray-500'>
							{t("nextSteps.actions.bookMeeting.description")}
						</p>
					</CalendlyButton>

					<Button
						asChild
						variant='outline'
						className='flex h-auto flex-col gap-0 bg-transparent p-4 hover:border-yellow-200 hover:bg-yellow-50'>
						<Link href={ROUTES.TESTIMONIALS}>
							<Star className='mb-3 size-5 text-yellow-600' />
							{t("nextSteps.actions.customerStories.title")}
							<p className='mt-0.5 text-sm !font-normal text-gray-500'>
								{t("nextSteps.actions.customerStories.description")}
							</p>
						</Link>
					</Button>

					<Button
						asChild
						variant='outline'
						className='flex h-auto flex-col gap-0 bg-transparent p-4 hover:border-green-200 hover:bg-green-50'>
						<Link href={ROUTES.HOME}>
							<Home className='mb-3 size-5 text-green-600' />
							{t("nextSteps.actions.backHome.title")}
							<p className='mt-0.5 text-sm !font-normal text-gray-500'>{t("nextSteps.actions.backHome.description")}</p>
						</Link>
					</Button>
				</div>
			</div>
		</>
	)
}
