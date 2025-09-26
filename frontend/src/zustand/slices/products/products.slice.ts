import { api, apiPrivate } from "@/api/temp-config";
import type { ProductWithuser } from "@shared/types/product";
import type { ProductSchema } from "@shared/validation/product-schema";
import type { StateCreator } from "zustand";

export interface ProductState {
    loading: boolean,
    error: string | null,
    products: ProductWithuser[],
    selectedProduct: ProductWithuser | null,

    clearSelectedProduct: () => void,

    getProducts: (page?:number, limit?:number)=> Promise<void>,
    getProductsById: (id:string)=> Promise<void>,
    setSelectedProduct: (id:string)=> void,
    getAllProducts: (page?:number, limit?:number)=> Promise<void>,
    createProduct: (product: ProductSchema) => Promise<void>

}

export const createProductsSlice: StateCreator<
ProductState,
[],
[],
ProductState> = ((set)=> {
return{
        loading: true,
        error: null,
        products: [],
        selectedProduct: null,

        getProducts: async (page:number=1, limit:number=10) =>{
            set({ loading: true, error: null})
            try {
                const res = await apiPrivate.get( `/product`, { params: { page, limit}} );
                set({ products: res.data.data.product, loading: false })

            }catch(err:any){
                if (err.response) {
                    set({ error: err.response.data.message, loading: false })
                } else {
                    set({ error: err.message, loading: false })
                }
            }
        },

        getProductsById: async (id:string) =>{
            set({ loading: true, selectedProduct: null, error: null})
            try {
                const res = await api.get( `/product/${id}`, );
                set({ selectedProduct: res.data.data, loading: false })
    console.log(res)
            }catch(err:any){
               if (err.response) {
                    set({ error: err.response.data.message, loading: false })
                } else {
                    set({ error: err.message, loading: false })
                }
            }
        },

        getAllProducts: async (page:number=1, limit:number=10) =>{
            set({ loading: true, error: null})
            try {

                const res = await api.get( `/product/all`, { params: { page, limit}} );
                set({ products: res.data.data.product, loading: false })
                

            }catch(err:any){
                if (err.response) {
                    set({ error: err.response.data.message, loading: false })
                } else {
                    set({ error: err.message, loading: false })
                }
            }
        },

        clearSelectedProduct: ()=> {
            set({ selectedProduct: null })
        },

        createProduct: async (product: ProductSchema) =>{
            set({ loading: true, error: null})
            try {
                const res = await api.postForm( `/product/`, {
                    ...product
                } );
                set((state) => ({ products: [...state.products, res.data.data.product], loading: false }))

            }catch(err:any){
                if (err.response) {
                    set({ error: err.response.data.message, loading: false })
                } else {
                    set({ error: err.message, loading: false })
                }
            }
        },

        setSelectedProduct: (id:string) => {

            set((state) => {
                const selectedItem = state.products.find(product => product.id == id)
                return {
                    selectedProduct: selectedItem
                }
            })

        }
    }
})