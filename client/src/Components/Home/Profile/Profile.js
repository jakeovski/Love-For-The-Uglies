import React, {useState} from 'react';
import {
    Alert,
    Button,
    Container,
    Grid,
    IconButton,
    LinearProgress,
    Paper,
    TextField,
    Typography,
    useTheme
} from "@mui/material";
import defaultProfile from '../../../images/profile.svg';
import ReactRoundedImage from 'react-rounded-image';
import {ArrowBack, Delete, Edit} from "@mui/icons-material";
import {DateTime} from "luxon";
import {useDispatch} from "react-redux";
import {changePassword, deleteAccount, editProfile} from "../../../actions/profile";
import {useNavigate} from "react-router-dom";
import CustomDialog from "../../Helper/Dialog";
import Dropzone from "react-dropzone";
import {DropzoneContainer} from "../Hub/Components/Comments";


const Profile = ({user, setUser, setAlertMessage}) => {

    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const USERNAME_LIMIT = 15;

    const [imageAlertMessage, setImageAlertMessage] = useState({
        type: '',
        message: ''
    });
    const [profileAlertMessage, setProfileAlertMessage] = useState({
        type: '',
        message: ''
    })

    const [dialogAlertMessage, setDialogAlertMessage] = useState({
        type: '',
        message: ''
    })

    const [userForm, setUserForm] = useState(user);
    const [toggleEdit, setToogleEdit] = useState(false);
    const [bottomLoading, setBottomLoading] = useState(false);
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        newPasswordConfirm: ''
    });
    const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [dialogButtonLoading, setDialogButtonLoading] = useState(false);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleImageUpload = (base64) => {
        console.log(base64);
        if (!base64[0].type.includes('image')) {
            setImageAlertMessage({
                type: 'error',
                message: 'The file must be an image!'
            })
            setUserForm({...userForm, avatar: ''});
        } else {
            setImageAlertMessage({type: '', message: ''});
        }

        const size = parseInt(base64[0].size);
        if (size > 1000000) {
            setImageAlertMessage({
                type: 'error',
                message: 'Image must be less than 1 MB'
            })
            setUserForm({...userForm, avatar: ''});
        } else {
            const reader = new FileReader();
            reader.readAsDataURL(base64[0]);
            reader.onload = () => {
                setUserForm({...userForm, avatar: reader.result});
            }
            reader.onerror = (error) => {
                setImageAlertMessage({
                    type: 'error',
                    message: error
                })
            }
        }
    }

    const handleEdit = () => {
        setToogleEdit((prevState) => !prevState);
    }

    const handleCancel = () => {
        setToogleEdit((prev) => !prev);
        resetAlertMessage();
        setUserForm(user);
    }

    const handleUserDataChange = (e) => {
        setUserForm({
            ...userForm, [e.target.name]: e.target.value
        })
    }

    const handleSubmitEdit = () => {
        resetAlertMessage();
        setBottomLoading(true);
        dispatch(editProfile(user.username, userForm, navigate,
            setAlertMessage, setProfileAlertMessage,
            setBottomLoading,
            setUser,
            setUserForm, setToogleEdit
        ));
    }

    /**
     * Helper function to reset the state of the alert message
     */
    const resetAlertMessage = () => {
        setProfileAlertMessage({
            type: '',
            message: ''
        });
    }

    const handlePasswordDialogOpen = () => {
        setDialogAlertMessage({type: '', message: ''});
        setPasswordData({oldPassword: '', newPassword: '', newPasswordConfirm: ''})
        setPasswordDialogOpen((prev) => !prev);
    }

    const handleShowPassword = () => {
        setShowPassword((prev) => !prev);
    }

    const handlePasswordDialogSubmit = () => {
        setDialogButtonLoading(true);
        dispatch(changePassword(passwordData,
            setDialogButtonLoading,
            setAlertMessage, navigate,
            setDialogAlertMessage, setPasswordDialogOpen));
    }

    const handleDeleteDialogOpen = () => {
        setDialogAlertMessage({type: '', message: ''});
        setDeleteDialogOpen((prev) => !prev);
    }

    const handleDeleteDialogSubmit = () => {
        setDialogButtonLoading(true);
        dispatch(deleteAccount(setDialogButtonLoading,
            setAlertMessage, navigate, setDialogAlertMessage, setDeleteDialogOpen))
    }

    const handleProfileClose = () => {
        navigate('/home/hub');
    }

    return (
        <Container maxWidth="md" sx={{marginTop: 2}}>
            <Paper elevation={3} sx={{
                borderRadius: 3
            }}>
                <Grid container padding={2}>
                    <Grid item xs={12}>
                        <IconButton onClick={handleProfileClose}>
                            <ArrowBack/>
                        </IconButton>
                    </Grid>
                    <Grid item xs={12} textAlign="center">
                        <Typography fontWeight="bold" variant="h5">{`${userForm.username}'s Profile`}</Typography>
                    </Grid>
                    <Grid item xs={12} textAlign="center" sx={{mb: 2}}>
                        <Typography>{userForm.role}</Typography>
                    </Grid>
                    <Grid item container xs={12} sm={6}>
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
                        {imageAlertMessage.type &&
                            <Grid item xs={12}>
                                <Alert severity={imageAlertMessage.type}>{imageAlertMessage.message}</Alert>
                            </Grid>
                        }
                    </Grid>
                    <Grid item container xs={12} sm={6} alignContent="space-around" spacing={2} sx={{
                        textAlign: {xs: 'center', sm: 'start'}
                    }}>
                        <Grid item xs={12}>
                            {toggleEdit ?
                                <TextField name="username"
                                           onChange={handleUserDataChange}
                                           value={userForm.username}
                                           label="Username" size="small"
                                           fullWidth
                                           inputProps={{
                                               maxLength: USERNAME_LIMIT
                                           }}
                                           helperText={`${userForm.username.length}/${USERNAME_LIMIT}`}
                                />
                                :
                                <Typography><b>Username:</b> {userForm.username}</Typography>
                            }
                        </Grid>
                        <Grid item xs={12}>
                            {toggleEdit ?
                                <TextField name="firstName" fullWidth onChange={handleUserDataChange}
                                           value={userForm.firstName} label="First Name" size="small"/>
                                :
                                <Typography><b>First Name:</b> {userForm.firstName}</Typography>
                            }
                        </Grid>
                        <Grid item xs={12}>
                            {toggleEdit ?
                                <TextField name="lastName" fullWidth onChange={handleUserDataChange}
                                           value={userForm.lastName} label="Last Name" size="small"/>
                                :
                                <Typography><b>Last Name:</b> {userForm.lastName}</Typography>
                            }
                        </Grid>
                        <Grid item container xs={12} spacing={1} alignItems="center" sx={{
                            justifyContent: {xs: 'center', sm: 'flex-start'}
                        }}>
                            <Grid item xs="auto">
                                <Typography fontWeight="bold">Password:</Typography>
                            </Grid>
                            <Grid item xs="auto">
                                <Button variant="contained" size="small" onClick={handlePasswordDialogOpen}>Change
                                    Password</Button>
                            </Grid>
                        </Grid>
                        {toggleEdit &&
                            <Grid item container xs={12} spacing={1}>
                                <Grid item xs="auto">
                                    <Typography fontWeight="bold">Avatar:</Typography>
                                </Grid>
                                <Grid item xs="auto">
                                    <Dropzone onDrop={handleImageUpload}>
                                        {({getRootProps, getInputProps}) => (
                                            <section>
                                                <DropzoneContainer theme={theme} {...getRootProps()}>
                                                    <input {...getInputProps()}/>
                                                    <p>Drag 'n' drop an image here, or click to select an image</p>
                                                </DropzoneContainer>
                                            </section>
                                        )}
                                    </Dropzone>
                                </Grid>
                            </Grid>
                        }
                    </Grid>
                    <Grid item xs={12} textAlign="center" sx={{mt: 2}}>
                        <Typography variant="subtitle2">Created
                            At: {DateTime.fromISO(userForm.created).toFormat('dd/LL/yyyy HH:mm')}</Typography>
                    </Grid>
                    <Grid container item xs={12} justifyContent="center" spacing={2}>
                        {
                            toggleEdit ?
                                <>
                                    <Grid item xs="auto">
                                        <Button variant="contained" disabled={bottomLoading}
                                                onClick={handleSubmitEdit}>Save</Button>
                                    </Grid>
                                    <Grid item xs="auto">
                                        <Button variant="contained" disabled={bottomLoading}
                                                onClick={handleCancel}>Cancel</Button>
                                    </Grid>
                                </>
                                :
                                <>
                                    <Grid item xs="auto">
                                        <IconButton sx={{color: theme.palette.primary.main}} onClick={handleEdit}>
                                            <Edit/>
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs="auto">
                                        <IconButton sx={{color: theme.palette.primary.main}}
                                                    onClick={handleDeleteDialogOpen}>
                                            <Delete/>
                                        </IconButton>
                                    </Grid>
                                </>
                        }
                        {
                            profileAlertMessage.type &&
                            <Grid item xs={12}>
                                <Alert severity={profileAlertMessage.type}>{profileAlertMessage.message}</Alert>
                            </Grid>
                        }
                        {
                            bottomLoading &&
                            <Grid item xs={12}>
                                <LinearProgress/>
                            </Grid>
                        }
                    </Grid>
                </Grid>
            </Paper>
            <CustomDialog
                open={passwordDialogOpen}
                handleClose={handlePasswordDialogOpen}
                dialogTitle="Change Password"
                dialogContentText="Enter the details below to change your password"
                passwordData={passwordData}
                setPasswordData={setPasswordData}
                showPassword={showPassword}
                handleShowPassword={handleShowPassword}
                submitAction={handlePasswordDialogSubmit}
                alertMessage={dialogAlertMessage}
                buttonLoading={dialogButtonLoading}
            />
            <CustomDialog
                open={deleteDialogOpen}
                handleClose={handleDeleteDialogOpen}
                dialogTitle="Delete Account"
                dialogContentText="Are you sure you want to delete your account? This action cannot be reverted!"
                alertMessage={dialogAlertMessage}
                buttonLoading={dialogButtonLoading}
                submitAction={handleDeleteDialogSubmit}
            />

        </Container>
    )

}

export default Profile;