import {combineReducers} from "redux";
import auth from './auth';

/**
 * Combines the data returned from multiple reducers
 */
export default combineReducers({
    auth
});