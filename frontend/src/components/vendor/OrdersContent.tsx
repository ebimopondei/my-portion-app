import type { ProductWithOrders } from "@shared/types/product"
import { OrderCard } from "./index"

interface OrdersContentProps {
  recentOrders: ProductWithOrders[]
  onMarkDelivered: (productId: number) => void
}

const OrdersContent = ({ recentOrders, onMarkDelivered }: OrdersContentProps) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold">Orders</h2>
        <div className="flex flex-wrap gap-2">
          <button className="px-3 sm:px-4 py-2 bg-green-500 text-white rounded-lg text-xs sm:text-sm">
            All ({recentOrders.length})
          </button>
          <button className="px-3 sm:px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-xs sm:text-sm">
            Pending ({recentOrders.filter(o => o.status === 'pending').length})
          </button>
          <button className="px-3 sm:px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-xs sm:text-sm">
            Delivered ({recentOrders.filter(o => o.status === 'delivered').length})
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {recentOrders.map(order => (
          <OrderCard 
            key={order.id} 
            order={order}
            onMarkDelivered={onMarkDelivered}
          />
        ))}
      </div>
    </div>
  )
}

export default OrdersContent 