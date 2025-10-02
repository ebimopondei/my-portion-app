import { useEffect } from "react";
import { useOrderStore } from "../../store";

export function useOrderState() {
    const { loading, error, product_orders, selected_product_order } = useOrderStore();
    
    const data = {
        product_orders,
        selected_product_order,
    }

    return {
        loading, 
        error, 
        data
    }
}


export function useFetchOrders() {
    const { getProductOrders } = useOrderStore();
    
    useEffect(()=>{

        const fetchProductsOrders = async () => {
            const fetches = [
                getProductOrders()
            ]

            try {
                await Promise.allSettled(fetches);
            } catch (err) {
                console.error("One or more dashboard analytics fetches failed:", err);
            }
        }

        fetchProductsOrders();
        
    }, [getProductOrders]);
}
