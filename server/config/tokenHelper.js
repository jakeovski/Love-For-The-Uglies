import fs from "fs";
import jwt from "jsonwebtoken";
import RefreshToken from "../models/token.js";


const generateTokens = async (tokenKey, user) => {
    //Read the key and sign the token
    const key = fs.readFileSync('./config/private.pem');
    const token = jwt.sign({
        iss: "uglyanimals",
        sub: user.username,
        aud: ["all"],
        context: {
            user: {
                id: user._id,
                key: tokenKey,
                role: user.role
            }
        }
    }, key, {expiresIn: '30m', algorithm: 'RS256'});

    //Sign a refresh token with essential info
    const refreshToken = jwt.sign({
        id: user._id,
    }, key, {expiresIn: '6h', algorithm: 'RS256'});

    //If the token already exists => update the data // If not create a new one
    await RefreshToken.findOneAndUpdate({
        userId: user._id,
    }, {
        tokenKey: tokenKey,
        token: refreshToken
    }, {upsert: true});

    return {
        token: token,
        refreshToken: refreshToken
    }
}


export default generateTokens;