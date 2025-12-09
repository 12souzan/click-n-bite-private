import { ImageMedia } from "@/components/payload/image-media"
import { Marquee } from "@/components/ui/marquee"
import { clientLogos } from "@/data/landing"
import { useTranslations } from "next-intl"

export const ClientsMarquee = () => {
	const t = useTranslations("landing.testimonials")

	return (
		<div className='bg-background/40 mb-16 rounded-2xl p-8 shadow-lg'>
			<p className='mb-8 text-center text-sm'>
				<span className='text-muted-foreground me-1 tracking-wide'>{t("marqueeHeadline")}</span>
				<span className='font-bold tracking-tight text-blue-600'>
					click<span className='text-pink-600'>n</span>bite
				</span>
			</p>

			<Marquee>
				{clientLogos?.map((logo) => (
					<ImageMedia
						key={logo.id}
						resource={logo}
						className='prevent-selection me-6 h-[85px] w-[135px] rounded-md object-cover shadow-md sm:me-8 sm:h-[100px] sm:w-[150px]'
					/>
				))}
			</Marquee>
		</div>
	)
}
