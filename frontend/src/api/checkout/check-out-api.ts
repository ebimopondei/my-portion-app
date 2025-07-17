import type { CheckOutSchema } from "@shared/validation/check-out-schema";
import API from "../api-config";
import type { CartItem } from "@/types/cart";

export default function CheckOutApi (){

    const { apiPrivate } = API();


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
    
    return  { checkOut }

}

