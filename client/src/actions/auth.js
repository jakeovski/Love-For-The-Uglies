import * as api from '../api';
import {AUTH_ERROR, REGISTER} from "../Constants/actions";

/*
 * Action creators related to the authentication
 */


/**
 * Register action creator
 * @param inputData
 * @returns {(function(*): Promise<void>)|*}
 */
export const register = (inputData) => async (dispatch) => {
    try {
        //Retrieve data from the API and send it to the reducer
        const {data} = await api.register(inputData);
        dispatch({type: REGISTER, data});
    } catch (error) {
        //Report the error and send it to the reducer
        console.log(error.response.data);
        dispatch({type: AUTH_ERROR, payload: error.response.data});
    }
}