"use client"
import React from "react"

const Loading: React.FC = () => {
	return (
		<div className='flex min-h-screen items-center justify-center bg-transparent text-black dark:text-white'>
			<div className='text-lg'>Loading orders...</div>
		</div>
	)
}

export default Loading
