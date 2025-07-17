import type { ProductWithOrders } from '@shared/types/product'
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



export const recentOrders: ProductWithOrders[] = [
    {
      "id": "c5b6cba1-85e8-4a61-b6f9-1334cc37e28c",
      "seller_id": "6e809be8-ba03-4356-8770-034fca63167d",
      "name": "Portion",
      "description": "",
      "category": "Tubers & Root Crops",
      "image_url": "https://res.cloudinary.com/di1vgb850/image/upload/v1752710104/dev/u79dpsyconnm6dry4af3.jpg",
      "video_url": "https://res.cloudinary.com/di1vgb850/image/upload/v1752710105/dev/v08lt3uzgqcsrw4auzso.jpg",
      "total_quantity": 100,
      "quantity_unit": "kg",
      "status": "pending",
      "portion_size": 20,
      "price_per_portion": 4500,
      "available_portions": 20,
      "location": "",
      
      "orders": [
        {
          "id": "df4ea2ea-71c6-46d3-ba06-de720e8094db",
          "user_id": "8c4452d4-7ce8-4544-9988-c1d9dbc642e3",
          "product_id": "c5b6cba1-85e8-4a61-b6f9-1334cc37e28c",
          "status": "pending",
          "amount": "4500",
          "portion": 2,
          
          "User": {
            "id": "8c4452d4-7ce8-4544-9988-c1d9dbc642e3",
            "username": "aria-3117",
            "firstname": "Aria",
            "lastname": "Brown",
            "email": "ariabrownfx@gmail.com",
            "password": "$2b$10$9vtTPh.Z0XESuVpNM.UEweJedNL1O3sP.PTEpMuhWrFrRzzuIzmGK",
            "role": "user",
            "email_verified": false,
            "kyc_verified": false,
            
          }
        }
      ]
    },
    {
      "id": "db7f3afe-c481-4844-b43c-a13219b785ef",
      "seller_id": "6e809be8-ba03-4356-8770-034fca63167d",
      "name": "Portion Touch",
      "description": "",
      "category": "Tubers & Root Crops",
      "image_url": "https://res.cloudinary.com/di1vgb850/image/upload/v1752710123/dev/euncepyuw1elxzedvkae.jpg",
      "video_url": "https://res.cloudinary.com/di1vgb850/image/upload/v1752710124/dev/g8rwnt34qve9meqyj1zy.jpg",
      "total_quantity": 200,
      "quantity_unit": "kg",
      "status": "pending",
      "portion_size": 50,
      "price_per_portion": 9000,
      "available_portions": 50,
      "location": "",
      
      "orders": [
        {
          "id": "a54a26f2-653e-4c00-ac63-f489c3aaa11a",
          "user_id": "8c4452d4-7ce8-4544-9988-c1d9dbc642e3",
          "product_id": "db7f3afe-c481-4844-b43c-a13219b785ef",
          "status": "pending",
          "amount": "9000",
          "portion": 1,
          
          "User": {
            "id": "8c4452d4-7ce8-4544-9988-c1d9dbc642e3",
            "username": "aria-3117",
            "firstname": "Aria",
            "lastname": "Brown",
            "email": "ariabrownfx@gmail.com",
            "password": "$2b$10$9vtTPh.Z0XESuVpNM.UEweJedNL1O3sP.PTEpMuhWrFrRzzuIzmGK",
            "role": "user",
            "email_verified": false,
            "kyc_verified": false,
            
          }
        },
        {
          "id": "c0a36afc-8a5c-40a7-be96-b88c73a88fae",
          "user_id": "8c4452d4-7ce8-4544-9988-c1d9dbc642e3",
          "product_id": "db7f3afe-c481-4844-b43c-a13219b785ef",
          "status": "pending",
          "amount": "9000",
          "portion": 1,
          
          "User": {
            "id": "8c4452d4-7ce8-4544-9988-c1d9dbc642e3",
            "username": "aria-3117",
            "firstname": "Aria",
            "lastname": "Brown",
            "email": "ariabrownfx@gmail.com",
            "password": "$2b$10$9vtTPh.Z0XESuVpNM.UEweJedNL1O3sP.PTEpMuhWrFrRzzuIzmGK",
            "role": "user",
            "email_verified": false,
            "kyc_verified": false,
            
          }
        }
      ]
    }
  ]

// Mock recent orders
export const recentOrderss: ProductOrder[] = [
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