import API from "../api-config";

export default function ProductApi (){

    const { api } = API();

    
    const getAllProducts= async (page:number=1, limit:number=10) =>{
        try {
            const res = await api.get( `/product`, { params: { page, limit}} );
            return res.data;

        }catch(err:any){
            if (err.response) {
                return { success: false, message: err.response.data.message, data: { token: "", refreshToken: "", roles: [''] } };
            } else {
                return {success: false, message: err.message, data: {token: "", refreshToken: "", roles: ['']}}
            }
        }
    }
    
    return  { getAllProducts }

}

