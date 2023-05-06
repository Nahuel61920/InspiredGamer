import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useMemo, useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import {useRouter} from 'next/router';
import { ToastContainer } from 'react-toastify';
import {setToken, getToken, removeToken} from "./api/token";

import jwtDecode from 'jwt-decode';
import AuthContext from '../context/AuthContext';

import "../scss/global.scss";
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  const [auth, setAuth] = useState({} as any);
  const [reloadUser, setReloadUser] = useState(false);
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
  }, [reloadUser])
  

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
  }

  const authData: any = useMemo(() => ({
    auth,
    login,
    logout,
    setReloadUser,
  }), [auth]);

  if (auth === undefined) return null;

  return (
    <>
      <AuthContext.Provider value={authData}>
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
      </AuthContext.Provider>
    </>
  )
}
