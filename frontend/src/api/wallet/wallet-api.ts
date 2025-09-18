import API from "../api-config";

export default function WalletApi (){

    const { apiPrivate } = API();  

    const getWalletBalance = async () =>{
        try {
            const res = await apiPrivate.get( `/wallet`, {} );
            return res.data;

        }catch(err:any){
            if (err.response) {
                return { success: false, message: err.response.data.message, data: { token: "", refreshToken: "", roles: [''] } };
            } else {
                return {success: false, message: err.message, data: {token: "", refreshToken: "", roles: ['']}}
            }
        }
    }
    

    
    return  { getWalletBalance }

}

