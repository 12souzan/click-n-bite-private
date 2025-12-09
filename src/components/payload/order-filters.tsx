"use client"
import React from "react"

interface FilterProps {
	searchTerm: string
	setSearchTerm: (value: string) => void
	statusFilter: string
	setStatusFilter: (value: string) => void
	onReset: () => void
}

const ExternalOrdersFilter: React.FC<FilterProps> = ({
	searchTerm,
	setSearchTerm,
	statusFilter,
	setStatusFilter,
	onReset
}) => {
	return (
		<div className='mb-6 bg-transparent'>
			<div className='mb-4 grid grid-cols-1 gap-4 md:grid-cols-3'>
				{/* Search Input */}
				<div className='bg-transparent'>
					<label className='mb-2 block text-sm font-medium text-black dark:text-white'>Search (Name, ID, Table)</label>
					<input
						type='text'
						placeholder='Customer name, Order ID, Table #'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className='w-full rounded-md border border-gray-600 bg-transparent px-3 py-2 text-black focus:ring-2 focus:ring-green-500 focus:outline-none dark:text-white'
					/>
				</div>

				{/* Status Filter */}
				<div className='bg-transparent'>
					<label className='mb-2 block text-sm font-medium text-black dark:text-white'>Status</label>
					<select
						value={statusFilter}
						onChange={(e) => setStatusFilter(e.target.value)}
						className='w-full rounded-md border border-gray-600 bg-transparent px-3 py-2 text-black focus:ring-2 focus:ring-green-500 focus:outline-none dark:text-white'>
						<option value='all'>All Statuses</option>
						<option value='PENDING'>Pending</option>
						<option value='PAID'>Paid</option>
						<option value='FAILED'>Failed</option>
						<option value='CANCELED'>Cancelled</option>
					</select>
				</div>

				<div className='flex items-end'>
					<button
						onClick={onReset}
						className='rounded-md border border-gray-600 bg-transparent px-4 py-2 text-black transition-colors dark:text-white'>
						Reset Filters
					</button>
				</div>
			</div>
		</div>
	)
}

export default ExternalOrdersFilter
