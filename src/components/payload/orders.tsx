"use client"
import { Order } from "@/lib/payload/types"
import React, { useState, useEffect, useMemo } from "react"
import EmptyState from "./empty-order"
import OrderTable from "./order-table"
import OrderModal from "./order-details"
import Loading from "./loading-orders-data"
import "./../../styles/hide-search.css"
import ExternalOrdersFilter from "./order-filters"

const ExternalOrdersView: React.FC = () => {
	const [orders, setOrders] = useState<Order[]>([])

	const [loading, setLoading] = useState(true)

	const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

	const [isModalOpen, setIsModalOpen] = useState(false)

	const [searchTerm, setSearchTerm] = useState("")

	const [statusFilter, setStatusFilter] = useState("all")

	const fetchOrders = async () => {
		setLoading(true)

		try {
			const response = await fetch("/api/external-orders", {
				method: "GET",
				credentials: "include"
			})

			const data = await response.json()

			if (Array.isArray(data)) {
				setOrders(data)
			} else {
				setOrders([data])
			}
		} catch (error) {
			console.error("Error fetching orders:", error)
			setOrders([])
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchOrders()
	}, [])

	const filteredOrders = useMemo(() => {
		return orders.filter((order) => {
			const matchesSearch =
				searchTerm === "" ||
				order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
				order.id.toString().includes(searchTerm) ||
				order.tableNumber.toLowerCase().includes(searchTerm.toLowerCase())

			const matchesStatus = statusFilter === "all" || order.status === statusFilter

			return matchesSearch && matchesStatus
		})
	}, [orders, searchTerm, statusFilter])

	// const handleStatusUpdate = async (orderId: number, newStatus: string) => {
	//   try {
	//     const cleanStatus = newStatus.replace(/"/g, '');
	//     console.log('orderId',orderId)
	//     const res = await fetch(`http://130.61.17.86:8080/api/orders/${orderId}`, {
	//       method: "PATCH",
	//       headers: { "Content-Type": "application/json" },
	//       body: JSON.stringify({ status: cleanStatus }),
	//     });

	//     if (!res.ok) throw new Error("Failed to update status");

	//     setOrders(prev => prev.map(order =>
	//       order.id === orderId ? { ...order, status: cleanStatus } : order
	//     ));

	//     if (selectedOrder && selectedOrder.id === orderId) {
	//       setSelectedOrder({ ...selectedOrder, status: cleanStatus });
	//     }

	//     alert("Status updated successfully!");
	//   } catch (err) {
	//     console.error("Error updating status:", err);
	//     alert("Failed to update status");
	//   }
	// };

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit"
		})
	}

	const getStatusColor = (status: string) => {
		switch (status) {
			case "PAID":
				return "bg-green-600 text-white"
			case "PENDING":
				return "bg-yellow-400 text-black border border-white"
			case "FAILED":
				return "bg-red-500 text-white border border-white"
			case "CANCELED":
				return "bg-gray-400 text-black border border-black"
			default:
				return "bg-white text-black border border-black"
		}
	}

	const openModal = (order: Order) => {
		setSelectedOrder(order)
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
		setSelectedOrder(null)
	}

	const resetFilters = () => {
		setSearchTerm("")
		setStatusFilter("all")
	}

	if (loading) {
		return <Loading />
	}

	return (
		<div className='min-h-screen bg-transparent p-8 text-white'>
			<div className='mx-auto max-w-7xl'>
				<div className='mb-8 flex items-center justify-between'>
					<button
						onClick={fetchOrders}
						className='cursor-pointer rounded-lg border border-gray-600 bg-transparent px-6 py-3 font-medium text-black transition-colors dark:text-white'>
						Refresh Orders
					</button>
				</div>

				<ExternalOrdersFilter
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					statusFilter={statusFilter}
					setStatusFilter={setStatusFilter}
					onReset={resetFilters}
				/>

				{filteredOrders.length === 0 ? (
					<EmptyState onRetry={resetFilters} />
				) : (
					<OrderTable
						orders={filteredOrders}
						// onStatusUpdate={handleStatusUpdate}
						onViewDetails={openModal}
						formatDate={formatDate}
						getStatusColor={getStatusColor}
					/>
				)}

				{selectedOrder && (
					<OrderModal
						order={selectedOrder}
						isOpen={isModalOpen}
						onClose={closeModal}
						// onStatusUpdate={handleStatusUpdate}
						formatDate={formatDate}
						getStatusColor={getStatusColor}
					/>
				)}
			</div>
		</div>
	)
}

export default ExternalOrdersView
