export const BlobsBackground = () => (
	<>
		<div className='absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 rtl:bg-gradient-to-bl dark:from-blue-900/10 dark:via-blue-900/10 dark:to-purple-900/10' />
		<div className='animate-blob absolute start-0 top-0 size-72 rounded-full bg-blue-400 opacity-20 mix-blend-multiply blur-xl dark:bg-blue-600' />
		<div className='animate-blob animation-delay-2000 absolute end-0 top-0 size-72 rounded-full bg-purple-400 opacity-20 mix-blend-multiply blur-xl dark:bg-purple-600' />
		<div className='animate-blob animation-delay-4000 absolute start-20 -bottom-8 size-72 rounded-full bg-pink-400 opacity-20 mix-blend-multiply blur-xl dark:bg-pink-600' />
	</>
)
