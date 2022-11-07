import React, { useMemo, useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import "../scss/global.scss";
import 'semantic-ui-css/semantic.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from 'jwt-decode';
import AuthContext from '../context/AuthContext';
import {setToken, getToken} from "./api/token";

export default function App({ Component, pageProps }: AppProps) {
  const [auth, setAuth] = useState({} as any);
  const [reloadUser, setReloadUser] = useState(false);

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

  const authData: any = useMemo(() => ({
    auth,
    login,
    logout: () => null,
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
