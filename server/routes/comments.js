import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {addComment, getAllComments} from "../controllers/comments.js";

const router = express.Router();

router.get('/',authMiddleware,getAllComments);
router.post('/add',authMiddleware,addComment);

export default router;