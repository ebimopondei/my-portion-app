import { useCartStore } from "../../store";

export function useCartState() {
    const { loading, error, addToCart, cartCount, cartItems, cartTotal, checkoutItem, ckStore, ckStoreCount, updateCartItemQuantity, clearCart, fetchDashboardStats, removeFromCart, stats,  } = useCartStore()

    const data = {
        addToCart, 
        cartCount, 
        cartItems, 
        cartTotal, 
        checkoutItem, 
        ckStore, 
        ckStoreCount, 
        updateCartItemQuantity, 
        clearCart, 
        fetchDashboardStats, 
        removeFromCart, 
        stats,
    }

    return {
        loading,
        error,
        data
    }
}
