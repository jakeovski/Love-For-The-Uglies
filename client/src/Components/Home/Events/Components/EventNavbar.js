import React from 'react';
import {Button, Grid} from "@mui/material";


const EventNavbar = ({isAllEvents, handleToggleTabChange}) => {
    return (
        <Grid container padding={1}>
            <Grid item container xs={12} justifyContent="center">
                <Grid item xs="auto">
                    <Button variant={isAllEvents ? 'contained' : 'text'} onClick={() => handleToggleTabChange(true)}>All
                        Events</Button>
                </Grid>
                <Grid item xs="auto">
                    <Button variant={isAllEvents ? 'text' : 'contained'} onClick={() => handleToggleTabChange(false)}>My
                        Events</Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default EventNavbar;