import * as api from '../api/index';
import {
    ADD_COMMENT,
    ADD_REPLY,
    ADD_SUBREPLY,
    DELETE_COMMENT, DELETE_REPLY, DELETE_SUBREPLY,
    EDIT_COMMENT,
    EDIT_REPLY,
    GET_COMMENTS,
    LIKE
} from "../Constants/actions";


export const addComment = (newComment,setCommentAlertMessage,setAlertMessage,navigate) => async (dispatch) => {
    try{
        const {data} = await api.addComment(newComment);
        if (newComment.id){
            dispatch({type:EDIT_COMMENT,data});
        }else {
            dispatch({type:ADD_COMMENT,data});
        }
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
        console.log(comment);
        const {data} = await api.addReply(parentComment,comment);
        if (comment.id) {
            dispatch({type:EDIT_REPLY,data});
        }else {
            dispatch({type:ADD_REPLY,data});
        }
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
        console.log(comment);
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

export const likeComment = (setAlertMessage,navigate,setChatAlertMessage,
                            likeType,commentId,remove) => async(dispatch) => {
    try{
        const {data} = await api.likeComment(likeType,commentId,remove);
        dispatch({type:LIKE,data});
    }catch (error) {
        console.log(error.response);
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            setAlertMessage({
                type:error.response.data.type,
                message:error.response.data.message
            })
            navigate('/');
        }else {
            setChatAlertMessage({
                type:error.response.data.type,
                message:error.response.data.message
            })
        }
    }
}

export const deleteComment = (setAlertMessage,navigate,setChatAlertMessage,commentId,isReply,parent) => async (dispatch) => {
    try{
        console.log(commentId);
        if(isReply){
            const {data} = await api.deleteReply(commentId,parent);
            dispatch({type:DELETE_REPLY,payload:{data,parent}});
        }else {
            const {data} = await api.deleteComment(commentId);
            dispatch({type:DELETE_COMMENT,data});
        }
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
            setChatAlertMessage({
                type:error.response.data.type,
                message:error.response.data.message
            })
        }
    }
}

export const deleteSubReply = (setAlertMessage,navigate,setChatAlertMessage,
                               subReplyId,replyId,parentId) => async(dispatch) => {
    try{
        const {data} = await api.deleteSubReply(subReplyId,replyId,parentId);
        dispatch({type:DELETE_SUBREPLY,data});
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
            setChatAlertMessage({
                type:error.response.data.type,
                message:error.response.data.message
            })
        }
    }
}