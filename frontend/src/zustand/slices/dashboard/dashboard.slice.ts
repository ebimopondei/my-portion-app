import { apiPrivate } from "@/api/temp-config";
import type { StateCreator } from "zustand";


export interface Stats {
    active_user_count: number,
    total_user_count: number,
    active_vendor_count: number,
    total_vendor_count: number,
    total_product_count: number,
    total_order_count: number,
    all_users_count: number,
    all_vendors_count: number
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
        active_user_count: 0,
        total_user_count: 0,
        active_vendor_count: 0,
        total_vendor_count: 0,
        total_product_count: 0,
        total_order_count: 0,
        all_users_count: 0,
        all_vendors_count: 0,
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