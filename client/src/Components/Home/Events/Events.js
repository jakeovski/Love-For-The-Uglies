import React, {useEffect, useState} from 'react';
import {Alert, Grid, LinearProgress, Paper, useTheme} from "@mui/material";
import EventNavbar from "./Components/EventNavbar";
import {useDispatch, useSelector} from "react-redux";
import {addEvent, deleteEvent, editEvent, getAllEvents, updateAttendance} from "../../../actions/events";
import {useNavigate} from "react-router-dom";
import {DateTime} from "luxon";
import AllEvents from "./Components/AllEvents";
import MyEvents from "./Components/MyEvents";

const Events = ({setAlertMessage, user}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allEvents = useSelector((state) => state.allEvents);
    const [isAllEvents, setIsAllEvents] = useState(true);
    const [eventAlertMessage, setEventAlertMessage] = useState({
        type: '',
        message: ''
    })
    const [eventsLoading, setEventsLoading] = useState(false);
    const [newEvent, setNewEvent] = useState({
        id: '',
        name: '',
        startDate: DateTime.now(),
        description: '',
        image: ''
    });

    const handleToggleTabChange = (allEvents) => {
        if (allEvents) {
            setIsAllEvents(true);
        } else {
            setIsAllEvents(false);
        }
    }

    const handleAddEvent = (newEvent) => {
        dispatch(addEvent(setAlertMessage, navigate, setEventAlertMessage, newEvent));
    }

    const handleEditEvent = () => {
        dispatch(editEvent(setAlertMessage, navigate, setEventAlertMessage, newEvent));
    }

    const handleDeleteEvent = (id) => {
        dispatch(deleteEvent(setAlertMessage, navigate, setEventAlertMessage, id));
    }

    const handleUpdateAttendance = (id) => {
        dispatch(updateAttendance(setAlertMessage, navigate, setEventAlertMessage, id));
    }

    useEffect(() => {
        if (allEvents.length === 0) {
            setEventsLoading(true);
            dispatch(getAllEvents(setAlertMessage, navigate, setEventAlertMessage, setEventsLoading));
        }
    }, []);

    return (
        <Paper elevation={3} sx={{
            mt: 1,
            mb: 1,
            borderRadius: 4
        }}>
            <EventNavbar isAllEvents={isAllEvents} handleToggleTabChange={handleToggleTabChange}/>
            {
                eventAlertMessage.type &&
                <Grid item xs={12}>
                    <Alert severity={eventAlertMessage.type}>{eventAlertMessage.message}</Alert>
                </Grid>
            }
            {
                eventsLoading &&
                <LinearProgress/>
            }
            {
                isAllEvents ?
                    <AllEvents allEvents={allEvents}
                               setNewEvent={setNewEvent}
                               newEvent={newEvent}
                               handleAddEvent={handleAddEvent}
                               handleDeleteEvent={handleDeleteEvent}
                               handleEditEvent={handleEditEvent}
                               handleUpdateAttendance={handleUpdateAttendance}
                               role={user.role}
                    />
                    :
                    <MyEvents user={user} allEvents={allEvents} setNewEvent={setNewEvent}
                              handleUpdateAttendance={handleUpdateAttendance}
                              handleDeleteEvent={handleDeleteEvent}
                              role={user.role}
                    />
            }
        </Paper>
    )
}

export default Events;