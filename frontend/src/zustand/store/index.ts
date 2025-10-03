import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createCartSlice, type CartItemContextType } from "../slices/cart/cart.slice";
import { createDashboardSlice, type dashboardState } from "../slices/dashboard/dashboard.slice";
import { createProductsSlice, type ProductState } from "../slices/products/products.slice";
import { createAuthSlice, type AuthState } from "../slices/auth";
import { createAdminOrderSlice, type AdminOrdersState } from "../slices/admin/orders";
import { createOrdersSlice, type OrderState } from "../slices/orders/orders.slice";
import { createWalletSlice, type WalletState } from "../slices/wallet/wallet.slice";
import { createTransactionSlice, type TransactionState } from "../slices/transaction/transaction.slice";
import { createModalsSlice, type ModalState } from "../modal/modal.slice";

interface GlobalState extends 
CartItemContextType, 
dashboardState {

}

export const useCartStore = create<GlobalState>()((...a)=>(
{  ...persist(createCartSlice, 
    { 
        name: "cart-storage",
        partialize: (state) => {
            const { checkoutItem, ...rest } = state;
            return rest;
        }
    })(...a),
   ...createDashboardSlice(...a),
}
));


export const useProductStore = create<ProductState
>()((...a) =>(
{
    ...createProductsSlice(...a)
}
))

export const useModalStore = create<ModalState
>()((...a) =>(
{
    ...createModalsSlice(...a)
}
))

export const useOrderStore = create<OrderState
>()((...a) =>(
{
    ...createOrdersSlice(...a)
}
))

export const useWalletStore = create<WalletState
>()((...a) =>(
{
    ...createWalletSlice(...a)
}
))

export const useTransactionStore = create<TransactionState
>()((...a) =>(
{
    ...createTransactionSlice(...a)
}
))


export const useAuthStore = create<AuthState>()((...a) => (
{
    ...persist(createAuthSlice, { name: "auth-storage"})(...a),
}
))

export const useAdminStore = create<AdminOrdersState>()((...a) => (
{
    ...createAdminOrderSlice(...a),
}
))

