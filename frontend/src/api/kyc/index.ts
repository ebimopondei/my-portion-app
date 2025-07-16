import API from "../api-config";
import type { VendorKycSchema } from '@shared/validation/vendor-kyc-schema'

export default function KycApi (){

    const { apiPrivate } = API();


    
    const submitKyc= async (product: VendorKycSchema ) =>{
        try {
            const res = await apiPrivate.postForm( `/vendor/kyc/`, {
                ...product

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
    
    return  { submitKyc }

}

