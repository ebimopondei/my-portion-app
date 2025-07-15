import { Package, Truck, Share2, Edit3 } from "lucide-react"
import Modal from "../ui/modal"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import type { ProductAttribute } from "@shared/types/product"
import { Status } from "@shared/enums"

interface ProductDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  product: ProductAttribute | null
  onEdit: (product: ProductAttribute) => void
  onShare: (product: ProductAttribute) => void
}

export default function ProductDetailsModal({
  isOpen,
  onClose,
  product,
  onEdit,
  onShare
}: ProductDetailsModalProps) {
  if (!product) return null

  const getStatusColor = (status: ProductAttribute['status']): string => {
    switch(status) {
      case Status.Delivered: return 'bg-green-100 text-green-700'
      case Status.Pending: return 'bg-amber-100 text-amber-700'
      case Status.Cancelled: return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusText = (status: ProductAttribute['status']): string => {
    switch(status) {
      case Status.Pending: return Status.Pending
      case Status.Delivered: return Status.Delivered
      case Status.Cancelled: return Status.Cancelled
      default: return 'Unknown'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const handleEdit = () => {
    onEdit(product)
    onClose()
  }

  const handleShare = () => {
    onShare(product)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Product Details"
      maxWidth="max-w-4xl"
    >
      <div className="space-y-4">
        {/* Product Image and Basic Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1">
            <img 
              src={product.image_url} 
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
          
          <div className="lg:col-span-2 space-y-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
              <div className="flex items-center space-x-2 mb-2">
                <Badge className={getStatusColor(product.status)}>
                  {getStatusText(product.status)}
                </Badge>
                <span className="text-sm text-gray-500">•</span>
                {/* <span className="text-sm text-gray-500">{product.category}</span> */}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Price:</span>
                <span className="text-lg font-bold text-green-600">₦{product.price_per_portion}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Unit:</span>
                <span className="font-medium text-sm">{product.quantity_unit}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Created:</span>
                {/* @ts-expect-error */}
                <span className="font-medium text-sm">{formatDate(product.createdAt)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Portions:</span>
                <span className="font-medium text-sm">{product.total_quantity}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Portions and Sales Info */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3 flex items-center text-sm">
            <Package className="w-4 h-4 mr-2" />
            Sales Overview
          </h4>
          <div className="grid grid-cols-4 gap-3">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{product.available_portions}</div>
              <div className="text-xs text-gray-600">Available</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">{product.total_quantity - product.available_portions}</div>
              <div className="text-xs text-gray-600">Booked</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">
                ₦{((product.total_quantity - product.available_portions) * product.price_per_portion)}
              </div>
              <div className="text-xs text-gray-600">Revenue</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">
                {product.available_portions }/{(product.total_quantity / product.portion_size)}%
              </div>
              <div className="text-xs text-gray-600">Sold</div>
            </div>
          </div>
        </div>

        {/* Delivery Options */}
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900 flex items-center text-sm">
            <Truck className="w-4 h-4 mr-2" />
            Delivery Options
          </h4>
          <div className="flex space-x-2">
            {/* {product.pickupAvailable && (
              <Badge className="bg-blue-100 text-blue-700 text-xs">
                <MapPin className="w-3 h-3 mr-1" />
                Pickup
              </Badge>
            )} */}
            {/* {product.deliveryAvailable && (
              <Badge className="bg-green-100 text-green-700 text-xs">
                <Truck className="w-3 h-3 mr-1" />
                Delivery
              </Badge>
            )} */}
            {/* {!product.pickupAvailable && !product.deliveryAvailable && (
              <div className="flex items-center text-amber-600 text-xs">
                <AlertCircle className="w-3 h-3 mr-1" />
                No delivery options
              </div>
            )} */}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-3 border-t border-gray-200">
          <Button
            onClick={handleEdit}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm"
          >
            <Edit3 className="w-4 h-4 mr-1" />
            Edit
          </Button>
          <Button
            onClick={handleShare}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm"
          >
            <Share2 className="w-4 h-4 mr-1" />
            Share
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 text-sm"
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  )
} 