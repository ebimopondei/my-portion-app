import { useState } from "react"
import { CheckCircle, Clock, AlertTriangle, Upload } from "lucide-react"
import { Button } from "../../ui/button"
import { Label } from "../../ui/label"

interface VerificationTabProps {
  kycStatus: "verified" | "pending" | "rejected"
  kycInfo: {
    fullName: string
    bvn: string
    idNumber: string
    idType: string
  }
  onUploadDocument: (documentType: string, file: File) => void
}

const VerificationTab = ({ kycStatus, kycInfo, onUploadDocument }: VerificationTabProps) => {
  const [uploadedDocuments, setUploadedDocuments] = useState({
    governmentId: null as File | null,
    proofOfAddress: null as File | null
  })

  const getStatusConfig = () => {
    switch(kycStatus) {
      case 'verified':
        return {
          icon: CheckCircle,
          color: 'green',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-800',
          title: '✅ Verified: Your account is fully verified',
          description: 'You are ready to sell on our platform.'
        }
      case 'pending':
        return {
          icon: Clock,
          color: 'yellow',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          textColor: 'text-yellow-800',
          title: '⏳ Pending Review: We are reviewing your documents',
          description: 'This usually takes 24-48 hours. We will notify you once the review is complete.'
        }
      case 'rejected':
        return {
          icon: AlertTriangle,
          color: 'red',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-800',
          title: '❗️ Action Required: There was an issue verifying your documents',
          description: 'Please see below for details and re-upload the required documents.'
        }
      default:
        return {
          icon: Clock,
          color: 'gray',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-800',
          title: 'Verification Status Unknown',
          description: 'Please contact support for assistance.'
        }
    }
  }

  const statusConfig = getStatusConfig()
  const StatusIcon = statusConfig.icon

  const handleFileUpload = (documentType: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedDocuments(prev => ({ ...prev, [documentType]: file }))
      onUploadDocument(documentType, file)
    }
  }

  const getDocumentStatus = (documentType: string) => {
    if (kycStatus === 'verified') return 'verified'
    if (uploadedDocuments[documentType as keyof typeof uploadedDocuments]) return 'uploaded'
    return 'required'
  }

  return (
    <div className="space-y-8">
      {/* Verification Status Banner */}
      <div className={`${statusConfig.bgColor} ${statusConfig.borderColor} border rounded-lg p-4`}>
        <div className="flex items-start space-x-3">
          <StatusIcon className={`w-5 h-5 ${statusConfig.textColor} mt-0.5 flex-shrink-0`} />
          <div>
            <h3 className={`text-sm font-medium ${statusConfig.textColor}`}>
              {statusConfig.title}
            </h3>
            <p className={`text-sm ${statusConfig.textColor} mt-1`}>
              {statusConfig.description}
            </p>
          </div>
        </div>
      </div>

      {/* Submitted Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Submitted Information</h3>
        <p className="text-sm text-gray-600">
          This is the information you provided during signup. Please verify it's correct.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Full Name:</span>
            <span className="text-sm font-medium text-gray-900">{kycInfo.fullName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">BVN:</span>
            <span className="text-sm font-medium text-gray-900">{kycInfo.bvn}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">ID Type:</span>
            <span className="text-sm font-medium text-gray-900">{kycInfo.idType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">ID Number:</span>
            <span className="text-sm font-medium text-gray-900">{kycInfo.idNumber}</span>
          </div>
        </div>
      </div>

      {/* Document Upload Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Required Documents</h3>
        
        {/* Government ID Upload */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-gray-700">
              Government ID
            </Label>
            <span className={`text-xs px-2 py-1 rounded-full ${
              getDocumentStatus('governmentId') === 'verified' 
                ? 'bg-green-100 text-green-800' 
                : getDocumentStatus('governmentId') === 'uploaded'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {getDocumentStatus('governmentId') === 'verified' ? 'Verified' :
               getDocumentStatus('governmentId') === 'uploaded' ? 'Uploaded' : 'Required'}
            </span>
          </div>
          
          {kycStatus === 'rejected' && (
            <p className="text-sm text-red-600">
              The image of your ID was blurry. Please upload a clearer photo.
            </p>
          )}
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <div className="text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Upload a clear photo of your government-issued ID
              </p>
              <p className="text-xs text-gray-500 mb-4">
                Accepted: Driver's License, National ID, Passport, Voter's Card
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload('governmentId', e)}
                className="hidden"
                id="governmentId"
              />
              <label htmlFor="governmentId">
                <Button variant="outline" className="cursor-pointer">
                  Choose File
                </Button>
              </label>
            </div>
          </div>
        </div>

        {/* Proof of Address Upload */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-gray-700">
              Proof of Address
            </Label>
            <span className={`text-xs px-2 py-1 rounded-full ${
              getDocumentStatus('proofOfAddress') === 'verified' 
                ? 'bg-green-100 text-green-800' 
                : getDocumentStatus('proofOfAddress') === 'uploaded'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {getDocumentStatus('proofOfAddress') === 'verified' ? 'Verified' :
               getDocumentStatus('proofOfAddress') === 'uploaded' ? 'Uploaded' : 'Required'}
            </span>
          </div>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <div className="text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Upload a recent utility bill or bank statement
              </p>
              <p className="text-xs text-gray-500 mb-4">
                Must show your name and address clearly
              </p>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => handleFileUpload('proofOfAddress', e)}
                className="hidden"
                id="proofOfAddress"
              />
              <label htmlFor="proofOfAddress">
                <Button variant="outline" className="cursor-pointer">
                  Choose File
                </Button>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        {kycStatus !== 'verified' && (
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <Button
              disabled={!uploadedDocuments.governmentId && !uploadedDocuments.proofOfAddress}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2"
            >
              Submit for Review
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default VerificationTab 