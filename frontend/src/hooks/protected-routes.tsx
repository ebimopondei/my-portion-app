import { Roles } from '@shared/enums/index';
import { useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import useAuth from './auth-provider';


const ProtectedRoutes = () => {
    const navigate  = useNavigate();
    const location = useLocation();
    const pathName = location.pathname;
    const {token, user, isLoading, role } = useAuth();
    
    useEffect(()=>{

        if(!isLoading && token !== "" && role !== ''){
            if (role ==  Roles.ADMIN || role == Roles.SUBADMIN && !pathName.includes('/admin')){
                navigate('/admin');
            }
            
            if (role ==  Roles.VENDOR  && !pathName.includes('/vendor')){
                if(user?.kyc_verified){
                    navigate('/vendor/kyc');

                }else {
                    navigate('/vendor');

                }
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