import { includes, size } from "lodash";
import { toast } from "react-toastify";

const CART = 'cart'
const baseUrl = process.env.BASE_PATH;

export const getProductsCart = () => {
    const cart = localStorage.getItem(CART);

    if (!cart) {
        return null;
    } else {
        const produts = cart.split(",");
        return produts;
    }
}

export const addProductCart = (urlProduct: string) => {
    const cart: any | [] = getProductsCart();

    if (!cart) {
        localStorage.setItem(CART, urlProduct);
        toast.success("Product added to cart");
    } else {
        const productFound = includes(cart, urlProduct)
        if (productFound) {
            toast.warning("This product is already in the cart")
        } else {
            cart.push(urlProduct);
            localStorage.setItem(CART, cart);
            toast.success("Product added to cart")
        }
    }
}

export const countProductsCart = () => {
    const cart: any | [] = getProductsCart();

    if (!cart) {
        return 0;
    } else {
        return size(cart);
    }
}