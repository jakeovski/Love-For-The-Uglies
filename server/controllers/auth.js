import User from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as fs from "fs";


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
        const user = await User.findOne({
            username:username
        });
        if(!user) {return res.status(404).json({data:undefined,type:'warning',message:'User does not exist'})}

        const correctPassword = await bcrypt.compare(password,user.password);
        if (!correctPassword) {return res.status(401).json({data:undefined,type:'error',message:'Incorrect Password'})}

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
                    role:user.role
                }
            }
        },key,{expiresIn:'1h',algorithm:'RS256'});

        return res.status(200).json({
            data:token,
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
            username:username
        });
        if(user) {return res.status(409).json({data:undefined,type:'warning',message:'User already exists'})}

        //Check if the passwords are equal
        if(password !== confirmPassword) {return res.status(400).json({data:undefined,type:'warning',message:'Passwords must match'})}

        //Check if the password is at least 8 characters
        if(password.length < 8) {return res.status(400).json({data:undefined,type:'warning',message:'Password must be at least 8 character'})}

        //Create a new user record in the database
        await User.create({
            username,
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