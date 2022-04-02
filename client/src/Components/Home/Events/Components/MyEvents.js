import React, {useEffect, useState} from 'react';
import {Alert, Grid} from "@mui/material";
import Event from "./Event";


const MyEvents = ({allEvents, user, setNewEvent, handleDeleteEvent, handleUpdateAttendance, role}) => {
    const [myEvents, setMyEvents] = useState([]);

    useEffect(() => {
        setMyEvents(allEvents.filter((event) => event.event.going.includes(user.id)));
    }, [allEvents])

    return <>
        <Grid container padding={1} spacing={1}>
            {
                myEvents.length > 0 ?
                    myEvents.map((event) => (
                        <Event key={event.event._id} event={event} setNewEvent={setNewEvent}
                               handleDeleteEvent={handleDeleteEvent}
                               handleUpdateAttendance={handleUpdateAttendance} role={role}/>
                    )) :
                    <Grid item xs={12}>
                        <Alert severity="info">You have not registered for any event</Alert>
                    </Grid>
            }
        </Grid>
    </>
}

export default MyEvents;