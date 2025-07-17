import type { OrderCardProps } from "./types"
import { Users, Package, Clock, MoreHorizontal } from "lucide-react"
import { useState } from "react"
import Modal from "../ui/modal"
import type { OrderWithUser } from "@shared/types/product"
import type { Status } from "@shared/enums"

const OrderCard = ({ order, onMarkDelivered }: OrderCardProps) => {
  const [showCustomerModal, setShowCustomerModal] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<OrderWithUser | null>(null)

  const getStatusColor = (status: Status): string => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-blue-100 text-blue-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // const totalCustomers = order?.length
  // const totalPortions = order?.reduce((sum, customer) => sum + customer.portions, 0)

  const handleMarkCustomerDelivered = (customerId: string) => {
    // In a real implementation, you would use the customerId to mark specific customer as delivered
    // For now, we'll use the productId as the identifier
    console.log(`Marking customer ${customerId} as delivered`)
    onMarkDelivered(Number(order?.id))
  }

  const openCustomerModal = (customer: OrderWithUser) => {
    setSelectedCustomer(customer)
    setShowCustomerModal(true)
  }

  console.log(order?.status)
  console.log(order)

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg">{order?.name}</h3>
          <p className="text-gray-600 text-sm">Product ID: #{order?.id}</p>
          {/* <p className="text-gray-500 text-sm">{order?.createdAt}</p> */}
          <p className="text-gray-500 text-sm">{order?.createdAt?.toString()}</p>
        </div>
        <span className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(order?.status)}`}>
          {order?.status.charAt(0).toUpperCase() + order?.status.slice(1)}
        </span>
      </div>
      
      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-sm text-gray-600">Customers</p>
          <p className="font-bold text-lg">{order?.orders.length}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Package className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-sm text-gray-600">Total Portions</p>
          <p className="font-bold text-lg">{order?.total_quantity/ order?.portion_size}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Clock className="w-4 h-4 text-orange-600" />
          </div>
          <p className="text-sm text-gray-600">Total Amount</p>
          <p className="font-bold text-lg text-green-600">₦{order?.orders[0]?.amount.toLocaleString()}</p>
        </div>
      </div>

      {/* Customer Orders Table */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Customer Orders ({order?.orders.length})</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 font-medium text-gray-700">Customer</th>
                <th className="text-left py-2 font-medium text-gray-700">Portions</th>
                <th className="text-left py-2 font-medium text-gray-700">Amount</th>
                <th className="text-left py-2 font-medium text-gray-700">Status</th>
                <th className="text-left py-2 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {order?.orders.map((customer) => (
                <tr 
                  key={customer.id} 
                  className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => openCustomerModal(customer)}
                >
                  <td className="py-2">
                    <div>
                      <p className="font-medium text-gray-900">{customer.User.firstname}</p>
                      {/* <p className="text-xs text-gray-500">{customer.timeAgo}</p> */}
                    </div>
                  </td>
                  <td className="py-2 text-gray-600">{customer.portion}</td>
                  <td className="py-2 text-green-600 font-medium">₦{Number(customer.amount) * customer.portion}</td>
                  <td className="py-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      customer.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      customer.status === 'cancelled' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        openCustomerModal(customer)
                      }}
                      className="text-gray-500 hover:text-gray-700 p-1"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Details Modal */}
      <Modal
        isOpen={showCustomerModal}
        onClose={() => setShowCustomerModal(false)}
        title="Customer Details"
        maxWidth="max-w-md"
      >
        {selectedCustomer && (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900">{selectedCustomer.User.firstname}</h4>
              {/* <p className="text-sm text-gray-500">{selectedCustomer.timeAgo}</p> */}
            </div>
            
            <div className="space-y-3">
              {/* <div className="flex justify-between">
                <span className="text-gray-600">Phone:</span>
                <span className="font-medium">{selectedCustomer.User.phone}</span>
              </div> */}
              {/* <div className="flex justify-between">
                <span className="text-gray-600">Delivery Address:</span>
                <span className="font-medium text-right">{selectedCustomer.User.}</span>
              </div> */}
              
              <div className="flex justify-between">
                <span className="text-gray-600">Portions:</span>
                <span className="font-medium">{selectedCustomer.portion}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium text-green-600">₦{selectedCustomer.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  selectedCustomer.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  selectedCustomer.status === 'cancelled' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {selectedCustomer.status.charAt(0).toUpperCase() + selectedCustomer.status.slice(1)}
                </span>
              </div>
            </div>
            
            {selectedCustomer.status === 'pending' && (
              <button 
                onClick={() => {
                  handleMarkCustomerDelivered(String(order?.id))
                  setShowCustomerModal(false)
                }}
                className="w-full bg-green-500 text-white py-2 rounded text-sm hover:bg-green-600"
              >
                Mark as Delivered
              </button>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}

export default OrderCard 