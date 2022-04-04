import * as api from '../api/index';
import {GET_ANIMAL} from "../Constants/actions";

/**
 * Get Animal action creator
 * @param setAlertMessage
 * @param setAnimalLoading
 * @returns {(function(*): Promise<void>)|*}
 */
export const getAnimalOfTheDay = (setAlertMessage, setAnimalLoading) => async (dispatch) => {
    try {
        const {data} = await api.getAnimals();
        dispatch({type: GET_ANIMAL, data});
        setAnimalLoading(false);
    } catch (error) {
        console.log(error.response);
        setAlertMessage({
            type: error.response.data.type,
            message: error.response.data.message
        })
    }
}