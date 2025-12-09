//#region Import
import { Mail, Phone, MapPin, Clock, Calendar, LucideIcon } from "lucide-react"
import { MotionDiv } from "@/components/motion/motion-div"
import { slideLeftVariants } from "@/lib/motion/configs"
import { contactInfo } from "@/data/landing"
import Link from "next/link"
import { CalendlyButton } from "@/components/common/calendly-button"
import { cva } from "class-variance-authority"
import { useTranslations } from "next-intl"
//#endregion

export const ContactInfo = () => {
	const t = useTranslations("contact.getInTouch")

	return (
		<MotionDiv {...slideLeftVariants} className='mx-auto flex max-w-[284px] flex-col gap-5 md:mx-0'>
			<div className='bg-background h-fit rounded-2xl p-5 shadow-xl'>
				<h2 className='mb-6 text-2xl font-bold'>{t("title")}</h2>

				<div className='space-y-6'>
					<div className='flex items-start gap-2.5 lg:gap-4'>
						<Icon icon={Phone} variant='blue' />
						<div>
							<h3 className='text-sm font-semibold lg:text-base'>{t("phone")}</h3>

							<Link
								href={`tel:${contactInfo.phone}`}
								className='text-muted-foreground border-animate text-sm !leading-none !font-normal'>
								{contactInfo.phone}
							</Link>
						</div>
					</div>

					<div className='flex items-start gap-2.5 lg:gap-4'>
						<Icon icon={Mail} variant='purple' />
						<div>
							<h3 className='text-sm font-semibold lg:text-base'>{t("email")}</h3>
							<Link
								href={`mailto:${contactInfo.email}`}
								className='text-muted-foreground border-animate text-sm !leading-none !font-normal'>
								{contactInfo.email}
							</Link>
						</div>
					</div>

					<div className='flex items-start gap-2.5 lg:gap-4'>
						<Icon icon={MapPin} variant='green' />
						<div>
							<h3 className='text-sm font-semibold lg:text-base'>{t("office")}</h3>
							<p className='text-muted-foreground text-sm whitespace-pre-line'>{t("address")}</p>
						</div>
					</div>

					<div className='flex items-start gap-2.5 lg:gap-4'>
						<Icon icon={Clock} variant='orange' />
						<div>
							<h3 className='text-sm font-semibold lg:text-base'>{t("businessHours")}</h3>
							<p className='text-muted-foreground text-sm'>{t("businessHoursDetails")}</p>
							<p className='text-muted-foreground text-sm'>{t("closedDetails")}</p>
						</div>
					</div>
				</div>

				<div className='mt-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-2.5 text-sm md:mt-8 md:p-4 rtl:bg-gradient-to-l dark:from-blue-900/20 dark:to-purple-900/20'>
					<strong className='text-primary mb-0.5 block md:mb-1'>{t("quickResponse.title")}</strong>
					<p className='text-muted-foreground'>{t("quickResponse.description")}</p>
				</div>
			</div>

			<div className='flex items-center gap-2'>
				<div className='bg-border h-px w-full' />
				<p className='text-muted-foreground text-sm'>{t("or")}</p>
				<div className='bg-border h-px w-full' />
			</div>

			<CalendlyButton
				variant='ghost'
				showIcon={false}
				className='!bg-background hover:ring-ring hover:text-primary h-fit flex-col !justify-start rounded-2xl !border-none p-5 shadow-xl ring-0 ring-inset hover:ring'>
				<div className='flex items-center gap-2'>
					<Calendar />
					{t("calendly.title")}
				</div>
				<p className='text-muted-foreground !font-normal'>{t("calendly.description")}</p>
			</CalendlyButton>
		</MotionDiv>
	)
}

const iconVariants = cva("flex-center size-8 lg:size-12 flex-shrink-0 rounded-lg lg:[&>svg]:size-6 [&>svg]:size-4", {
	variants: {
		variant: {
			blue: "bg-blue-100 dark:bg-blue-900/30 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400",
			purple: "bg-purple-100 dark:bg-purple-900/30 [&>svg]:text-purple-600 dark:[&>svg]:text-purple-400",
			green: "bg-green-100 dark:bg-green-900/30 [&>svg]:text-green-600 dark:[&>svg]:text-green-400",
			orange: "bg-orange-100 dark:bg-orange-900/30 [&>svg]:text-orange-600 dark:[&>svg]:text-orange-400"
		}
	},
	defaultVariants: {
		variant: "blue"
	}
})

const Icon = ({ icon: Icon, variant }: { icon: LucideIcon; variant: "blue" | "purple" | "green" | "orange" }) => (
	<div className={iconVariants({ variant })}>
		<Icon />
	</div>
)
