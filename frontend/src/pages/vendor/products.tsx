import { useState } from "react"
import {  
  VendorHeader, 
  ProductsContent,
  AddProductModal,
} from "../../components/vendor"
import type {  ProductAttribute } from "@shared/types/product";
import { useProduct } from "@/zustand/hooks/products";
import { useAuthStore } from "@/zustand/store";


export default function VendorProductsPage() {

  const { data } = useProduct()

  const vendorProducts = data.products

  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false)


  // Event handlers
  const handleEditProduct = (product: ProductAttribute) => {
    console.log('Edit product:', product)
  }

  const handleShareProduct = (product: ProductAttribute) => {
    console.log('Share product:', product)
  }

  const handleAddProduct = () => {
    setIsAddProductModalOpen(true)
  }

  const handleSaveDraft = (productData: any) => {
    console.log('Save draft:', productData)
  }


  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-4 sm:py-8">
        <VendorHeader vendorData={user} />
        <ProductsContent
            vendorProducts={vendorProducts}
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
            onShareProduct={handleShareProduct}
          />
      </main>

      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        onSaveDraft={handleSaveDraft}
      />
    </div>
  )
}