"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, ShoppingCart, Users, Star, Filter, Leaf, Bell, User, Heart, Truck } from "lucide-react"
import Image from "next/image"

const categories = [
  { name: "Rice", icon: "🌾", count: 45 },
  { name: "Beans", icon: "🫘", count: 32 },
  { name: "Yam", icon: "🍠", count: 28 },
  { name: "Plantain", icon: "🍌", count: 22 },
  { name: "Tomatoes", icon: "🍅", count: 38 },
  { name: "Onions", icon: "🧅", count: 25 },
  { name: "Pepper", icon: "🌶️", count: 19 },
  { name: "Garri", icon: "🥣", count: 15 },
]

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
    image: "/placeholder.svg?height=200&width=200",
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
    image: "/placeholder.svg?height=200&width=200",
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
    image: "/placeholder.svg?height=200&width=200",
    groupBuying: false,
    minOrder: 5,
    currentOrders: 0,
  },
]

export default function BuyerDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [cartItems, setCartItems] = useState(0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold text-primary">Portion</span>
              </div>
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search for rice, beans, yam..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {cartItems}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="sm">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <Button key={category.name} variant="ghost" className="w-full justify-between hover:bg-primary/5">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{category.icon}</span>
                      <span>{category.name}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Active Group Buys</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">Rice Group Buy</span>
                    <Badge className="bg-green-100 text-green-800">7/10</Badge>
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: "70%" }}></div>
                  </div>
                  <p className="text-xs text-green-700 mt-1">3 more needed</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">Beans Group Buy</span>
                    <Badge className="bg-orange-100 text-orange-800">8/8</Badge>
                  </div>
                  <div className="w-full bg-orange-200 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: "100%" }}></div>
                  </div>
                  <p className="text-xs text-orange-700 mt-1">Ready to order!</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="browse" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="browse">Browse</TabsTrigger>
                <TabsTrigger value="groups">Group Buying</TabsTrigger>
                <TabsTrigger value="orders">My Orders</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
              </TabsList>

              <TabsContent value="browse" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Browse Products</h2>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <Card key={product.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="relative mb-4">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={200}
                            height={200}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          {product.groupBuying && (
                            <Badge className="absolute top-2 left-2 bg-secondary text-white">
                              <Users className="w-3 h-3 mr-1" />
                              Group Buy
                            </Badge>
                          )}
                        </div>

                        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{product.vendor}</p>

                        <div className="flex items-center space-x-2 mb-3">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm ml-1">{product.rating}</span>
                          </div>
                          <span className="text-gray-400">•</span>
                          <span className="text-sm text-gray-600">{product.reviews} reviews</span>
                        </div>

                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <span className="text-2xl font-bold text-primary">₦{product.price.toLocaleString()}</span>
                            <span className="text-sm text-gray-500 line-through ml-2">
                              ₦{product.originalPrice.toLocaleString()}
                            </span>
                          </div>
                          <span className="text-sm text-gray-600">per {product.unit}</span>
                        </div>

                        {product.groupBuying && (
                          <div className="mb-3 p-2 bg-green-50 rounded border border-green-200">
                            <div className="flex items-center justify-between text-sm">
                              <span>Group Progress:</span>
                              <span className="font-medium">
                                {product.currentOrders}/{product.minOrder}
                              </span>
                            </div>
                            <div className="w-full bg-green-200 rounded-full h-2 mt-1">
                              <div
                                className="bg-green-600 h-2 rounded-full"
                                style={{ width: `${(product.currentOrders / product.minOrder) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        )}

                        <Button
                          className="w-full bg-primary hover:bg-primary/90"
                          onClick={() => setCartItems(cartItems + 1)}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="groups" className="space-y-6">
                <h2 className="text-2xl font-bold">Group Buying</h2>
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Active Group Purchases</span>
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          Create Group
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                              <span className="text-2xl">🌾</span>
                            </div>
                            <div>
                              <h3 className="font-semibold">Premium Basmati Rice Group</h3>
                              <p className="text-sm text-gray-600">50kg bags • ₦45,000 each</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className="bg-green-100 text-green-800 mb-2">7/10 joined</Badge>
                            <p className="text-sm text-gray-600">3 days left</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="orders" className="space-y-6">
                <h2 className="text-2xl font-bold">My Orders</h2>
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold">Order #POR-2024-001</h3>
                          <p className="text-sm text-gray-600">Placed on Jan 15, 2024</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          <Truck className="w-3 h-3 mr-1" />
                          In Transit
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Premium Basmati Rice (50kg)</span>
                          <span>₦45,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Brown Beans (50kg)</span>
                          <span>₦38,000</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between font-semibold">
                          <span>Total</span>
                          <span>₦83,000</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="profile" className="space-y-6">
                <h2 className="text-2xl font-bold">Profile Settings</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue="John" />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue="Doe" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="john@example.com" />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" defaultValue="+234 801 234 5678" />
                      </div>
                      <Button className="bg-primary hover:bg-primary/90">Update Profile</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
