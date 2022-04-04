import React, {useEffect, useState} from "react";
import {
    Alert,
    Button,
    Container,
    Grid,
    IconButton,
    InputAdornment,
    LinearProgress,
    Paper,
    TextField
} from "@mui/material";
import Logo from '../../images/logo.svg';
import Footer from "../Footer/Footer";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {login, register} from "../../actions/auth";
import {useNavigate} from "react-router-dom";


/**
 * Login component
 * @returns {JSX.Element}
 * @constructor
 */
const Login = ({alertMessage, setAlertMessage}) => {
    //Hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userResponse = useSelector((state) => state.auth);

    //States
    const [inputData, setInputData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        confirmPassword: ''
    })

    const [isPassword, setIsPassword] = useState(true);
    const [isRegister, setIsRegister] = useState(false);
    const [loading, setLoading] = useState(false);

    //Handlers
    const handleShowPassword = () => {
        setIsPassword((prev) => !prev);
    }

    const handleRegister = () => {
        setIsRegister((prev) => !prev);
        resetAlertMessage();
    }

    const handleInputChange = (e) => {
        setInputData({
            ...inputData, [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        if (isRegister) {
            dispatch(register(inputData));
        } else {
            resetAlertMessage();
            dispatch(login(inputData, navigate));
        }
    }

    const resetAlertMessage = () => {
        setAlertMessage({
            type: '',
            message: ''
        });
    }

    //useEffect that checks whether the user is authenticated, redirect if true
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate('/home');
        }
    }, []);

    //useEffect that monitors the response from the users endpoint
    useEffect(() => {
        if (userResponse.message) {
            setLoading(false);
            setAlertMessage({
                type: userResponse.type,
                message: userResponse.message
            });
            if (userResponse.type === 'success') {
                setIsRegister(false);
            }
        }
    }, [userResponse]);

    return (
        <>
            <Container component="main" maxWidth="xs" sx={{
                minHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center'
            }}>
                <Paper elevation={3} sx={{
                    padding: (theme) => theme.spacing(2),
                    borderRadius: 4,
                }}>
                    <form onSubmit={handleSubmit}>
                        <Grid container flexDirection="row" spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <img alt="Logo" src={Logo} width="100%"/>
                            </Grid>
                            {
                                alertMessage.type &&
                                <Grid item xs={12}>
                                    <Alert severity={alertMessage.type}>{alertMessage.message}</Alert>
                                </Grid>
                            }
                            {
                                isRegister &&
                                <>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name="firstName"
                                            label="First Name"
                                            onChange={handleInputChange}
                                            variant="outlined"
                                            value={inputData.firstName}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name="lastName"
                                            label="Last Name"
                                            variant="outlined"
                                            value={inputData.lastName}
                                            fullWidth
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                </>
                            }
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="username"
                                    autoFocus
                                    label="Username"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    value={inputData.username}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="password"
                                    label="Password"
                                    variant="outlined"
                                    type={isPassword ? 'password' : 'text'}
                                    required
                                    value={inputData.password.trim()}
                                    fullWidth
                                    onChange={handleInputChange}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleShowPassword}>
                                                    {isPassword ? <Visibility/> : <VisibilityOff/>}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            {
                                isRegister &&
                                <Grid item xs={12}>
                                    <TextField
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        variant="outlined"
                                        type={isPassword ? 'password' : 'text'}
                                        required
                                        fullWidth
                                        onChange={handleInputChange}
                                        value={inputData.confirmPassword.trim()}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={handleShowPassword}>
                                                        {isPassword ? <Visibility/> : <VisibilityOff/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Grid>
                            }
                            <Grid item xs={12} sm={12}>
                                <Button variant="contained" fullWidth type="submit">
                                    {isRegister ? `Register` : `Login`}
                                </Button>
                            </Grid>
                            {
                                loading &&
                                <Grid item xs={12} sm={12}>
                                    <LinearProgress/>
                                </Grid>
                            }
                            <Grid item xs={12}>
                                <Button variant="text" fullWidth onClick={handleRegister}>
                                    {isRegister ? `Already have an account? Log in!` : `Don't have an account? Register!`}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
            <Footer/>
        </>
    )
}

export default Login;