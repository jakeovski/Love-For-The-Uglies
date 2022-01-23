import axios from 'axios';

/*
    API call container
 */

/**
 * Create Axios Object with base URL
 * @type {AxiosInstance}
 */
const API = axios.create({baseURL:'http://localhost:3000/api'});

/**
 * Populate the request header with the token if one is present
 */
API.interceptors.request.use((config) => {
    if (localStorage.getItem("token")) {
        config.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("token"))}`
    }
    return config;
})

/**
 * Function to call /auth/checkAdminStatus endpoint
 * @returns {Promise<AxiosResponse<any>>}
 */
export const checkAdminStatus = () => API.get(`/auth/checkAdminStatus`);

/**
 * Function to call /auth/login endpoint
 * @param inputData
 * @returns {Promise<AxiosResponse<any>>}
 */
export const login = (inputData) => API.post(`/auth/login`,inputData);

/**
 * Function to call /auth/register endpoint
 * @param inputData - Data from the Authentication form
 * @returns {Promise<AxiosResponse<any>>}
 */
export const register = (inputData) => API.post(`/auth/register`,inputData);