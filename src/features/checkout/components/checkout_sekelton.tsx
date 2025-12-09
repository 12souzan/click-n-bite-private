export const CheckoutSelectionSkeleton = () => (
	<div className='min-h-screen p-4'>
		<div className='mx-auto flex min-h-screen max-w-md flex-col justify-center space-y-6'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-2'>
					<div className='mr-2 h-4 w-4 animate-pulse rounded bg-gray-200' />
					<div className='h-4 w-16 animate-pulse rounded bg-gray-200' />
				</div>

				<div className='text-right'>
					<div className='mr-2 mb-1 h-4 w-20 animate-pulse rounded bg-gray-200' />
					<div className='h-3 w-16 animate-pulse rounded bg-gray-200' />
				</div>
			</div>

			<div className='bg-card rounded-lg border p-4'>
				<div className='mb-2 flex items-center justify-between'>
					<div className='h-4 w-24 animate-pulse rounded bg-gray-200' />
					<div className='h-6 w-16 animate-pulse rounded bg-gray-200' />
				</div>
				<div className='h-3 w-20 animate-pulse rounded bg-gray-200' />
			</div>

			<div className='bg-card space-y-4 rounded-xl border p-6'>
				<div className='mb-4 text-center'>
					<div className='mx-auto mb-2 h-7 w-48 animate-pulse rounded bg-gray-200' />
					<div className='mx-auto h-4 w-32 animate-pulse rounded bg-gray-200' />
				</div>

				<div className='space-y-3'>
					{[1, 2, 3].map((item) => (
						<div
							key={item}
							className='flex animate-pulse items-center justify-between rounded-lg border bg-gray-100 p-4'>
							<div className='flex items-center'>
								<div className='mr-3 h-10 w-10 rounded-full bg-gray-300' />
								<div className='h-5 w-24 rounded bg-gray-300' />
							</div>
							<div className='h-6 w-6 rounded-full bg-gray-300' />
						</div>
					))}
				</div>
			</div>
		</div>
	</div>
)

export default CheckoutSelectionSkeleton
