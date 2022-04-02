import React from 'react';
import Event from "./Event";
import AddEvent from "./AddEvent";
import {Divider, Grid, Typography} from "@mui/material";
import EventPopularity from "./EventPopularity";


const AllEvents = ({
                       allEvents,
                       setNewEvent,
                       handleDeleteEvent,
                       handleUpdateAttendance,
                       handleAddEvent,
                       newEvent,
                       handleEditEvent,
                       role
                   }) => {

    return (
        <Grid container padding={1} spacing={1}>
            {
                role === 'admin' &&
                <EventPopularity allEvents={allEvents}/>
            }
            <Grid item xs={12}>
                <Divider><Typography variant="h5" fontFamily="Indie Flower">Events</Typography></Divider>
            </Grid>
            {allEvents.map((event) => (
                <Event key={event.event._id} event={event} setNewEvent={setNewEvent}
                       handleDeleteEvent={handleDeleteEvent}
                       handleUpdateAttendance={handleUpdateAttendance} role={role}/>
            ))}
            {
                role === 'admin' &&
                <AddEvent handleAddEvent={handleAddEvent} newEvent={newEvent} setNewEvent={setNewEvent}
                          handleEditEvent={handleEditEvent}/>
            }
        </Grid>
    )
}

export default AllEvents;