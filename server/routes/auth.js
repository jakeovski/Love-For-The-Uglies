import express from 'express';
import {checkAdminStatus, login, register} from "../controllers/auth.js";
import middleware from '../middleware/authMiddleware.js';
//Routes for the /auth endpoint

const router = express.Router();

//List of routes
router.get('/checkAdminStatus',middleware,checkAdminStatus);
router.post('/login',login);
router.post('/register',register);

export default router;