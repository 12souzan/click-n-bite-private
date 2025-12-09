import { ArrowRight, Headset, MessageCircle, QrCode, Share2, Shield, Sparkles, Zap } from "lucide-react"
import { MotionDiv } from "../motion/motion-div"
import { Button } from "../ui/button"
import Link from "next/link"
import { ROUTES } from "@/next.routes"
import Image from "next/image"
import { placeholderBlur } from "@/constants/general"
import { BlobsBackground } from "./blobs-background"
import { SectionBadge } from "./section-badge"
import { cn } from "@/utils/cn"
import { useTranslations } from "next-intl"

export const HeroSection = () => {
	const t = useTranslations("landing.hero")

	return (
		<section className='relative overflow-hidden py-20'>
			<BlobsBackground />

			<div className='custom-container relative z-10'>
				<div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
					<MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
						<SectionBadge icon={Sparkles}>{t("sectionBadge")}</SectionBadge>

						<h1 className='mb-6 text-4xl leading-tight font-bold text-gray-900 md:text-5xl lg:text-6xl dark:text-gray-100'>
							{t.rich("title", {
								span: (chunks) => (
									<span className='bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent rtl:bg-gradient-to-l'>
										{chunks}
									</span>
								)
							})}
						</h1>

						<p className='mb-8 text-xl leading-relaxed text-gray-600 dark:text-gray-300'>{t("description")}</p>

						<div className='mb-8 flex flex-col gap-4 sm:flex-row'>
							<Button asChild size='lg' variant='gradient' className='group/demo-button'>
								<Link href={ROUTES.DEMO}>
									<Zap />
									{t("actions.demo")}{" "}
									<ArrowRight className='group-hover/demo-button:[animation:slide-x_1s_ease-in-out_infinite] rtl:rotate-180' />
								</Link>
							</Button>

							<Button asChild size='lg' variant='outline'>
								<Link href={ROUTES.CONTACT}>
									<MessageCircle />
									{t("actions.contact")}
								</Link>
							</Button>
						</div>

						<div className='flex items-center gap-8 text-sm text-gray-500 dark:text-gray-400'>
							<div className='flex items-center gap-2'>
								<Shield className='size-4 text-green-500' />
								<span>{t("features.noSetupFees")}</span>
							</div>
							<div className='flex items-center gap-2'>
								<Headset className='size-4 text-green-500' />
								<span>{t("features.support")}</span>
							</div>
						</div>
					</MotionDiv>

					<MotionDiv
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className='relative mx-auto w-full max-w-xl'>
						{/* Phone mockup */}
						<div className='bg-foreground relative rounded-[2.5rem] p-2 shadow-2xl'>
							<div className='overflow-hidden rounded-[2rem] bg-white dark:bg-gray-800'>
								<div className='flex items-center justify-center bg-gray-50 px-4 py-3 dark:bg-gray-700'>
									<div className='size-3 rounded-full bg-gray-400' />
								</div>
								<div className='p-6'>
									<div className='mb-6 flex items-center gap-3'>
										<QrCode className='size-8 text-blue-600' />
										<span className='text-foreground text-lg font-semibold'>{t("mockItem.title")}</span>
									</div>
									<div className='space-y-4'>
										<MockItem
											price={t("mockItem.items.margherita.price")}
											name={t("mockItem.items.margherita.name")}
											action={t("mockItem.action")}
											src='/landing/pizza.jpg'
											className='border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-3 rtl:bg-gradient-to-l dark:border-orange-800 dark:from-orange-900/20 dark:to-red-900/20'
										/>
										<MockItem
											price={t("mockItem.items.caesar.price")}
											name={t("mockItem.items.caesar.name")}
											action={t("mockItem.action")}
											src='/landing/ceaser.jpg'
											className='border-green-200 bg-gradient-to-r from-green-50 to-blue-50 p-3 rtl:bg-gradient-to-l dark:border-green-800 dark:from-green-900/20 dark:to-blue-900/20'
										/>
									</div>
								</div>
							</div>
						</div>

						{/* Floating elements */}
						<div className='absolute -end-4 -top-4 z-10 rounded-lg border bg-white/80 p-3 shadow-lg backdrop-blur-md dark:bg-gray-800/70'>
							<div className='flex items-center gap-2'>
								<div className='h-2 w-2 animate-pulse rounded-full bg-green-500' />
								<span className='text-xs font-medium text-gray-700 dark:text-gray-300'>
									{t("floatingElements.liveOrders")}
								</span>
							</div>
						</div>

						<div className='absolute -start-4 -bottom-4 z-10 rounded-lg border bg-white/80 p-3 shadow-lg backdrop-blur-md dark:bg-gray-800/70'>
							<div className='flex items-center gap-2'>
								<Share2 className='size-4 text-blue-500' />
								<span className='text-xs font-medium text-gray-700 dark:text-gray-300'>
									{t("floatingElements.easySharing")}
								</span>
							</div>
						</div>
					</MotionDiv>
				</div>
			</div>
		</section>
	)
}

const MockItem = ({
	price,
	name,
	className,
	src,
	action
}: Record<"className" | "price" | "name" | "src" | "action", string>) => (
	<div className={cn("flex items-center gap-3 rounded-lg border", className)}>
		<Image
			src={src}
			alt={name}
			width={48}
			height={48}
			className='size-12 rounded-lg'
			sizes='48px'
			loading='lazy'
			blurDataURL={placeholderBlur}
		/>
		<div className='flex-1'>
			<p className='text-foreground font-medium'>{name}</p>
			<p className='text-muted-foreground font-mono text-sm'>${price}</p>
		</div>
		<Button size='sm' variant='outline'>
			{action}
		</Button>
	</div>
)
