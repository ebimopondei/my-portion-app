import { useState } from "react"
import { Camera, Edit3, Save } from "lucide-react"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Textarea } from "../../ui/textarea"

interface BusinessProfileTabProps {
  profileData: {
    businessName: string
    email: string
    phone: string
    address: string
    description: string
    logo: string
  }
  onSave: (data: any) => void
}

const BusinessProfileTab = ({ profileData, onSave }: BusinessProfileTabProps) => {
  const [formData, setFormData] = useState(profileData)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // In a real app, you'd upload this to your server
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData(prev => ({ 
          ...prev, 
          logo: e.target?.result as string 
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await onSave(formData)
      setIsEditing(false)
    } catch (error) {
      console.error('Error saving profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Profile Picture / Logo */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
            {formData.logo ? (
              <img 
                src={formData.logo} 
                alt="Business logo" 
                className="w-full h-full object-cover"
              />
            ) : (
              <Camera className="w-8 h-8 text-gray-400" />
            )}
          </div>
          <label className="absolute bottom-0 right-0 bg-green-500 text-white p-2 rounded-full cursor-pointer hover:bg-green-600">
            <Camera className="w-4 h-4" />
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
          </label>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Business Logo</h3>
          <p className="text-sm text-gray-600">Upload a clear logo for your storefront</p>
        </div>
      </div>

      {/* Business Name */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="businessName" className="text-sm font-medium text-gray-700">
            Business Name
          </Label>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center text-sm text-green-600 hover:text-green-700"
          >
            <Edit3 className="w-4 h-4 mr-1" />
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>
        <Input
          id="businessName"
          value={formData.businessName}
          onChange={(e) => handleInputChange('businessName', e.target.value)}
          disabled={!isEditing}
          className={!isEditing ? 'bg-gray-50' : ''}
        />
      </div>

      {/* Public Contact Information */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Public Contact Information</h3>
          <p className="text-sm text-gray-600 mb-4">
            This information will be visible to customers on your storefront.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={!isEditing}
              className={!isEditing ? 'bg-gray-50' : ''}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              disabled={!isEditing}
              className={!isEditing ? 'bg-gray-50' : ''}
            />
          </div>
        </div>
      </div>

      {/* Default Pickup Location */}
      <div className="space-y-2">
        <Label htmlFor="address" className="text-sm font-medium text-gray-700">
          Default Pickup Location / Business Address
        </Label>
        <p className="text-sm text-gray-600 mb-2">
          Your primary business address. This will be suggested as the pickup location when you add new products.
        </p>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          disabled={!isEditing}
          className={!isEditing ? 'bg-gray-50' : ''}
          placeholder="Enter your business address"
        />
      </div>

      {/* Business Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium text-gray-700">
          Business Description (About Us)
        </Label>
        <p className="text-sm text-gray-600 mb-2">
          A short description of your business for your public storefront (max 200 characters).
        </p>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          disabled={!isEditing}
          className={!isEditing ? 'bg-gray-50' : ''}
          placeholder="Describe what you sell and your business..."
          maxLength={200}
          rows={3}
        />
        <p className="text-xs text-gray-500 text-right">
          {formData.description.length}/200 characters
        </p>
      </div>

      {/* Save Button */}
      {isEditing && (
        <div className="flex justify-end pt-6 border-t border-gray-200">
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2"
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? 'Saving...' : 'Save Profile Information'}
          </Button>
        </div>
      )}
    </div>
  )
}

export default BusinessProfileTab 