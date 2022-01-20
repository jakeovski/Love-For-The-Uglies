import express from 'express';
import {login,register} from "../controllers/auth.js";

//Routes for the /auth endpoint

const router = express.Router();

//List of routes
router.post('/login',login);
router.post('/register',register);

export default router;