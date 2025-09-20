import { useState } from 'react'
import Header from './admin/header'
import Sidebar from './admin/sidebar'
import { Outlet } from 'react-router-dom';

type Props = {}

export default function AdminDashboardLayout({}: Props) {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    const toggleSidebar = (): void => {
        setIsSidebarOpen(!isSidebarOpen);
    };
  return (
    <div className="min-h-screen">
      <Header onMenuClick={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <Outlet />
    </div>
  )
}