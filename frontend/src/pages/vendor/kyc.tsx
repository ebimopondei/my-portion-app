import { useState } from "react"
import { Upload, Camera, FileText, Building, User, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import Logo from "../../components/shared/Logo"

interface KYCFormData {
  // Personal Information
  firstName: string
  lastName: string
  dateOfBirth: string
  phoneNumber: string
  email: string
  address: string
  town: string
  city: string
  state: string
  bvn: string
  
  // Business Information
  businessName: string
  businessAddress: string
  businessPhone: string
  businessEmail: string
  cacNumber: string
  taxId: string
  
  // Identity Documents
  idType: string
  idNumber: string
  idFront: File | null
  idBack: File | null
  passportPhoto: File | null
  
  // Business Documents
  cacCertificate: File | null
  taxCertificate: File | null
  utilityBill: File | null
}

const nigerianStates = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", 
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo", 
  "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", 
  "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", 
  "Yobe", "Zamfara"
]



const idTypes = [
  "National ID Card (NIMC)",
  "International Passport",
  "Driver's License",
  "Voter's Card",
  "Permanent Voter's Card (PVC)"
]

export default function KYCPage() {
  const [formData, setFormData] = useState<KYCFormData>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
    email: "",
    address: "",
    town: "",
    city: "",
    state: "",
    bvn: "",
    businessName: "",
    businessAddress: "",
    businessPhone: "",
    businessEmail: "",
    cacNumber: "",
    taxId: "",
    idType: "",
    idNumber: "",
    idFront: null,
    idBack: null,
    passportPhoto: null,
    cacCertificate: null,
    taxCertificate: null,
    utilityBill: null
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: keyof KYCFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (field: keyof KYCFormData, file: File) => {
    setFormData(prev => ({ ...prev, [field]: file }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    // Handle success
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <User className="w-5 h-5 mr-2 text-green-600" />
          Personal Information
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Please provide your personal details for verification.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            placeholder="Enter your first name"
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            placeholder="Enter your last name"
          />
        </div>
        <div>
          <Label htmlFor="dateOfBirth">Date of Birth *</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="phoneNumber">Phone Number *</Label>
          <Input
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
            placeholder="08012345678"
          />
        </div>
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="your@email.com"
          />
        </div>
        <div>
          <Label htmlFor="bvn">BVN (Bank Verification Number) *</Label>
          <Input
            id="bvn"
            value={formData.bvn}
            onChange={(e) => handleInputChange('bvn', e.target.value)}
            placeholder="12345678901"
            maxLength={11}
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="address">Residential Address *</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="Enter your full address"
          />
        </div>
        <div>
          <Label htmlFor="town">Town *</Label>
          <Input
            id="town"
            value={formData.town}
            onChange={(e) => handleInputChange('town', e.target.value)}
            placeholder="Enter your town"
          />
        </div>
        <div>
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            placeholder="Enter your city"
          />
        </div>
        <div>
          <Label htmlFor="state">State *</Label>
          <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your state" />
            </SelectTrigger>
            <SelectContent>
              {nigerianStates.map(state => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Building className="w-5 h-5 mr-2 text-green-600" />
          Business Information
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Please provide your business details for verification.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="businessName">Business Name *</Label>
          <Input
            id="businessName"
            value={formData.businessName}
            onChange={(e) => handleInputChange('businessName', e.target.value)}
            placeholder="Enter your business name"
          />
        </div>
        <div>
          <Label htmlFor="businessPhone">Business Phone *</Label>
          <Input
            id="businessPhone"
            value={formData.businessPhone}
            onChange={(e) => handleInputChange('businessPhone', e.target.value)}
            placeholder="08012345678"
          />
        </div>
        <div>
          <Label htmlFor="businessEmail">Business Email</Label>
          <Input
            id="businessEmail"
            type="email"
            value={formData.businessEmail}
            onChange={(e) => handleInputChange('businessEmail', e.target.value)}
            placeholder="business@email.com"
          />
        </div>
        <div>
          <Label htmlFor="cacNumber">CAC Number (if applicable)</Label>
          <Input
            id="cacNumber"
            value={formData.cacNumber}
            onChange={(e) => handleInputChange('cacNumber', e.target.value)}
            placeholder="RC123456"
          />
        </div>
        <div>
          <Label htmlFor="taxId">Tax ID (if applicable)</Label>
          <Input
            id="taxId"
            value={formData.taxId}
            onChange={(e) => handleInputChange('taxId', e.target.value)}
            placeholder="Enter tax ID"
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="businessAddress">Business Address *</Label>
          <Input
            id="businessAddress"
            value={formData.businessAddress}
            onChange={(e) => handleInputChange('businessAddress', e.target.value)}
            placeholder="Enter your business address"
          />
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-green-600" />
          Identity Verification
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Please upload your identity documents for verification.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="idType">ID Type *</Label>
          <Select value={formData.idType} onValueChange={(value) => handleInputChange('idType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select ID type" />
            </SelectTrigger>
            <SelectContent>
              {idTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="idNumber">ID Number *</Label>
          <Input
            id="idNumber"
            value={formData.idNumber}
            onChange={(e) => handleInputChange('idNumber', e.target.value)}
            placeholder="Enter your ID number"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>ID Front *</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => e.target.files?.[0] && handleFileUpload('idFront', e.target.files[0])}
              className="hidden"
              id="idFront"
            />
            <label htmlFor="idFront" className="cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Upload ID Front</p>
            </label>
          </div>
          {formData.idFront && (
            <div className="flex items-center text-sm text-green-600">
              <CheckCircle className="w-4 h-4 mr-1" />
              File uploaded
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label>ID Back *</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => e.target.files?.[0] && handleFileUpload('idBack', e.target.files[0])}
              className="hidden"
              id="idBack"
            />
            <label htmlFor="idBack" className="cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Upload ID Back</p>
            </label>
          </div>
          {formData.idBack && (
            <div className="flex items-center text-sm text-green-600">
              <CheckCircle className="w-4 h-4 mr-1" />
              File uploaded
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label>Passport Photo *</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleFileUpload('passportPhoto', e.target.files[0])}
              className="hidden"
              id="passportPhoto"
            />
            <label htmlFor="passportPhoto" className="cursor-pointer">
              <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Upload Photo</p>
            </label>
          </div>
          {formData.passportPhoto && (
            <div className="flex items-center text-sm text-green-600">
              <CheckCircle className="w-4 h-4 mr-1" />
              File uploaded
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Building className="w-5 h-5 mr-2 text-green-600" />
          Business Documents
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Please upload your business documents for verification.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Utility Bill (Proof of Address) *</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => e.target.files?.[0] && handleFileUpload('utilityBill', e.target.files[0])}
              className="hidden"
              id="utilityBill"
            />
            <label htmlFor="utilityBill" className="cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Upload Utility Bill</p>
            </label>
          </div>
          {formData.utilityBill && (
            <div className="flex items-center text-sm text-green-600">
              <CheckCircle className="w-4 h-4 mr-1" />
              File uploaded
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label>CAC Certificate (if applicable)</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => e.target.files?.[0] && handleFileUpload('cacCertificate', e.target.files[0])}
              className="hidden"
              id="cacCertificate"
            />
            <label htmlFor="cacCertificate" className="cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Upload CAC Certificate</p>
            </label>
          </div>
          {formData.cacCertificate && (
            <div className="flex items-center text-sm text-green-600">
              <CheckCircle className="w-4 h-4 mr-1" />
              File uploaded
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label>Tax Certificate (if applicable)</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => e.target.files?.[0] && handleFileUpload('taxCertificate', e.target.files[0])}
              className="hidden"
              id="taxCertificate"
            />
            <label htmlFor="taxCertificate" className="cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Upload Tax Certificate</p>
            </label>
          </div>
          {formData.taxCertificate && (
            <div className="flex items-center text-sm text-green-600">
              <CheckCircle className="w-4 h-4 mr-1" />
              File uploaded
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Review Your Information</h3>
        <p className="text-sm text-gray-600 mb-6">
          Please review all the information you've provided before submitting.
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Personal Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div><span className="text-gray-600">Name:</span> {formData.firstName} {formData.lastName}</div>
            <div><span className="text-gray-600">Phone:</span> {formData.phoneNumber}</div>
            <div><span className="text-gray-600">Email:</span> {formData.email}</div>
            <div><span className="text-gray-600">BVN:</span> {formData.bvn}</div>
            <div><span className="text-gray-600">Address:</span> {formData.address}</div>
            <div><span className="text-gray-600">Town:</span> {formData.town}</div>
            <div><span className="text-gray-600">City:</span> {formData.city}</div>
            <div><span className="text-gray-600">State:</span> {formData.state}</div>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-2">Business Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div><span className="text-gray-600">Business Name:</span> {formData.businessName}</div>
            <div><span className="text-gray-600">Business Phone:</span> {formData.businessPhone}</div>
            <div><span className="text-gray-600">CAC Number:</span> {formData.cacNumber || 'Not provided'}</div>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-2">Documents Uploaded</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
              Utility Bill: {formData.utilityBill ? 'Uploaded' : 'Not uploaded'}
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
              ID Front: {formData.idFront ? 'Uploaded' : 'Not uploaded'}
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
              ID Back: {formData.idBack ? 'Uploaded' : 'Not uploaded'}
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
              Passport Photo: {formData.passportPhoto ? 'Uploaded' : 'Not uploaded'}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-800">Important Notice</h4>
            <p className="text-sm text-yellow-700 mt-1">
              Your KYC verification will be reviewed shortly. You'll receive an email notification once the verification is complete.
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep = () => {
    switch(currentStep) {
      case 1: return renderStep1()
      case 2: return renderStep2()
      case 3: return renderStep3()
      case 4: return renderStep4()
      case 5: return renderStep5()
      default: return renderStep1()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Logo />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">KYC Verification</h1>
                <p className="text-sm text-gray-600">Complete your business verification</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Step {currentStep} of 5</div>
              <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 5) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-8">
            {renderStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center p-8 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              Previous
            </Button>

            <div className="flex space-x-3">
              {currentStep < 5 ? (
                <Button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="bg-green-500 hover:bg-green-600"
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-green-500 hover:bg-green-600"
                >
                  {isSubmitting ? "Submitting..." : "Submit KYC"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 