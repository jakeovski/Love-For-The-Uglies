import mongoose from "mongoose";


const uglyAnimal = mongoose.Schema({
    id: {
        type: String,
    },
    day: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    endangered: {
        type: String,
        required: true
    }
});

export default mongoose.models.uglyAnimal || mongoose.model("uglyAnimals", uglyAnimal);