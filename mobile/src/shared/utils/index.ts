export const checkAuthToken = (): boolean => {
    const jwt = localStorage.getItem('jwt');
    return !!jwt;
}