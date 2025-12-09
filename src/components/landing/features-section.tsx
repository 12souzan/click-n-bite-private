import { MotionDiv } from "../motion/motion-div"
import { Settings, Star } from "lucide-react"
import { SectionBadge } from "./section-badge"
import { features } from "@/data/landing"
import { cn } from "@/utils/cn"
import { useTranslations } from "next-intl"

export const FeaturesSection = () => {
	const t = useTranslations("landing.features")

	return (
		<section id='features' className='bg-transparent py-20'>
			<div className='custom-container'>
				<div className='mb-16 text-center'>
					<MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
						<SectionBadge icon={Settings}>{t("sectionBadge")}</SectionBadge>

						<h2 className='mb-4 text-3xl font-bold md:text-4xl'>{t("title")}</h2>
						<p className='text-muted-foreground mx-auto max-w-3xl text-xl'>{t("description")}</p>
					</MotionDiv>
				</div>

				<div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
					{features.map((feature, index) => (
						<MotionDiv
							key={feature.title}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							className={cn(
								"group/feature relative",
								feature.prominent && "md:col-span-2 lg:col-span-1 lg:row-span-2"
							)}>
							<div
								className={cn(
									"transition-basic h-full overflow-hidden rounded-2xl border-2 bg-gradient-to-br shadow-lg backdrop-blur-sm hover:shadow-xl rtl:bg-gradient-to-bl",
									feature.gradient,
									feature.border
								)}>
								<div className='relative p-5'>
									{feature.prominent && (
										<div className='mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 text-xs font-medium text-white rtl:bg-gradient-to-l'>
											<Star className='size-3' />
											{t("featured")}
										</div>
									)}

									<div className='mb-6'>
										<feature.icon
											className={cn(
												feature.prominent ? "size-12" : "size-10",
												feature.iconColor,
												"transition-basic will-change-transform group-hover/feature:scale-110"
											)}
										/>
									</div>

									<h3
										className={cn(
											feature.prominent ? "text-2xl" : "text-xl",
											"mb-4 font-semibold text-gray-900 dark:text-gray-100"
										)}>
										{t(feature.title)}
									</h3>

									<p
										className={cn(
											"text-gray-700 dark:text-gray-300",
											feature.prominent ? "text-lg leading-relaxed" : "leading-relaxed"
										)}>
										{t(feature.description)}
									</p>
								</div>
							</div>
						</MotionDiv>
					))}
				</div>
			</div>
		</section>
	)
}
