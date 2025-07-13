import type { LoginResponse, RefreshTokenResponse, SignupResponse } from "@/types/api-response-type";
import API from "./api-config";
import type { SignUpFormData } from '@shared/validation/signup-schema'
import type { LoginSchema } from '@shared/validation/login-schema'

export default function APICalls (){

    const { api } = API();

    const login= async ({ email, password}: Partial<LoginSchema>):Promise<LoginResponse> =>{
        try {
            const res = await api.post(`/auth/login`, { email, password } );
            return res.data;


        }catch(err:any){
            if (err.response) {
                return { success: false, message: err.response.data.message, data: { token: "", refreshToken: "", user: null } };
            } else {
                return {success: false, message: err.message, data: {token: "", refreshToken: "", user: null}}
            }
        }
    }
    
    const newRefreshToken= async ():Promise<RefreshTokenResponse> =>{
        try{
            const res = await api.post(`/auth/refresh`, {}, { withCredentials: true });
            return res.data;
        }catch(err:any){
            if (err.response) {
                return { success: false, message: err.response.data.message, data: { token: "", refreshToken: "", user: null } };
            } else {
                return {success: false, message: err.message, data: {token: "", refreshToken: "", user : null}}
            }
        }
    }

    const signUp= async ({ firstname, lastname, email, password, confirmPassword}: Partial<SignUpFormData>):Promise<SignupResponse> =>{
        try{
            const res = await api.post(`/auth/signup`, {

                firstname, lastname, email, password, confirmPassword
             
            }
        );
            const data = res.data
            return data;
        }catch(err:any){
            if (err.response) {
                return { success: false, message: err.response.data.message, data: { token: "", refreshToken: "", user: null } };
            } else {
                return {success: false, message: err.message, data: {token: "", refreshToken: "", user: null}}
            }
        }
    }




    

    return  { login, signUp, newRefreshToken }

}

