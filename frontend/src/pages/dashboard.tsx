import { useEffect, useState } from "react"
import { MapPin } from "lucide-react"
import { Navbar } from "../components/home/navbar"
import { SlideMenu } from "../components/home/slide-menu"
import { Categories } from "../components/home/categories"
import { CustomTabs, CustomTabsList, CustomTabsTrigger, CustomTabsContent } from "../components/home/custom-tabs"
import { ProductCard } from "../components/home/product-card"
import { CartSlide } from "../components/home/cart-slide"
import CitySelectionModal from "../components/home/city-selection-modal"


import type { ProductAttribute } from '@shared/types/product'
import type { CartItem } from "@/types/cart"
import Footer from "@/components/Layout/footer"
import { useCart } from "@/zustand/hooks"
import { useFetchProduct, useProductState } from "@/zustand/hooks/product/product.hook"

export default function DashboardPage() {
  
  useFetchProduct();
  const { data } = useProductState();
  
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [showCityModal, setShowCityModal] = useState(false);
  const activeDeals = data.products?.filter((product) => product.available_portions >= product.portion_size )


  const [searchQuery, setSearchQuery] = useState("")
  const { addToCart, cartCount } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const filteredProducts = data.products?.filter((product) => {
    const matchesSearch = product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const filteredActiveDeals = activeDeals?.filter((product) => {
    const matchesSearch = product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = ({ id, name, image_url, price_per_portion, quantity_unit, seller_id}:Partial<ProductAttribute>) => {
    const newCartItems = { id, name, image: image_url, price: price_per_portion, unit: quantity_unit, vendor_id: seller_id  } as  CartItem

    addToCart(newCartItems)
  }

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    localStorage.setItem('selectedCity', city);
  }

  useEffect(()=>{
    // Check if user has already selected a city
    const savedCity = localStorage.getItem('selectedCity');
    if (!savedCity) {
      setShowCityModal(true);
    } else {
      setSelectedCity(savedCity);
    }
  }, [])


  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartItems={cartCount}
        onMenuClick={() => setIsMenuOpen(true)}
        onCartClick={() => setIsCartOpen(true)}
      />

      <SlideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <CartSlide isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <main className="max-w-7xl mx-auto px-6 lg:px-16 py-8">
        {/* City Indicator */}
        {selectedCity && (
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <MapPin className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-sm text-gray-600">
                Showing products in <span className="font-medium text-gray-800">{selectedCity}</span>
              </span>
            </div>
            <button
              onClick={() => setShowCityModal(true)}
              className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Change City
            </button>
          </div>
        )}

        <Categories onCategoryChange={setSelectedCategory} />

        <CustomTabs>
          <CustomTabsList>
            <CustomTabsTrigger value="browse">Browse</CustomTabsTrigger>
            <CustomTabsTrigger value="deals">Active Deals</CustomTabsTrigger>
          </CustomTabsList>

          <CustomTabsContent value="browse">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts?.length > 0 ? (
                filteredProducts?.map((product) => (
                  <ProductCard key={product.id} product={product} onAddToCart={()=>handleAddToCart(product)} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">No products found.</p>
                  <p className="text-gray-400 text-sm mt-2">Try adjusting your search or category filter.</p>
                </div>
              )}
            </div>
          </CustomTabsContent>

          <CustomTabsContent value="deals">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActiveDeals?.length > 0 ? (
                filteredActiveDeals?.map((product) => (
                  <ProductCard key={product.id} product={product} onAddToCart={()=> handleAddToCart(product)} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">No active deals available at the moment.</p>
                  <p className="text-gray-400 text-sm mt-2">Check back later for group buying opportunities!</p>
                </div>
              )}
            </div>
          </CustomTabsContent>
        </CustomTabs>
      </main>

      <Footer />

      {/* City Selection Modal */}
      <CitySelectionModal
        isOpen={showCityModal}
        onClose={() => setShowCityModal(false)}
        onCitySelect={handleCitySelect}
      />
    </div>
  )
}