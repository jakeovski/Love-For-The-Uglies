import express from 'express';
import {login, refreshToken, register} from "../controllers/auth.js";
import middleware from '../middleware/authMiddleware.js';
//Routes for the /auth endpoint

const router = express.Router();

//List of routes
router.post('/login',login);
router.post('/register',register);
router.get('/refreshToken',refreshToken);

export default router;