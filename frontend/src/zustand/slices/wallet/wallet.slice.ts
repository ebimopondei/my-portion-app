import { apiPrivate } from "@/api/temp-config";
import type { StateCreator } from "zustand";

export interface WalletState {
    loading: boolean,
    error: string | null,
    main_balance: number,
    sub_balance: number,

    getWalletBalance: () => void,
}

export const createWalletSlice: StateCreator<
WalletState,
[],
[],
WalletState> = ((set) => {
    return {
        loading: true,
        error: null,
        getWalletBalance: async () => {
            set({ loading: true, error: null })

            try {
                const response = await apiPrivate.get('wallet', { } )
                set( { main_balance: response.data.data.main_balance, sub_balance: response.data.data.sub_balance })
            }catch(err:any){
                if (err.response) {
                    set({ error: err.response.data.message, loading: false })
                } else {
                    set({ error: err.message, loading: false })
                }
            }
        },
        main_balance: 0,
        sub_balance: 0,
    }
})
