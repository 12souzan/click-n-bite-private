export const SuccessPaymentSkeleton = () => {
	return (
		<div className='flex min-h-screen flex-col items-center justify-center p-4 dark:bg-black'>
			<div className='w-full max-w-xl'>
				<div className='mb-4 flex animate-pulse items-center justify-between rounded-2xl bg-gray-200 p-4 dark:bg-gray-700'>
					<div className='flex space-x-3'>
						<div className='h-10 w-10 rounded-lg bg-gray-300 dark:bg-gray-600'></div>
						<div className='h-10 w-10 rounded-lg bg-gray-300 dark:bg-gray-600'></div>
						<div className='h-10 w-10 rounded-lg bg-gray-300 dark:bg-gray-600'></div>
					</div>
					<div className='h-10 w-20 rounded-lg bg-gray-300 dark:bg-gray-600'></div>
				</div>

				<div className='mt-4 overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800'>
					<div className='relative mb-8 flex justify-center'>
						<div className='relative rounded-2xl bg-gray-200 p-6 dark:bg-gray-700'>
							<div className='h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600'></div>
						</div>
					</div>

					<div className='mb-8 text-center'>
						<div className='mx-auto mb-3 h-8 w-3/4 rounded-lg bg-gray-200 dark:bg-gray-700'></div>
						<div className='mx-auto h-4 w-5/6 rounded-lg bg-gray-200 dark:bg-gray-700'></div>
						<div className='mx-auto mt-2 h-4 w-4/6 rounded-lg bg-gray-200 dark:bg-gray-700'></div>
					</div>

					<div className='mb-8 rounded-2xl bg-gray-50 p-6 dark:bg-gray-700/50'>
						<div className='mx-auto mb-5 h-6 w-1/3 rounded-lg bg-gray-200 dark:bg-gray-600'></div>

						<div className='space-y-4'>
							<div className='flex items-center justify-between border-b border-gray-100 py-2 dark:border-gray-600'>
								<div className='h-4 w-1/4 rounded-lg bg-gray-200 dark:bg-gray-600'></div>
								<div className='h-8 w-1/3 rounded-lg bg-gray-200 dark:bg-gray-600'></div>
							</div>

							<div className='flex items-center justify-between border-b border-gray-100 py-2 dark:border-gray-600'>
								<div className='h-4 w-1/4 rounded-lg bg-gray-200 dark:bg-gray-600'></div>
								<div className='h-8 w-1/4 rounded-lg bg-gray-200 dark:bg-gray-600'></div>
							</div>

							<div className='flex items-center justify-between py-2'>
								<div className='h-4 w-1/6 rounded-lg bg-gray-200 dark:bg-gray-600'></div>
								<div className='h-8 w-1/4 rounded-lg bg-gray-200 dark:bg-gray-600'></div>
							</div>
						</div>
					</div>

					<div className='mb-8 rounded-2xl border border-gray-200 bg-gray-100 p-5 text-center dark:border-gray-600 dark:bg-gray-700'>
						<div className='mx-auto mb-3 h-6 w-2/3 rounded-lg bg-gray-200 dark:bg-gray-600'></div>
						<div className='mx-auto h-8 w-1/2 rounded-lg bg-gray-200 dark:bg-gray-600'></div>
					</div>

					<div className='mb-8 grid grid-cols-1 gap-3'>
						<div className='h-12 rounded-xl bg-gray-200 dark:bg-gray-700'></div>
					</div>

					<div className='border-t border-gray-200 pt-6 text-center dark:border-gray-600'>
						<div className='mx-auto mb-2 h-3 w-5/6 rounded-lg bg-gray-200 dark:bg-gray-600'></div>
						<div className='mx-auto h-3 w-2/3 rounded-lg bg-gray-200 dark:bg-gray-600'></div>
					</div>
				</div>
			</div>
		</div>
	)
}
