import {
    ADD_COMMENT,
    ADD_REPLY,
    ADD_SUBREPLY,
    DELETE_COMMENT,
    DELETE_REPLY,
    DELETE_SUBREPLY,
    EDIT_COMMENT,
    EDIT_REPLY,
    EDIT_SUBREPLY,
    GET_COMMENTS,
    LIKE
} from "../Constants/actions";

const commentReducer = (comments = [], action) => {
    switch (action.type) {
        case ADD_COMMENT:
            comments = comments.slice();
            comments.unshift(action.data.data);
            return comments;
        case EDIT_COMMENT:
            console.log(comments);
            console.log(action.data.data);
            return comments.map((comment) => {
                console.log(comment);
                if (comment.comment._id !== action.data.data.comment._id) {
                    return comment;
                }
                return {
                    ...comment, comment: action.data.data.comment
                };
            })
        case DELETE_COMMENT:
            return comments.filter(comment => comment.comment._id !== action.data.data);
        case DELETE_REPLY:
            return comments.map((comment) => {
                if (comment.comment._id !== action.payload.parent) {
                    return comment;
                }
                return {
                    ...comment, replies: comment.replies.filter(reply => reply.reply._id !== action.payload.data.data),
                    comment: {
                        ...comment.comment, numberOfComments: comment.comment.numberOfComments - 1
                    }
                }
            });
        case DELETE_SUBREPLY:
            return comments.map((comment) => {
                if (comment.comment._id !== action.data.data.parent) {
                    return comment;
                }
                return {
                    ...comment, replies: comment.replies.map((reply) => {
                        if (reply.reply._id !== action.data.data._id) {
                            return reply;
                        }
                        return {...reply, reply: action.data.data};
                    }), comment: {
                        ...comment.comment, numberOfComments: comment.comment.numberOfComments - 1
                    }
                }
            })
        case ADD_REPLY:
            return comments.map((comment) => {
                if (comment.comment._id !== action.data.data.parent) {
                    return comment
                }
                return {
                    ...comment, replies: insertItemInArrayEnd(comment.replies, action.data.data.comment),
                    comment: {
                        ...comment.comment, numberOfComments: comment.comment.numberOfComments + 1
                    }
                }
            });
        case EDIT_REPLY:
            return comments.map((comment) => {
                if (comment.comment._id !== action.data.data.parent) {
                    return comment;
                }
                return {
                    ...comment, replies: comment.replies.map((reply) => {
                        if (reply.reply._id !== action.data.data.comment.reply._id) {
                            return reply;
                        }
                        return {
                            ...reply, reply: action.data.data.comment.reply
                        }
                    })
                }
            })
        case ADD_SUBREPLY:
            return comments.map((comment) => {
                if (comment.comment._id !== action.data.data.parent) {
                    return comment;
                }
                return {
                    ...comment, replies: comment.replies.map((reply) => {
                        if (reply.reply._id !== action.data.data._id) {
                            return reply;
                        }
                        return {...reply, reply: action.data.data};
                    }), comment: {
                        ...comment.comment, numberOfComments: comment.comment.numberOfComments + 1
                    }
                }
            })
        case EDIT_SUBREPLY:
            return comments.map((comment) => {
                if (comment.comment._id !== action.data.data.parent) {
                    return comment;
                }
                return {
                    ...comment, replies: comment.replies.map((reply) => {
                        if (reply.reply._id !== action.data.data._id) {
                            return reply;
                        }
                        return {...reply, reply: action.data.data};
                    })
                }
            })
        case LIKE:
            return comments.map((comment) => {
                if (comment.comment._id !== action.data.data.newComment._id) {
                    return comment;
                }
                return {
                    ...comment, comment: action.data.data.newComment,
                    liked: action.data.data.liked
                }
            })
        case GET_COMMENTS:
            return action.data.data;
        default:
            return comments;
    }
}

export default commentReducer;

const insertItemInArrayEnd = (array, item) => {
    let newArray = array.slice();
    newArray.push(item);
    return newArray;
}