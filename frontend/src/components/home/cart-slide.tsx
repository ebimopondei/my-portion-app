"use client"

import { X, ShoppingBag } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { CartContent } from "./cart-content"
import { useCartState } from "@/zustand/hooks/cart/cart.hook"


interface CartSlideProps {
  isOpen: boolean
  onClose: () => void
}

export function CartSlide({ isOpen, onClose }: CartSlideProps) {
  const { data: { cartItems} } = useCartState()

// @ts-expect-error
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-20 z-50 transition-opacity" onClick={onClose} />}

      {/* Cart Slide */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-semibold text-gray-900">Shopping Cart</h2>
              <Badge className="bg-emerald-100 text-emerald-800">{cartItems.length}</Badge>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
              <X className="w-5 h-5" />
            </Button>
          </div>

          <CartContent />
          <div className="px-6">
                <Button variant="outline" className="w-full bg-transparent" onClick={onClose}>
                  Continue Shopping
                </Button>
          </div>
        </div>
      </div>
    </>
  )
}
