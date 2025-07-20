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

// Response Interceptor
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
