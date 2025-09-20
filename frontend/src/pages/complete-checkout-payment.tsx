import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navbar } from "../components/home/navbar"
import { SlideMenu } from "../components/home/slide-menu"


import { ArrowLeft, CreditCard, CheckCircle, Copy } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CartSlide } from "../components/home/cart-slide"
import CheckOutApi from '@/api/checkout/check-out-api';
import { useCart } from '@/zustand/hooks';


const CompleteCheckOutPayment: React.FC = () => {
  const { cartItems, cartCount, clearCart} = useCart()

  const { order_record_id } = useParams();

    
  const navigate = useNavigate();
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  

  // Calculate charges
// @ts-expect-error
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const serviceCharge = 100;
  const shippingCost = cartItems.reduce((sum, _) => sum + 1000, 0) // Free shipping over $50
//   const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + serviceCharge + shippingCost;

  const bankDetails = {
    accountName: "ISRAEL OLORUNTOBA AKANDE",
    accountNumber: "8100510972",
    bankName: "Moniepoint MFB"
  };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   setShippingInfo(prev => ({
  //     ...prev,
  //     [e.target.name]: e.target.value
  //   }));
  // };

  // const handlePaymentConfirmed = () => {
  //   setPaymentConfirmed(true);
  //   toast.success("Your order has been successfully processed. You will receive a confirmation email shortly.");
  // };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Bank details copied to clipboard.");
    setPaymentConfirmed(true)
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  

  const [searchQuery, setSearchQuery] = useState("")
  const { completeCheckOut } = CheckOutApi();



  

  // if (cartItems.length === 0) {
  //   return (
  //     <div className="min-h-screen bg-background flex items-center justify-center">
  //       <Card className="max-w-md w-full">
  //         <CardContent className="p-8 text-center">
  //           <h2 className="text-2xl font-bold mb-4">Cart is Empty</h2>
  //           <p className="text-muted-foreground mb-6">
  //             Add some fresh produce to your cart before checkout.
  //           </p>
  //           <Button onClick={() => navigate('/')} 
  //           // variant="cart"
  //               >
  //             <ArrowLeft className="mr-2 h-4 w-4" />
  //             Continue Shopping
  //           </Button>
  //         </CardContent>
  //       </Card>
  //     </div>
  //   );
  // }

  
  


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
          <div className="min-h-screen bg-background py-8">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="flex items-center mb-8">
                <Button variant="ghost" onClick={() => navigate('/')} className="mr-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Shop
                </Button>
                <h1 className="text-3xl font-bold text-primary">Checkout</h1>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                
                    <div className="space-y-6">
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <CreditCard className="mr-2 h-5 w-5 text-primary" />
                            Payment Method
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="p-4 border rounded-lg bg-muted/30">
                              <h3 className="font-semibold mb-3">Bank Transfer Details</h3>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Account Name:</span>
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{bankDetails.accountName}</span>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => copyToClipboard(bankDetails.accountName)}
                                      className="h-6 w-6 p-0"
                                    >
                                      <Copy className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Account Number:</span>
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{bankDetails.accountNumber}</span>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => copyToClipboard(bankDetails.accountNumber)}
                                      className="h-6 w-6 p-0"
                                    >
                                      <Copy className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                                {/* <div className="flex justify-between">
                                  <span className="text-muted-foreground">Routing Number:</span>
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{bankDetails.routingNumber}</span>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => copyToClipboard(bankDetails.routingNumber)}
                                      className="h-6 w-6 p-0"
                                    >
                                      <Copy className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div> */}
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Bank Name:</span>
                                  <span className="font-medium">{bankDetails.bankName}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="p-4 border rounded-lg bg-warning/10 border-warning">
                              <p className="text-sm text-warning-foreground">
                                <strong>Transfer Amount:</strong>  ₦{total.toFixed(2)}
                              </p>
                            </div>

                            {!paymentConfirmed ? (
                              <Button

                              onClick={async()=>{
                                const response = await completeCheckOut(String(order_record_id))

                                if(response.success){

                                  setPaymentConfirmed(true); 
                                  clearCart()
                                }else{
                                  
                                }
                              }
                            }
                                
                                // onClick={handlePaymentConfirmed}
                              //   variant="payment"
                                className="w-full"
                                size="lg"
                              >
                                <CheckCircle className="mr-2 h-5 w-5" />
                                I Have Made the Payment
                              </Button>
                            ) : (
                              <div className="text-center p-4 bg-success/10 border border-success rounded-lg">
                                <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
                                <p className="text-success font-semibold">Payment Confirmed!</p>
                                <p className="text-sm text-muted-foreground">
                                  Your order will be processed within 24 hours.
                                </p>
                                <Link to='/'>
                                  <Button> Go to Market</Button>
                                </Link>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
              </div>
            </div>
          </div>
        </div>
  );
};

export default CompleteCheckOutPayment;
