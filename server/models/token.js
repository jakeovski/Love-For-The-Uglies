import mongoose from "mongoose";

/**
 * MongoDB model for the refresh token
 * @type {*}
 */
const RefreshToken = mongoose.Schema({
    id:{
        type:String,
    },
    username:{
        type:String,
        required:true,
    },
    tokenKey:{
        type:String,
        required:true,
        unique:true
    },
    token:{
        type:String,
        required: true
    }
});

export default mongoose.models.refreshTokens || mongoose.model("refreshTokens",RefreshToken);