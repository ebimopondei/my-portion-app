import { Bell, Package, ShoppingCart, DollarSign, TrendingUp, Users, Menu, X, LogOut } from "lucide-react"
import type { VendorNavbarProps, NavItem } from "./types"
import Logo from "../shared/Logo"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import useAuth from "@/hooks/auth-provider"

const VendorNavbar = ({ activeTab, setActiveTab, notificationCount }: VendorNavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const { logoutAuth } = useAuth()
  
  const navItems: NavItem[] = [
    { id: 'dashboard', url: "", label: 'Overview', icon: TrendingUp },
    { id: 'products', url: "products", label: 'Products', icon: Package },
    { id: 'orders', url: "orders", label: 'Orders', icon: ShoppingCart },
    { id: 'wallet', url: "wallet", label: 'Wallet', icon: DollarSign },
    { id: 'profile', url: "profile", label: 'Profile', icon: Users },
    { id: 'notifications', url: "notification", label: 'Notifications', icon: Bell },
  ]

  const handleNavItemClick = (tabId: string) => {
    setActiveTab(tabId as any)
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="bg-white shadow-sm border-b relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Desktop Layout */}
        <div className="hidden md:flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <Logo />
          </div>
          
          <div className="flex items-center space-x-6">
            {navItems.map(item => {
              const Icon = item.icon
              return (
                <Link 
                  to={item.url ? `/dashboard/${item.url}` : `/dashboard`}
                  key={item.id}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === (item.url ? `/dashboard/${item.url}` : `/dashboard`)
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                  {item.id === 'notifications' && notificationCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] h-5 flex items-center justify-center">
                      {notificationCount}
                    </span>
                  )}
                </Link>
              )
            })}
            <button 
              onClick={()=>logoutAuth()}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors`}
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Top Row: Logo, Title, and Menu Button */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-3">
              <Logo variant="mobile" />
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Notifications Badge */}
              {notificationCount > 0 && (
                <div className="relative">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] h-5 flex items-center justify-center">
                    {notificationCount}
                  </span>
                </div>
              )}
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-600" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg z-50"
              >
                <div className="px-6 py-6 space-y-2">
                  {navItems.map(item => {
                    const Icon = item.icon
                    return (
                      <Link to={item.url}
                        key={item.id}
                        onClick={() => handleNavItemClick(item.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                          activeTab === item.id
                            ? 'bg-green-100 text-green-700'
                            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon size={18} />
                          <span>{item.label}</span>
                        </div>
                        {item.id === 'notifications' && notificationCount > 0 && (
                          <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] h-5 flex items-center justify-center">
                            {notificationCount}
                          </span>
                        )}
                      </Link>
                    )
                  })}
                  <button 
                    onClick={()=>logoutAuth()}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors`}
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  )
}

export default VendorNavbar 