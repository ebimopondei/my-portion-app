import { useCallback } from "react";

export function useAdminDashboard() {
    const getDashboardStats = useCallback(async()=>{
    }, [])

    return {
        get: getDashboardStats
    }
}