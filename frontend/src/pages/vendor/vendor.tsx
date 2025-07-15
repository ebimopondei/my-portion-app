import { useState, useEffect } from "react"
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
  vendorData,
  dashboardStats,
  recentOrders,
  notifications,
} from "../../components/vendor"
import type { ProductAttribute } from "@shared/types/product";
import ProductApi from "@/api/products/products-api";

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

  const [ vendorProducts, setVendorProducts ] = useState<ProductAttribute[]>([]);

  const { getProducts } = ProductApi()

  const [activeTab, setActiveTab] = useState<TabId>('dashboard')
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false)
  const [profileData] = useState(vendorProfileData)
  const [redirectToBankSection, setRedirectToBankSection] = useState(false)
  const unreadNotifications = notifications.filter(n => !n.read).length

  // Reset redirect flag when wallet tab is accessed normally
  useEffect(() => {
    if (activeTab === 'wallet' && !redirectToBankSection) {
      setRedirectToBankSection(false)
    }
  }, [activeTab, redirectToBankSection])

  // Event handlers
  const handleEditProduct = (product: ProductAttribute) => {
    console.log('Edit product:', product)
  }

  const handleShareProduct = (product: ProductAttribute) => {
    console.log('Share product:', product)
  }

  const handleMarkDelivered = (productId: number) => {
    console.log('Mark delivered for product:', productId)
  }

  const handleAddProduct = () => {
    setIsAddProductModalOpen(true)
  }

  const handleSaveDraft = (productData: any) => {
    console.log('Save draft:', productData)
  }

  const handleWithdrawFunds = (amount: number) => {
    console.log('Withdraw funds:', amount)
  }

  const handleRedirectToBank = () => {
    setActiveTab('wallet')
    // The WalletContent component will handle showing the bank account section
  }

  // Profile handlers

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <DashboardContent
            vendorProducts={vendorProducts}
            dashboardStats={dashboardStats}
            bankDetails={profileData.bankDetails}
            kycStatus={profileData.kycStatus}
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
            onShareProduct={handleShareProduct}
            onWithdrawFunds={handleWithdrawFunds}
            onRedirectToBank={handleRedirectToBank}
          />
        )
      case 'products':
        return (
          <ProductsContent
            vendorProducts={vendorProducts}
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
            onShareProduct={handleShareProduct}
          />
        )
      case 'orders':
        return (
          <OrdersContent
            recentOrders={recentOrders}
            onMarkDelivered={handleMarkDelivered}
          />
        )
      case 'wallet':
        return (
          <WalletContent
            walletBalance={dashboardStats.walletBalance}
            bankDetails={profileData.bankDetails}
            kycStatus={profileData.kycStatus}
            onWithdrawFunds={handleWithdrawFunds}
            onRedirectToBank={handleRedirectToBank}
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
                  <p className="text-gray-600 mt-1">View your business information and bank details</p>
                </div>
              </div>
              <div className="p-6">
                <BusinessProfileTab
                  profileData={profileData}
                  bankDetails={profileData.bankDetails}
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

  useEffect(()=>{
    async function handleFetchProducts(){
      const response = await getProducts();
      console.log(response.data.product)
      setVendorProducts(response.data.product)

    }

    handleFetchProducts()
  }, [])

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
        onSaveDraft={handleSaveDraft}
      />
    </div>
  )
}