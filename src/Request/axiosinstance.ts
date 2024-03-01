import axios, { InternalAxiosRequestConfig } from 'axios';


const axiosInstance = axios.create({
    baseURL: "",
    headers:{
        "Content-Type":"application/json"
    }
})



axiosInstance.interceptors.request.use(
    async(
        config: InternalAxiosRequestConfig
    ): Promise<InternalAxiosRequestConfig> =>{
        const token = localStorage.getItem("token");

        if(token) {
            config.headers.Authorization = token;
        }

        return config;
    },

    (error) =>{
        return Promise.reject(error);
    }
    );

    export default axiosInstance;