import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { CheckCircle, Copy, CreditCard } from "lucide-react"
import { Button } from "../ui/button"
import toast from "react-hot-toast"
import { useState } from "react"
import CheckOutApi from "@/api/checkout/check-out-api"
import { useCartState } from "@/zustand/hooks/cart/cart.hook"
import { Link } from "react-router-dom"
import { useModalStore } from "@/zustand/store"



export default function CheckoutPaymentModal() {

    const { isPaymentModalOpen, togglePaymentModal} = useModalStore()
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);
    const { data: { cartItems, checkoutItem } } = useCartState()
    
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast("Bank details copied to clipboard.");
        setPaymentConfirmed(true)
    };

    // @ts-expect-error
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingCost = cartItems.reduce((sum, _) => sum + 1000, 0)
    const serviceCharge = 100;
    const total = subtotal + serviceCharge + shippingCost;


    const bankDetails = {
        accountName: "ISRAEL OLORUNTOBA AKANDE",
        accountNumber: "8100510972",
        bankName: "Moniepoint MFB"
    };

    const { completeCheckOut } = CheckOutApi();

    
    
  return (
    <AnimatePresence>
      {isPaymentModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-green-500/20 z-50 flex items-center justify-center p-4"
          onClick={togglePaymentModal}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
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
                        const response = await completeCheckOut(String(checkoutItem?.id))

                        if(response.success){

                            setPaymentConfirmed(true); 
                        }else{
                            
                        }
                        }
                    }
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 