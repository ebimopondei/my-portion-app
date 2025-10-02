import { useState } from "react"
import {  
  VendorHeader, 
  OrdersContent,
  AddProductModal,
} from "../../components/vendor"


export default function DashboardOrdersPage() {

  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false)

  const handleMarkDelivered = (productId: number) => {
    console.log('Mark delivered for product:', productId)
  }

  const handleSaveDraft = (productData: any) => {
    console.log('Save draft:', productData)
  }


  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-4 sm:py-8">
        <VendorHeader />
        <OrdersContent
            onMarkDelivered={handleMarkDelivered}
        />
        
      </main>

      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        onSaveDraft={handleSaveDraft}
      />
    </div>
  )
}