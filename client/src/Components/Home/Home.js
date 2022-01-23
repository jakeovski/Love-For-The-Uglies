import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import decode from 'jwt-decode';
import {checkAdminStatus} from "../../actions/auth";
import {CircularProgress} from "@mui/material";

/**
 * Main component that stores content for authenticated user
 * @returns {JSX.Element}
 * @constructor
 */
const Home = () => {
    /**
     * Location Hook
     * @type {Location<LocationState>}
     */
    const location = useLocation();

    /**
     * Navigation Hook
     */
    const navigate = useNavigate();
    /**
     * Dispatch Hook
     * @type {Dispatch<any>}
     */
    const dispatch = useDispatch();
    /**
     * Select auth object from redux store
     */
    const userResponse = useSelector((state) => state.auth);

    /**
     * State that stores whether the page is loading
     */
    const [pageLoading,setPageLoading] = useState(false);
    /**
     * User object state
     */
    const [user,setUser] = useState({
        firstName:'',
        lastName:'',
        username: '',
        role:''
    });
    /**
     * Logout the user
     */
    const logout = () => {
        localStorage.removeItem("token");
        navigate('/');
    }
    /**
     * Check whether the user is authenticated and set the necessary states
     */
    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token){
            const data = decode(token);
            //Check whether the token has expired
            if (new Date().getTime() > data.exp * 1000){
                console.log('Token has expired');
                logout();
            }
            if (!user.username) {
                //If role is admin, check whether it is actually an admin
                if (data.context.user.role === 'admin'){
                    setPageLoading(true);
                    console.log('Checking Admin Privileges');
                    dispatch(checkAdminStatus());
                    setUser({
                        firstName: data.context.user.firstName,
                        lastName:data.context.user.lastName,
                        username: data.context.user.username,
                        role:'user'
                    })
                }else {
                    setUser({
                        firstName: data.context.user.firstName,
                        lastName:data.context.user.lastName,
                        username: data.context.user.username,
                        role:'user'
                    })
                }
            }
        }else {
            navigate('/');
        }
    },[location]);

    /**
     * Set the role based on the response from checkAdminStatus endpoint
     */
    useEffect(() => {
            if (userResponse.role) {
                if (userResponse === 'error') {
                    console.log('Token changed');
                    logout();
                }else {
                    setUser({...user,role:userResponse.role});
                    setPageLoading(false);
                }
            }
    },[userResponse]);


    return(
        <>
            {
                pageLoading ? <CircularProgress sx={{
                        display:'block',
                        marginLeft:'auto',
                        marginRight:'auto',
                        marginTop:'50vh'
                    }}/>
                    : <h1>{`Hi ${user.username}. You are ${user.role}`}</h1>
            }
        </>
    )
}

export default Home;