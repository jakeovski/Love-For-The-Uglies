import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate,Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import decode from 'jwt-decode';
import {CircularProgress} from "@mui/material";
import Header from "../Header/Header";
import Profile from "./Profile/Profile";
import {getUserData} from '../../actions/auth';
import Navbar from "./Navbar";

/**
 * Main component that stores content for authenticated user
 * @returns {JSX.Element}
 * @constructor
 */
const Home = ({pageLoading,setPageLoading,user,setUser,setAlertMessage}) => {

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
        try{
            if(token) {
                dispatch(getUserData(setAlertMessage,navigate,setUser,setPageLoading));
                if(location.pathname === '/home') navigate('/home/hub');
            }else {
                navigate('/');
            }
        }catch (error) {
            console.log(error);
            navigate('/');
        }
    },[]);

    return(
        <>
            {
                pageLoading ? <CircularProgress sx={{
                        display:'block',
                        marginLeft:'auto',
                        marginRight:'auto',
                        marginTop:'50vh'
                    }}/>
                    :<>
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