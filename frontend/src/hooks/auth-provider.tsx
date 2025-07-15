import {  createContext, useContext, useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import useCookie from "./use-cookie";
import type { Props } from "@/types";
import type { loginProps } from "@/types/api-response-type";
import type { UserAttributes } from '@shared/types/user'


type AuthContextType = {
    loginAuth: ( { }: loginProps) => void;
    logoutAuth: () => void;
    token: string;
    refreshToken: string;
    setToken: Dispatch<SetStateAction<string>>;
    setRefreshToken: Dispatch<SetStateAction<string>>;
    isLoggedIn:boolean,
    isLoading:boolean,
    user: UserAttributes | null,
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
    setRole: Dispatch<SetStateAction<string>>;
    role: string;
}

const AuthContext = createContext<AuthContextType>({
    loginAuth: () => {},
    logoutAuth: () => {},
    token: "",
    refreshToken: "",
    setToken: ()=> {},
    setRefreshToken: ()=> {},
    isLoggedIn: false,
    isLoading: false,
    setIsLoggedIn: ()=>{},
    user: null,
    setRole: ()=> {},
    role: "",
});

export default function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}: Props){
    
    const { getCookie, setCookie, resetItem} = useCookie();
    const [ role, setRole] = useState<string>('');
    const [ user, setUser ] = useState<UserAttributes | null>(null);
    const [ token, setToken] = useState<string>("");
    const [ isLoading, setIsLoading] = useState<boolean>(true);
    const [ refreshToken, setRefreshToken] = useState<string>("");
    const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false);

    const loginAuth = ({token, refreshToken, user}:loginProps) => {
        setUser(user);
        setToken(token);
        setRefreshToken(refreshToken);
        setIsLoggedIn(true);
        setCookie('token', JSON.stringify(token) );
        setCookie('user', JSON.stringify(user) );
        setCookie('refreshToken', JSON.stringify(refreshToken) );
        setCookie('isLoggedIn', JSON.stringify(true) );
        setCookie('role', JSON.stringify(user?.role) );

    }
    
    const logoutAuth = ()=> {
        setIsLoggedIn(false);
        setToken('');
        setUser(null);
        setRefreshToken(''); 
        resetItem("token");
        resetItem("user");
        resetItem("role");
        resetItem("refreshToken");
        resetItem('isLoggedIn');

    }

    useEffect( ()=>{

        if(isLoading) return; 

        // Comment out the auth-check since the endpoint doesn't exist yet
        // async function checkAuth(){
        //     await apiPrivate.post('/auth/auth-check', { token })
        //     .then((res)=>{
        //         setIsLoggedIn(res.data.isAuthenticated);
        //     })
        //     .finally( ()=> setIsLoading(false))
        // }
        // checkAuth();
        
        // For now, just set loading to false
        setIsLoading(false);

    },[isLoading])


    useEffect(()=>{
        if(getCookie('token')){
            const temp = getCookie('token');
            setToken(JSON.parse(temp));
        }
        
        if(getCookie('user')){
            const temp = getCookie('user');
            setUser(JSON.parse(temp));
        }
        
        if(getCookie('isLoggedIn')){
            const temp =  String(getCookie('isLoggedIn'));
            const token  = JSON.parse(temp);
            setIsLoggedIn(Boolean(token));
        }

        if(getCookie('refreshToken')){
            const temp =  getCookie('refreshToken');
            setRefreshToken(JSON.parse(temp));
        }
        
        if(getCookie('role')){
            const temp =  getCookie('role');
            setRole(JSON.parse(temp));
        }

        setIsLoading(false)
    },[])

    //return early if auth provider not fully loaded.
    if(isLoading) return; 

    return(
        <AuthContext.Provider value={{ role, setRole, user, isLoggedIn, isLoading, setIsLoggedIn, loginAuth, logoutAuth, token, setToken, refreshToken, setRefreshToken}}>
            {children}
        </AuthContext.Provider>
    )

}