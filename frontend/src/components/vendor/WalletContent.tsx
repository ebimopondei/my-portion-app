import { useState } from "react"
import { DollarSign, CreditCard, TrendingUp, Upload, CheckCircle, Clock, AlertTriangle } from "lucide-react"
import { Button } from "../ui/button"
import WithdrawFundsModal from "./WithdrawFundsModal"

interface WalletContentProps {
  walletBalance: number
  bankDetails: {
    bankName: string
    accountNumber: string
    accountName: string
  }
  kycStatus: "verified" | "pending" | "rejected" | "unverified"
  onWithdrawFunds: (amount: number) => void
  onRedirectToBank?: () => void
}

// Mock transaction history
const mockTransactions = [
  {
    id: 1,
    type: "credit",
    amount: 45000,
    description: "Payment from Premium Basmati Rice order",
    date: "2024-01-21",
    time: "14:30",
    status: "completed"
  },
  {
    id: 2,
    type: "debit",
    amount: 25000,
    description: "Withdrawal to First Bank",
    date: "2024-01-20",
    time: "09:15",
    status: "completed"
  },
  {
    id: 3,
    type: "credit",
    amount: 38000,
    description: "Payment from Brown Beans order",
    date: "2024-01-19",
    time: "16:45",
    status: "completed"
  }
]

