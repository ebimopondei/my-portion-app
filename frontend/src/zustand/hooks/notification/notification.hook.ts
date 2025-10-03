import { useNotificationStore } from "@/zustand/store";
import { useEffect } from "react";

export function useNotificactionState() {
    const { loading, error, notifications } = useNotificationStore();

    const data = {
        notifications
    }
    return {
        loading, 
        error,
        data
    }
}

export function useFectchNotifications() {
    const { getNotifications } = useNotificationStore()

    useEffect(()=>{
        const fetchNotifications = async () => {
            const fetches = [
                getNotifications()
            ]
            try {
                await Promise.allSettled(fetches)
            }catch( err){
                console.log("One or more Notifications fetches failed")
            }
        }

        fetchNotifications()
    }, [getNotifications])
}