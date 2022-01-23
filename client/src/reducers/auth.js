import {AUTH_ERROR, CHECK_ADMIN_STATUS, LOGIN, REGISTER} from "../Constants/actions";

/**
 * Authentication reducer, returns data based on the action performed
 * @param auth
 * @param action
 * @returns {{}|*}
 */
const authReducer = (auth={},action) => {
    switch (action.type) {
        case REGISTER:
        case CHECK_ADMIN_STATUS:
            return action.data;
        case LOGIN:
            localStorage.setItem('token',JSON.stringify(action.data.data))
            return action.data;
        case AUTH_ERROR:
            return action.payload;
        default:
            return auth;
    }
}

export default authReducer;