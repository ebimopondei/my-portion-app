import { useProductStore } from "@/zustand/store";
import { useEffect } from "react";

export function useProduct() {
    const { loading, error, products, getAllProducts, selectedProduct } = useProductStore();
    useEffect(()=>{

        const fetchAllProducts = async () => {
            const fetches = [
                getAllProducts()
            ]

            try {
                await Promise.allSettled(fetches);
            } catch (err) {
                console.error("One or more dashboard analytics fetches failed:", err);
            }
        }

        fetchAllProducts();
        
    }, [getAllProducts]);

    const data = {
        products,
        selectedProduct
    }

    return {
        loading, 
        error, 
        data
    }
}