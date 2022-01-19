import React from "react";
import {Button, Container, Grid, Paper, TextField} from "@mui/material";
import Logo from '../../images/logo.svg';
import Footer from "../Footer/Footer";

//TODO:Separate repetitive code
const Login = () => {

    return(
        <Container maxWidth="xs" sx={{
            height:'90vh',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            textAlign:'center'
        }}>
            <Paper elevation={3} sx={{
                padding:(theme) => theme.spacing(2),
                borderRadius:4,
            }}>
            <form>
                <Grid container flexDirection="column" spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <img alt="Logo" src={Logo} height={200}/>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            name="username"
                            autoFocus
                            label="Username"
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            name="password"
                            label="Password"
                            variant="outlined"
                            type="password"
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Button variant="contained" fullWidth>
                            Login
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="text" fullWidth>
                            Don't have an account? Register!
                        </Button>
                    </Grid>
                </Grid>
            </form>
            </Paper>
            <Footer/>
        </Container>
    )
}

export default Login;