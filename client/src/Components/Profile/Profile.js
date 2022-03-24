import React, {useState} from 'react';
import {Alert, Button, Container, Grid, IconButton, Paper, TextField, Typography, useTheme} from "@mui/material";
import defaultProfile from '../../images/profile.svg';
import FileBase from "react-file-base64";
import ReactRoundedImage from 'react-rounded-image';
import {ArrowBack, Delete, Edit} from "@mui/icons-material";
import {DateTime} from "luxon";


const Profile = ({user,setUser}) => {

    const theme = useTheme();

    const [alertMessage,setAlertMessage] = useState({
        type:'',
        message:''
    });

    const [userForm,setUserForm] = useState(user);
    const [toggleEdit,setToogleEdit] = useState(false);

    const handleImageUpload = (base64) => {
        console.log(base64);
        if(!base64.type.includes('image')) {
            setAlertMessage({
                type:'error',
                message: 'The file must be an image!'
            })
        }else {
            setAlertMessage({type:'',message: ''});
        }

        const size = parseInt(base64.size.split(" ")[0]);
        if (size > 3000) {
            setAlertMessage({
                type:'error',
                message: 'Image must be less than 3 MB'
            })
        }else {
            setUserForm({...userForm,avatar:base64.base64});
        }
    }

    const handleEdit = () => {
        setToogleEdit((prevState) => !prevState);
    }

    const handleCancel = () => {
        setToogleEdit((prev) => !prev);
    }


    return(
            <Container maxWidth="md" sx={{marginTop:2}}>
                <Paper elevation={3} sx={{
                    borderRadius:3
                }}>
                    <Grid container padding={2}>
                        <Grid item xs={12}>
                            <IconButton>
                                <ArrowBack/>
                            </IconButton>
                        </Grid>
                        <Grid item xs={12} textAlign="center">
                            <Typography fontWeight="bold" variant="h5">{`${userForm.username}'s Profile`}</Typography>
                        </Grid>
                        <Grid item xs={12} textAlign="center" sx={{mb:2}}>
                            <Typography>{userForm.role}</Typography>
                        </Grid>
                        <Grid item container xs={6}>
                            <Grid item xs={12} display="flex" justifyContent="center">
                                <ReactRoundedImage
                                    image={userForm.avatar ? userForm.avatar : defaultProfile}
                                    imageWidth="200"
                                    imageHeight="200"
                                    hoverColor={theme.palette.primary.main}
                                    roundedColor={theme.palette.primary.dark}
                                    roundedSize="10"
                                    />
                            </Grid>
                            {alertMessage.type &&
                                <Grid item xs={12}>
                                    <Alert severity={alertMessage.type}>{alertMessage.message}</Alert>
                                </Grid>
                            }
                        </Grid>
                        <Grid item container xs={6} alignContent="space-around" spacing={2}>
                            <Grid item xs={12}>
                                {toggleEdit ?
                                    <TextField value={userForm.username} label="Username" size="small"/>
                                    :
                                    <Typography><b>Username:</b> {userForm.username}</Typography>
                                }
                            </Grid>
                            <Grid item xs={12}>
                                {toggleEdit ?
                                    <TextField value={userForm.firstName} label="First Name" size="small"/>
                                :
                                    <Typography><b>First Name:</b> {userForm.firstName}</Typography>
                                }
                            </Grid>
                            <Grid item xs={12}>
                                {toggleEdit ?
                                    <TextField value={userForm.lastName} label="Last Name" size="small"/>
                                    :
                                    <Typography><b>Last Name:</b> {userForm.lastName}</Typography>
                                }
                            </Grid>
                            <Grid item container xs={12} spacing={1}>
                                <Grid item xs="auto">
                                    <Typography fontWeight="bold">Password:</Typography>
                                </Grid>
                                <Grid item xs="auto">
                                    <Button variant="contained" size="small">Change Password</Button>
                                </Grid>
                            </Grid>
                            {toggleEdit &&
                                <Grid item container xs={12} spacing={1}>
                                <Grid item xs="auto">
                                    <Typography fontWeight="bold">Avatar:</Typography>
                                </Grid>
                                <Grid item xs="auto">
                                    <FileBase type="file" multiple={false} onDone={(base64) => handleImageUpload(base64)}/>
                                </Grid>
                            </Grid>
                            }
                        </Grid>
                        <Grid item xs={12} textAlign="center" sx={{mt:2}}>
                            <Typography variant="subtitle2">Created At: {DateTime.fromISO(userForm.created).toFormat('dd/LL/yyyy HH:mm')}</Typography>
                        </Grid>
                        <Grid container item xs={12} justifyContent="center" spacing={2}>
                            {
                                toggleEdit ?
                                    <>
                                        <Grid item xs="auto">
                                            <Button variant="contained">Save</Button>
                                        </Grid>
                                        <Grid item xs="auto" >
                                            <Button variant="contained" onClick={handleCancel}>Cancel</Button>
                                        </Grid>
                                    </>
                                    :
                                    <>
                                        <Grid item xs="auto">
                                            <IconButton sx={{color:theme.palette.primary.main}} onClick={handleEdit}>
                                                <Edit/>
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs="auto" >
                                            <IconButton sx={{color:theme.palette.primary.main}}>
                                                <Delete/>
                                            </IconButton>
                                        </Grid>
                                    </>
                            }

                        </Grid>
                    </Grid>
                </Paper>
            </Container>
    )

}

export default Profile;