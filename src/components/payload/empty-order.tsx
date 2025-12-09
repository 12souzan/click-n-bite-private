"use client"
import React from "react"

interface EmptyStateProps {
	onRetry: () => void
}

const EmptyState: React.FC<EmptyStateProps> = ({ onRetry }) => {
	return (
		<div className='rounded-lg border border-black bg-transparent p-12 text-center dark:border-white'>
			<h3 className='mb-4 text-xl font-semibold text-black dark:text-white'>No Orders Found</h3>
			<p className='mb-6 text-gray-400'>No orders available in the system.</p>
			<button
				onClick={onRetry}
				className='rounded-lg bg-transparent px-6 py-2 text-black transition-colors hover:bg-green-700 dark:text-white'>
				Try Again
			</button>
		</div>
	)
}

export default EmptyState
