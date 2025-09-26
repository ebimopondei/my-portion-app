import { useState } from "react"
import { 
  VendorHeader, 
  WalletContent,
  AddProductModal,
} from "../../components/vendor"
import type { UserAttributes } from "@shared/types/user";
import { useAuthStore } from "@/zustand/store";


export default function DashboardWalletPage() {
  
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false)
  const [profileData] = useState<UserAttributes | null>(null)
  
  const handleSaveDraft = (productData: any) => {
    console.log('Save draft:', productData)
  }

  const handleWithdrawFunds = (amount: number) => {
    console.log('Withdraw funds:', amount)
  }

  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-4 sm:py-8">
        <VendorHeader vendorData={user} />
        <WalletContent
          // @ts-expect-error
          bankDetails={profileData?.bankDetails}
          kycStatus={Boolean(profileData?.kyc_verified)}
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