import {combineReducers} from "redux";
import auth from './auth';
import animalOfTheDay from './animalOfTheDay';
import comments from "./comments";

/**
 * Combines the data returned from multiple reducers
 */
export default combineReducers({
    auth,
    animalOfTheDay,
    comments
});