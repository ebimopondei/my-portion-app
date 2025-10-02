import { useEffect } from "react";
import { useTransactionStore } from "../../store";

export function useTransactionState() {
    const { loading, error, transactions } = useTransactionStore();
    
    const data = {
        transactions,
    }

    return {
        loading, 
        error, 
        data
    }
}

export function useFetchTransactions() {
    const { getTransactions } = useTransactionStore();
    
    useEffect(()=>{

        const fetchTransactions = async () => {
            const fetches = [
                getTransactions()
            ]

            try {
                await Promise.allSettled(fetches);
            } catch (err) {
                console.error("One or more Transaction fetches failed:", err);
            }
        }

        fetchTransactions();
        
    }, [getTransactions]);
}
