"use client"

import { Search, ShoppingCart, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image";
import Link from "next/link";

interface NavbarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  cartItems: number
  onMenuClick: () => void
  onCartClick: () => void
}

export function Navbar({ searchQuery, setSearchQuery, cartItems, onMenuClick, onCartClick }: NavbarProps) {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-4 ">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between gap-4">
          {/* Logo */}
          <div>
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" width={140} height={36} alt="portion-logo" />
            </Link>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-3">
            {/* Cart */}
            <Button variant="ghost" size="sm" className="relative p-2" onClick={onCartClick}>
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              {cartItems > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs bg-emerald-600">
                  {cartItems}
                </Badge>
              )}
            </Button>

            {/* Menu Button */}
            <Button variant="ghost" size="sm" onClick={onMenuClick} className="flex items-center space-x-2 p-2">
              <Menu className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-semibold text-gray-600">Menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-4">
          {/* Top Row: Logo and Actions */}
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">Portion</span>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Cart */}
              <Button variant="ghost" size="sm" className="relative p-2" onClick={onCartClick}>
                <ShoppingCart className="w-5 h-5 text-gray-600" />
                {cartItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs bg-emerald-600">
                    {cartItems}
                  </Badge>
                )}
              </Button>

              {/* Menu Button */}
              <Button variant="ghost" size="sm" onClick={onMenuClick} className="flex items-center space-x-2 p-2">
                <Menu className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-600">Menu</span>
              </Button>
            </div>
          </div>

          {/* Bottom Row: Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 w-full"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
