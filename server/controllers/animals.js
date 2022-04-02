import UglyAnimal from "../models/uglyAnimal.js";
import {DateTime} from "luxon";

export const getAnimals = async (req, res) => {
    try {
        const today = DateTime.now().get("day");
        const animal = await UglyAnimal.findOne({
            day: today
        })
        if (!animal) return res.status(404).json({data: undefined, type: 'info', message: 'No animal for today'});

        return res.status(200).json({
            data: animal,
            type: 'success',
            message: 'Success'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: undefined,
            type: 'error',
            message: 'Error while getting animals'
        })
    }
}

export const addAnimalToDb = async (req, res) => {
    try {
        const {day, name, image, description, source, endangered} = req.body;
        await UglyAnimal.create({
            day,
            name,
            image,
            description,
            source,
            endangered
        });
        return res.status(200).json({
            message: 'Success'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Fail'
        })
    }
}