import * as api from '../api/index';
import {ADD_COMMENT, ADD_REPLY, ADD_SUBREPLY, GET_COMMENTS} from "../Constants/actions";


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
        console.log(error.response);
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

export const addReply = (setAlertMessage,navigate,setCommentsLoading,setChatAlertMessage,
                         parentComment,
                         comment) => async (dispatch) => {
    try{
        const {data} = await api.addReply(parentComment,comment);
        console.log(data);
        dispatch({type:ADD_REPLY,data});
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

export const addSubReply = (setAlertMessage,
                            navigate,
                            setCommentsLoading,
                            setChatAlertMessage,
                            commentId,
                            subReplyPosition,
                            comment,replyTo) => async (dispatch) => {
    try{
        const {data} = await api.addSubReply(commentId,subReplyPosition,comment,replyTo);
        dispatch({type:ADD_SUBREPLY,data});
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
            setCommentsLoading(false);
            setChatAlertMessage({
                type:error.response.data.type,
                message:error.response.data.message
            })
        }
    }
}