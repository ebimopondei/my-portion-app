import { apiPrivate } from "@/api/temp-config";
import type { TransactionAttribute } from "@shared/types/transaction";
import type { StateCreator } from "zustand";

export interface TransactionState {
    loading: boolean,
    error: string | null,
    transactions: TransactionAttribute[],

    getTransactions: (page?:number, limit?:number)=> Promise<void>,

}

export const createTransactionSlice: StateCreator<
TransactionState,
[],
[],
TransactionState> = ((set) => {
    return {
        loading: true,
        error: null,
        transactions: [],
        getTransactions: async (page:number=1, limit:number=10) =>{
            set({ loading: true, error: null})
            try {

                const res = await apiPrivate.get( `/transaction`, { params: { page, limit}} );
                set({ transactions: res.data.data.product, loading: false })
                

            }catch(err:any){
                if (err.response) {
                    set({ error: err.response.data.message, loading: false })
                } else {
                    set({ error: err.message, loading: false })
                }
            }
        },
    }
})
