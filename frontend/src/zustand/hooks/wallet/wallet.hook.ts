import { useEffect } from "react";
import { useWalletStore } from "../../store";

export function useWalletState() {
    const { loading, error, main_balance, sub_balance } = useWalletStore();
    
    const data = {
        main_balance,
        sub_balance,
    }

    return {
        loading, 
        error, 
        data
    }
}

export function useFetchWallet() {
    const { getWalletBalance } = useWalletStore();
    
    useEffect(()=>{

        const fetchWalletBalance = async () => {
            const fetches = [
                getWalletBalance()
            ]

            try {
                await Promise.allSettled(fetches);
            } catch (err) {
                console.error("One or more wallet fetches failed:", err);
            }
        }

        fetchWalletBalance();
        
    }, [getWalletBalance]);
}
