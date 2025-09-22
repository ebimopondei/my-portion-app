import { apiPrivate } from "@/api/temp-config";
import type { StateCreator } from "zustand";


export interface Stats {
    user_count: number,
    total_user_count: number,
    vendor_count: number,
    total_vendor_count: number,
    total_product_count: number,
    total_order_count: number
}
export interface dashboardState {
    loading: boolean,
    error: string | null,
    stats: Stats,
    fetchDashboardStats: ()=> Promise<void>
}

export const createDashboardSlice: StateCreator<
dashboardState, 
[], 
[], 
dashboardState
> = ((set)=>{
    
    return (
        {
    stats: {
        total_order_count: 0,
        total_product_count: 0,
        total_user_count: 0,
        total_vendor_count: 0,
        user_count: 0,
        vendor_count: 0
    },
    loading: false,
    error: null,

    fetchDashboardStats: async () => {
        set({ loading: true, error: null })
        try {
            const response = await apiPrivate.get('/admin/stats', {})
            set({ stats: response.data.data, loading: false })
        }catch(err: any){
            set({ error: err.message, loading: false })
        }
    }

})})