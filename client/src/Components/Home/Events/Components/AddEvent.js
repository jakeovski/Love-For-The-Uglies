import React, {useState} from 'react';
import {Alert, Grid, IconButton, InputAdornment, Paper, TextField, Typography, useTheme} from "@mui/material";
import defaultImage from "../../../../images/profile.svg";
import {MAX_COMMENT_LENGTH, MAX_EVENT_LENGTH} from "../../../../Constants/general";
import {DateTimePicker, LocalizationProvider} from "@mui/lab";
import AdapterLuxon from "@mui/lab/AdapterLuxon";
import {DateTime} from "luxon";
import Dropzone from "react-dropzone";
import {DropzoneContainer} from "../../Hub/Components/Comments";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {Edit} from "@mui/icons-material";


const AddEvent = ({handleAddEvent, newEvent, setNewEvent, handleEditEvent}) => {
    //Hooks
    const theme = useTheme();

    //States
    const [newEventAlert, setNewEventAlert] = useState({
        type: '',
        message: ''
    })

    //Handlers
    const handleImageUpload = (base64) => {
        if (!base64[0].type.includes('image')) {
            setNewEventAlert({
                type: 'error',
                message: 'The file must be an image!'
            })
            setNewEvent({...newEvent, image: ''});
        } else {
            setNewEventAlert({type: '', message: ''});
        }

        const size = parseInt(base64[0].size);
        if (size > 1000000) {
            setNewEventAlert({
                type: 'error',
                message: 'Image must be less than 1 MB'
            })
            setNewEvent({...newEvent, image: ''});
        } else {
            const reader = new FileReader();
            reader.readAsDataURL(base64[0]);
            reader.onload = () => {
                setNewEvent({...newEvent, image: reader.result});
            }
            reader.onerror = (error) => {
                setNewEventAlert({
                    type: 'error',
                    message: error
                })
            }
        }
    }

    const handleClearNewEvent = () => {
        setNewEvent({
            id: '',
            name: '',
            startDate: DateTime.now(),
            description: '',
            image: ''
        });
        setNewEventAlert({
            type: '',
            message: ''
        });
    }

    const handleEventSubmit = (e) => {
        e.preventDefault();
        if (newEvent.id) {
            handleEditEvent(newEvent);
        } else {
            handleAddEvent(newEvent);
        }
        handleClearNewEvent();
    }

    return (
        <Grid item xs={6} md={4} lg={3}>
            <Paper elevation={2} sx={{
                border: `1px dotted ${theme.palette.primary.main}`
            }}>
                <form onSubmit={handleEventSubmit}>
                    <Grid container padding={1} spacing={1}>
                        <Grid item xs={12}>
                            <img src={newEvent.image ? newEvent.image : defaultImage} width="100%" height={200}
                                 alt="New Event Image"/>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography fontWeight="bold" sx={{opacity: 0.55}}>
                                {newEvent.id ? 'Editing Event' : 'Add new Event'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                value={newEvent.name}
                                label="Name of the event"
                                size="small"
                                onChange={(e) => {
                                    setNewEvent({...newEvent, name: e.target.value})
                                }}
                                multiline
                                inputProps={{
                                    maxLength: MAX_EVENT_LENGTH
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment
                                        position="end">{`${newEvent.name.length}/${MAX_EVENT_LENGTH}`}</InputAdornment>
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterLuxon}>
                                <DateTimePicker
                                    renderInput={(props) => <TextField {...props} size="small" fullWidth/>}
                                    label="When is the event"
                                    value={newEvent.startDate}
                                    inputFormat="dd/LL/yyyy HH:mm"
                                    onChange={(newValue) => {
                                        setNewEvent({...newEvent, startDate: newValue})
                                    }}
                                    minDateTime={DateTime.now()}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                value={newEvent.description}
                                label="Description"
                                size="small"
                                onChange={(e) => {
                                    setNewEvent({...newEvent, description: e.target.value})
                                }}
                                multiline
                                inputProps={{
                                    maxLength: MAX_COMMENT_LENGTH
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment
                                        position="end">{`${newEvent.description.length}/${MAX_COMMENT_LENGTH}`}</InputAdornment>
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Dropzone onDrop={handleImageUpload}>
                                {({getRootProps, getInputProps}) => (
                                    <section>
                                        <DropzoneContainer theme={theme} {...getRootProps()}>
                                            <input {...getInputProps()}/>
                                            <p>Event Image</p>
                                        </DropzoneContainer>
                                    </section>
                                )}
                            </Dropzone>
                        </Grid>
                        {
                            newEventAlert.message &&
                            <Grid item xs={12}>
                                <Alert severity={newEventAlert.type}>{newEventAlert.message}</Alert>
                            </Grid>
                        }
                        <Grid item container xs={12} justifyContent="space-evenly">
                            <Grid item xs="auto">
                                <IconButton type="submit">
                                    {newEvent.id ?
                                        <Edit/> :
                                        <AddCircleIcon color="primary"/>
                                    }
                                </IconButton>
                            </Grid>
                            <Grid item xs="auto">
                                <IconButton onClick={handleClearNewEvent}>
                                    <HighlightOffIcon color="primary"/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Grid>
    )
}

export default AddEvent;