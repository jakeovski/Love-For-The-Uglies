import * as api from '../api/index';
import {ADD_COMMENT, GET_COMMENTS} from "../Constants/actions";


export const addComment = (newComment,setCommentAlertMessage,setAlertMessage,navigate) => async (dispatch) => {
    try{
        const {data} = await api.addComment(newComment);
        dispatch({type:ADD_COMMENT,data});
    }catch (error){
        console.log(error.response);
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            setAlertMessage({
                type:error.response.data.type,
                message:error.response.data.message
            })
            navigate('/');
        }else {
            setCommentAlertMessage({
                type:error.response.data.type,
                message:error.response.data.message
            })
        }
    }
}

export const getAllComments = (setAlertMessage,setChatAlertMessage,navigate,setCommentsLoading) => async(dispatch) => {
    try{
        const {data} = await api.getAllComments();
        dispatch({type:GET_COMMENTS,data});
        setCommentsLoading(false);
    }catch (error){
        console.log(error);
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            setAlertMessage({
                type:error.response.data.type,
                message:error.response.data.message
            })
            navigate('/');
        }else {
            setCommentsLoading(false);
            setChatAlertMessage({
                type:error.response.data.type,
                message:error.response.data.message
            })
        }
    }
}