import {  createContext, useContext, useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Props } from "@/types";
import type { loginProps } from "@/types/api-response-type";
import type { UserAttributes } from '@shared/types/user'


type AuthContextType = {
    loginAuth: ( { }: loginProps) => void;
    logoutAuth: () => void;
    token: string;
    refreshToken: string;
    refreshUser: UserAttributes | null;
    setToken: Dispatch<SetStateAction<string>>;
    setRefreshToken: Dispatch<SetStateAction<string>>;
    setRefreshUser: Dispatch<SetStateAction<UserAttributes | null>>;
    setUser: Dispatch<SetStateAction<UserAttributes | null>>;
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
    refreshUser: null,
    setToken: ()=> {},
    setRefreshToken: ()=> {},
    setRefreshUser: ()=> {},
    setUser: ()=> {},
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
    
    const [ refreshUser, setRefreshUser ] = useState<UserAttributes | null >(null);
    const [ role, setRole] = useState<string>('');
    const [ user, setUser ] = useState<UserAttributes | null>(null);
    const [ token, setToken] = useState<string>("");
    const [ isLoading, setIsLoading] = useState<boolean>(true);
    const [ refreshToken, setRefreshToken] = useState<string>("");
    const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false);

    const loginAuth = ({token, refreshToken, user}:loginProps) => {
        setToken(token);
        setRefreshToken(refreshToken);
        setIsLoggedIn(true);
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        setRole(String(user?.role))
        setUser(user)

    }
    
    const logoutAuth = ()=> {
        setToken('');
        setRefreshToken(''); 
        setIsLoggedIn(false);
        setRole('')
        setUser(null);
    }


    useEffect(()=>{
        setIsLoading(true)

        const token = localStorage.getItem('token') || ''

        if(token){
            setToken(token)
        }
        setIsLoading(false)

    },[])
    //return early if auth provider not fully loaded.
    if(isLoading) return; 


    return(
        <AuthContext.Provider value={{ refreshUser, setUser, setRefreshUser, role, setRole, user, isLoggedIn, isLoading, setIsLoggedIn, loginAuth, logoutAuth, token, setToken, refreshToken, setRefreshToken}}>
            {children}
        </AuthContext.Provider>
    )

}