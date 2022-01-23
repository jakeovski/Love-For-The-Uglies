import jwt from "jsonwebtoken";
import * as fs from "fs";

/**
 * Middleware that checks whether the user is authorized
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const authMiddleware = async (req,res,next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const publicKey = fs.readFileSync('./config/public.pem');
        if (token) {
            const data = jwt.verify(token, publicKey);
            req.id = data.context.user?.id;
        }else {
            return res.status(401).json({
                data:undefined,
                type:'error',
                message:'Unauthorized'
            });
        }
        next();
    }catch (error){
        console.log(error);
        return res.status(401).json({
            data:undefined,
            type:'error',
            message:'Token Expired'
        })
    }
}

export default authMiddleware;