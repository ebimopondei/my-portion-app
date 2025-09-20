import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types/cart";

export type CartItemContextType = {
  cartItems: Partial<CartItem>[];
  addToCart: (item: Partial<CartItem>) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateCartItemQuantity: (id:string, quantity: number) => void;
  cartCount: number;
  cartTotal: number;
};

export const useCartStore = create<CartItemContextType>()(
  persist(
    (set, _) => ({
      cartItems: [],
      cartCount: 0,
      cartTotal: 0,

      clearCart: () => set(() => ({ cartItems: [], cartCount: 0, cartTotal: 0 })),

      removeFromCart: (id: string) =>
        set((state) => {
          const updated = state.cartItems.filter((item) => item.id !== id);
          return {
            cartItems: updated,
            cartCount: updated.reduce((acc, cur) => acc + (cur.quantity ?? 0), 0),
            cartTotal: updated.reduce(
              (acc, cur) => acc + (cur.price ?? 0) * (cur.quantity ?? 0),
              0
            ),
          };
        }),

        updateCartItemQuantity: (id, newQuantity) =>
        set((state) => {
          if (newQuantity <= 0) {
            const updated = state.cartItems.filter((item) => item.id !== id);
            return {
              cartItems: updated,
              cartCount: updated.reduce((acc, cur) => acc + (cur.quantity ?? 0), 0),
              cartTotal: updated.reduce(
                (acc, cur) => acc + (cur.price ?? 0) * (cur.quantity ?? 0),
                0
              ),
            };
          }

          const updated = state.cartItems.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
          );

          return {
            cartItems: updated,
            cartCount: updated.reduce((acc, cur) => acc + (cur.quantity ?? 0), 0),
            cartTotal: updated.reduce(
              (acc, cur) => acc + (cur.price ?? 0) * (cur.quantity ?? 0),
              0
            ),
          };
        }),

      addToCart: (item: Partial<CartItem>) =>
        set((state) => {
          let updated: Partial<CartItem>[];
          const found = state.cartItems.find((ci) => ci.id === item.id);

          let cartItemCount = state.cartCount
          if (!found) {
            updated = [...state.cartItems, { ...item, quantity: 1 }];
            cartItemCount++
          } else {
            updated = state.cartItems.map((ci) =>
              ci.id === item.id ? { ...ci, quantity: (ci.quantity ?? 1) + 1 } : ci
            );
          }

          return {
            cartItems: updated,
            cartCount: cartItemCount,
            cartTotal: updated.reduce(
              (acc, cur) => acc + (cur.price ?? 0) * (cur.quantity ?? 0),
              0
            ),
          };
        }),
    }),
    {
      name: "cart-storage", // key in localStorage
    }
  )
);
