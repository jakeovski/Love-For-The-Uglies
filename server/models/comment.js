import mongoose from "mongoose";

const comment = mongoose.Schema({
    id:{
        type:String
    },
    userId:{
        type:String,
        required:true
    },
    parent:{
      type:String,
        default:''
    },
    comment:{
        type:String,
    },
    subReplies: {
        type:[
            {
                id:{
                    type:String
                },
                userId:{
                    type:String,
                },
                username:{
                    type:String,
                },
                comment:{
                    type:String,
                },
                replyTo:{
                    type:String,
                }
            }
        ],
        default:[]
    },
    image:{
        type:String,
    },
    thumbsUp:{
        type:Number,
        default:0
    },
    thumbsDown:{
        type:Number,
        default: 0
    },
    fireLike:{
        type:Number,
        default:0
    },
    surprisedLike:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
    },
    numberOfComments:{
        type:Number,
        default:0
    }
})


export default mongoose.models.comment || mongoose.model("comments",comment);