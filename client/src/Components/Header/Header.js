import React, {useState} from 'react';
import {AppBar, Avatar, Box, Grid, IconButton, Menu, MenuItem, Tooltip, Typography} from "@mui/material";
import headerImage from '../../images/headerLogo.svg';
import {useTheme} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Link} from 'react-router-dom';

const Header = ({user,setAlertMessage}) => {
    const theme = useTheme();

    const [anchorElUser,setAnchorElUser] = useState(null);

    const navigate = useNavigate();

    const handleMenuOpen = (e) => {
        setAnchorElUser(e.currentTarget);
    }

    const handleMenuClose = () => {
        setAnchorElUser(null);
    }

    /**
     * Logout the user
     */
    const logout = () => {
        localStorage.removeItem("token");
        navigate('/');
    }

    const openProfile = () => {
        setAnchorElUser(null);
        navigate('/home/profile');
    }

    return(
        <Box paddingTop={1}>
            <AppBar position="static" sx={{
                backgroundColor:theme.palette.primary.dark,
                borderRadius:4
            }}>
                <Grid container paddingLeft={2}>
                    <Grid container item xs={7} sm={8} lg={6} xl={6} alignItems="center">
                        <Grid item xs={3} sm={3} md={2} lg={2} xl={2} textAlign="center">
                            <Link to="/home/hub">
                                <img alt="Header Logo" height={80} src={headerImage}/>
                            </Link>
                        </Grid>
                        <Grid item xs={9} sm={9} md={10} lg={10} xl={10}>
                            <Typography sx={{
                                fontFamily:'Indie Flower',
                                fontWeight:'bold',
                                fontSize:'1.7rem',
                            }}>
                                LOVE-FOR-THE-UGLIES
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container item xs={5} sm={4} lg={6} xl={6} alignItems="center" spacing={1}>
                        <Grid item xs={8} sm={8} md={9} lg={10} xl={11}>
                            <Typography variant="h6" sx={{
                                fontFamily:'Indie Flower',
                            }} textAlign="end">
                                {user.username}
                            </Typography>
                        </Grid>
                        <Grid item xs={4} sm={4} md={3} lg={2} xl={1}>
                            <Box sx={{flexGrow:0}}>
                                <Tooltip title="Open Setting">
                                    <IconButton onClick={handleMenuOpen} sx={{p:0}}>
                                        <Avatar alt={user.username} src={user.avatar} sx={{
                                            backgroundColor: theme.palette.primary.main
                                        }}>
                                            {user.username.charAt(0)}
                                        </Avatar>
                                    </IconButton>
                                </Tooltip>
                                <Menu sx={{mt:'45px'}}
                                    id="menu"
                                      anchorEl={anchorElUser}
                                      anchorOrigin={{
                                          vertical:'top',
                                          horizontal:'right',
                                      }}
                                      keepMounted
                                      transformOrigin={{
                                          vertical:'top',
                                          horizontal:'right',
                                      }}
                                      open={Boolean(anchorElUser)}
                                      onClose={handleMenuClose}
                                >
                                    <MenuItem onClick={openProfile}>
                                        <Typography textAlign="center">Profile</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={logout}>
                                        <Typography textAlign="center">Logout</Typography>
                                    </MenuItem>

                                </Menu>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </AppBar>
        </Box>
    )
}

export default Header;