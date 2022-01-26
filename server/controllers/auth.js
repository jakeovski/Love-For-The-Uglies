import User from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as fs from "fs";
import {randomUUID} from 'crypto';
import RefreshToken from '../models/token.js';

/**
 * Refresh the expired access token
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export const refreshToken = async (req,res) => {
    try {
        //Get the expired token
        const expiredToken = req.headers.authorization.split(" ")[1];

        //Decode the token
        const decodedExpToken = jwt.decode(expiredToken);

        //Check whether a refresh token exists in the database
        const refreshToken = await RefreshToken.findOne({
            username:decodedExpToken.context.user.username,
            tokenKey:decodedExpToken.context.user.key
        });

        //If token missing from the database, return
        if (!refreshToken) {
            return res.status(500).json({
               data:undefined,
               type:'error',
               message:'No session found. Please re-login'
            });
        }else {
            //Decode the refresh token and generate new access token
            try{
                const publicKey = fs.readFileSync('./config/public.pem');
                const privateKey = fs.readFileSync('./config/private.pem')
                const decodedRefresh = jwt.verify(refreshToken.token,publicKey);

                const newToken = jwt.sign({
                    iss: "uglyanimals",
                    sub: decodedRefresh.username,
                    aud:["all"],
                    context:{
                        user:{
                            id:decodedRefresh.id,
                            firstName:decodedRefresh.firstName,
                            lastName:decodedRefresh.lastName,
                            username: decodedRefresh.username,
                            role:decodedRefresh.role,
                            key: refreshToken.tokenKey
                        }
                    }
                },privateKey,{expiresIn:'30m',algorithm:'RS256'});

                return res.status(200).json({
                    data:newToken,
                    type:'success',
                    message:'Token successfully refreshed'
                })

            }catch (err) {
                if (err.name === 'TokenExpiredError'){
                    return res.status(401).json({
                        data:undefined,
                        type:'error',
                        message:'Session expired. Please re-login'
                    })
                }else {
                    return res.status(401).json({
                        data:undefined,
                        type:'error',
                        message:'Invalid Session. Please re-login'
                    })
                }
            }
        }
    }catch (error){
        console.log(error);
        res.status(500).json({
            data:undefined,
            type:'error',
            role:'error',
            message:'Error has occurred. Please re-login'
        })
    }
}
/**
 * Check whether the user is an admin
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export const checkAdminStatus = async(req,res) => {
    try{
        const user = await User.findOne({
            _id:req.id
        });
        return res.status(200).json({
            data:undefined,
            role:user.role,
            type:user.role === 'admin' ? 'success' : 'warning',
            message:user.role === 'admin' ? 'You are an Admin' : 'You are not an Admin'
        })
    }catch(error){
        return res.status(500).json({
            data:undefined,
            type:'error',
            role:'error',
            message:'Internal Server Error'
        })
    }
}

/**
 * Authenticate the user
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export const login = async(req,res) => {
    try{
        const {username, password} = req.body;

        //Check if the user already exists in the database
        const user = await User.findOne({
            usernameUpper:username.toUpperCase()
        });
        if(!user) {return res.status(404).json({data:undefined,type:'warning',message:'User does not exist'})}

        //Check if the passwords match
        const correctPassword = await bcrypt.compare(password,user.password);
        if (!correctPassword) {return res.status(401).json({data:undefined,type:'error',message:'Incorrect Password'})}

        //Create random UUID to make additional reference for refresh token
        const tokenKey = randomUUID();

        //Read the key and sign the token
        const key = fs.readFileSync('./config/private.pem');
        const token = jwt.sign({
            iss: "uglyanimals",
            sub: user.username,
            aud:["all"],
            context:{
                user:{
                    id:user._id,
                    firstName:user.firstName,
                    lastName:user.lastName,
                    username: user.username,
                    role:user.role,
                    key: tokenKey
                }
            }
        },key,{expiresIn:'30m',algorithm:'RS256'});

        //Sign a refresh token with essential info
        const refreshToken = jwt.sign({
            id: user._id,
            firstName:user.firstName,
            lastName:user.lastName,
            username: user.username,
            role:user.role,
        },key,{expiresIn:'24h',algorithm:'RS256'});

        //Check if the refresh token already exists
        const existingRefreshToken = await RefreshToken.findOne({
           username: user.username
        });

        //If the token already exists => update the data // If not create a new one
        if(existingRefreshToken) {
            await RefreshToken.updateOne({
                username:user.username,
            },{
                tokenKey: tokenKey,
                token:refreshToken
            });
        }else {
            //Create a new refresh token in the database
            await RefreshToken.create({
                tokenKey: tokenKey,
                username: user.username,
                token:refreshToken
            });
        }

        return res.status(200).json({
            data:{
                token:token,
                refreshToken:refreshToken
            },
            type:'success',
            message:''
        })
    }catch (error){
        console.log(error);
        res.status(500).json({
            data:undefined,
            type:'error',
            message:'Internal Server Error'
        })
    }
}

/**
 * Creates a new user in the database
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export const register = async (req,res) => {
    try{
        const {username,password,firstName,lastName,confirmPassword} = req.body;

        //Check that user already exists
        const user = await User.findOne({
            usernameUpper:username.toUpperCase()
        });
        if(user) {return res.status(409).json({data:undefined,type:'warning',message:'User already exists'})}

        //Check if the passwords are equal
        if(password !== confirmPassword) {return res.status(400).json({data:undefined,type:'warning',message:'Passwords must match'})}

        //Check if the password is at least 8 characters
        if(password.length < 8) {return res.status(400).json({data:undefined,type:'warning',message:'Password must be at least 8 character'})}

        //Create a new user record in the database
        await User.create({
            username:username,
            usernameUpper:username.toUpperCase(),
            password: await bcrypt.hash(password,12),
            firstName,
            lastName,
        });

        return res.status(201).json({
            data:undefined,
            type:'success',
            message:'Registration successful'
        })
    }catch (error){
        console.log(error);
        return res.status(500).json({
            data:undefined,
            type:'error',
            message:'Internal Server Error'
        })
    }
}