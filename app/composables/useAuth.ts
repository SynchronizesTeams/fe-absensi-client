import type { loginResponse } from "~/types/main.type";
import { UseStorage } from "./useStorage";

export const UseAuth = () => {
  const { setToken, getToken } = UseStorage();
  
  const BASE_URL = useRuntimeConfig().public.apiBase;
  // const Register = () => {
    
  // }
  const Login = async (data: any) => {
    try {
      const res: loginResponse = await $fetch(`${BASE_URL}/api/login`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
        body: data,
      });

      setToken(res.token);
      navigateTo("/test")
    } catch (error) {
      console.log("login error", error);
      throw error;
    }
  };

  const Logout = () => {
    try {
      setToken("");
      return navigateTo("/login");
    } catch (error) {
      console.log("erlerlerlr");
    }
  };

  return { Login, Logout };
};
