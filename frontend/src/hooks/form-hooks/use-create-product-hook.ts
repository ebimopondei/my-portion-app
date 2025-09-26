import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { productSchema } from '@shared/validation/product-schema'

import type { ProductSchema } from '@shared/validation/product-schema'
import { useState } from "react";
import { useProductStore } from "@/zustand/store";

export default function useCreateProduct(){

    const { createProduct } = useProductStore()

    const [ isLoading, setIsLoading ] = useState<boolean>(false)


    const form = useForm<ProductSchema>({
        resolver: zodResolver(productSchema),
        defaultValues: {
        }
    })

    async function onCreateProduct(value:ProductSchema) {
        setIsLoading(true)

        await createProduct(value)
        setIsLoading(false)
    }

    
    return { onCreateProduct, form, isLoading }
    
}
