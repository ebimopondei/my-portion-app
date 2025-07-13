import { useState } from "react"
import { X, Camera, MapPin, Package, DollarSign, Users } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface AddProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (productData: any) => void
  onSaveDraft: (productData: any) => void
}

interface ProductFormData {
  images: File[]
  productName: string
  category: string
  sellingMethod: 'whole' | 'portions'
  totalPrice: number
  quantityAvailable: number
  totalStock: string
  numberOfPortions: number
  pricePerPortion: number
  pickupAvailable: boolean
  deliveryAvailable: boolean
  pickupLocation: string
}

const categories = [
  "Grains",
  "Tubers", 
  "Fruits",
  "Vegetables",
  "Oils",
  "Legumes",
  "Spices",
  "Dairy",
  "Meat",
  "Fish",
  "Other"
]

export default function AddProductModal({ isOpen, onClose, onSubmit, onSaveDraft }: AddProductModalProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    images: [],
    productName: '',
    category: '',
    sellingMethod: 'whole',
    totalPrice: 0,
    quantityAvailable: 1,
    totalStock: '',
    numberOfPortions: 1,
    pricePerPortion: 0,
    pickupAvailable: false,
    deliveryAvailable: false,
    pickupLocation: ''
  })

  const [imagePreview, setImagePreview] = useState<string[]>([])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }))
    
    // Create preview URLs
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(prev => [...prev, e.target?.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }))
    setImagePreview(prev => prev.filter((_, i) => i !== index))
  }

  const calculateTotalEarnings = () => {
    if (formData.sellingMethod === 'portions') {
      return formData.numberOfPortions * formData.pricePerPortion
    }
    return formData.totalPrice * formData.quantityAvailable
  }

  const handleSubmit = () => {
    onSubmit(formData)
    onClose()
  }

  const handleSaveDraft = () => {
    onSaveDraft(formData)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-green-500/20 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white sticky top-0 z-10 rounded-t-lg">
              <h2 className="text-xl font-semibold text-gray-800">Add New Product</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Scrollable Form Content */}
            <div className="p-6 space-y-8 overflow-y-auto flex-1">
              {/* Section 1: The Basics */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Package className="w-5 h-5 mr-2 text-green-600" />
                  The Basics (What are you selling?)
                </h3>
                
                {/* Product Image */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-lg font-medium text-gray-700 mb-1">
                        Click here to upload product photo
                      </p>
                      <p className="text-sm text-gray-500">
                        JPG, PNG up to 5MB each
                      </p>
                    </label>
                  </div>
                  
                  {/* Image Previews */}
                  {imagePreview.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {imagePreview.map((preview, index) => (
                        <div key={index} className="relative">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Name */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={formData.productName}
                    onChange={(e) => setFormData(prev => ({ ...prev, productName: e.target.value }))}
                    placeholder="e.g., 50kg Bag of Ofada Rice"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Be specific about size and type
                  </p>
                </div>

                {/* Category */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Section 2: Pricing & Quantity */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                  Pricing & Quantity (How do you want to sell it?)
                </h3>

                {/* Selling Method */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    How do you want to sell this?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, sellingMethod: 'whole' }))}
                      className={`p-4 rounded-lg border-2 text-center transition-colors ${
                        formData.sellingMethod === 'whole'
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <Package className="w-6 h-6 mx-auto mb-2" />
                      <span className="font-medium">As a Whole Item</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, sellingMethod: 'portions' }))}
                      className={`p-4 rounded-lg border-2 text-center transition-colors ${
                        formData.sellingMethod === 'portions'
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <Users className="w-6 h-6 mx-auto mb-2" />
                      <span className="font-medium">Divided into Portions</span>
                    </button>
                  </div>
                </div>

                {formData.sellingMethod === 'whole' ? (
                  /* Whole Item Fields */
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price for the whole item
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₦</span>
                        <input
                          type="number"
                          value={formData.totalPrice || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, totalPrice: Number(e.target.value) }))}
                          className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        How many of this item do you have?
                      </label>
                      <input
                        type="number"
                        value={formData.quantityAvailable || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, quantityAvailable: Number(e.target.value) }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="1"
                        min="1"
                      />
                    </div>
                  </div>
                ) : (
                  /* Portions Fields */
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        What is your total stock?
                      </label>
                      <input
                        type="text"
                        value={formData.totalStock}
                        onChange={(e) => setFormData(prev => ({ ...prev, totalStock: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="e.g., One 100kg bag of beans"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        How many portions do you want to divide this into?
                      </label>
                      <input
                        type="number"
                        value={formData.numberOfPortions || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, numberOfPortions: Number(e.target.value) }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="10"
                        min="1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price for each portion
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₦</span>
                        <input
                          type="number"
                          value={formData.pricePerPortion || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, pricePerPortion: Number(e.target.value) }))}
                          className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="0"
                        />
                      </div>
                      {formData.numberOfPortions > 0 && formData.pricePerPortion > 0 && (
                        <p className="text-sm text-green-600 mt-1">
                          If you sell {formData.numberOfPortions} portions, you will earn a total of ₦{calculateTotalEarnings().toLocaleString()}.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Section 3: Logistics */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-green-600" />
                  Logistics (How will customers get it?)
                </h3>

                {/* Fulfillment Options */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    How can customers receive this item?
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.pickupAvailable}
                        onChange={(e) => setFormData(prev => ({ ...prev, pickupAvailable: e.target.checked }))}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <span className="ml-3 text-sm text-gray-700">Customer Pickup</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.deliveryAvailable}
                        onChange={(e) => setFormData(prev => ({ ...prev, deliveryAvailable: e.target.checked }))}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <span className="ml-3 text-sm text-gray-700">I can arrange Delivery</span>
                    </label>
                  </div>
                </div>

                {/* Pickup Location */}
                {formData.pickupAvailable && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pickup Address
                    </label>
                    <textarea
                      value={formData.pickupLocation}
                      onChange={(e) => setFormData(prev => ({ ...prev, pickupLocation: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      rows={3}
                      placeholder="Enter pickup address..."
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      <button className="text-green-600 hover:text-green-700 underline">
                        Use my main business address
                      </button>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 p-6 border-t border-gray-200">
              <button
                onClick={handleSaveDraft}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Save as Draft
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
              >
                Submit Product for Review
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 