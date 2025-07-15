import { useState } from "react"
import { Clock, Package, CheckCircle, XCircle, MoreHorizontal, MapPin, Truck } from "lucide-react"
import { Button } from "../ui/button"
import Toast from "../ui/toast"
import type { Order, OrderStatus } from "../../types/order"

interface OrderCardProps {
  order: Order
  onOrderClick: (order: Order) => void
  onStatusUpdate: (orderId: string, newStatus: OrderStatus) => void
}

export default function OrderCard({ order, onOrderClick, onStatusUpdate }: OrderCardProps) {
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState<"success" | "error" | "info">("success")

  const getStatusColor = (status: OrderStatus): string => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: OrderStatus) => {
    switch(status) {
      case 'pending': return <Clock className="w-4 h-4" />
      case 'processing': return <Package className="w-4 h-4" />
      case 'delivered': return <CheckCircle className="w-4 h-4" />
      case 'cancelled': return <XCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const handleMarkAsReceived = () => {
    try {
      onStatusUpdate(order.id, 'delivered')
      setToastMessage("Order marked as received successfully!")
      setToastType("success")
      setShowToast(true)
    } catch (error) {
      setToastMessage("Failed to update order status")
      setToastType("error")
      setShowToast(true)
    }
  }

  const canMarkAsReceived = order.status === 'processing' || order.status === 'pending'

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-xl text-gray-900">{order.productName}</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(order.status)}`}>
              {getStatusIcon(order.status)}
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>
          <button className="text-gray-400 hover:text-gray-600 p-2">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
        
        {/* Main Info Grid - 6 items in 3x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Vendor</p>
            <p className="font-medium text-gray-900">{order.vendorName}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Order Number</p>
            <p className="font-medium text-gray-900">{order.orderNumber}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Total Amount</p>
            <p className="font-medium text-green-600 text-lg">₦{order.totalAmount.toLocaleString()}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Portions</p>
            <p className="font-medium text-gray-900">{order.portions}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Order Date</p>
            <p className="font-medium text-gray-900">{order.orderDate}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Delivery Type</p>
            <p className="font-medium text-gray-900">{order.deliveryType}</p>
          </div>
        </div>

        {/* Delivery Info Row */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <p className="text-sm font-medium text-gray-700">Delivery Information</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Estimated Delivery</p>
              <p className="font-medium text-gray-900">{order.estimatedDelivery}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Delivery Address</p>
              <p className="font-medium text-gray-900">{order.deliveryAddress}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {canMarkAsReceived && (
            <Button
              onClick={(e) => {
                e.stopPropagation()
                handleMarkAsReceived()
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 flex-1"
            >
              <Truck className="w-5 h-5 mr-2" />
              Mark as Received
            </Button>
          )}
          <Button
            onClick={() => onOrderClick(order)}
            variant="outline"
            className="px-6 py-3 flex-1"
          >
            View Details
          </Button>
        </div>
      </div>

      <Toast
        message={toastMessage}
        type={toastType}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        duration={3000}
      />
    </>
  )
}