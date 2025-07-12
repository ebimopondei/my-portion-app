import { X, Edit, Package, Heart, Bell, LogOut } from "lucide-react"
import { Button } from "../../components/ui/button"

interface SlideMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function SlideMenu({ isOpen, onClose }: SlideMenuProps) {
  const menuItems = [
    { icon: Package, label: "Orders", href: "#" },
    { icon: Heart, label: "Wishlist", href: "#" },
    { icon: Bell, label: "Notifications", href: "#" },
  ]

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-20 z-50 transition-opacity" onClick={onClose} />}

      {/* Slide Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* User Profile */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src="/placeholder.svg?height=60&width=60"
                  alt="Profile"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">John Doe</h3>
                <p className="text-sm text-gray-500">john@example.com</p>
              </div>
              <Button variant="ghost" size="sm" className="p-2">
                <Edit className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 py-4">
            {menuItems.map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center space-x-4 px-6 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <item.icon className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Logout */}
          <div className="p-6 border-t border-gray-100">
            <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
