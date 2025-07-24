import axios from 'axios';
import { BASE_URL } from './apiPaths';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 80000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});


// Request Interceptor

// What this does:
// Automatically attaches JWT token to every request
// No need to manually add Authorization header in each API call
// Dynamic token handling - gets fresh token from localStorage each time
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// Response Interceptor - Global error handling
// What this does:
// Handles common errors like 401 Unauthorized, 500 Server Error, and request timeouts
// Redirects to login page on 401 errors

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // handle common error  globally
        if(error.response){
            if (error.response.status === 401) {
                //Redirect to login or handle unauthorized access
                window.location.href = '/';
            }else if(error.response.status === 500){
                console.error("Server error:", error.response.data);
            }else if(error.code === 'ECONNABORTED') {
                console.error("Request timed out:", error.message);
            }
            return Promise.reject(error);
        }
    }
);

export default axiosInstance;
