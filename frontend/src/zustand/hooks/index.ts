import { useCartStore } from "../store";

export function useCart() {
    const cartState = useCartStore()

    return {
        addToCart: cartState.addToCart,
        cartCount: cartState.cartCount,
        cartItems: cartState.cartItems,
        cartTotal: cartState.cartTotal,
        clearCart: cartState.clearCart,
        removeFromCart: cartState.removeFromCart,
        updateCartItemQuantity: cartState.updateCartItemQuantity
    }
}