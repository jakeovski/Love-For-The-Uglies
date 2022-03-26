import express from 'express';
import {getUserData, login, refreshToken, register} from "../controllers/auth.js";
import authMiddleware from "../middleware/authMiddleware.js";
//Routes for the /auth endpoint

const router = express.Router();

//List of routes
router.post('/login',login);
router.post('/register',register);
router.get('/refreshToken',refreshToken);
router.get('/user',authMiddleware,getUserData);

export default router;