"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function MenuLoadingSkeleton() {
	return (
		<>
			<div className='border-border bg-muted/5 sticky top-[64px] z-50 border-b backdrop-blur-md'>
				<div className='custom-container flex justify-between p-4'>
					<Skeleton className='h-8 w-[100px]' />

					<div className='flex items-center gap-2'>
						<Skeleton className='h-8 w-[115px]' />
						<Skeleton className='size-8' />
					</div>
				</div>
			</div>

			<section className='custom-container relative z-10 flex flex-grow flex-col gap-6 py-6'>
				<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3'>
					{[...Array(6)].map((_, i) => (
						<div
							key={i}
							className='border-border/70 bg-background flex h-[330px] flex-1 flex-col overflow-hidden rounded-lg border'>
							{/* Image skeleton */}
							<Skeleton className='relative h-48 w-[500px] max-w-full rounded-b-none' />
							{/* Content skeleton */}
							<div className='flex flex-1 flex-col gap-2 px-3 py-2.5'>
								<div className='mb-2 flex items-center justify-between'>
									<Skeleton className='h-5 w-32' />
									<Skeleton className='h-5 w-12' />
								</div>

								<Skeleton className='h-4 w-full' />
								<Skeleton className='h-4 w-2/3' />
							</div>
							{/* Footer skeleton */}
							<div className='flex items-end justify-between gap-2 p-2.5 pt-0'>
								<Skeleton className='h-4 w-14' />
								<Skeleton className='h-8 w-28' />
							</div>
						</div>
					))}
				</div>
			</section>
		</>
	)
}
