import {GET_ANIMAL} from "../Constants/actions";


const animalOfTheDayReducer = (animal = {}, action) => {
    switch (action.type) {
        case GET_ANIMAL:
            return action.data.data;
        default:
            return animal;
    }
}

export default animalOfTheDayReducer;