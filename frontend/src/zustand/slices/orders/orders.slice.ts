import { apiPrivate } from "@/api/temp-config";
import type { ProductWithOrders } from "@shared/types/product";

import type { StateCreator } from "zustand";

interface OrderResponseType {
    product_orders: ProductWithOrders[],
    all_products_count: number,
    pending_products_count: number,
    delivered_products_count: number,
}

export interface OrderState {
    loading: boolean,
    error: string | null,
    product_orders: OrderResponseType,
    selected_product_order: ProductWithOrders | null,

    getProductOrderById: (id:string)=> Promise<void>,
    getProductOrders: (page?:number, limit?:number)=> Promise<void>,
    clearSelectedOrder: () => void,
    setSelectedProductOrder: (id:string)=> void,

}

export const createOrdersSlice: StateCreator<
OrderState,
[],
[],
OrderState> = ((set)=> {
return{
        loading: true,
        error: null,
        product_orders: {
            all_products_count: 0,
            delivered_products_count: 0,
            pending_products_count: 0,
            product_orders: []
        },
        selected_product_order: null,

        getProductOrderById: async (id:string) =>{
            set({ loading: true, selected_product_order: null, error: null})
            try {
                const res = await apiPrivate.get( `/order/${id}`, {} );
                set({ selected_product_order: res.data.data.product, loading: false })
            }catch(err:any){
               if (err.response) {
                    set({ error: err.response.data.message, loading: false })
                } else {
                    set({ error: err.message, loading: false })
                }
            }
        },


        getProductOrders: async (page:number=1, limit:number=10, status: string = '') =>{
            set({ loading: true, error: null})
            try {

                const res = await apiPrivate.get( `/vendor/order-record`, { params: { page, limit, status}} );
                set({ product_orders: res.data.data, loading: false })
                

            }catch(err:any){
                if (err.response) {
                    set({ error: err.response.data.message, loading: false })
                } else {
                    set({ error: err.message, loading: false })
                }
            }
        },

        clearSelectedOrder: ()=> {
            set({ selected_product_order: null })
        },

        setSelectedProductOrder: (id:string) => {

            set((state) => {
                const selectedItem = state.product_orders.product_orders.find(product => product.id == id)
                return {
                    selected_product_order: selectedItem
                }
            })

        }
    }
})