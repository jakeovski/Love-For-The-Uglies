import {ADD_COMMENT, ADD_REPLY, ADD_SUBREPLY, GET_COMMENTS} from "../Constants/actions";
import update from 'immutability-helper';
import reply from "../Components/Helper/Reply";

const commentReducer = (comments = [],action) => {
    switch (action.type) {
        case ADD_COMMENT:
            comments = comments.slice();
            comments.unshift(action.data.data);
            return comments;
        case ADD_REPLY:
            return comments.map((comment) => {
                if(comment.comment._id !== action.data.data.parent){
                    return comment
                }
                console.log(comment);
                return{
                    ...comment,replies: insertItemInArrayEnd(comment.replies,action.data.data.comment),
                    comment:{
                        ...comment.comment,numberOfComments:comment.comment.numberOfComments + 1
                    }
                }
            });
        case ADD_SUBREPLY:
            return comments.map((comment) => {
                if(comment.comment._id !== action.data.data.parent){
                    return comment;
                }
                return {
                    ...comment,replies: comment.replies.map((reply) => {
                        if (reply.reply._id !== action.data.data._id){
                            return reply;
                        }
                        return {...reply,reply:action.data.data};
                    }), comment:{
                        ...comment.comment,numberOfComments: comment.comment.numberOfComments + 1
                    }
                }
            })
        case GET_COMMENTS:
            return action.data.data;
        default:
            return comments;
    }
}

export default commentReducer;

const insertItemInArrayEnd = (array,item) => {
    let newArray = array.slice();
    newArray.push(item);
    return newArray;
}