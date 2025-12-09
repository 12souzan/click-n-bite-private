import { Star } from "lucide-react"
import { TestimonialsCarousel } from "./testimonials-carousel"
import { ClientsMarquee } from "./clients-marquee"
import { SectionBadge } from "../section-badge"
import { useTranslations } from "next-intl"

export const TestimonialsSection = () => {
	const t = useTranslations("landing.testimonials")

	return (
		<section id='clients' className='bg-background/30 py-20'>
			<div className='custom-container'>
				<div className='mb-16 text-center'>
					<SectionBadge icon={Star}>{t("sectionBadge")}</SectionBadge>

					<h2 className='mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-gray-100'>{t("title")}</h2>
					<p className='mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300'>{t("description")}</p>
				</div>

				<ClientsMarquee />

				<TestimonialsCarousel />
			</div>
		</section>
	)
}
