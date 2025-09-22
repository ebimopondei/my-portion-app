import { Roles } from '@shared/enums/index';
import { useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import useAuth from './auth-provider';
import { apiPrivate } from '@/api/temp-config';


const ProtectedRoutes = () => {
    const navigate  = useNavigate();
    const location = useLocation();
    const pathName = location.pathname;
    const {token, isLoading, role, setUser, refreshUser } = useAuth();
    
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

    useEffect( ()=>{

        

        const handleGetUser = async () => {
            const user = await apiPrivate.get('/user')
            setUser(user.data.data)
            console.log(user.data)

        }

        handleGetUser()

    },[refreshUser])

     if(isLoading || token =="") {
        return null
     }
    return <Outlet />
    
}

export default ProtectedRoutes