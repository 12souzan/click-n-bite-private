import { MotionDiv } from "@/components/motion/motion-div"
import { ContactForm } from "@/features/contact/components/contact-form"
import { slideUpVariants } from "@/lib/motion/configs"
import { ContactInfo } from "@/features/contact/components/contact-info"
import { useTranslations } from "next-intl"

export default function ContactPage() {
	const t = useTranslations("contact.header")

	return (
		<div className='custom-container py-16'>
			<MotionDiv {...slideUpVariants} className='mb-12 text-center'>
				<h1 className='mb-4 text-4xl font-bold text-gray-900 md:text-5xl dark:text-gray-100'>{t("title")}</h1>
				<p className='text-foreground/60 mx-auto max-w-3xl text-xl'>{t("description")}</p>
			</MotionDiv>

			<div className='flex max-w-full flex-col-reverse gap-6 md:flex-row'>
				<ContactInfo />

				<ContactForm />
			</div>
		</div>
	)
}
