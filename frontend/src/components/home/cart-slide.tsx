"use client"

import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import useCartItem from "@/hooks/cart-provider"
import useAuth from "@/hooks/auth-provider"
import { Link, useNavigate } from "react-router-dom"


interface CartSlideProps {
  isOpen: boolean
  onClose: () => void
}

export function CartSlide({ isOpen, onClose }: CartSlideProps) {
  const { cartItems, updateCartItemQuantity, removeFromCart } = useCartItem()
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

// @ts-expect-error
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const serviceCharge = 100;
  const deliveryFee = 1000;
  const shippingCost = cartItems.reduce((sum, _) => sum + deliveryFee, 0) // Free shipping over #50
  const total = subtotal + deliveryFee + serviceCharge + shippingCost

  const handleCheckout = () => {
    if (!isLoggedIn) {
      navigate('/login')
      onClose()
    } else {
      // Handle checkout for authenticated users
      console.log('Proceeding to checkout...')
    }
  }

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

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-4">Add some products to get started</p>
                <Button onClick={onClose} className="bg-emerald-600 hover:bg-emerald-700">
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="relative flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                      {item.groupBuying && (
                        <Badge className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs">Group</Badge>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 text-sm leading-tight mb-1">{item.name}</h3>
                      <p className="text-xs text-gray-500 mb-2">{item.vendor}</p>
                      <p className="text-sm font-semibold text-gray-900 mb-3">
                      {/* @ts-expect-error */}
                        ₦{item.price.toLocaleString()}{" "}
                        <span className="text-xs font-normal text-gray-500">per {item.unit}</span>
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-8 h-8 p-0 bg-transparent"
                            // @ts-expect-error
                            onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                            >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-8 h-8 p-0 bg-transparent"
                            // @ts-expect-error
                            onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                            >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2"
                          // @ts-expect-error
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Summary */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-100 p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Service Charge:</span>
                  <span>₦{serviceCharge.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">₦{shippingCost.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-bold text-lg text-emerald-600">₦{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={handleCheckout}
                >
                  <Link to={`${isLoggedIn ? '/checkout': '/login'}`}>
                  {isLoggedIn ? 'Proceed to Checkout' : 'Sign In to Checkout'}
                  </Link>
                </Button>
                <Button variant="outline" className="w-full bg-transparent" onClick={onClose}>
                  Continue Shopping
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
