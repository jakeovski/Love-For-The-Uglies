import mongoose from "mongoose";


const Event = mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
    },
    image: {
        type: String
    },
    going: {
        type: [],
        default: []
    },
    createdAt: {
        type: Date,
        required: true
    }
})


export default mongoose.models.events || mongoose.model("events", Event);