import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { vendorKycSchema } from '@shared/validation/vendor-kyc-schema'

import type { VendorKycSchema } from '@shared/validation/vendor-kyc-schema'
import { useState } from "react";
import KycApi from "@/api/vendor/kyc";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useCompleteKyc(){

    const navigate = useNavigate();

    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const { submitKyc } = KycApi()

    const form = useForm<VendorKycSchema>({
        resolver: zodResolver(vendorKycSchema),
        defaultValues: {
        }
    })

    async function onSubmitKyc(value:VendorKycSchema) {
        setIsLoading(true)

        const response = await submitKyc(value)
        toast.success(response.message);
        navigate('/vendor')
    
        setIsLoading(false)
    }

    
    return { onSubmitKyc, form, isLoading }
    
}
