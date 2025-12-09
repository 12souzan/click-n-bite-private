import { Skeleton } from "@/components/ui/skeleton"

export default function ContactLoading() {
	return (
		<div className='flex min-h-[80vh] flex-col'>
			{/* Hero Section Skeleton */}
			<div className='relative h-64 overflow-hidden sm:h-80 md:h-96'>
				<div className='from-text-foreground/70 to-text-foreground/50 absolute inset-0 z-10 bg-gradient-to-r rtl:bg-gradient-to-l' />
				<Skeleton className='absolute inset-0 h-full w-full object-cover' />
				<div className='custom-container relative z-20 flex h-full flex-col items-center justify-center text-center'>
					<Skeleton className='bg-background/80 mb-4 h-10 w-48 md:h-12 md:w-64 lg:h-14 lg:w-80' />
					<Skeleton className='bg-background/70 h-6 w-80 md:w-96' />
				</div>
			</div>

			{/* Main Content Skeleton */}
			<div className='custom-container flex flex-col items-center space-y-8 py-12'>
				{/* Restaurant Name */}
				<Skeleton className='bg-background mb-2 h-8 w-40 md:w-56' />
				{/* Slogan */}
				<Skeleton className='bg-background/80 mb-2 h-5 w-32 md:w-44' />
				{/* Short Bio */}
				<Skeleton className='bg-background/70 mb-6 h-4 w-80 md:w-[28rem]' />
				<Skeleton className='bg-background/70 mb-8 h-4 w-64 md:w-96' />

				{/* Social Icons Skeleton */}
				<div className='mb-8 flex justify-center gap-4'>
					<Skeleton className='bg-background/80 h-10 w-10 rounded-full' />
					<Skeleton className='bg-background/80 h-10 w-10 rounded-full' />
					<Skeleton className='bg-background/80 h-10 w-10 rounded-full' />
				</div>

				{/* Contact Info Skeleton */}
				<div className='flex flex-col items-center justify-center gap-4 md:flex-row'>
					<Skeleton className='bg-background/80 h-5 w-32' />
					<Skeleton className='bg-background/80 h-5 w-48' />
				</div>
			</div>
		</div>
	)
}
