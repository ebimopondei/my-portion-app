import { apiPrivate } from "@/api/temp-config";

export default function OrderRecordApi (){

    
    const getOrderRecord= async ( ) =>{
        try {
            const res = await apiPrivate.get( `/vendor/order-record`);
            return res.data;

        }catch(err:any){
            if (err.response) {
                return { success: false, message: err.response.data.message, data: { token: "", refreshToken: "", roles: [''] } };
            } else {
                return {success: false, message: err.message, data: {token: "", refreshToken: "", roles: ['']}}
            }
        }
    }

    
    return  { getOrderRecord }

}

