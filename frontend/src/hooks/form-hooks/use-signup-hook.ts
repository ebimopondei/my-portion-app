import APICalls from "@/api/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { signupSchema } from '@shared/validation/signup-schema'
import type { SignUpFormData } from '@shared/validation/signup-schema'
import { useState } from "react";
export default function useSignup(){

    const { signUp } = APICalls();
    const navigate = useNavigate()
    const [ isLoading, setIsLoading ] = useState<boolean>(false)


    const form = useForm<SignUpFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            confirmPassword: '',
            email: '',
            firstname: '',
            lastname: '',
            password: ''

        }
    })

    async function onSignUp(value:SignUpFormData) {
        setIsLoading(true)

        const response = await signUp(value)
        if(response.success){
            toast.success(response.message)
            navigate('/login');
        }else {
            toast.error(response.message)
        }

        setIsLoading(false)
    }

    
    return { onSignUp, form, isLoading }
    
}
