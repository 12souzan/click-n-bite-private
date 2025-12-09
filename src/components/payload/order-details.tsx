"use client"
import { Order } from "@/lib/payload/types"
import React from "react"

interface OrderModalProps {
	order: Order
	isOpen: boolean
	onClose: () => void
	// onStatusUpdate: (orderId: number, newStatus: string) => void
	formatDate: (dateString: string) => string
	getStatusColor: (status: string) => string
}

const OrderModal: React.FC<OrderModalProps> = ({
	order,
	isOpen,
	onClose,
	// onStatusUpdate,
	formatDate,
	getStatusColor
}) => {
	if (!isOpen) return null

	return (
		<div className='bg-opacity-80 fixed inset-0 z-50 flex items-center justify-center bg-black p-4'>
			<div className='max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg border border-white bg-black p-6'>
				<div className='mb-6 flex items-center justify-between'>
					<h2 className='text-xl font-bold text-white'>Order #{order.id} Details</h2>
					<button
						onClick={onClose}
						className='rounded border border-white bg-black px-4 py-2 text-white transition-colors hover:bg-white hover:text-black'>
						Close
					</button>
				</div>

				<div className='mb-6 rounded-lg bg-gray-900 p-4'>
					<h3 className='mb-3 text-lg font-semibold text-white'>Customer Information</h3>
					<div className='grid grid-cols-1 gap-4 text-white md:grid-cols-3'>
						{/* <div><strong>Name:</strong> {order.customerName || 'Not specified'}</div>
                        <div><strong>Email:</strong> {order.customerEmail || 'Not specified'}</div>
                        <div><strong>Phone:</strong> {order.customerPhone || 'Not specified'}</div> */}
						<div>
							<strong>Table:</strong> {order.tableNumber}
						</div>
					</div>
				</div>

				<div className='mb-6 rounded-lg bg-gray-900 p-4'>
					<h3 className='mb-3 text-lg font-semibold text-white'>Order Summary</h3>
					<div className='grid grid-cols-1 gap-4 text-white md:grid-cols-2 lg:grid-cols-3'>
						<div className='flex items-center'>
							<strong className='mr-2'>Status:</strong>
							<div className={`ml-2 rounded px-2 py-1 text-sm ${getStatusColor(order.status)}`}>{order.status}</div>
							{/* <select
                                value={order.status}
                                onChange={(e) => onStatusUpdate(order.id, e.target.value)}
                                className={`ml-2 px-2 py-1 rounded text-sm ${getStatusColor(order.status)}`}
                            >
                                <option value="PENDING">Pending</option>
                                <option value="PAID">Paid</option>
                                <option value="FAILED">Failed</option>
                                <option value="CANCELED">Cancelled</option>
                            </select> */}
						</div>
						<div>
							<strong>Total Items:</strong> {order.totalItems}
						</div>
						<div>
							<strong>Total Calories:</strong> {order.totalCalories} cal
						</div>
						<div>
							<strong>Total Price:</strong> {order.formattedTotalPrice}
						</div>
						<div>
							<strong>Payment Method:</strong> {order.paymentMethod || "Not specified"}
						</div>
						<div>
							<strong>Created:</strong> {formatDate(order.createdAt)}
						</div>
					</div>
				</div>

				<div>
					<h3 className='mb-4 text-lg font-semibold text-white'>Order Items</h3>
					{order.categories.map((category) => (
						<div key={category.id} className='mb-6'>
							<h4 className='rounded-t-lg bg-gray-900 px-4 py-3 font-semibold text-white'>
								{category.name} ({category.totalItems} items • {category.totalCalories} cal • {category.totalPrice})
							</h4>
							<table className='w-full border-collapse'>
								<thead>
									<tr className='bg-gray-800'>
										<th className='border-b border-gray-700 p-3 text-left text-white'>Item</th>
										<th className='border-b border-gray-700 p-3 text-left text-white'>Qty</th>
										<th className='border-b border-gray-700 p-3 text-left text-white'>Instructions</th>
										<th className='border-b border-gray-700 p-3 text-left text-white'>Price</th>
										<th className='border-b border-gray-700 p-3 text-left text-white'>Calories</th>
									</tr>
								</thead>
								<tbody>
									{category.items.map((item) => (
										<tr key={item.id} className='border-b border-gray-700 hover:bg-gray-800'>
											<td className='p-3 text-white'>{item.name}</td>
											<td className='p-3 text-white'>{item.quantity}</td>
											<td className='p-3 text-gray-400'>{item.instructions || "None"}</td>
											<td className='p-3 text-white'>${item.totalPrice}</td>
											<td className='p-3 text-white'>{item.totalCalories} cal</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default OrderModal
