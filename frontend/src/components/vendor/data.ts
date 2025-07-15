import type { Product, ProductOrder } from './types'

// Vendor profile data
export const vendorData = {
  name: "Lagos Wholesale Hub",
  email: "contact@lagoswholesale.com",
  phone: "08012345678",
  city: "Lagos",
  kycStatus: "verified",
  joinDate: "Jan 2024"
}

// Dashboard statistics
export const dashboardStats = {
  totalProducts: 8,
  activeProducts: 6,
  pendingOrders: 4,
  completedOrders: 23,
  walletBalance: 125000,
  monthlyRevenue: 450000,
  totalCustomers: 45,
  productViews: 128,
  newOrders: 4
}

// Mock vendor products
export const vendorProducts: Product[] = [
  {
    id: 1,
    name: "Premium Basmati Rice",
    price: 45000,
    unit: "50kg bag",
    totalQuantity: 100,
    totalPortions: 20,
    availablePortions: 13,
    bookedPortions: 7,
    image: "/placeholder.svg?height=200&width=300",
    status: "active",
    created: "2024-01-15",
    category: "Grains",
    pickupAvailable: true,
    deliveryAvailable: true
  },
  {
    id: 2,
    name: "Brown Beans (Oloyin)",
    price: 38000,
    unit: "50kg bag",
    totalQuantity: 50,
    totalPortions: 10,
    availablePortions: 2,
    bookedPortions: 8,
    image: "/placeholder.svg?height=200&width=300",
    status: "active",
    created: "2024-01-10",
    category: "Legumes",
    pickupAvailable: true,
    deliveryAvailable: false
  },

]

// Mock recent orders
export const recentOrders: ProductOrder[] = [
  {
    productId: 1,
    productName: "Premium Basmati Rice",
    totalPortions: 7,
    totalAmount: 31500,
    customerOrders: [
      {
        id: "CUST001",
        customerName: "John Doe",
        portions: 2,
        price: 9000,
        phone: "08012345678",
        deliveryAddress: "Lagos Island, Lagos",
        deliveryType: "Delivery",
        status: "pending",
        orderDate: "2024-01-21",
        timeAgo: "2 hours ago"
      },
      {
        id: "CUST002",
        customerName: "Jane Smith",
        portions: 3,
        price: 13500,
        phone: "08087654321",
        deliveryAddress: "Victoria Island, Lagos",
        deliveryType: "Delivery",
        status: "pending",
        orderDate: "2024-01-21",
        timeAgo: "3 hours ago"
      },
      {
        id: "CUST003",
        customerName: "Mike Johnson",
        portions: 2,
        price: 9000,
        phone: "08098765432",
        deliveryAddress: "Pickup Location",
        deliveryType: "Pickup",
        status: "pending",
        orderDate: "2024-01-21",
        timeAgo: "4 hours ago"
      }
    ],
    status: "pending",
    created: "2024-01-21"
  },
  {
    productId: 2,
    productName: "Brown Beans (Oloyin)",
    totalPortions: 8,
    totalAmount: 30400,
    customerOrders: [
      {
        id: "CUST004",
        customerName: "Sarah Wilson",
        portions: 4,
        price: 15200,
        phone: "08011111111",
        deliveryAddress: "Ikeja, Lagos",
        deliveryType: "Delivery",
        status: "delivered",
        orderDate: "2024-01-20",
        timeAgo: "1 day ago"
      },
      {
        id: "CUST005",
        customerName: "David Brown",
        portions: 2,
        price: 7600,
        phone: "08022222222",
        deliveryAddress: "Pickup Location",
        deliveryType: "Pickup",
        status: "delivered",
        orderDate: "2024-01-20",
        timeAgo: "1 day ago"
      },
      {
        id: "CUST006",
        customerName: "Lisa Garcia",
        portions: 2,
        price: 7600,
        phone: "08033333333",
        deliveryAddress: "Surulere, Lagos",
        deliveryType: "Delivery",
        status: "delivered",
        orderDate: "2024-01-20",
        timeAgo: "1 day ago"
      }
    ],
    status: "delivered",
    created: "2024-01-20"
  },
  {
    productId: 1,
    productName: "Premium Basmati Rice",
    totalPortions: 5,
    totalAmount: 22500,
    customerOrders: [
      {
        id: "CUST007",
        customerName: "Robert Taylor",
        portions: 3,
        price: 13500,
        phone: "08044444444",
        deliveryAddress: "Lekki, Lagos",
        deliveryType: "Delivery",
        status: "processing",
        orderDate: "2024-01-21",
        timeAgo: "5 hours ago"
      },
      {
        id: "CUST008",
        customerName: "Emma Davis",
        portions: 2,
        price: 9000,
        phone: "08055555555",
        deliveryAddress: "Pickup Location",
        deliveryType: "Pickup",
        status: "processing",
        orderDate: "2024-01-21",
        timeAgo: "6 hours ago"
      }
    ],
    status: "processing",
    created: "2024-01-21"
  }
]

// Mock notifications
export const notifications = [
  {
    id: 1,
    type: "order",
    title: "New Order Received",
    message: "John Doe placed an order for Premium Basmati Rice",
    time: "2 hours ago",
    read: false
  },
  {
    id: 2,
    type: "payment",
    title: "Payment Received",
    message: "₦3,800 credited to your wallet",
    time: "1 day ago",
    read: false
  },
  {
    id: 3,
    type: "product",
    title: "Product Approved",
    message: "Brown Beans (Oloyin) has been approved and is now live",
    time: "2 days ago",
    read: true
  }
] 