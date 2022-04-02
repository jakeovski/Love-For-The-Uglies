import React from 'react';
import {Grid, IconButton, Paper, Typography, useTheme} from "@mui/material";
import defaultImage from "../../../../images/profile.svg";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {DateTime} from "luxon";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {Delete, Edit} from "@mui/icons-material";


const Event = ({event, setNewEvent, handleDeleteEvent, handleUpdateAttendance, role}) => {
    const theme = useTheme();

    const handleEditButtonClick = () => {
        setNewEvent({
            id: event.event._id,
            name: event.event.name,
            startDate: event.event.startDate,
            description: event.event.description,
            image: event.event.image
        });
    }
    return (
        <Grid key={event.event._id} item xs={6} md={4} lg={3} mt={1}>
            <Paper elevation={3} sx={{
                opacity:`${DateTime.fromISO(event.event.startDate) < DateTime.now() ? 0.55 : 1}`
            }}>
                <Grid container padding={1} spacing={1}>
                    <Grid item xs={12}>
                        <img src={event.event.image ? event.event.image : defaultImage} width="100%" height={200}
                             alt="Event Image"/>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography fontWeight="bold">{event.event.name}</Typography>
                    </Grid>
                    <Grid item container xs={12} alignItems="center">
                        <Grid item xs="auto" display="flex" alignItems="center">
                            <AccessTimeIcon sx={{opacity: 0.7}}/>
                        </Grid>
                        <Grid item xs="auto" ml={0.5}>
                            <Typography sx={{opacity: 0.7}}
                                        variant="subtitle2">{DateTime.fromISO(event.event.startDate).toFormat('dd/LL/yyyy HH:mm')}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">{event.event.description}</Typography>
                    </Grid>
                    {
                        DateTime.fromISO(event.event.startDate) < DateTime.now() ?
                            <Grid item xs={12}>
                                <Typography>The event has ended</Typography>
                            </Grid>
                            :
                            <Grid item container xs={12} alignItems="center">
                                <Grid item xs="auto">
                                    <IconButton onClick={() => handleUpdateAttendance(event.event._id)}>
                                        <FavoriteIcon sx={{
                                            color: !event.canAttend && `${theme.palette.primary.light} !important`
                                        }}/>
                                    </IconButton>
                                </Grid>
                                {
                                    !event.canAttend &&
                                    <Grid item xs="auto">
                                        <Typography variant="subtitle2">You are attending this event</Typography>
                                    </Grid>
                                }
                            </Grid>
                    }
                    <Grid item container xs={12} alignItems="center" justifyContent="space-between">
                        <Grid item xs="auto">
                            <Typography variant="subtitle2">{`${event.event.going.length} going`}</Typography>
                        </Grid>
                        {
                            role === 'admin' &&
                            <>
                                <Grid item xs="auto">
                                    <IconButton onClick={handleEditButtonClick}>
                                        <Edit/>
                                    </IconButton>
                                </Grid>
                                <Grid item xs="auto">
                                    <IconButton onClick={() => handleDeleteEvent(event.event._id)}>
                                        <Delete/>
                                    </IconButton>
                                </Grid>
                            </>
                        }

                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default Event;