const WalletContent = ({ 
  walletBalance, 
  bankDetails, 
  kycStatus, 
  onWithdrawFunds,
  onRedirectToBank
}: WalletContentProps) => {
  const [activeSection, setActiveSection] = useState<'overview' | 'bank' | 'kyc' | 'transactions'>('overview')
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)

  const handleWithdraw = async (amount: number) => {
    try {
      await onWithdrawFunds(amount)
      // The success message will be shown by the WithdrawFundsModal
    } catch (error) {
      console.error("Withdrawal failed:", error)
    }
  }

  const getKycStatusConfig = () => {
    switch(kycStatus) {
      case 'verified':
        return {
          icon: CheckCircle,
          color: 'green',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-800',
          title: '✅ KYC Verified',
          description: 'You can withdraw funds to your bank account'
        }
      case 'pending':
        return {
          icon: Clock,
          color: 'yellow',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          textColor: 'text-yellow-800',
          title: '⏳ KYC Pending',
          description: 'Verification in progress. You cannot withdraw funds yet.'
        }
      case 'rejected':
        return {
          icon: AlertTriangle,
          color: 'red',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-800',
          title: '❗️ KYC Rejected',
          description: 'Please update your documents to withdraw funds'
        }
      default:
        return {
          icon: Clock,
          color: 'gray',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-800',
          title: 'KYC Required',
          description: 'Complete KYC verification to withdraw funds'
        }
    }
  }

  const kycConfig = getKycStatusConfig()
  const KYCIcon = kycConfig.icon

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl sm:text-2xl font-semibold">Wallet</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => setActiveSection('overview')}
            className={activeSection === 'overview' ? 'bg-green-50 border-green-200 text-green-700' : ''}
          >
            Overview
          </Button>
          <Button
            variant="outline"
            onClick={() => setActiveSection('bank')}
            className={activeSection === 'bank' ? 'bg-green-50 border-green-200 text-green-700' : ''}
          >
            Bank Account
          </Button>
          <Button
            variant="outline"
            onClick={() => setActiveSection('kyc')}
            className={activeSection === 'kyc' ? 'bg-green-50 border-green-200 text-green-700' : ''}
          >
            KYC
          </Button>
          <Button
            variant="outline"
            onClick={() => setActiveSection('transactions')}
            className={activeSection === 'transactions' ? 'bg-green-50 border-green-200 text-green-700' : ''}
          >
            Transactions
          </Button>
        </div>
      </div>

      {activeSection === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Wallet Balance */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">₦{walletBalance.toLocaleString()}</h3>
              <p className="text-gray-600">Available Balance</p>
            </div>
            <div className="space-y-4">
              <Button
                onClick={() => setShowWithdrawModal(true)}
                disabled={kycStatus !== 'verified' || !bankDetails.accountName}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Withdraw Funds
              </Button>
              <Button
                variant="outline"
                onClick={() => setActiveSection('transactions')}
                className="w-full"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                View Transaction History
              </Button>
            </div>
          </div>

          {/* KYC Status */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className={`${kycConfig.bgColor} ${kycConfig.borderColor} border rounded-lg p-4 mb-4`}>
              <div className="flex items-start space-x-3">
                <KYCIcon className={`w-5 h-5 ${kycConfig.textColor} mt-0.5 flex-shrink-0`} />
                <div>
                  <h3 className={`text-sm font-medium ${kycConfig.textColor}`}>
                    {kycConfig.title}
                  </h3>
                  <p className={`text-sm ${kycConfig.textColor} mt-1`}>
                    {kycConfig.description}
                  </p>
                </div>
              </div>
            </div>
            
            {kycStatus !== 'verified' && (
              <Button
                onClick={() => setActiveSection('kyc')}
                variant="outline"
                className="w-full"
              >
                Complete KYC Verification
              </Button>
            )}
          </div>
        </div>
      )}

      {activeSection === 'bank' && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Bank Account Details</h3>
            <p className="text-sm text-gray-600">
              Add your bank account details to receive withdrawals
            </p>
          </div>

          {bankDetails.accountName ? (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Account Linked</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bank:</span>
                    <span className="font-medium">{bankDetails.bankName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Number:</span>
                    <span className="font-medium">{bankDetails.accountNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Name:</span>
                    <span className="font-medium">{bankDetails.accountName}</span>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => setActiveSection('kyc')}
                variant="outline"
                className="w-full"
              >
                Update Bank Details
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">No Bank Account Linked</h4>
              <p className="text-gray-600 mb-4">Add your bank account to receive withdrawals</p>
              <Button
                onClick={() => setActiveSection('kyc')}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                Add Bank Account
              </Button>
            </div>
          )}
        </div>
      )}

      {activeSection === 'kyc' && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">KYC Verification</h3>
            <p className="text-sm text-gray-600">
              Complete identity verification to enable withdrawals
            </p>
          </div>

          <div className={`${kycConfig.bgColor} ${kycConfig.borderColor} border rounded-lg p-4 mb-6`}>
            <div className="flex items-start space-x-3">
              <KYCIcon className={`w-5 h-5 ${kycConfig.textColor} mt-0.5 flex-shrink-0`} />
              <div>
                <h3 className={`text-sm font-medium ${kycConfig.textColor}`}>
                  {kycConfig.title}
                </h3>
                <p className={`text-sm ${kycConfig.textColor} mt-1`}>
                  {kycConfig.description}
                </p>
              </div>
            </div>
          </div>

          {kycStatus !== 'verified' && (
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Required Documents</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Government ID</span>
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Proof of Address</span>
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                </div>
              </div>
              
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                Submit for Verification
              </Button>
            </div>
          )}
        </div>
      )}

      {activeSection === 'transactions' && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Transaction History</h3>
            <p className="text-sm text-gray-600">
              View all your wallet transactions
            </p>
          </div>

          <div className="space-y-4">
            {mockTransactions.map(transaction => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {transaction.type === 'credit' ? (
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    ) : (
                      <DollarSign className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-sm text-gray-600">{transaction.date} at {transaction.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}₦{transaction.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{transaction.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Withdraw Funds Modal */}
      <WithdrawFundsModal
        isOpen={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        onWithdraw={handleWithdraw}
        walletBalance={walletBalance}
        bankDetails={bankDetails}
        kycStatus={kycStatus}
        onRedirectToBank={onRedirectToBank}
      />
    </div>
  )
}

export default WalletContent 