import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { checkOutSchema } from '@shared/validation/check-out-schema'
import type { CheckOutSchema } from '@shared/validation/check-out-schema'
import { useState } from "react";
import CheckOutApi from "@/api/checkout/check-out-api";
import useCartItem from "../cart-provider";

export default function useCheckOut(){

    const { cartItems } = useCartItem();

    const { checkOut } = CheckOutApi();
    const navigate = useNavigate()
    const [ isLoading, setIsLoading ] = useState<boolean>(false)


    const form = useForm<CheckOutSchema>({
        resolver: zodResolver(checkOutSchema)
    })

    async function onCheckOut(value:CheckOutSchema) {
        setIsLoading(true)

        const response = await checkOut(value, cartItems)
        navigate(`/dashboard/checkout/complete-payment/hash`);
        if(response.success){
            toast.success(response.message)
        }else {
            toast.error(response.message)
        }

        setIsLoading(false)
    }

    
    return { onCheckOut, form, isLoading }
    
}
