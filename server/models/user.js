import mongoose from "mongoose";

/**
 * MongoDB model for the User
 * @type {*}
 */
const User = mongoose.Schema({
    id:{
        type:String,
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required: true
    },
    firstName:{
        type:String,
    },
    lastName:{
        type:String
    },
    role:{
        type:String,
        default:'user'
    },
    avatar:{
        type:String,
    }
})

export default mongoose.models.users || mongoose.model("users",User);