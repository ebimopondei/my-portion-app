import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createCartSlice, type CartItemContextType } from "../slices/cart.slice";
import { createDashboardSlice, type dashboardState } from "../slices/dashboard/dashboard.slice";

export const useCartStore = create<CartItemContextType & dashboardState >()((...a)=>(
{  ...persist(createCartSlice, { name: "cart-storage",})(...a),
   ...createDashboardSlice(...a)
}
));
