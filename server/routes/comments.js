import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
    addComment,
    addReply,
    addSubReply,
    deleteComment,
    deleteReply,
    deleteSubReply,
    getAllComments,
    likeComment
} from "../controllers/comments.js";

const router = express.Router();

router.get('/', authMiddleware, getAllComments);
router.post('/add', authMiddleware, addComment);
router.post('/addReply', authMiddleware, addReply);
router.post('/addSubReply', authMiddleware, addSubReply);
router.patch('/like', authMiddleware, likeComment);
router.delete('/delete/:commentId', authMiddleware, deleteComment);
router.delete('/deleteReply/:parent/:replyId', authMiddleware, deleteReply);
router.delete('/deleteSubReply/:parentId/:replyId/:subReplyId', authMiddleware, deleteSubReply);

export default router;