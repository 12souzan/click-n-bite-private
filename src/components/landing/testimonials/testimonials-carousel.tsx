"use client"

import { useCallback } from "react"
import { ChevronLeftIcon, ChevronRightIcon, Star } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import AutoPlay from "embla-carousel-autoplay"
import { MotionDiv } from "@/components/motion/motion-div"
import { testimonials } from "@/data/landing"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { useDirection } from "@radix-ui/react-direction"

export const TestimonialsCarousel = () => {
	const t = useTranslations("landing.testimonials.clientTestimonials")

	const direction = useDirection()

	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			loop: true,
			align: "start",
			skipSnaps: false,
			dragFree: true,
			direction
		},
		[AutoPlay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })]
	)

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev()
	}, [emblaApi])

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext()
	}, [emblaApi])

	return (
		<div className='relative'>
			<div className='pointer-events-none absolute start-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-gray-50 to-transparent rtl:bg-gradient-to-l dark:hidden'></div>
			<div className='pointer-events-none absolute end-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-gray-50 to-transparent rtl:bg-gradient-to-r dark:hidden'></div>

			<div className='overflow-hidden py-10' ref={emblaRef}>
				<div className='flex'>
					{[...testimonials, ...testimonials].map((testimonial, index) => (
						<div key={`${testimonial.name}-${index}`} className='prevent-selection min-w-0 flex-[0_0_350px] ps-4'>
							<MotionDiv
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: (index % testimonials.length) * 0.1 }}
								className='bg-background/40 transition-basic h-full rounded-xl p-6 shadow-lg hover:shadow-xl'>
								<div className='mb-4 flex items-center'>
									{[...Array(testimonial.rating)].map((_, i) => (
										<Star key={i} className='size-4 fill-current text-yellow-400' />
									))}
								</div>

								<p className='text-muted-foreground mb-6 leading-relaxed'>&quot;{t(testimonial.content)}&quot;</p>

								<div className='flex items-center'>
									<div className='flex-center me-3 size-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-sm font-semibold text-white rtl:bg-gradient-to-l'>
										{t(testimonial.avatar)}
									</div>
									<div>
										<p className='text-foreground font-semibold'>{t(testimonial.name)}</p>
										<p className='text-muted-foreground text-sm'>{t(testimonial.role)}</p>
									</div>
								</div>
							</MotionDiv>
						</div>
					))}
				</div>
			</div>

			<div className='mt-8 flex justify-center gap-4'>
				<Button
					variant='outline'
					onClick={scrollPrev}
					className='h-max rounded-full p-3 shadow-lg hover:shadow-xl'
					aria-label='Previous testimonial'>
					<ChevronLeftIcon className='size-5 rtl:rotate-180' />
				</Button>
				<Button
					variant='outline'
					onClick={scrollNext}
					className='h-max rounded-full border p-3 shadow-lg hover:shadow-xl'
					aria-label='Next testimonial'>
					<ChevronRightIcon className='size-5 rtl:rotate-180' />
				</Button>
			</div>
		</div>
	)
}
