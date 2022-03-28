import React from 'react';
import {AppBar, Button, ButtonGroup, Grid, useTheme} from "@mui/material";
import {useLocation} from "react-router-dom";


const Navbar = () => {
    const theme = useTheme();
    const location = useLocation();
    const isHub = location.pathname === '/home/hub';
    const isEvent = location.pathname === '/events';

    return (
        <AppBar position="static" sx={{
            backgroundColor:theme.palette.primary.dark,
            borderRadius:4,
            mt:1,
            padding:1
        }}>
            <Grid container>
                <Grid item xs="auto">
                        <Button sx={{
                            display:'inline-block',
                            color: !isHub && 'white',
                            '&:after':{
                                content:`''`,
                                display:'block',
                                width: isHub ? '100%' : '0px',
                                height:'1px',
                                background:'white',
                                transition:'width .3s'
                            },
                            '&:hover:after':{
                                width:'100%'
                            }
                        }}>Hub</Button>
                </Grid>
                <Grid item xs="auto">
                    <Button sx={{
                        display:'inline-block',
                        color: !isEvent && 'white',
                        '&:after':{
                            content:`''`,
                            display:'block',
                            width: isEvent ? '100%' : '0px',
                            height:'1px',
                            background:'white',
                            transition:'width .3s'
                        },
                        '&:hover:after':{
                            width:'100%'
                        }
                    }}>Events</Button>
                </Grid>
            </Grid>
        </AppBar>
    )
}

export default Navbar;