import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { productSchema } from '@shared/validation/product-schema'

import type { ProductSchema } from '@shared/validation/product-schema'
import { useState } from "react";
import ProductApi from "@/api/products/products-api";

export default function useCreateProduct(){

    const { createProduct } = ProductApi();
    const [ isLoading, setIsLoading ] = useState<boolean>(false)


    const form = useForm<ProductSchema>({
        resolver: zodResolver(productSchema),
        defaultValues: {
        }
    })

    async function onCreateProduct(value:ProductSchema) {
        setIsLoading(true)
        console.log(value)

        const response = await createProduct(value)
        toast.success(response.message);
        setIsLoading(false)
    }

    
    return { onCreateProduct, form, isLoading }
    
}
