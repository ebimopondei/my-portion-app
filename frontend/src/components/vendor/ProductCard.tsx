import { VendorProductCard } from '../shared/ProductCard'
import type { ProductCardProps } from './types'

const ProductCard = ({ product, onEdit, onShare, onView }: ProductCardProps) => {
  return (
    <VendorProductCard 
      product={product}
      onEdit={onEdit}
      onShare={onShare}
      onView={onView}
    />
  )
}

export default ProductCard 