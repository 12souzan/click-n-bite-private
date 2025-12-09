import { ArrowLeft, Home, Search, Sparkles } from "lucide-react"
import { MotionDiv } from "@/components/motion/motion-div"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ROUTES } from "@/next.routes"
import { BlobsBackground } from "@/components/landing/blobs-background"

export default function NotFound() {
	return (
		<div className='relative flex-1 overflow-hidden'>
			<BlobsBackground />

			<div className='flex-center relative z-10 min-h-screen px-4'>
				<div className='text-center'>
					<MotionDiv
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className='mb-8'>
						<div className='mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rtl:bg-gradient-to-l dark:from-blue-900/30 dark:to-purple-900/30'>
							<Sparkles className='size-4 text-blue-600' />
							<span className='text-sm font-medium text-blue-700 dark:text-blue-300'>Oops! Page Not Found</span>
						</div>

						<h1 className='mb-4 text-8xl font-bold text-gray-900 dark:text-gray-100'>
							<span className='bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent rtl:bg-gradient-to-l'>
								404
							</span>
						</h1>

						<h2 className='mb-6 text-3xl font-bold text-gray-900 md:text-4xl dark:text-gray-100'>Page Not Found</h2>

						<p className='mb-8 max-w-md text-lg leading-relaxed text-gray-600 dark:text-gray-300'>
							The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track to
							discover amazing restaurants.
						</p>
					</MotionDiv>

					<MotionDiv
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className='flex flex-col gap-4 sm:flex-row sm:justify-center'>
						<Button asChild size='lg' variant='gradient' className='group'>
							<Link href={ROUTES.HOME}>
								<Home className='me-2 size-5' />
								Go Home
								<ArrowLeft className='ms-2 size-5 transition-transform group-hover:-translate-x-1' />
							</Link>
						</Button>

						<Button asChild size='lg' variant='outline'>
							<Link href={ROUTES.CONTACT}>
								<Search className='me-2 size-5' />
								Contact Support
							</Link>
						</Button>
					</MotionDiv>

					<MotionDiv
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.4 }}
						className='mt-12'>
						<div className='rounded-2xl border border-gray-200 bg-white/50 p-6 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/50'>
							<h3 className='mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100'>Popular Pages</h3>
							<div className='flex flex-wrap justify-center gap-3'>
								<Link
									href={ROUTES.HOME}
									className='rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 text-sm font-medium text-blue-700 transition-colors hover:from-blue-200 hover:to-purple-200 rtl:bg-gradient-to-l dark:from-blue-900/30 dark:to-purple-900/30 dark:text-blue-300 dark:hover:from-blue-800/40 dark:hover:to-purple-800/40'>
									Home
								</Link>
								<Link
									href={ROUTES.DEMO}
									className='rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 text-sm font-medium text-purple-700 transition-colors hover:from-purple-200 hover:to-pink-200 rtl:bg-gradient-to-l dark:from-purple-900/30 dark:to-pink-900/30 dark:text-purple-300 dark:hover:from-purple-800/40 dark:hover:to-pink-800/40'>
									Demo
								</Link>
								<Link
									href={ROUTES.CONTACT}
									className='rounded-lg bg-gradient-to-r from-pink-100 to-red-100 px-4 py-2 text-sm font-medium text-pink-700 transition-colors hover:from-pink-200 hover:to-red-200 rtl:bg-gradient-to-l dark:from-pink-900/30 dark:to-red-900/30 dark:text-pink-300 dark:hover:from-pink-800/40 dark:hover:to-red-800/40'>
									Contact
								</Link>
							</div>
						</div>
					</MotionDiv>
				</div>
			</div>
		</div>
	)
}
