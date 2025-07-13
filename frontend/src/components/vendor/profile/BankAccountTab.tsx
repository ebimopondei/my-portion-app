import { useState } from "react"
import { Shield, CreditCard, Save } from "lucide-react"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"

interface BankAccountTabProps {
  bankDetails: {
    bankName: string
    accountNumber: string
    accountName: string
  }
  onUpdate: (data: any) => void
}

// Nigerian banks list (simplified)
const nigerianBanks = [
  "Access Bank",
  "First Bank of Nigeria",
  "Guaranty Trust Bank",
  "United Bank for Africa",
  "Zenith Bank",
  "Ecobank Nigeria",
  "Stanbic IBTC Bank",
  "Fidelity Bank",
  "Union Bank of Nigeria",
  "Polaris Bank",
  "Wema Bank",
  "Heritage Bank",
  "Keystone Bank",
  "FCMB",
  "Sterling Bank",
  "Unity Bank",
  "Jaiz Bank",
  "Titan Trust Bank",
  "Providus Bank",
  "SunTrust Bank"
]

const BankAccountTab = ({ bankDetails, onUpdate }: BankAccountTabProps) => {
  const [formData, setFormData] = useState(bankDetails)
  const [isLoading, setIsLoading] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationError, setVerificationError] = useState("")

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear account name when bank or account number changes
    if (field === 'bankName' || field === 'accountNumber') {
      setFormData(prev => ({ ...prev, accountName: "" }))
    }
  }

  // Simulate account name verification (in real app, this would call Paystack/Mono API)
  const verifyAccountName = async () => {
    if (!formData.bankName || !formData.accountNumber) {
      setVerificationError("Please enter both bank name and account number")
      return
    }

    if (formData.accountNumber.length < 10) {
      setVerificationError("Account number must be at least 10 digits")
      return
    }

    setIsVerifying(true)
    setVerificationError("")

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock verification - in real app, this would be an API call
      const mockAccountName = "LAGOS WHOLESALE HUB"
      setFormData(prev => ({ ...prev, accountName: mockAccountName }))
    } catch (error) {
      setVerificationError("Unable to verify account details. Please check and try again.")
    } finally {
      setIsVerifying(false)
    }
  }

  const handleSave = async () => {
    if (!formData.accountName) {
      setVerificationError("Please verify your account details first")
      return
    }

    setIsLoading(true)
    try {
      await onUpdate(formData)
    } catch (error) {
      console.error('Error updating bank details:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Security Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-blue-900">Your financial information is secure</h3>
            <p className="text-sm text-blue-700 mt-1">
              Your financial information is private and will never be shared. This is only used to send you your earnings.
            </p>
          </div>
        </div>
      </div>

      {/* Bank Details Form */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Bank Account Details</h3>
          <p className="text-sm text-gray-600">
            Add your bank account details to receive your earnings from sales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bankName" className="text-sm font-medium text-gray-700">
              Bank Name
            </Label>
            <select
              id="bankName"
              value={formData.bankName}
              onChange={(e) => handleInputChange('bankName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select a bank</option>
              {nigerianBanks.map(bank => (
                <option key={bank} value={bank}>{bank}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountNumber" className="text-sm font-medium text-gray-700">
              Account Number
            </Label>
            <Input
              id="accountNumber"
              type="text"
              value={formData.accountNumber}
              onChange={(e) => handleInputChange('accountNumber', e.target.value)}
              placeholder="Enter your account number"
              maxLength={10}
            />
          </div>
        </div>

        {/* Account Name Verification */}
        <div className="space-y-2">
          <Label htmlFor="accountName" className="text-sm font-medium text-gray-700">
            Account Name
          </Label>
          <div className="flex space-x-2">
            <Input
              id="accountName"
              type="text"
              value={formData.accountName}
              readOnly
              placeholder="Account name will appear here after verification"
              className="bg-gray-50"
            />
            <Button
              onClick={verifyAccountName}
              disabled={isVerifying || !formData.bankName || !formData.accountNumber}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2"
            >
              {isVerifying ? 'Verifying...' : 'Verify'}
            </Button>
          </div>
          {verificationError && (
            <p className="text-sm text-red-600">{verificationError}</p>
          )}
          {formData.accountName && (
            <p className="text-sm text-green-600 flex items-center">
              <CreditCard className="w-4 h-4 mr-1" />
              Account verified successfully
            </p>
          )}
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-6 border-t border-gray-200">
          <Button
            onClick={handleSave}
            disabled={isLoading || !formData.accountName}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2"
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? 'Saving...' : 'Link Account'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BankAccountTab 