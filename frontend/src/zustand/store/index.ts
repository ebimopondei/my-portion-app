import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createCartSlice, type CartItemContextType } from "../slices/cart.slice";
import { createDashboardSlice, type dashboardState } from "../slices/dashboard/dashboard.slice";
import { createProductsSlice, type ProductState } from "../slices/products/products.slice";
import { createAuthSlice, type AuthState } from "../slices/auth";

interface GlobalState extends 
CartItemContextType, 
dashboardState {

}

export const useCartStore = create<GlobalState>()((...a)=>(
{  ...persist(createCartSlice, { name: "cart-storage",})(...a),
   ...createDashboardSlice(...a),
}
));


export const useProductStore = create<ProductState
>()((...a) =>(
{
    ...createProductsSlice(...a)
}
))

export const useAuthStore = create<AuthState>()((...a) => (
{
    ...persist(createAuthSlice, { name: "auth-storage"})(...a),
}
))
