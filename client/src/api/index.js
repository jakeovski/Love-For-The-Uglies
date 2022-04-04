import axios from 'axios';

/*
    API call container
 */

/**
 * Create Axios Object with base URL
 * @type {AxiosInstance}
 */
const API = axios.create({baseURL: 'http://localhost:3000/api'});

/**
 * Populate the request header with the token if one is present
 */
API.interceptors.request.use((config) => {
    if (localStorage.getItem("token")) {
        config.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("token"))}`
    }
    return config;
})

/**
 * Response interceptor
 * Used mainly to refresh the expired token
 */
API.interceptors.response.use((response) => {
    //If the response is successful (Status code: 2xx) => Continue
    return response;
}, async (error) => {
    if (error.response.data.data === 'TokenExpiredError') {
        //Send a refresh token request
        console.log('Refreshing token...');
        const res = await API.get(`/auth/refreshToken`);
        //Store original request
        const originalRequest = error.config;
        if (res.data.data) {
            //Store the new token and repeat the original request
            originalRequest._retry = true;
            localStorage.setItem('token', JSON.stringify(res.data.data));
            axios.defaults.headers.common['authorization'] = `Bearer ${res.data.data}`;
            console.log('Token refreshed');
            return API(originalRequest);
        } else {
            return Promise.reject(error);
        }
    } else {
        return Promise.reject(error);
    }
})

//Endpoint calls
export const login = (inputData) => API.post(`/auth/login`, inputData);
export const register = (inputData) => API.post(`/auth/register`, inputData);
export const getUserData = () => API.get(`/auth/user`);
export const editProfile = (oldUsername, newUserData) => API.patch(`/profile/edit`, {
    oldUsername: oldUsername,
    newUserData: newUserData
});
export const changePassword = (passwordData) => API.patch(`/profile/changePassword`, passwordData);
export const deleteAccount = () => API.delete(`/profile/delete`);
export const getAnimals = () => API.get(`/animals`);
export const addComment = (newComment) => API.post('/comment/add', newComment);
export const getAllComments = () => API.get('/comment');
export const addReply = (parentComment, comment) => API.post('/comment/addReply', {
    parentComment,
    comment
});
export const addSubReply = (commentId, subReplyPosition, comment, replyTo) => API.post('/comment/addSubReply', {
    commentId,
    subReplyPosition,
    comment,
    replyTo
})
export const likeComment = (likeType, commentId, remove) => API.patch('/comment/like', {
    likeType,
    commentId,
    remove
})
export const deleteComment = (commentId) => API.delete(`/comment/delete/${commentId}`);
export const deleteReply = (replyId, parent) => API.delete(`/comment/deleteReply/${parent}/${replyId}`);
export const deleteSubReply = (subReplyId, replyId, parentId) => API.delete(`/comment/deleteSubReply/${parentId}/${replyId}/${subReplyId}`);
export const addEvent = (newEvent) => API.post('/events/add', newEvent);
export const getAllEvents = () => API.get('/events');
export const editEvent = (event) => API.patch('/events/edit', event);
export const deleteEvent = (id) => API.delete(`/events/delete/${id}`);
export const updateAttendance = (id) => API.patch(`/events/updateAttendance/${id}`);