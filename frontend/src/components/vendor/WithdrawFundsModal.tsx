import { useState } from "react"
import { CreditCard, AlertCircle } from "lucide-react"
import Modal from "../ui/modal"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import Toast from "../ui/toast"

interface WithdrawFundsModalProps {
  isOpen: boolean
  onClose: () => void
  onWithdraw: (amount: number) => void
  walletBalance: number
  bankDetails: {
    bankName: string
    accountNumber: string
    accountName: string
  }
  kycStatus: "verified" | "pending" | "rejected" | "unverified"
  onRedirectToBank?: () => void
}

export default function WithdrawFundsModal({
  isOpen,
  onClose,
  onWithdraw,
  walletBalance,
  bankDetails,
  kycStatus,
  onRedirectToBank
}: WithdrawFundsModalProps) {
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessToast, setShowSuccessToast] = useState(false)

  const handleWithdraw = async () => {
    if (!withdrawAmount || Number(withdrawAmount) <= 0) return
    
    setIsSubmitting(true)
    try {
      await onWithdraw(Number(withdrawAmount))
      
      // Show success toast
      setShowSuccessToast(true)
      
      // Close modal after a short delay to let user see the success message
      setTimeout(() => {
        setWithdrawAmount("")
        onClose()
        setShowSuccessToast(false)
      }, 2000)
      
    } catch (error) {
      console.error("Withdrawal failed:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const canWithdraw = kycStatus === "verified" && bankDetails.accountName && Number(withdrawAmount) > 0 && Number(withdrawAmount) <= walletBalance

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Withdraw Funds"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          {/* KYC Status Warning */}
          {kycStatus !== "verified" && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-yellow-800">KYC Verification Required</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    {kycStatus === "pending" && "Your KYC verification is in progress. You cannot withdraw funds yet."}
                    {kycStatus === "rejected" && "Your KYC verification was rejected. Please update your documents to withdraw funds."}
                    {kycStatus === "unverified" && "Please complete KYC verification before withdrawing funds."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Bank Account Warning */}
          {!bankDetails.accountName && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <CreditCard className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-yellow-800">Bank Account Required</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Please add your bank account details before withdrawing funds.
                  </p>
                  {onRedirectToBank && (
                    <Button
                      onClick={() => {
                        onClose()
                        onRedirectToBank()
                      }}
                      className="mt-3 bg-green-500 hover:bg-green-600 text-white text-sm"
                    >
                      Add Bank Account
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Amount Input */}
          <div>
            <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
              Amount (₦)
            </Label>
            <Input
              id="amount"
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="Enter amount"
              max={walletBalance}
              disabled={kycStatus !== "verified" || !bankDetails.accountName}
            />
            <p className="text-xs text-gray-500 mt-1">
              Available: ₦{walletBalance.toLocaleString()}
            </p>
          </div>

          {/* Bank Account Details */}
          {bankDetails.accountName && (
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">
                Funds will be transferred to: <strong>{bankDetails.accountName}</strong>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {bankDetails.bankName} • {bankDetails.accountNumber}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-2">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleWithdraw}
              disabled={!canWithdraw || isSubmitting}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white"
            >
              {isSubmitting ? "Processing..." : "Withdraw"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Success Toast */}
      <Toast
        message="Withdrawal initiated successfully! Your funds will be transferred within 2-3 business days."
        type="success"
        isVisible={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
        duration={4000}
      />
    </>
  )
} 