"use client"

import { Star, ShoppingCart, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface Product {
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

interface ProductCardProps {
  product: Product
  onAddToCart: () => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
  const groupProgress = product.groupBuying ? (product.currentOrders / product.minOrder) * 100 : 0

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <div className="relative">
        <Image
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
