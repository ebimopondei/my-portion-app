import { Roles } from '@shared/enums/index';
import { useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/zustand/store';


const ProtectedRoutes = () => {
    const navigate  = useNavigate();
    const location = useLocation();
    const pathName = location.pathname;
    const { isLoading, role } = useAuthStore();
    const { token } = useAuthStore()
    
    useEffect(()=>{

        if(!isLoading && token !== "" && role !== ''){
            if (role ==  Roles.ADMIN || role == Roles.SUBADMIN && !pathName.includes('/admin')){
                navigate('/admin');
            }
            
            if (role ==  Roles.VENDOR && !pathName.includes('/dashboard') ){
                navigate('/dashboard');
            }
            
            if(role != Roles.VENDOR && pathName.includes('/dashboard')){

                navigate('/')
            }


            
        }

        if(!isLoading && token == ""){
                navigate('/login');
        }
    }, [isLoading, token, role])


     if(isLoading || token =="") {
        return null
     }
    return <Outlet />
    
}

export default ProtectedRoutes