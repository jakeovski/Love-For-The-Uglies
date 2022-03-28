import {ADD_COMMENT, GET_COMMENTS} from "../Constants/actions";

const commentReducer = (comments = [],action) => {
    switch (action.type) {
        case ADD_COMMENT:
            comments = comments.slice();
            comments.unshift(action.data.data);
            return comments;
        case GET_COMMENTS:
            return action.data.data;
        default:
            return comments;
    }
}

export default commentReducer;