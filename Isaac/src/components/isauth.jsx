/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { createContext, useState, useContext, useEffect } from "react";
// import Cookies from "js-cookie";
import * as jose from "jose";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedin, setisLoggedin] = useState(false);

  const [user, setuser] = useState(0);

  // const storedUserData = Cookies.getJSON('userDataCookie');

  // if (storedUserData) {
  //   setisLoggedin(true);
  // } else {
  //   setisLoggedin(false);
  // }
  // const TOKEN_COOKIE_NAME = "userdataCookie";

  // const isTokenExpired = () => {
  //   const tokenValue = Cookies.get(TOKEN_COOKIE_NAME);

  //   if (tokenValue) {
  //     const expirationDate = new Date(Cookies.getJSON(TOKEN_COOKIE_NAME).expires);
  //     if (expirationDate < new Date()) {
  //       return true;
  //     } else {
  //       // The token is still valid, renew it if the user opens the app before expiration
  //       const renewalThreshold = new Date(expirationDate.getTime() - 24 * 60 * 60 * 1000); // 1 day before expiration
  //       if (new Date() > renewalThreshold) {
  //         const newExpirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  //         Cookies.set(TOKEN_COOKIE_NAME, tokenValue, { expires: newExpirationDate, path: '/', httpOnly: true });
  //       }

  //       return false; // The token is still valid
  //     }
  //   }

  //   // The token cookie doesn't exist
  //   return true;
  // };

  // const isTokenExpired = () => {
  //   const tokenValue = Cookies.get(TOKEN_COOKIE_NAME);

  //   if (tokenValue) {
  //     const expirationDate = new Date(
  //       Cookies.getJSON(TOKEN_COOKIE_NAME).expires
  //     );

  //     if (expirationDate < new Date()) {
  //       return true;
  //     } else {
  //       const renewalThreshold = new Date(
  //         expirationDate.getTime() - 24 * 60 * 60 * 1000
  //       );
  //       if (new Date() > renewalThreshold) {
  //         console.log("Renewing token...");

  //         const newExpirationDate = new Date(
  //           Date.now() + 7 * 24 * 60 * 60 * 1000
  //         );
  //         Cookies.set(TOKEN_COOKIE_NAME, tokenValue, {
  //           expires: newExpirationDate,
  //           path: "/",
  //           httpOnly: true,
  //         });
  //       }

  //       return false; // The token is still valid
  //     }
  //   }

  //   // The token cookie doesn't exist
  //   return true;
  // };
  // useEffect(() => {
  //   if (isTokenExpired()) {
  //     console.log(
  //       "The token cookie is expired or does not exist. User needs to log in."
  //     );
  //     setisLoggedin(false);
  //   } else {
  //     console.log("The token cookie is still valid.");
  //     setisLoggedin(true);
  //   }
  // }, []);

  useEffect(() => {
    const cookie = document.cookie
      .split(";")
      .find((c) => c.trim().startsWith("token="));

    if (!cookie) {
      return setisLoggedin(false);
    }

    const token = cookie.split("=")[1];

    try {
      const decoded = jose.decodeJwt(token, "secretkey", { complete: true });
      // console.log(decoded);
      const expiration = decoded.exp * 1000;
      if (expiration < Date.now()) {
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setisLoggedin(false);
      }
      setisLoggedin(true);
    } catch (error) {
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setisLoggedin(false);
      // console.log(error);
    }
  }, []);

  const logout = () => {
    const expires = new Date(0);
    document.cookie = `token=; expires=${expires.toUTCString()}; path=/; httpOnly: true;`;
    alert('You are now logged out');
    window.location.href = "./";
  };

  return (
    <AuthContext.Provider value={{ isLoggedin, logout, user, setuser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
