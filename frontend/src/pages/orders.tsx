import { useState } from "react"
import { Navbar } from "../components/home/navbar"
import { SlideMenu } from "../components/home/slide-menu"
import { CartSlide } from "../components/home/cart-slide"
import useCartItem from "@/hooks/cart-provider"

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { cartCount } = useCartItem()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartItems={cartCount}
        onMenuClick={() => setIsMenuOpen(true)}
        onCartClick={() => setIsCartOpen(true)}
      />

      <SlideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <CartSlide isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <main className="max-w-7xl mx-auto px-6 lg:px-16 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track your orders and view order history</p>
        </div>

        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Orders page coming soon</h3>
          <p className="text-gray-500">This page will show your order history</p>
        </div>
      </main>
    </div>
  )
} 