import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {changePassword, deleteAccount, editProfile} from "../controllers/profile.js";

const router = express.Router();

router.patch('/edit',authMiddleware,editProfile);
router.patch('/changePassword',authMiddleware,changePassword);
router.delete('/delete',authMiddleware,deleteAccount);

export default router;