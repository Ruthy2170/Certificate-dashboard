import axios from "axios";
import { ENDPOINTS } from "../utils/endpoints";

const authService = {
    login: async (email, password) => {
        try {
            const { login: LOGIN_URL } = ENDPOINTS;

            const response = await axios.post(LOGIN_URL, {
                email: email,
                password: password,
            });

            return {
                success: response.data.success,
                data: response.data,
                error: response.data.error || null,
            };
        } catch (error) {
            return {
                success: false,
                error:
                    error.response?.data?.error ||
                    error.message ||
                    "Login failed",
            };
        }
    },

    signup: async (name, email, phone, password) => {
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
        } catch (error) {
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
