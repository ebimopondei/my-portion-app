import API from "../api-config";
import type { ProductSchema } from '@shared/validation/product-schema'

export default function ProductApi (){

    const { api, apiPrivate } = API();  
    const getProducts= async (page:number=1, limit:number=10) =>{
        try {
            const res = await apiPrivate.get( `/product`, { params: { page, limit}} );
            return res.data;

        }catch(err:any){
            if (err.response) {
                return { success: false, message: err.response.data.message, data: { token: "", refreshToken: "", roles: [''] } };
            } else {
                return {success: false, message: err.message, data: {token: "", refreshToken: "", roles: ['']}}
            }
        }
    }
    
    const getAllProducts= async (page:number=1, limit:number=10) =>{
        try {
            const res = await api.get( `/product/all`, { params: { page, limit}} );
            return res.data;

        }catch(err:any){
            if (err.response) {
                return { success: false, message: err.response.data.message, data: { token: "", refreshToken: "", roles: [''] } };
            } else {
                return {success: false, message: err.message, data: {token: "", refreshToken: "", roles: ['']}}
            }
        }
    }
    
    const createProduct= async (product: ProductSchema ) =>{
        try {
            const res = await apiPrivate.postForm( `/product/`, {
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
    
    return  { getAllProducts, getProducts, createProduct }

}

