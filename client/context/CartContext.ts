import { createContext } from "react";

const CartContext = createContext({
    productsCart: 0,
    addProductCart: (reload: string) => null,
    getProductsCart: () => null,
    removeProductCart: (reload: string) => null,
    removeAllProductsCart: () => null,
})

export default CartContext;