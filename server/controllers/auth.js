import User from "../models/user.js";
import bcrypt from 'bcrypt';


export const login = async(req,res) => {

}

/**
 * Creates a new user in the database
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export const register = async (req,res) => {
    const {username,password,firstName,lastName,confirmPassword} = req.body;
    try{
        //Check that user already exists
        const user = await User.findOne({
            username:username
        });
        if(user) {return res.status(409).json({data:undefined,type:'warning',message:'User already exists'})}

        //Check if the passwords are equal
        if(password !== confirmPassword) {return res.status(400).json({data:undefined,type:'warning',message:'Passwords must match'})};

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