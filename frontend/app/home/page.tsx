"use client"

import { useState } from "react"
import { Navbar } from "@/components/home/navbar"
import { SlideMenu } from "@/components/home/slide-menu"
import { Categories } from "@/components/home/categories"
import { CustomTabs, CustomTabsList, CustomTabsTrigger, CustomTabsContent } from "@/components/home/custom-tabs"
import { ProductCard } from "@/components/home/product-card"
import { CartSlide } from "@/components/home/cart-slide"

const products = [
  {
    id: 1,
    name: "Premium Basmati Rice",
    vendor: "Lagos Wholesale Hub",
    price: 45000,
    originalPrice: 52000,
    unit: "50kg bag",
    rating: 4.8,
    reviews: 124,
    image: "/placeholder.svg?height=200&width=300",
    groupBuying: true,
    minOrder: 10,
    currentOrders: 7,
  },
  {
    id: 2,
    name: "Brown Beans (Oloyin)",
    vendor: "Kano Agro Supplies",
    price: 38000,
    originalPrice: 44000,
    unit: "50kg bag",
    rating: 4.6,
    reviews: 89,
    image: "/placeholder.svg?height=200&width=300",
    groupBuying: true,
    minOrder: 8,
    currentOrders: 8,
  },
  {
    id: 3,
    name: "Fresh Yam Tubers",
    vendor: "Benue Farm Direct",
    price: 25000,
    originalPrice: 30000,
    unit: "100kg",
    rating: 4.9,
    reviews: 156,
    image: "/placeholder.svg?height=200&width=300",
    groupBuying: false,
    minOrder: 5,
    currentOrders: 0,
  },
  {
    id: 4,
    name: "Sweet Plantain",
    vendor: "Cross River Farms",
    price: 15000,
    originalPrice: 18000,
    unit: "100 fingers",
    rating: 4.7,
    reviews: 92,
    image: "/placeholder.svg?height=200&width=300",
    groupBuying: true,
    minOrder: 6,
    currentOrders: 4,
  },
  {
    id: 5,
    name: "Fresh Tomatoes",
    vendor: "Kaduna Fresh Produce",
    price: 12000,
    originalPrice: 15000,
    unit: "50kg basket",
    rating: 4.5,
    reviews: 67,
    image: "/placeholder.svg?height=200&width=300",
    groupBuying: false,
    minOrder: 0,
    currentOrders: 0,
  },
  {
    id: 6,
    name: "Red Onions",
    vendor: "Sokoto Agro Hub",
    price: 20000,
    originalPrice: 24000,
    unit: "100kg bag",
    rating: 4.6,
    reviews: 78,
    image: "/placeholder.svg?height=200&width=300",
    groupBuying: true,
    minOrder: 12,
    currentOrders: 9,
  },
]

const activeDeals = products.filter((product) => product.groupBuying && product.currentOrders >= product.minOrder)

export default function BuyerDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [cartItems, setCartItems] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  // Add cart state
  const [isCartOpen, setIsCartOpen] = useState(false)

  const handleAddToCart = () => {
    setCartItems(cartItems + 1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartItems={cartItems}
        onMenuClick={() => setIsMenuOpen(true)}
        onCartClick={() => setIsCartOpen(true)}
      />

      <SlideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <CartSlide isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <main className="max-w-7xl mx-auto px-6 lg:px-16 py-8">
        <Categories />

        <CustomTabs>
          <CustomTabsList>
            <CustomTabsTrigger value="browse">Browse</CustomTabsTrigger>
            <CustomTabsTrigger value="deals">Active Deals</CustomTabsTrigger>
          </CustomTabsList>

          <CustomTabsContent value="browse">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </div>
          </CustomTabsContent>

          <CustomTabsContent value="deals">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeDeals.length > 0 ? (
                activeDeals.map((product) => (
                  <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">No active deals available at the moment.</p>
                  <p className="text-gray-400 text-sm mt-2">Check back later for group buying opportunities!</p>
                </div>
              )}
            </div>
          </CustomTabsContent>
        </CustomTabs>
      </main>
    </div>
  )
}
