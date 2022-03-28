import mongoose from "mongoose";

const comment = mongoose.Schema({
    id:{
        type:String
    },
    userId:{
        type:String,
        required:true
    },
    commentPosition:{
        type:Number,
        required: true
    },
    parent:{
      type:String,
        default:''
    },
    replyTo:{
        type:String,
    },
    comment:{
        type:String,
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
    }
})


export default mongoose.models.comment || mongoose.model("comments",comment);