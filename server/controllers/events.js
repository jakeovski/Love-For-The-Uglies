import Event from "../models/event.js";
import {DateTime} from "luxon";

export const addEvent = async (req, res) => {
    try {
        const {name, startDate, description, image} = req.body;

        const createdEvent = await Event.create({
            name: name,
            startDate: startDate,
            description: description,
            image: image,
            createdAt: DateTime.now()
        });

        return res.status(201).json({
            data: {
                event: createdEvent,
                canAttend: true
            },
            type: 'success',
            message: 'Successfully added the event'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: undefined,
            type: 'error',
            message: 'Failed to add an event'
        })
    }
}

export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({createdAt: "desc"});

        let responseObject = [];

        for (let event of events) {
            responseObject.push({
                event: event,
                canAttend: !event.going.includes(req.id)
            })
        }

        return res.status(200).json({
            data: responseObject,
            type: 'success',
            message: 'Successfully fetched all the events'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: undefined,
            type: 'error',
            message: 'Failed to get all events'
        })
    }
}

export const editEvent = async (req, res) => {
    try {
        const {id, name, startDate, description, image} = req.body;
        console.log(req.body);
        const updatedEvent = await Event.findOneAndUpdate({
            _id: id
        }, {
            name,
            startDate,
            description,
            image
        }, {new: true});

        return res.status(200).json({
            data: updatedEvent,
            type: 'success',
            message: 'Successfully updated the event'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: undefined,
            type: 'error',
            message: 'Failed to edit an event'
        })
    }
}

export const deleteEvent = async (req, res) => {
    try {
        const {id} = req.params;
        await Event.deleteOne({
            _id: id
        })

        return res.status(200).json({
            data: id,
            type: 'success',
            message: 'Successfully deleted the event'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: undefined,
            type: 'error',
            message: 'Failed to delete an event'
        })
    }
}

export const addAttendance = async (req, res) => {
    try {
        const {id} = req.params;
        const event = await Event.findById({
            _id: id
        });

        let updatedEvent;
        let canAttend;
        if (event.going.includes(req.id)) {
            updatedEvent = await Event.findOneAndUpdate({
                _id: id,
            }, {
                going: event.going.filter((element) => element !== req.id)
            }, {new: true});
            canAttend = true;
        } else {
            updatedEvent = await Event.findOneAndUpdate({
                _id: id
            }, {
                $push: {going: req.id}
            }, {new: true})
            canAttend = false;
        }

        return res.status(200).json({
            data: {
                event: updatedEvent,
                canAttend: canAttend
            },
            type: 'success',
            message: 'Successfully handled attendance'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: undefined,
            type: 'error',
            message: 'Failed to add attendance'
        })
    }
}