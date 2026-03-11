import axios from "axios";
import { ENDPOINTS } from "@/utils/endpoints";

const authService = {
    login: async (email: string, password: string) => {
        try {
            const { login: LOGIN_URL } = ENDPOINTS;

            const response = await axios.post(LOGIN_URL, {
                email: email,
                password: password,
            });

            return {
                success: response.data.success,
                data: response.data,
                error: response.data.message || null,
            };
        } catch (error: any) {
            return {
                success: false,
                error:
                    error.response?.data?.message ||
                    error.message ||
                    "Login failed",
            };
        }
    },

    signup: async (
        name: string,
        email: string,
        phone: string,
        password: string,
    ) => {
        try {
            const { signup: SIGNUP_URL } = ENDPOINTS;

            const response = await axios.post(SIGNUP_URL, {
                name: name,
                email: email,
                password: password,
                phone: phone,
            });

            return {
                success: response.data.success,
                data: response.data,
                error: response.data.error || null,
            };
        } catch (error: any) {
            return {
                success: false,
                error:
                    error.response?.data?.error ||
                    error.message ||
                    "Login failed",
            };
        }
    },
};

export default authService;
