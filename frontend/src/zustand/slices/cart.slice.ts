import type { CartItem } from "@/types/cart";
import type { StateCreator } from "zustand";

export type CartItemContextType = {
  cartItems: Partial<CartItem>[];
  addToCart: (item: Partial<CartItem>) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  updateCartItemQuantity: (id:string, quantity: number) => void;
  ckStore: Partial<CartItem>[];   // looks like a cookie-store mirror?
  ckStoreCount: number;
};

export const createCartSlice: StateCreator<
  CartItemContextType,
  [],
  [],
  CartItemContextType
> = (set) => ({
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  ckStore: [],
  ckStoreCount: 0,
  updateCartItemQuantity: (id, newQuantity) =>
        set((state) => {
          if (newQuantity <= 0) {
            // if you want to remove item when qty = 0
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
  clearCart: () =>
    set(() => ({
      cartItems: [],
      ckStore: [],
      cartCount: 0,
      cartTotal: 0,
      ckStoreCount: 0,
    })),

  removeFromCart: (id: string) =>
    set((state) => {
      const filtered = state.cartItems.filter((item) => item.id !== id);

      return {
        cartItems: filtered,
        cartCount: filtered.reduce((acc, cur) => acc + (cur.quantity ?? 0), 0),
        cartTotal: filtered.reduce(
          (acc, cur) => acc + (cur.price ?? 0) * (cur.quantity ?? 0),
          0
        ),
        ckStore: filtered,
        ckStoreCount: filtered.reduce(
          (acc, cur) => acc + (cur.quantity ?? 0),
          0
        ),
      };
    }),

  addToCart: (item: Partial<CartItem>) =>
    set((state) => {
      let updated: Partial<CartItem>[];

      const found = state.cartItems.find((ci) => ci.id === item.id);

      if (!found) {
        updated = [...state.cartItems, { ...item, quantity: 1 }];
      } else {
        updated = state.cartItems.map((ci) =>
          ci.id === item.id
            ? { ...ci, quantity: (ci.quantity ?? 1) + 1 }
            : ci
        );
      }

      return {
        cartItems: updated,
        cartCount: updated.reduce((acc, cur) => acc + (cur.quantity ?? 0), 0),
        cartTotal: updated.reduce(
          (acc, cur) => acc + (cur.price ?? 0) * (cur.quantity ?? 0),
          0
        ),
        ckStore: updated,
        ckStoreCount: updated.reduce(
          (acc, cur) => acc + (cur.quantity ?? 0),
          0
        ),
      };
    }),
});
