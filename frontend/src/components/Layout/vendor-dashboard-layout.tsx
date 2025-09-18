import { useState } from "react"
import { 
  VendorNavbar, 
  type TabId,  
  notifications,
} from "../vendor"
import { Outlet } from "react-router-dom";


export default function VendorDashboardLayout() {

  const [activeTab, setActiveTab] = useState<TabId>('dashboard')
  const unreadNotifications = notifications.filter(n => !n.read).length

  return (
    <div className="min-h-screen bg-gray-50">
      <VendorNavbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        notificationCount={unreadNotifications}
      />
      <Outlet />
    </div>
  )
}