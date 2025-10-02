import { useProductStore } from "@/zustand/store";
import { useEffect } from "react";

export function useProductState() {
    const { loading, error, products, user_products, selectedProduct } = useProductStore();
    
    const data = {
        products,
        selectedProduct,
        user_products,
    }

    return {
        loading, 
        error, 
        data
    }
}

export function useFetchProduct() {
    const { getProducts } = useProductStore();
    
    useEffect(()=>{

        const fetchProducts = async () => {
            const fetches = [
                getProducts()
            ]

            try {
                await Promise.allSettled(fetches);
            } catch (err) {
                console.error("One or more dashboard analytics fetches failed:", err);
            }
        }

        fetchProducts();
        
    }, [getProducts]);
}

export function useFetchUserProduct() {
    const { getUserProducts } = useProductStore();
    
    useEffect(()=>{

        const fetchProducts = async () => {
            const fetches = [
                getUserProducts()
            ]

            try {
                await Promise.allSettled(fetches);
            } catch (err) {
                console.error("One or more dashboard analytics fetches failed:", err);
            }
        }

        fetchProducts();
        
    }, [getUserProducts]);
}