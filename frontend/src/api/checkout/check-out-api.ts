import type { CheckOutSchema } from "@shared/validation/check-out-schema";
import type { CartItem } from "@/types/cart";
import { apiPrivate } from "../temp-config";

export default function CheckOutApi (){


    const completeCheckOut= async ( id:string ) =>{
        try {
            const res = await apiPrivate.patch( `/order/complete-check-out/${id}` );
            return res.data;

        }catch(err:any){
            if (err.response) {
                return { success: false, message: err.response.data.message, data: { token: "", refreshToken: "", roles: [''] } };
            } else {
                return {success: false, message: err.message, data: {token: "", refreshToken: "", roles: ['']}}
            }
        }
    }
    
    const checkOut= async (product: CheckOutSchema, cartItems: Partial<CartItem>[] ) =>{
        try {
            const res = await apiPrivate.post( `/product/check-out/`, {
                ...product, cartItems

            } );
            return res.data;

        }catch(err:any){
            if (err.response) {
                return { success: false, message: err.response.data.message, data: { token: "", refreshToken: "", roles: [''] } };
            } else {
                return {success: false, message: err.message, data: {token: "", refreshToken: "", roles: ['']}}
            }
        }
    }
    
    return  { checkOut, completeCheckOut }

}

