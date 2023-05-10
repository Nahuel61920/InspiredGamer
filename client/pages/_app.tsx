import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useMemo, useState, useEffect } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import { setToken, getToken, removeToken } from "./api/token";
import {
  getProductsCart,
  addProductCart,
  countProductsCart,
  removeProductCart,
  removeAllProductsCart,
} from "./api/cart";
import jwtDecode from "jwt-decode";
import AuthContext from "../context/AuthContext";

import "../scss/global.scss";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";
import CartContext from "../context/CartContext";
import Seo from "../components/Seo";

export default function App({ Component, pageProps }: AppProps) {
  const [auth, setAuth] = useState({} as any);
  const [reloadUser, setReloadUser] = useState(false);
  const [totalProductsCars, setTotalProductsCars] = useState(0);
  const [reloadCart, setReloadCart] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      let decodedToken: any = jwtDecode(token);
      setAuth({
        token,
        idUser: decodedToken.id,
      });
    } else {
      setAuth(null);
    }
    setReloadUser(false);
  }, [reloadUser]);

  useEffect(() => {
    setTotalProductsCars(countProductsCart);
    setReloadCart(false);
  }, [reloadCart, auth]);

  const login = (token: string) => {
    setToken(token);
    let decodedToken: any = jwtDecode(token);
    setAuth({
      token,
      idUser: decodedToken.id,
    });
  };

  const logout = () => {
    if (auth) {
      removeToken();
      setAuth(null);
      router.push("/");
    }
  };

  const addProduct = (urlProduct: string) => {
    const token = getToken();
    if (token) {
      addProductCart(urlProduct);
      setReloadCart(true);
    } else {
      toast.warning("To buy a game you have to start section");
    }
  };

  const removeProduct = (urlProduct: string) => {
    removeProductCart(urlProduct);
    setReloadCart(true);
  };

  const authData: any = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser,
    }),
    [auth]
  );

  const cartData: any = useMemo(
    () => ({
      productsCart: totalProductsCars,
      addProductCart: (urlProduct: string) => addProduct(urlProduct),
      getProductsCart: getProductsCart,
      removeProductCart: (urlProduct: string) => removeProduct(urlProduct),
      removeAllProductsCart: removeAllProductsCart,
    }),
    [totalProductsCars]
  );

  if (auth === undefined) return null;

  return (
    <>
      <AuthContext.Provider value={authData}>
        <CartContext.Provider value={cartData}>
          <Seo
            title="InspiredGamer"
            description="The best games at your fingertips"
          />
          <Component {...pageProps} />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
          />
        </CartContext.Provider>
      </AuthContext.Provider>
    </>
  );
}
