import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { checkOutSchema } from '@shared/validation/check-out-schema'
import type { CheckOutSchema } from '@shared/validation/check-out-schema'
import { useState } from "react";
import { useCartState } from "@/zustand/hooks/cart/cart.hook";
import { useCartStore } from "@/zustand/store";

export default function useCheckOut(){

    const { data: { cartItems } } = useCartState()
    const { checkout } = useCartStore()
    const [ isLoading, setIsLoading ] = useState<boolean>(false)


    const form = useForm<CheckOutSchema>({
        resolver: zodResolver(checkOutSchema)
    })

    async function onCheckOut(value:CheckOutSchema) {
        setIsLoading(true)

        await checkout(value, cartItems)
        setIsLoading(false)
    }

    
    return { onCheckOut, form, isLoading }
    
}
