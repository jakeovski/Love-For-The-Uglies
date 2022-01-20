import axios from 'axios';

/*
    API call container
 */

/**
 * Default API URL
 * @type {string}
 */
const URL = 'http://localhost:3000/api';

/**
 * Function to call /register endpoint
 * @param inputData - Data from the Authentication form
 * @returns {Promise<AxiosResponse<any>>}
 */
export const register = (inputData) => axios.post(`${URL}/auth/register`,inputData);