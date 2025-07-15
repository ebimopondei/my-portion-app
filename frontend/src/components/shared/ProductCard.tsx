import { Star, ShoppingCart, Users, Eye, Edit3, Share2 } from "lucide-react"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import type { ProductAttribute } from "@shared/types/product"
import { Status } from "@shared/enums"

// Customer Product Interface
interface CustomerProduct {
  id: number
  name: string
  vendor: string
  price: number
  originalPrice: number
  unit: string
  rating: number
  reviews: number
  image: string
  groupBuying: boolean
  minOrder: number
  currentOrders: number
}


interface CustomerProductCardProps {
  product: CustomerProduct
  onAddToCart: () => void
}

interface VendorProductCardProps {
  product: ProductAttribute
  onEdit: (product: ProductAttribute) => void
  onShare: (product: ProductAttribute) => void
  onView: (product: ProductAttribute) => void
}

// Customer Product Card
export function CustomerProductCard({ product, onAddToCart }: CustomerProductCardProps) {
  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
  const groupProgress = product.groupBuying ? (product.currentOrders / product.minOrder) * 100 : 0

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <div className="relative">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
        {product.groupBuying && (
          <Badge className="absolute top-3 left-3 bg-emerald-600 text-white">
            <Users className="w-3 h-3 mr-1" />
            Group Buy
          </Badge>
        )}
        {discountPercentage > 0 && (
          <Badge className="absolute top-3 right-3 bg-red-500 text-white">-{discountPercentage}%</Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-lg text-gray-900 mb-1">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-3">{product.vendor}</p>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium ml-1">{product.rating}</span>
          </div>
          <span className="text-gray-300">•</span>
          <span className="text-sm text-gray-500">{product.reviews} reviews</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">₦{product.price.toLocaleString()}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-400 line-through">₦{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <span className="text-sm text-gray-500">per {product.unit}</span>
        </div>

        {/* Group Buying Progress */}
        {product.groupBuying && (
          <div className="mb-4 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-emerald-700 font-medium">Group Progress</span>
              <span className="text-emerald-600 font-semibold">
                {product.currentOrders}/{product.minOrder}
              </span>
            </div>
            <div className="w-full bg-emerald-200 rounded-full h-2">
              <div
                className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(groupProgress, 100)}%` }}
              />
            </div>
            <p className="text-xs text-emerald-600 mt-1">
              {product.minOrder - product.currentOrders > 0
                ? `${product.minOrder - product.currentOrders} more needed`
                : "Ready to order!"}
            </p>
          </div>
        )}

        {/* Add to Cart Button */}
        <Button onClick={onAddToCart} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  )
}

// Vendor Product Card
export function VendorProductCard({ product, onEdit, onShare, onView }: VendorProductCardProps) {
  const getStatusColor = (status: ProductAttribute['status']): string => {
    switch(status) {
      case Status.Delivered: return 'bg-green-100 text-green-800'
      case Status.Pending: return 'bg-yellow-100 text-yellow-800'
      case Status.Cancelled: return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: ProductAttribute['status']): string => {
    switch(status) {
      case Status.Cancelled: return Status.Cancelled
      case Status.Delivered: return Status.Delivered
      case Status.Pending: return Status.Pending
      default: return 'Unknown'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="relative">
        <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover" />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(product.status)}`}>
            {getStatusText(product.status)}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-green-600 font-bold text-xl mb-2">₦{product.price_per_portion}</p>
        {/* <p className="text-gray-600 text-sm mb-2">{product.quantity_unit} • {product.category}</p> */}
        
        <div className="flex justify-between text-sm text-gray-500 mb-3">
          <span>Available: {product.available_portions}</span>
          <span>Booked: {product.available_portions}</span>
        </div>
        
        {/* <div className="flex items-center space-x-2 mb-4">
          {product.pickupAvailable && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Pickup</span>
          )}
          {product.deliveryAvailable && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Delivery</span>
          )}
        </div> */}
        
        <div className="flex space-x-2">
          <button 
            onClick={() => onView(product)}
            className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm hover:bg-gray-200 flex items-center justify-center"
          >
            <Eye size={16} className="mr-1" />
            View
          </button>
          <button 
            onClick={() => onEdit(product)}
            className="flex-1 bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600 flex items-center justify-center"
          >
            <Edit3 size={16} className="mr-1" />
            Edit
          </button>
          <button 
            onClick={() => onShare(product)}
            className="flex-1 bg-green-500 text-white px-3 py-2 rounded text-sm hover:bg-green-600 flex items-center justify-center"
          >
            <Share2 size={16} className="mr-1" />
            Share
          </button>
        </div>
      </div>
    </div>
  )
} 