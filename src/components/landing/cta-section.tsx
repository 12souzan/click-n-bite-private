import Link from "next/link"
import { MotionDiv } from "../motion/motion-div"
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"
import { ROUTES } from "@/next.routes"
import { useTranslations } from "next-intl"

export const CtaSection = () => {
	const t = useTranslations("landing.cta")

	return (
		<section className='relative overflow-hidden py-20'>
			<div className='absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rtl:bg-gradient-to-l' />
			<div className='absolute inset-0 bg-black/20' />

			<div className='custom-container relative z-10'>
				<div className='mx-auto max-w-4xl text-center'>
					<MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
						<h2 className='mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl'>{t("title")}</h2>
						<p className='mb-8 text-xl leading-relaxed text-white/90'>{t("description")}</p>

						<div className='flex flex-col justify-center gap-4 sm:flex-row'>
							<Button
								asChild
								size='lg'
								className='group/contact-button bg-white px-8 py-4 text-lg font-semibold text-gray-900 shadow-lg hover:bg-gray-100 hover:shadow-xl'>
								<Link href={ROUTES.CONTACT}>
									{t("actions.contact")}{" "}
									<ArrowRight className='transition-basic size-5 group-hover/contact-button:[animation:slide-x_1s_ease-in-out_infinite] rtl:rotate-180' />
								</Link>
							</Button>
							<Button
								asChild
								size='lg'
								variant='outline'
								className='border-2 border-white bg-transparent px-8 py-4 text-lg font-semibold text-white hover:bg-white hover:text-gray-900'>
								<Link href={ROUTES.DEMO}>{t("actions.demo")}</Link>
							</Button>
						</div>
					</MotionDiv>
				</div>
			</div>

			{/* Decorative elements */}
			<div className='animate-blob absolute start-0 top-0 size-72 rounded-full bg-white/10 opacity-70 mix-blend-overlay blur-xl filter' />
			<div className='animate-blob animation-delay-2000 absolute end-0 bottom-0 size-72 rounded-full bg-white/10 opacity-70 mix-blend-overlay blur-xl filter' />
		</section>
	)
}
