import React, {useState} from "react";
import {Button, Container, Grid, IconButton, InputAdornment, Paper, TextField} from "@mui/material";
import Logo from '../../images/logo.svg';
import Footer from "../Footer/Footer";
import {Visibility, VisibilityOff} from "@mui/icons-material";

/**
 * Login component
 * @returns {JSX.Element}
 * @constructor
 */
const Login = () => {

    /**
     * Input data control
     */
    const [inputData, setInputData] = useState({
        username: null,
        password: null,
        firstName: null,
        lastName: null,
        confirmPassword: null
    })

    /**
     * Show password state
     */
    const [isPassword, setIsPassword] = useState(true);

    /**
     * Register view control
     */
    const [isRegister, setIsRegister] = useState(false);

    /**
     * Show password toggle
     */
    const handleShowPassword = () => {
        setIsPassword((prev) => !prev);
    }

    /**
     * Toggle Register
     */
    const handleRegister = () => {
        setIsRegister((prev) => !prev);
    }

    /**
     * Handle input change event
     * @param e - Event
     */
    const handleInputChange = (e) => {
        setInputData({
            ...inputData, [e.target.name]: e.target.value
        });
    }

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
                    <form>
                        <Grid container flexDirection="row" spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <img alt="Logo" src={Logo} width="100%"/>
                            </Grid>
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
                                    value={inputData.password}
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
                                        value={inputData.confirmPassword}
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
                                <Button variant="contained" fullWidth>
                                    {isRegister ? `Register` : `Login`}
                                </Button>
                            </Grid>
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