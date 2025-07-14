import { useState } from "react"
import { X, MapPin, Package, DollarSign, Users, Video, Upload, Star, Image as ImageIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface AddProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (productData: any) => void
  onSaveDraft: (productData: any) => void
}

interface ProductFormData {
  defaultImage: File | null
  additionalImages: File[]
  video: File | null
  productName: string
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

export default function AddProductModal({ isOpen, onClose, onSubmit }: AddProductModalProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    defaultImage: null,
    additionalImages: [],
    video: null,
    productName: '',
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

  const [defaultImagePreview, setDefaultImagePreview] = useState<string | null>(null)
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState<string[]>([])
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDefaultImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, defaultImage: file }))
      
      const reader = new FileReader()
      reader.onload = (e) => {
        setDefaultImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAdditionalImagesUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setFormData(prev => ({ ...prev, additionalImages: [...prev.additionalImages, ...files] }))
    
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setAdditionalImagePreviews(prev => [...prev, e.target?.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, video: file }))
      
      const reader = new FileReader()
      reader.onload = (e) => {
        setVideoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeDefaultImage = () => {
    setFormData(prev => ({ ...prev, defaultImage: null }))
    setDefaultImagePreview(null)
  }

  const removeAdditionalImage = (index: number) => {
    setFormData(prev => ({ 
      ...prev, 
      additionalImages: prev.additionalImages.filter((_, i) => i !== index) 
    }))
    setAdditionalImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent, isDefault: boolean = false) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    const imageFiles = files.filter(file => file.type.startsWith('image/'))
    
    if (isDefault && imageFiles.length > 0) {
      const file = imageFiles[0]
      setFormData(prev => ({ ...prev, defaultImage: file }))
      
      const reader = new FileReader()
      reader.onload = (e) => {
        setDefaultImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    } else if (!isDefault) {
      setFormData(prev => ({ ...prev, additionalImages: [...prev.additionalImages, ...imageFiles] }))
      
      imageFiles.forEach(file => {
        const reader = new FileReader()
        reader.onload = (e) => {
          setAdditionalImagePreviews(prev => [...prev, e.target?.result as string])
        }
        reader.readAsDataURL(file)
      })
    }
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
            className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col"
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

                {/* Default Product Image */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2  items-center">
                    <Star className="w-4 h-4 mr-1 text-amber-500" />
                    Default Product Image * (Main showcase image)
                  </label>
                  
                  {!defaultImagePreview ? (
                    <div 
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                        isDragOver 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-300 hover:border-green-500'
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, true)}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleDefaultImageUpload}
                        className="hidden"
                        id="default-image-upload"
                      />
                      <label htmlFor="default-image-upload" className="cursor-pointer">
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mb-4">
                            <ImageIcon className="w-8 h-8 text-green-600" />
                          </div>
                          <p className="text-lg font-medium text-gray-700 mb-2">
                            Upload your main product image
                          </p>
                          <p className="text-sm text-gray-500 mb-4">
                            This will be the primary image customers see first
                          </p>
                          <div className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                            Choose Default Image
                          </div>
                          <p className="text-xs text-gray-400 mt-2">
                            or drag and drop here
                          </p>
                        </div>
                      </label>
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="relative w-full h-48 rounded-lg overflow-hidden">
                        <img
                          src={defaultImagePreview}
                          alt="Default product image"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                          <Star className="w-3 h-3 mr-1" />
                          Default
                        </div>
                        <button
                          onClick={removeDefaultImage}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional Product Images */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Product Images (2-4 more images recommended)
                  </label>
                  
                  <div 
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
                      isDragOver 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-300 hover:border-blue-500'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, false)}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleAdditionalImagesUpload}
                      className="hidden"
                      id="additional-images-upload"
                    />
                    <label htmlFor="additional-images-upload" className="cursor-pointer">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-3">
                          <Upload className="w-6 h-6 text-blue-600" />
                        </div>
                        <p className="text-md font-medium text-gray-700 mb-1">
                          Add more product photos
                        </p>
                        <p className="text-sm text-gray-500 mb-3">
                          Show different angles, details, or packaging
                        </p>
                        <div className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                          Add More Images
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                          or drag and drop multiple images
                        </p>
                      </div>
                    </label>
                  </div>
                  
                  {/* Additional Images Preview */}
                  {additionalImagePreviews.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">
                        Additional Images ({additionalImagePreviews.length})
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {additionalImagePreviews.map((preview, index) => (
                          <motion.div 
                            key={index} 
                            className="relative group"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <img
                              src={preview}
                              alt={`Additional image ${index + 1}`}
                              className="w-full h-20 object-cover rounded-lg"
                            />
                            <button
                              onClick={() => removeAdditionalImage(index)}
                              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100"
                            >
                              <X className="w-3 h-3" />
                            </button>
                            <div className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1 py-0.5 rounded">
                              {index + 1}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Product Video */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Video * (Required)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                      id="video-upload"
                    />
                    <label htmlFor="video-upload" className="cursor-pointer">
                      <Video className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-lg font-medium text-gray-700 mb-1">
                        Click here to upload product video
                      </p>
                      <p className="text-sm text-gray-500">
                        MP4, MOV up to 50MB. Video is required.
                      </p>
                    </label>
                  </div>
                  
                  {/* Video Preview */}
                  {videoPreview && (
                    <div className="mt-4">
                      <video
                        src={videoPreview}
                        controls
                        className="w-full max-w-md mx-auto rounded-lg"
                      />
                      <button
                        onClick={() => {
                          setFormData(prev => ({ ...prev, video: null }))
                          setVideoPreview(null)
                        }}
                        className="mt-2 text-red-600 text-sm hover:text-red-700"
                      >
                        Remove video
                      </button>
                    </div>
                  )}
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
            <div className="flex justify-center p-6 border-t border-gray-200">
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
              >
                Submit Product
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 