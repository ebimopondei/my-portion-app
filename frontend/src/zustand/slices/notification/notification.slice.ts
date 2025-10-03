import { apiPrivate } from "@/api/temp-config";
import type { NotificationAttribute } from "@shared/types/notification";
import type { StateCreator } from "zustand";


export interface NotificiationState {
    loading: boolean,
    error: string | null,
    notifications: {
        totalPages: number,
        unreadNotificationCount: number, 
        notifications: NotificationAttribute[]
    },

    getNotifications: (page?:number, limit?:number)=> Promise<void>,

}

export const createNotificationsSlice: StateCreator<
NotificiationState,
[],
[],
NotificiationState> = ((set) => {
    return {
        loading: true,
        error: null,
        notifications: {
            totalPages: 0,
            unreadNotificationCount: 0,
            notifications: [],
        },
        getNotifications: async (page:number=1, limit: number=10) => {

            set({ loading: true, error: null})
            try {

                const res = await apiPrivate.get( `/notification`, { params: { page, limit}} );
                set({ notifications: res.data.data, loading: false })
                

            }catch(err:any){
                if (err.response) {
                    set({ error: err.response.data.message, loading: false })
                } else {
                    set({ error: err.message, loading: false })
                }
            }
        }
    }
})