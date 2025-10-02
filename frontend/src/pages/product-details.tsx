import { CartContent } from "@/components/home/cart-content"
import { CartSlide } from "@/components/home/cart-slide"
import { Navbar } from "@/components/home/navbar"
import { SlideMenu } from "@/components/home/slide-menu"
import Footer from "@/components/Layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatDate } from "@/lib/utils"
import type { CartItem } from "@/types/cart"
import { useCart } from "@/zustand/hooks"
import { useProductState } from "@/zustand/hooks/product/product.hook"
import { useProductStore } from "@/zustand/store"
import { ArrowLeft, MapPin, Package, Scale, ShoppingCart } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { getProductsById, clearSelectedProduct } = useProductStore()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { addToCart, cartTotal, cartCount } = useCart()
  const { data } = useProductState()

  useEffect(() => {
    getProductsById(String(id));

    return () => {
      clearSelectedProduct()
    }
    
  }, [id, getProductsById])

  const product = data.selectedProduct

  const handleAddToCart = () => {
    if (!product) return
    const newCartItem = {
      id: product.id,
      name: product.name,
      image: product.image_url,
      price: product.price_per_portion,
      unit: product.quantity_unit,
      vendor_id: product.seller_id,
    } as CartItem
    addToCart(newCartItem)
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <span className="text-gray-500 text-lg">Loading product details...</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        searchQuery=""
        setSearchQuery={() => {}}
        cartItems={cartCount}
        onMenuClick={() => { setIsMenuOpen(true)}}
        onCartClick={() => setIsCartOpen(true)}
      />
      <SlideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />   
      <CartSlide isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    
      <div className="min-h-screen bg-background  md:px-10">
        {/* Header */}
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/">
                <Button variant="ghost" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to marketplaces
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 md:grid grid-cols-3">
          <div className="col-span-2">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="w-full h-[250px] aspect-square overflow-hidden rounded-xl shadow-[var(--shadow-product)]">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div className="my-4">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h1 className="text-2xl font-bold leading-tight">{product.name}</h1>
                </div>
                
                <div className="flex items-center gap-4 text-muted-foreground mb-4">
                  <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{product.location}</span>
                  </div>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Pricing Card */}
              <Card className="border-fresh/20 bg-fresh-light/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-fresh">
                    Pricing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-fresh">
                      ₦{product.price_per_portion}
                    </span>
                    <span className="text-muted-foreground">per portion</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Each portion contains {product.number_per_portion} 
                    ({product.portion_size} {product.quantity_unit})
                  </p>
                </CardContent>
              </Card>

              {/* Product Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Package className="h-8 w-8 mx-auto mb-2 text-fresh" />
                    <p className="font-semibold">{product.available_portions}</p>
                    <p className="text-sm text-muted-foreground">Portions Available</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <Scale className="h-8 w-8 mx-auto mb-2 text-fresh" />
                    <p className="font-semibold">{product.total_quantity} {product.quantity_unit}</p>
                    <p className="text-sm text-muted-foreground">Total Quantity</p>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">

                <Button onClick={handleAddToCart} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
              </div>

              {/* Additional Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Additional Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Seller ID</span>
                    <span className="font-medium capitalize">{product.user.firstname} {product.user.lastname}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Listed on</span>
                    <span className="font-medium">
                      {formatDate(String(product.createdAt), "DD MMM, YYYY hh:mm A")}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Last updated</span>
                    <span className="font-medium">
                      {formatDate(String(product.updatedAt), "DD MMM, YYYY hh:mm A")}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="hidden md:block">
            <CartContent />
          </div>
        </div>
      </div>

      <div className="fixed bottom-20 w-full">
        {cartCount > 0 && 
          <div className="w-[90%] mx-auto py-4 px-4 text-sm font-bold text-white bg-primary rounded-lg flex items-center justify-between">
            <p>Prooceed to order item</p>
            <p>{cartTotal}</p>    
          </div>
        }
      </div>
      
      <Footer />
    </div>
  )
}