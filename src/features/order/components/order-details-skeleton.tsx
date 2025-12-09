export const OrderDetailsSkeleton = () => (
	<div className='mx-auto w-full max-w-2xl flex-1 p-4 print:p-0'>
		{/* Header skeleton (actions + table number) */}
		<div className='mb-4 flex flex-col gap-4 print:hidden'>
			<div className='flex items-center justify-between'>
				<div className='h-8 w-8 animate-pulse rounded bg-gray-200' />
				<div className='flex gap-2'>
					<div className='h-8 w-16 animate-pulse rounded bg-gray-200' />
					<div className='h-8 w-16 animate-pulse rounded bg-gray-200' />
					<div className='h-8 w-16 animate-pulse rounded bg-gray-200' />
					<div className='h-8 w-16 animate-pulse rounded bg-gray-200' />
				</div>
			</div>
			<div className='flex justify-between rounded bg-white p-2.5 dark:bg-gray-900'>
				<div className='h-4 w-24 animate-pulse rounded bg-gray-200' />
				<div className='h-8 w-20 animate-pulse rounded bg-gray-200' />
			</div>
		</div>

		{/* Main order details skeleton */}
		<div className='space-y-6 py-4'>
			{[1, 2].map((cat) => (
				<div key={cat} className='mb-4 rounded-md bg-white p-2.5 dark:bg-gray-900'>
					<div className='mb-1 flex items-center pb-2 font-medium'>
						<div className='me-2 size-4 animate-pulse rounded-full bg-gray-200' />
						<div className='h-4 w-24 animate-pulse rounded bg-gray-200' />
					</div>
					<div className='space-y-2.5'>
						{[1, 2].map((item) => (
							<div key={item} className='rounded-lg bg-gray-50 p-2 sm:p-3 dark:bg-gray-800'>
								<div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
									<div className='flex-1'>
										<div className='mb-1 h-4 w-32 animate-pulse rounded bg-gray-200' />
									</div>
									<div className='text-end sm:ms-4 sm:min-w-[100px]'>
										<div className='mb-1 h-4 w-16 animate-pulse rounded bg-gray-200' />
										<div className='h-3 w-12 animate-pulse rounded bg-gray-200' />
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			))}
		</div>

		{/* Total section skeleton */}
		<div className='sticky bottom-2 mt-4 rounded-md border border-gray-200 bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-900'>
			<div className='flex items-center justify-between pb-2 font-bold'>
				<div className='h-4 w-16 animate-pulse rounded bg-gray-200' />
				<div className='h-4 w-20 animate-pulse rounded bg-gray-200' />
			</div>
			<div className='border-t border-gray-200/50 pt-2 text-center text-xs text-gray-500 dark:text-gray-400'>
				<div className='mx-auto mb-1 h-3 w-40 animate-pulse rounded bg-gray-200' />
				<div className='mx-auto h-3 w-48 animate-pulse rounded bg-gray-200' />
			</div>
		</div>
	</div>
)
