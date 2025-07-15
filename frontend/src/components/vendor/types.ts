import type { ProductAttribute } from "@shared/types/product";
import type { LucideIcon } from "lucide-react"

export type TabId = 'dashboard' | 'products' | 'orders' | 'wallet' | 'profile' | 'notifications';
export type ProductStatus = 'active' | 'pending_approval' | 'inactive';
export type OrderStatus = 'pending' | 'processing' | 'delivered';

export interface NavItem {
  id: TabId;
  label: string;
  icon: LucideIcon;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  unit: string;
  totalQuantity: number;
  totalPortions: number;
  availablePortions: number;
  bookedPortions: number;
  image: string;
  status: ProductStatus;
  created: string;
  category: string;
  pickupAvailable: boolean;
  deliveryAvailable: boolean;
}

// Individual customer order for a portion
export interface CustomerOrder {
  id: string;
  customerName: string;
  portions: number;
  price: number;
  phone: string;
  deliveryAddress: string;
  deliveryType: 'Pickup' | 'Delivery';
  status: OrderStatus;
  orderDate: string;
  timeAgo: string;
}

// Product order with multiple customers
export interface ProductOrder {
  productId: number;
  productName: string;
  totalPortions: number;
  totalAmount: number;
  customerOrders: CustomerOrder[];
  status: OrderStatus;
  created: string;
}

export interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color?: string;
  trend?: string;
}

export interface ProductCardProps {
  product: ProductAttribute;
  onEdit: (product: ProductAttribute) => void;
  onShare: (product: ProductAttribute) => void;
  onView: (product: ProductAttribute) => void;
}

export interface OrderCardProps {
  order: ProductOrder;
  onMarkDelivered: (productId: number) => void;
}

export interface VendorNavbarProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  notificationCount: number;
} 