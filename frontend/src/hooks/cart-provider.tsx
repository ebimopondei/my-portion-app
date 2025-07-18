import {  createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Props } from "@/types";
import useCookie from "./use-cookie";
import type { CartItem } from "@/types/cart";


type CartItemContextType = {
    cartItems: Partial<CartItem>[];
    setCartItems: Dispatch<SetStateAction<Partial<CartItem>[]>>;
    addToCart: (item: Partial<CartItem> ) => void;
    removeFromCart: (id: string ) => void;
    clearCart: ( ) => void;
    cartCount: number;
    updateCartItemQuantity: (id:string, quantity: number) => void;
    cartTotal: number;
    ckStore: Partial<CartItem>[];
    setCkStore: Dispatch<SetStateAction<Array<Partial<CartItem>>>>;
    ckStoreCount: number;
}

const CartItemContext = createContext<CartItemContextType>({

    cartItems: [],
    clearCart: () => {},
    setCartItems: ()=> {},
    addToCart: () =>{},
    removeFromCart: () =>{},
    cartCount: 0,
    updateCartItemQuantity: () => {},
    cartTotal: 0,
    ckStore: [],
    setCkStore: ()=>{},
    ckStoreCount: 0,
});

export default function useCartItem(){
    return useContext(CartItemContext);
}

export function CartProvider({children}: Props){


    const { getCookie, setCookie } = useCookie();
    

    const [cartItems, setCartItems] = useState<Partial<CartItem>[]>([])
    const [ckStore, setCkStore] = useState<Partial<CartItem>[]>([])
    const [ckStoreCount, setCkStoreCount ] = useState<number>(0)
    const [cartCount, setCartCount] = useState<number>(ckStoreCount);



    const cartTotal = useMemo(()=>{
        let total = 0;
        // @ts-expect-error
        ckStore.map((item, _)=> total += (item.price * item.quantity));
        return total
    }, [ckStore])

    const clearCart = (): void => {
        setCookie('store', JSON.stringify([]));
        setCkStore([])
        setCartItems([])

        setCookie('storeCount', JSON.stringify(0))
        setCkStoreCount(0)
        setCartCount(0)
    }


    const removeFromCart = (id:string):void =>{
        const tempCookieStore:string =  getCookie('store');
        const CookieStoreCount = Number(getCookie('storeCount'));
        
        const CookieStore:CartItem[]  = JSON.parse(tempCookieStore);
        const found = CookieStore.find((cartItem)=> cartItem.id == id);
        console.log(found);

        if(found){
            const modifiedCookieStore:CartItem[] = CookieStore.filter(item => item.id !== found.id);
            setCkStore(modifiedCookieStore)
            setCookie('store', JSON.stringify(modifiedCookieStore));
            setCookie('storeCount', String(CookieStoreCount - 1));
            setCartItems(modifiedCookieStore);
            setCartCount(prev=> prev-1);
            setCkStoreCount(prev=>prev-1)
        }

    }

    const addToCart = (item:Partial<CartItem>):void =>{
        const temp =  String(getCookie('store'));
        console.log(temp);
        const CookieStore:Partial<CartItem>[]  = JSON.parse(temp);
        const found = CookieStore.find((cartItem)=> cartItem.id == item.id )
        console.log(CookieStore);
        
        if(!found){
            const newItem:Partial<CartItem>[] = [...CookieStore, {...item, quantity: 1}]
            setCookie('store', JSON.stringify(newItem));
            setCookie('storeCount', ckStoreCount + 1)
            setCartItems(newItem);
            setCartCount(prev=>prev+1);
            setCkStore(newItem);
            setCkStoreCount(prev=>prev+1);
        } else {
            
            const modifiedCookieStore = CookieStore.map((prevItem)=>{
                if(prevItem.id === item.id){
                    // @ts-expect-error
                    return {...prevItem, quantity: prevItem.quantity + 1}
                }
                console.log();
                return {...prevItem};
            });

            setCkStore(modifiedCookieStore);
            setCookie('store', JSON.stringify(modifiedCookieStore));
            setCartItems(modifiedCookieStore);
        }
    }

    const updateCartItemQuantity = (id: string, newQuantity: number) => {
        if (newQuantity === 0) {
            return;
        } else {
            const updatedCart = cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
            setCartItems(updatedCart)
            setCkStore(updatedCart);
            setCookie('store', JSON.stringify(updatedCart));

        }
    }
    

    useEffect(()=>{
            if(getCookie('store')){
                const temp = getCookie('store');
                setCkStore(JSON.parse(temp));
                setCartItems(JSON.parse(temp));
            }else{
                setCookie('store', JSON.stringify([]));
                setCkStore([])
                setCartItems([])
            }
            
            if(getCookie('storeCount')){
                const temp = getCookie('storeCount');
                setCkStoreCount(JSON.parse(temp));
                setCartCount(JSON.parse(temp));
            }else {
                setCookie('storeCount', JSON.stringify(0))
                setCkStoreCount(0)
                setCartCount(0)
            }
            
        },[])
    return(
        <CartItemContext.Provider value={{ clearCart, updateCartItemQuantity, cartItems, cartCount, addToCart, cartTotal, ckStore, ckStoreCount, removeFromCart, setCkStore, setCartItems}}>
            {children}
        </CartItemContext.Provider>
    )

}