import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {addAttendance, addEvent, deleteEvent, editEvent, getAllEvents} from "../controllers/events.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post('/add', authMiddleware, addEvent);
router.get('/', authMiddleware, getAllEvents);
router.patch('/edit', authMiddleware, adminMiddleware, editEvent);
router.delete('/delete/:id', authMiddleware, adminMiddleware, deleteEvent);
router.patch('/updateAttendance/:id', authMiddleware, addAttendance);


export default router;