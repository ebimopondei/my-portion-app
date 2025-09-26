import { apiPrivate } from "@/api/temp-config";
import type { OrderWithProductAndUser } from "@shared/types/order";
import type { StateCreator } from "zustand";

export interface AdminOrdersState {
    orders: {
        orders: OrderWithProductAndUser[],
        pagination: {

        }

    },

    loading: boolean,
    error: string | null,

    getAllOrders: (page?:number, limit?:number) => Promise<void>,

}

export const createAdminOrderSlice: StateCreator<
AdminOrdersState,
[],
[],
AdminOrdersState> = ((set)=> {
    return {

        orders: {
            orders: [],
            pagination: {}
        },

        getAllOrders: async( page:number=1, limit: number=10) => {
            set({ loading: true, error: null})
            try {
                const res = await apiPrivate.get(`/admin/order/all`, { params: { page, limit }})
                set({ orders: res.data.data, loading: false })
            }catch(err:any){
                if (err.response) {
                    set({ error: err.response.data.message, loading: false })
                } else {
                    set({ error: err.message, loading: false })
                }
            }
        },

        loading: false,
        error: null

    }
})