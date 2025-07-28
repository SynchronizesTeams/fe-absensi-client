export default defineNuxtRouteMiddleware((to, from) => {
    const { getToken, setToken } = UseStorage();
    const token = getToken()

    if (!token) {
        return navigateTo("/auth/login")
    }
})
