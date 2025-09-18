import { useState, useEffect } from "react"
import {  
  VendorHeader, 
  ProductsContent,
  AddProductModal,
} from "../../components/vendor"
import type {  ProductAttribute } from "@shared/types/product";
import ProductApi from "@/api/products/products-api";
import useAuth from "@/hooks/auth-provider";


export default function VendorProductsPage() {

  const [ vendorProducts, setVendorProducts ] = useState<ProductAttribute[]>([]);

  const { getProducts } = ProductApi()

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

  useEffect(()=>{
    async function handleFetchProducts(){
      const response = await getProducts();
      setVendorProducts(response.data.product)

    }

    handleFetchProducts()
  }, [])

  const { user } = useAuth();

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