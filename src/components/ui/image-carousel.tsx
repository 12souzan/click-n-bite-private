"use client"

import { useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Autoplay from "embla-carousel-autoplay"
import Fade from "embla-carousel-fade"
import { Button } from "./button"
import { MenuItem } from "@payload-types"
import { ImageMedia } from "../payload/image-media"

interface ImageCarouselProps {
	images: MenuItem["images"]
	alt: string
	className?: string
	hideControls?: boolean
}

export function ImageCarousel({ images, alt, className = "", hideControls }: ImageCarouselProps) {
	const [emblaRef, emblaApi] = useEmblaCarousel({ active: images?.length > 1, loop: true, skipSnaps: true }, [
		Autoplay({ delay: 5000, jump: false, stopOnInteraction: true, stopOnMouseEnter: true }),
		Fade()
	])

	const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])

	const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

	const toggleAutoplay = useCallback(() => {
		if (!emblaRef || !emblaApi) return

		const autoPlay = emblaApi?.plugins()?.autoplay

		if (!autoPlay) return

		const isPlaying = autoPlay?.isPlaying() || false

		if (!isPlaying) autoPlay?.play()
	}, [emblaApi, emblaRef])

	if (images.length === 1) {
		return (
			<div className={`relative size-full ${className}`}>
				<ImageMedia resource={images[0]} alt={alt} className='!h-[12rem] w-full object-cover' />
			</div>
		)
	}

	return (
		<div
			onMouseLeave={toggleAutoplay}
			className='m-auto max-w-[48rem]'
			style={
				{
					"--slide-height": "12rem",
					"--slide-spacing": "1rem",
					"--slide-size": "100%"
				} as React.CSSProperties
			}>
			<div ref={emblaRef} className='overflow-hidden'>
				<div className='-ms-[var(--slide-spacing)] flex touch-pan-y touch-pinch-zoom'>
					{images.map((image, index) => (
						<div
							key={index}
							className='!h-full min-w-0 !flex-[0_0_var(--slide-size)] translate-x-0 translate-y-0 translate-z-0 ps-[var(--slide-spacing)]'>
							<ImageMedia resource={image} className='block !h-[var(--slide-height)] w-full object-cover' />
						</div>
					))}
				</div>
			</div>

			{images.length > 1 && !hideControls && (
				<>
					<Button
						className='absolute start-1.5 top-1/2 z-20 h-max -translate-y-1/2 rounded-full bg-black/30 p-1.5 text-white hover:bg-black/70'
						onClick={scrollPrev}
						aria-label='Previous image'>
						<ChevronLeft className='rtl:rotate-180' />
					</Button>
					<Button
						className='absolute end-1.5 top-1/2 z-20 h-max -translate-y-1/2 rounded-full bg-black/30 p-1.5 text-white hover:bg-black/70'
						onClick={scrollNext}
						aria-label='Next image'>
						<ChevronRight className='rtl:rotate-180' />
					</Button>
				</>
			)}
		</div>
	)
}
