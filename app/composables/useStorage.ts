export const UseStorage = () => {
  let token: any = ref("");

  const setToken = (token: string) => {
    useCookie("authToken").value = token;
  };

  const getToken = () => {
    token = useCookie("authToken").value;
    return token;
  };

  return {setToken, getToken}
};
