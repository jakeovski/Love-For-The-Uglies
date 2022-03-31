import React, {useEffect, useState} from 'react';
import {Container, CssBaseline, ThemeProvider} from "@mui/material";
import Login from "./Components/Login/Login";
import theme from "./Constants/theme/Theme";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Components/Home/Home";
import Profile from "./Components/Home/Profile/Profile";
import Hub from "./Components/Home/Hub/Hub";


//TODO:Add check for login input length
const App = () => {

    const [pageLoading,setPageLoading] = useState(true);


    /**
     * Alert message state
     */
    const [alertMessage, setAlertMessage] = useState({
        type:'',
        message:''
    });

    /**
     * User object state
     */
    const [user,setUser] = useState({
        id:'',
        firstName:'',
        lastName:'',
        username: '',
        role:'',
        avatar:'',
        created:''
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container maxWidth="xl">
                <BrowserRouter>
                    <Routes>
                        <Route index element={<Login alertMessage={alertMessage} setAlertMessage={setAlertMessage}/>}/>
                        {/*<Route path="/home">*/}
                        {/*    <Route index element={<Home setAlertMessage={setAlertMessage} user={user} setUser={setUser} pageLoading={pageLoading} authCheck={authCheck}/>}/>*/}
                        {/*    <Route index={false} path="profile" element={<Profile user={user} setUser={setUser} authCheck={authCheck} setAlertMessage={setAlertMessage}/>}/>*/}
                        {/*</Route>*/}
                        <Route path="/home" element={<Home pageLoading={pageLoading} setPageLoading={setPageLoading} user={user} setUser={setUser} setAlertMessage={setAlertMessage}/>}>
                            <Route path="profile" element={<Profile user={user} setUser={setUser} setAlertMessage={setAlertMessage}/>}/>
                            <Route path="hub" element={<Hub user={user} setAlertMessage={setAlertMessage}/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Container>
        </ThemeProvider>
    )
}

export default App;