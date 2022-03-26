import User from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as fs from "fs";
import {randomUUID} from 'crypto';
import RefreshToken from '../models/token.js';
import {DateTime} from "luxon";
import generateTokens from "../config/tokenHelper.js";



export const getUserData = async (req,res) => {
    try{
        const user = await User.findOne({
            _id:req.id
        }).select('-usernameUpper -password');

        return res.status(200).json({
            data:user,
            type:'success',
            message:'Success'
        })
    }catch (error){
        console.log(error);
        res.status(500).json({
            data:undefined,
            type:'error',
            message:'Error has occurred. Please re-login'
        })
    }
}
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
            userId:decodedExpToken.context.user.id,
            tokenKey:decodedExpToken.context.user.key
        });

        //If token missing from the database, return
        if (!refreshToken) {
            return res.status(401).json({
               data:undefined,
               type:'error',
               message:'No session found. Please re-login'
            });
        }else {
            //Decode the refresh token and generate new access token
            try{
                const publicKey = fs.readFileSync('./config/public.pem');
                const privateKey = fs.readFileSync('./config/private.pem');
                const decodedRefresh = jwt.verify(refreshToken.token,publicKey);

                const newToken = jwt.sign({
                    iss: "uglyanimals",
                    sub: decodedRefresh.username,
                    aud:["all"],
                    context:{
                        user:{
                            id:decodedRefresh.id,
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
            message:'Error has occurred. Please re-login'
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

        return res.status(200).json({
            data:await generateTokens(tokenKey,user),
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

        //Check if the username is the correct length
        if(username.length > 15) {return res.status(400).json({data:undefined,type:'warning',message:'Username must be 15 or less characters'})}

        //Check the firstName and lastName contain only alphabetical characters
        if ((firstName.match(/[^a-zA-Z]/g) || []).length > 0 || (lastName.match(/[^a-zA-Z]/g) || []).length > 0) {
            return  res.status(400).json({data:undefined,type:'warning',message:'First Name and Last Name contain unexpected characters'});
        }

        //Create a new user record in the database
        await User.create({
            username:username,
            usernameUpper:username.toUpperCase(),
            password: await bcrypt.hash(password,12),
            firstName,
            lastName,
            created: DateTime.now()
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