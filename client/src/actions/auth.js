import * as api from '../api';
import {AUTH_ERROR, CHECK_ADMIN_STATUS, LOGIN, REGISTER} from "../Constants/actions";

/*
 * Action creators related to the authentication
 */

/**
 * Action creator for checking whether the user is an admin
 * @returns {(function(*): Promise<void>)|*}
 */
export const checkAdminStatus = () => async(dispatch) => {
    try{
        const {data} = await api.checkAdminStatus();
        dispatch({type:CHECK_ADMIN_STATUS,data});
    }catch (error) {
        console.log(error);
        dispatch({type:AUTH_ERROR,payload: error.response.data})
    }
}

/**
 * Login action creator
 * @param inputData
 * @param navigate
 * @returns {(function(*): Promise<void>)|*}
 */
export const login = (inputData,navigate) => async(dispatch) => {
    try {
        const {data} = await api.login(inputData);
        dispatch({type:LOGIN,data});
        navigate('/home');
    }catch (error) {
        console.log(error);
        dispatch({type: AUTH_ERROR, payload: error.response.data});
    }
}

/**
 * Register action creator
 * @param inputData
 * @returns {(function(*): Promise<void>)|*}
 */
export const register = (inputData) => async(dispatch) => {
    try {
        //Retrieve data from the API and send it to the reducer
        const {data} = await api.register(inputData);
        dispatch({type: REGISTER, data});
    } catch (error) {
        //Report the error and send it to the reducer
        //console.log(error);
        dispatch({type: AUTH_ERROR, payload: error.response.data});
    }
}