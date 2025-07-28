import type { loginResponse } from "~/types/main.type";
import { UseStorage } from "./useStorage";

export const UseAuth = () => {
  const { setToken } = UseStorage();
  const BASE_URL = useRuntimeConfig().public.apiBase;


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
      navigateTo("/absen")
      console.log(res.user.user_id)
      localStorage.setItem("user_id", res.user.user_id)
      localStorage.setItem("nama", res.user.name)

    } catch (error) {
      console.log("login error", error);
      throw error;
    }
  };

  const Logout = () => {
    try {
      setToken("");
      localStorage.removeItem("user_id")
      localStorage.removeItem("nama")
      return navigateTo("/auth/login");
    } catch (error) {
      console.log("erlerlerlr");
    }
  };

  return { Login, Logout };
};
