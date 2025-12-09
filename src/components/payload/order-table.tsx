"use client"
import { Order } from "@/lib/payload/types"
import { EyeIcon } from "lucide-react"
import React from "react"

interface OrderTableProps {
	orders: Order[]
	// onStatusUpdate: (orderId: number, newStatus: string) => void
	onViewDetails: (order: Order) => void
	formatDate: (dateString: string) => string
	getStatusColor: (status: string) => string
}

const OrderTable: React.FC<OrderTableProps> = ({
	orders,
	// onStatusUpdate,
	onViewDetails,
	formatDate,
	getStatusColor
}) => {
	return (
		<div className='overflow-hidden rounded-lg border-x border-t border-black bg-transparent dark:border-white'>
			<table className='w-full border-collapse'>
				<thead>
					<tr className='border-b border-black bg-transparent dark:border-white'>
						<th className='p-4 text-left font-semibold text-black dark:text-white'>Order ID</th>
						<th className='p-4 text-left font-semibold text-black dark:text-white'>Customer</th>
						<th className='p-4 text-left font-semibold text-black dark:text-white'>Table</th>
						<th className='p-4 text-left font-semibold text-black dark:text-white'>Total Price</th>
						<th className='p-4 text-left font-semibold text-black dark:text-white'>Status</th>
						<th className='p-4 text-left font-semibold text-black dark:text-white'>Created</th>
						<th className='p-4 text-left font-semibold text-black dark:text-white'>Actions</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((order) => (
						<tr key={order.id} className='border-b border-gray-800 transition-colors'>
							<td className='p-4 font-medium text-black dark:text-white'>#{order.id}</td>
							<td className='p-4 text-black dark:text-white'>{order.customerName || "Walk-in Customer"}</td>
							<td className='p-4 text-black dark:text-white'>{order.tableNumber}</td>
							<td className='p-4 font-bold text-black'>{order.formattedTotalPrice}</td>
							{/* <td className="p-4">
                                <select
                                    value={order.status}
                                    onChange={(e) => onStatusUpdate(order.id, e.target.value)}
                                    className={`px-3 py-2 rounded text-sm font-medium cursor-pointer transition-colors ${getStatusColor(order.status)}`}
                                >
                                    <option value="PENDING">Pending</option>
                                    <option value="PAID">Paid</option>
                                    <option value="FAILED">Failed</option>
                                    <option value="CANCELED">Cancelled</option>
                                </select>
                            </td> */}

							<td className='p-4'>
								<p
									className={`cursor-pointer rounded px-3 py-2 text-center text-sm font-medium transition-colors ${getStatusColor(order.status)}`}>
									{order.status}
								</p>
							</td>
							<td className='p-4 text-gray-700'>{formatDate(order.createdAt)}</td>
							<td className='p-4'>
								<button
									onClick={() => onViewDetails(order)}
									className='cursor-pointer border-none bg-transparent px-4 py-2 text-sm'>
									<EyeIcon className='rounded text-black transition-colors hover:text-gray-400 dark:text-white' />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default OrderTable
