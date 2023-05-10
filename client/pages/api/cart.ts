import { includes, size, remove } from "lodash";
import { toast } from "react-toastify";
import { authFetch } from "../../utils/fetch";

const CART = 'cart'
const baseUrl = process.env.BASE_PATH;

export const getProductsCart = () => {
    if (typeof window !== 'undefined') {
        const cart = localStorage.getItem(CART) || null;

        if (!cart) {
            return null;
        } else {
            const produts = cart.split(",");
            return produts;
        }
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

export const removeProductCart = (urlProduct: string) => {
    const cart: any | [] = getProductsCart();

    remove(cart, (item) => {
        return item === urlProduct;
    })

    if (size(cart) > 0) {
        localStorage.setItem(CART, cart)
    } else {
        localStorage.removeItem(CART)
    }
}

export const paymentCartApi = async (token: string | {}, products: any, idUser: string, address: any, logout: any) => {
    try {
        const addressShipping = address;
        delete addressShipping.users_permissions_user;
        delete addressShipping.createdAt;

        const url = `${baseUrl}/orders`;
        const params = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                token,
                products,
                users_permissions_user: idUser,
                addressShipping
            })
        }

        const result = await authFetch(url, params, logout);
        return result;
    } catch (error) {
        console.log(error);
        return null
    }
}

export const removeAllProductsCart = () => {
    localStorage.removeItem(CART);
}