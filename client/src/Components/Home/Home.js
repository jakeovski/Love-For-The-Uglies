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
    const [pageLoading,setPageLoading] = useState(true);

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
     * Execute when the location changes
     */
    useEffect(() => {
        //Check token existence, if missing, navigate to login page
        const token = localStorage.getItem("token");
        if (token){
            //When no user is set, checkPrivileges and set the user in other useEffect
            if (!user.username) {
                console.log('Checking privileges...');
                dispatch(checkAdminStatus());
            }else {
                //If user state exists, then all good, load the page
                setPageLoading(false);
            }
        }else {
            navigate('/');
        }
    },[location]);

    /**
     * Set the user useEffect, triggered by userResponse change
     */
    useEffect(() => {
            //If role property exists, means privileges were already checked
            if (userResponse.role) {
                //If role is 'error', logout
                if (userResponse.role === 'error') {
                    logout();
                }else {
                    //Get the token to set the user
                    const token = localStorage.getItem("token");
                    //Check token existence, if missing navigate to login page
                    if (token) {
                        //To avoid double setting the user, check whether it already exists
                        if (!user.username) {
                            //Decode the token, and set the user state
                            const data = decode(token);
                            setUser({
                                firstName: data.context.user.firstName,
                                lastName:data.context.user.lastName,
                                username: data.context.user.username,
                                role:userResponse.role
                            })
                        }
                        //Show page after all data is set
                        setPageLoading(false);
                    }else {
                        navigate('/');
                    }
                }
            }else if (userResponse.type === 'error') {
                logout();
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