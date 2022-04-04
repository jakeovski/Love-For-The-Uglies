import * as api from '../api/index';
import {ADD_EVENT, DELETE_EVENT, EDIT_EVENT, GET_EVENTS, UPDATE_ATTENDANCE} from "../Constants/actions";

/**
 * Add event action creator
 * @param setAlertMessage
 * @param navigate
 * @param setEventAlertMessage
 * @param newEvent
 * @returns {(function(*): Promise<void>)|*}
 */
export const addEvent = (setAlertMessage, navigate, setEventAlertMessage, newEvent) => async (dispatch) => {
    try {
        const {data} = await api.addEvent(newEvent);
        dispatch({type: ADD_EVENT, data});
        setEventAlertMessage({
            type: '',
            message: ''
        })
    } catch (error) {
        console.log(error.response);
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            setAlertMessage({
                type: error.response.data.type,
                message: error.response.data.message
            })
            navigate('/');
        } else {
            setEventAlertMessage({
                type: error.response.data.type,
                message: error.response.data.message
            })
        }
    }
}

/**
 * Get events action creator
 * @param setAlertMessage
 * @param navigate
 * @param setEventAlertMessage
 * @param setEventsLoading
 * @returns {(function(*): Promise<void>)|*}
 */
export const getAllEvents = (setAlertMessage, navigate, setEventAlertMessage, setEventsLoading) => async (dispatch) => {
    try {
        const {data} = await api.getAllEvents();
        dispatch({type: GET_EVENTS, data});
        setEventsLoading(false);
        setEventAlertMessage({
            type: '',
            message: ''
        })
    } catch (error) {
        console.log(error.response);
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            setAlertMessage({
                type: error.response.data.type,
                message: error.response.data.message
            })
            navigate('/');
        } else {
            setEventAlertMessage({
                type: error.response.data.type,
                message: error.response.data.message
            })
        }
    }
}

/**
 * Edit event action creator
 * @param setAlertMessage
 * @param navigate
 * @param setEventAlertMessage
 * @param event
 * @returns {(function(*): Promise<void>)|*}
 */
export const editEvent = (setAlertMessage, navigate, setEventAlertMessage, event) => async (dispatch) => {
    try {
        const {data} = await api.editEvent(event);
        dispatch({type: EDIT_EVENT, data});
    } catch (error) {
        console.log(error.response);
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            setAlertMessage({
                type: error.response.data.type,
                message: error.response.data.message
            })
            navigate('/');
        } else {
            setEventAlertMessage({
                type: error.response.data.type,
                message: error.response.data.message
            })
        }
    }
}

/**
 * Delete event action creator
 * @param setAlertMessage
 * @param navigate
 * @param setEventAlertMessage
 * @param id
 * @returns {(function(*): Promise<void>)|*}
 */
export const deleteEvent = (setAlertMessage, navigate, setEventAlertMessage, id) => async (dispatch) => {
    try {
        console.log(id);
        const {data} = await api.deleteEvent(id);
        dispatch({type: DELETE_EVENT, data});
    } catch (error) {
        console.log(error.response);
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            setAlertMessage({
                type: error.response.data.type,
                message: error.response.data.message
            })
            navigate('/');
        } else {
            setEventAlertMessage({
                type: error.response.data.type,
                message: error.response.data.message
            })
        }
    }
}

/**
 * Update attendance action creator
 * @param setAlertMessage
 * @param navigate
 * @param setEventAlertMessage
 * @param id
 * @returns {(function(*): Promise<void>)|*}
 */
export const updateAttendance = (setAlertMessage, navigate, setEventAlertMessage, id) => async (dispatch) => {
    try {
        const {data} = await api.updateAttendance(id);
        dispatch({type: UPDATE_ATTENDANCE, data});
    } catch (error) {
        console.log(error.response);
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            setAlertMessage({
                type: error.response.data.type,
                message: error.response.data.message
            })
            navigate('/');
        } else {
            setEventAlertMessage({
                type: error.response.data.type,
                message: error.response.data.message
            })
        }
    }
}