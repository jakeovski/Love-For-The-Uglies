import React, {useEffect} from 'react';
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {CircularProgress} from "@mui/material";
import Header from "../Header/Header";
import {getUserData} from '../../actions/auth';
import Navbar from "./Navbar";

/**
 * Main component that stores content for authenticated user
 * @returns {JSX.Element}
 * @constructor
 */
const Home = ({pageLoading, setPageLoading, user, setUser, setAlertMessage}) => {

    /**
     * Navigation Hook
     */
    const navigate = useNavigate();

    const location = useLocation();

    /**
     * Dispatch Hook
     * @type {Dispatch<any>}
     */
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");
        try {
            if (token) {
                dispatch(getUserData(setAlertMessage, navigate, setUser, setPageLoading));
                if (location.pathname === '/home') navigate('/home/hub');
            } else {
                navigate('/');
            }
        } catch (error) {
            console.log(error);
            navigate('/');
        }
    }, []);

    useEffect(() => {
        if (location.pathname === '/home') navigate('/home/hub');
    }, [location]);

    return (
        <>
            {
                pageLoading ? <CircularProgress sx={{
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: '50vh'
                    }}/>
                    : <>
                        <Header user={user} setAlertMessage={setAlertMessage}/>
                        {
                            location.pathname !== '/home/profile' &&
                            <Navbar/>
                        }
                        <Outlet/>
                    </>

            }
        </>
    )
}

export default Home;