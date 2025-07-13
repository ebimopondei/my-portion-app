import { useState } from "react"
import { 
  VendorNavbar, 
  VendorHeader, 
  DashboardContent, 
  ProductsContent, 
  OrdersContent,
  WalletContent,
  BusinessProfileTab,
  AddProductModal,
  type TabId, 
  type Product, 
  type ProductOrder,
  vendorData,
  dashboardStats,
  vendorProducts,
  recentOrders,
  notifications
} from "../../components/vendor"

// Mock vendor profile data
const vendorProfileData = {
  businessName: "Lagos Wholesale Hub",
  email: "contact@lagoswholesale.com",
  phone: "08012345678",
  address: "123 Victoria Island, Lagos, Nigeria",
  description: "Premium wholesale supplier of grains, legumes, and fresh produce. Serving Lagos businesses with quality products at competitive prices.",
  logo: "/placeholder.svg",
  kycStatus: "verified" as const,
  bankDetails: {
    bankName: "First Bank of Nigeria",
    accountNumber: "1234567890",
    accountName: "LAGOS WHOLESALE HUB"
  },
  kycInfo: {
    fullName: "John Doe",
    bvn: "12345678901",
    idNumber: "NIN12345678901",
    idType: "NIN"
  },
  notificationPreferences: {
    emailOrders: true,
    smsOrders: true
  }
}

export default function VendorDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard')
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false)
  const [profileData, setProfileData] = useState(vendorProfileData)
  const unreadNotifications = notifications.filter(n => !n.read).length

  // Event handlers
  const handleEditProduct = (product: Product) => {
    console.log('Edit product:', product)
  }

  const handleShareProduct = (product: Product) => {
    console.log('Share product:', product)
  }

  const handleViewProduct = (product: Product) => {
    console.log('View product:', product)
  }

  const handleMarkDelivered = (productId: number) => {
    console.log('Mark delivered for product:', productId)
  }

  const handleViewOrderDetails = (order: ProductOrder) => {
    console.log('View order details:', order)
  }

  const handleAddProduct = () => {
    setIsAddProductModalOpen(true)
  }

  const handleSubmitProduct = (productData: any) => {
    console.log('Submit product:', productData)
  }

  const handleSaveDraft = (productData: any) => {
    console.log('Save draft:', productData)
  }

  const handleWithdrawFunds = () => {
    console.log('Withdraw funds')
  }

  // Profile handlers
  const handleSaveBusinessProfile = (data: any) => {
    console.log('Saving business profile:', data)
    setProfileData(prev => ({ ...prev, ...data }))
  }




  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <DashboardContent
            vendorProducts={vendorProducts}
            dashboardStats={dashboardStats}
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
            onShareProduct={handleShareProduct}
            onWithdrawFunds={handleWithdrawFunds}
          />
        )
      case 'products':
        return (
          <ProductsContent
            vendorProducts={vendorProducts}
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
            onShareProduct={handleShareProduct}
            onViewProduct={handleViewProduct}
          />
        )
      case 'orders':
        return (
          <OrdersContent
            recentOrders={recentOrders}
            onMarkDelivered={handleMarkDelivered}
            onViewDetails={handleViewOrderDetails}
          />
        )
      case 'wallet':
        return (
          <WalletContent
            walletBalance={dashboardStats.walletBalance}
            bankDetails={profileData.bankDetails}
            kycStatus={profileData.kycStatus}
            onWithdrawFunds={handleWithdrawFunds}
          />
        )
      case 'profile':
        return (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold">Profile Settings</h2>
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="border-b border-gray-200">
                <div className="px-6 py-4">
                  <h3 className="text-lg font-semibold text-gray-900">Business Profile</h3>
                  <p className="text-gray-600 mt-1">Manage your business information and settings</p>
                </div>
              </div>
              <div className="p-6">
                <BusinessProfileTab
                  profileData={profileData}
                  onSave={handleSaveBusinessProfile}
                />
              </div>
            </div>
          </div>
        )
      case 'notifications':
        return (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold">Notifications</h2>
            <div className="space-y-4">
              {notifications.map(notification => (
                <div key={notification.id} className="bg-white rounded-lg shadow-sm border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{notification.title}</h4>
                      <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                      <p className="text-gray-400 text-xs mt-2">{notification.time}</p>
                    </div>
                    {!notification.read && (
                      <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1">
                        New
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Coming soon...</p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <VendorNavbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        notificationCount={unreadNotifications}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-4 sm:py-8">
        <VendorHeader vendorData={vendorData} />
        {renderContent()}
      </main>

      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        onSubmit={handleSubmitProduct}
        onSaveDraft={handleSaveDraft}
      />
    </div>
  )
}