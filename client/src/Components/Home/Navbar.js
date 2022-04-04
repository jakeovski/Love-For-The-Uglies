import React from 'react';
import {AppBar, Button, Grid, useTheme} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";


const Navbar = () => {
    //Hooks
    const theme = useTheme();
    const location = useLocation();
    const navigate = useNavigate();

    //Variables
    const isHub = location.pathname === '/home/hub';
    const isEvent = location.pathname === '/home/events';

    return (
        <AppBar position="static" sx={{
            backgroundColor: theme.palette.primary.dark,
            borderRadius: 4,
            mt: 1,
            padding: 1
        }}>
            <Grid container>
                <Grid item xs="auto">
                    <Button sx={{
                        display: 'inline-block',
                        color: !isHub && 'white',
                        '&:after': {
                            content: `''`,
                            display: 'block',
                            width: isHub ? '100%' : '0px',
                            height: '1px',
                            background: 'white',
                            transition: 'width .3s'
                        },
                        '&:hover:after': {
                            width: '100%'
                        }
                    }} onClick={() => navigate('/home/hub')}>Hub</Button>
                </Grid>
                <Grid item xs="auto">
                    <Button sx={{
                        display: 'inline-block',
                        color: !isEvent && 'white',
                        '&:after': {
                            content: `''`,
                            display: 'block',
                            width: isEvent ? '100%' : '0px',
                            height: '1px',
                            background: 'white',
                            transition: 'width .3s'
                        },
                        '&:hover:after': {
                            width: '100%'
                        }
                    }} onClick={() => navigate('/home/events')}>Events</Button>
                </Grid>
            </Grid>
        </AppBar>
    )
}

export default Navbar;