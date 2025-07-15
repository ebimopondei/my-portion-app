export type OrderStatus = 'pending' | 'processing' | 'delivered' | 'cancelled'

export interface Order {
  id: string
  productName: string
  productId: number
  vendorName: string
  portions: number
  price: number
  totalAmount: number
  status: OrderStatus
  orderDate: string
  timeAgo: string
  deliveryAddress: string
  deliveryType: 'Pickup' | 'Delivery'
  estimatedDelivery: string
  orderNumber: string
  deliveredDate?: string
  cancelledDate?: string
  cancellationReason?: string
} 