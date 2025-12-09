//#region Import
import { Mail, Phone } from "lucide-react"
import { containerVariants, fadeInVariants, slideUpVariants } from "@/lib/motion/configs"
import { MotionDiv } from "@/components/motion/motion-div"
import { fetchTenantContact } from "@/features/contact/service"
import { FacebookIcon } from "@/assets/facebook-ison"
import { InstagramIcon } from "@/assets/instagram-icon"
import { YoutubeIcon } from "@/assets/youtube-icon"
import { LinkedinIcon } from "@/assets/linkedin-icon"
import { TiktokIcon } from "@/assets/tiktok-icon"
import { XIcon } from "@/assets/x-icon"
import { TenantContactLocations } from "@/features/contact/components/tenant-contact-locations"
import { MotionImage } from "@/components/motion/motion-image"
import { MotionHeading, MotionHeading2 } from "@/components/motion/motion-heading"
import { MotionParagraph } from "@/components/motion/motion-paragraph"
import { WhatsappIcon } from "@/assets/whatsapp-icon"
// endregion

export default async function ContactPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params

	const { contactInfo, socialLinks, branches, restaurantInfo } = await fetchTenantContact(slug)

	// merging whatsapp with social links
	const allSocials = [...(socialLinks || []), { socialItem: "whatsapp", url: `https://wa.me/${contactInfo.whatsapp}` }]

	return (
		<MotionDiv {...containerVariants}>
			<section className='relative h-64 overflow-hidden sm:h-80 md:h-96'>
				<MotionDiv
					variants={fadeInVariants}
					className='absolute inset-0 z-10 bg-gradient-to-r from-gray-900/70 to-gray-900/50 rtl:bg-gradient-to-l'
				/>
				<MotionImage
					variants={fadeInVariants}
					src='https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop'
					alt='Bistro interior'
					fill
					className='object-cover'
					priority
				/>
				<div className='custom-container relative z-20 flex h-full flex-col items-center justify-center text-center'>
					<MotionHeading
						variants={slideUpVariants}
						className='mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl'>
						Contact Us
					</MotionHeading>
					<MotionParagraph variants={slideUpVariants} className='max-w-2xl text-lg text-gray-100'>
						We&apos;d love to hear from you. Reach out to us for reservations, feedback, or inquiries.
					</MotionParagraph>
				</div>
			</section>

			<div className='custom-container space-y-20 py-12'>
				<section className='mx-auto max-w-3xl text-center'>
					<MotionHeading2 variants={slideUpVariants} className='mb-4 text-2xl font-bold md:text-3xl'>
						{restaurantInfo.name}
					</MotionHeading2>
					<MotionParagraph variants={slideUpVariants} className='text-muted-foreground mb-6'>
						{restaurantInfo.slogan}
					</MotionParagraph>
					<MotionParagraph variants={slideUpVariants} className='text-muted-foreground mb-8'>
						{restaurantInfo.shortBio}
					</MotionParagraph>

					<MotionDiv variants={slideUpVariants} className='mb-8 flex justify-center gap-4'>
						{allSocials?.map((link) => {
							const Icon = socialIconsMap.get(link.socialItem) ?? null

							if (!Icon) return null

							return (
								<a
									key={link.socialItem}
									href={link.url}
									target='_blank'
									rel='noopener noreferrer'
									className='bg-foreground/5 text-foreground/70 hover:text-foreground transition-basic transform rounded-full p-3 shadow-md hover:-translate-y-1 hover:shadow-lg'
									aria-label={link.socialItem}>
									<Icon className='size-5' />
								</a>
							)
						})}
					</MotionDiv>

					<MotionDiv variants={slideUpVariants} className='mb-8 flex flex-col justify-center gap-6 sm:flex-row'>
						<div className='flex items-center gap-2'>
							<Phone className='text-muted-foreground size-5' />
							<a href={`tel:${contactInfo.phone}`} className='border-animate text-gray-700 dark:text-gray-300'>
								{contactInfo.phone}
							</a>
						</div>
						<div className='flex items-center gap-2'>
							<Mail className='text-muted-foreground size-5' />
							<a href={`mailto:${contactInfo.email}`} className='border-animate text-gray-700 dark:text-gray-300'>
								{contactInfo.email}
							</a>
						</div>
					</MotionDiv>
				</section>

				<TenantContactLocations branches={branches} />
			</div>
		</MotionDiv>
	)
}

const socialIconsMap = new Map<string, React.ComponentType<React.SVGProps<SVGSVGElement>>>([
	["facebook", FacebookIcon],
	["instagram", InstagramIcon],
	["youtube", YoutubeIcon],
	["linkedin", LinkedinIcon],
	["tiktok", TiktokIcon],
	["x", XIcon],
	["whatsapp", WhatsappIcon]
])
