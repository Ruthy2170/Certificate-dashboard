const BASE_URL = import.meta.env.VITE_BASE_URL;

export const ENDPOINTS = {
    login: `${BASE_URL}/auth/login`,
    signup: `${BASE_URL}/auth/register`,
};
