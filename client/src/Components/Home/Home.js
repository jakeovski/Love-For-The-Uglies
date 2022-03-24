import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate,Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import decode from 'jwt-decode';
import {CircularProgress} from "@mui/material";
import Header from "../Header/Header";
import Profile from "../Profile/Profile";

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

    /**
     * Dispatch Hook
     * @type {Dispatch<any>}
     */
    const dispatch = useDispatch();


    useEffect(() => {
        const token = localStorage.getItem("token");
        try{
            if(token) {
                const data = decode(token);
                setUser({
                    firstName: data.context.user.firstName,
                    lastName:data.context.user.lastName,
                    username: data.context.user.username,
                    role:data.context.user.role,
                    avatar:data.context.user.avatar,
                    created:data.context.user.created
                });
                setPageLoading(false);
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
                    <Outlet/>
                    </>

            }
        </>
    )
}

export default Home;