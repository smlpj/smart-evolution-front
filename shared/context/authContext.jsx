/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from "react";

import { useRouter } from "next/router";

import jwt_decode from "jwt-decode";

const authContext = createContext();

export default authContext;

export const AuthProvider = (child) => {
  const [authToken, setAuthToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [user, setUser] = useState({ id: 0, name: "" });
  const [admin, setAdmin] = useState(false);
  const [roles, setRoles] = useState([]);
  const router = useRouter();

  useEffect(() => {
    try {
      const access_token = localStorage.getItem("access-token");
      const token = jwt_decode(access_token);
      if (
        (router.pathname === "/auth/login" ||
          router.pathname === "/auth/register") &&
        token
      )
        router.push("/dashboard");

      if (token.exp * 1000 < Date.now()) {
        setAuthToken("");
        setRefreshToken("");
        router.push("/auth/login");
      }

      setAuthToken(localStorage.getItem("access-token"));

      setRefreshToken(localStorage.getItem("refresh-token"));

      setUser({ id: token.user_id, name: token.name });

      setAdmin(token.is_superuser);

      setRoles(token.roles);
    } catch (error) {
      console.log(error);
      router.push("/auth/login");
    }
  }, [router.pathname]);

  return (
    <authContext.Provider
      value={{ authToken, refreshToken, user, admin, roles }}
    >
      {child.children}
    </authContext.Provider>
  );
};
