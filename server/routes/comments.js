import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {addComment, addReply, addSubReply, getAllComments} from "../controllers/comments.js";

const router = express.Router();

router.get('/',authMiddleware,getAllComments);
router.post('/add',authMiddleware,addComment);
router.post('/addReply',authMiddleware,addReply);
router.post('/addSubReply',authMiddleware,addSubReply);

export default router;