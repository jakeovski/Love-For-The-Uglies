import {ADD_EVENT, DELETE_EVENT, EDIT_EVENT, GET_EVENTS, UPDATE_ATTENDANCE} from "../Constants/actions";


const allEvents = (allEvents = [], action) => {
    switch (action.type) {
        case ADD_EVENT:
            return insertItemInTheStartOfArray(allEvents, action.data.data);
        case GET_EVENTS:
            return action.data.data;
        case EDIT_EVENT:
            return allEvents.map((event) => {
                if (event.event._id !== action.data.data._id) {
                    return event;
                }
                return {...event, event: action.data.data}
            })
        case DELETE_EVENT:
            return allEvents.filter((event) => event.event._id !== action.data.data);
        case UPDATE_ATTENDANCE:
            return allEvents.map((event) => {
                if (event.event._id !== action.data.data.event._id) {
                    return event;
                }
                return action.data.data;
            })
        default:
            return allEvents;
    }
}

export default allEvents;

const insertItemInTheStartOfArray = (array, item) => {
    let newArray = array.slice();
    newArray.unshift(item);
    return newArray;
}