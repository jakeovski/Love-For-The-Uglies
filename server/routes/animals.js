import express from "express";
import {addAnimalToDb, getAnimals} from "../controllers/animals.js";


const router = express.Router();

router.get('/', getAnimals);
router.post('/add', addAnimalToDb);
export default router;