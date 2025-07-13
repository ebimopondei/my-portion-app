import type { OrderCardProps, OrderStatus, CustomerOrder } from "./types"
import { Users, Package, Clock } from "lucide-react"

const OrderCard = ({ order, onMarkDelivered, onViewDetails }: OrderCardProps) => {
  const getStatusColor = (status: OrderStatus): string => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const totalCustomers = order.customerOrders.length
  const totalPortions = order.customerOrders.reduce((sum, customer) => sum + customer.portions, 0)

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg">{order.productName}</h3>
          <p className="text-gray-600 text-sm">Product ID: #{order.productId}</p>
          <p className="text-gray-500 text-sm">{order.created}</p>
        </div>
        <span className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(order.status)}`}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </div>
      
      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-sm text-gray-600">Customers</p>
          <p className="font-bold text-lg">{totalCustomers}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Package className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-sm text-gray-600">Total Portions</p>
          <p className="font-bold text-lg">{totalPortions}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Clock className="w-4 h-4 text-orange-600" />
          </div>
          <p className="text-sm text-gray-600">Total Amount</p>
          <p className="font-bold text-lg text-green-600">₦{order.totalAmount.toLocaleString()}</p>
        </div>
      </div>

      {/* Customer List Preview */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-2">Customer Orders ({totalCustomers})</h4>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {order.customerOrders.slice(0, 3).map((customer: CustomerOrder) => (
            <div key={customer.id} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
              <div>
                <span className="font-medium">{customer.customerName}</span>
                <span className="text-gray-500 ml-2">({customer.portions} portions)</span>
              </div>
              <span className="text-green-600 font-medium">₦{customer.price.toLocaleString()}</span>
            </div>
          ))}
          {order.customerOrders.length > 3 && (
            <div className="text-center text-sm text-gray-500 py-1">
              +{order.customerOrders.length - 3} more customers
            </div>
          )}
        </div>
      </div>
      
      <div className="flex space-x-2">
        <button 
          onClick={() => onViewDetails(order)}
          className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-200"
        >
          View All Details
        </button>
        {order.status === 'pending' && (
          <button 
            onClick={() => onMarkDelivered(order.productId)}
            className="flex-1 bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600"
          >
            Mark as Delivered
          </button>
        )}
      </div>
    </div>
  )
}

export default OrderCard 