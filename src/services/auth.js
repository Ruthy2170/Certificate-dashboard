import axios from "axios";
import { ENDPOINTS } from "../utils/endpoints";

const authService = {
    login: async(email, password) => {
    try {
        const { login: LOGIN_URL } = ENDPOINTS;
        const response = await axios.post('https://api.ambani.africa/api/v1/auth/login', {
        email: email,
        password: password
    })
        
    return{
        success: response.data.success,
        data: response.data,
         error: response.data.error || null,
    };
    } catch (error) {
       return{
        success: false,
        error: error.response?.data?.error || error.message ||"Login failed",
       }; 
    }    
  
    }

};

export default authService;