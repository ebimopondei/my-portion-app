import { useAdminStore } from "@/zustand/store";
import { useEffect } from "react";

export function useAdminHook() {
    const { error, getAllOrders, loading, orders } = useAdminStore();
    useEffect(()=>{

        const fetchAllOrders = async () => {
            const fetches = [
                getAllOrders()
            ]

            try {
                await Promise.allSettled(fetches);
            } catch (err) {
                console.error("One or more admin fetches failed:", err);
            }
        }

        fetchAllOrders();
        
    }, [getAllOrders]);

    const data = {
        orders,
    }

    return {
        loading, 
        error, 
        data
    }
}