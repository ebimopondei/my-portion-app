import { useState } from "react"
import { 
  VendorHeader, 
  WalletContent,
  AddProductModal,
} from "../../components/vendor"
import type { UserAttributes } from "@shared/types/user";


export default function DashboardWalletPage() {
  
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false)
  const [profileData] = useState<UserAttributes | null>(null)
  
  const handleSaveDraft = (productData: any) => {
    console.log('Save draft:', productData)
  }

  const handleWithdrawFunds = (amount: number) => {
    console.log('Withdraw funds:', amount)
  }


  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-4 sm:py-8">
        <VendorHeader />
        <WalletContent
          // @ts-expect-error
          bankDetails={profileData?.bankDetails}
          onWithdrawFunds={handleWithdrawFunds}
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