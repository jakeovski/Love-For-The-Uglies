import React, {useState} from 'react';
import {Container, CssBaseline, ThemeProvider} from "@mui/material";
import Login from "./Components/Login/Login";
import theme from "./Constants/theme/Theme";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Components/Home/Home";
import Profile from "./Components/Home/Profile/Profile";
import Hub from "./Components/Home/Hub/Hub";
import Events from "./Components/Home/Events/Events";


const App = () => {

    const [pageLoading, setPageLoading] = useState(true);


    /**
     * Alert message state
     */
    const [alertMessage, setAlertMessage] = useState({
        type: '',
        message: ''
    });

    /**
     * User object state
     */
    const [user, setUser] = useState({
        id: '',
        firstName: '',
        lastName: '',
        username: '',
        role: '',
        avatar: '',
        created: ''
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container maxWidth="xl">
                <BrowserRouter>
                    <Routes>
                        <Route index element={<Login alertMessage={alertMessage} setAlertMessage={setAlertMessage}/>}/>
                        <Route path="/home"
                               element={<Home pageLoading={pageLoading} setPageLoading={setPageLoading} user={user}
                                              setUser={setUser} setAlertMessage={setAlertMessage}/>}>
                            <Route path="profile" element={<Profile user={user} setUser={setUser}
                                                                    setAlertMessage={setAlertMessage}/>}/>
                            <Route path="hub" element={<Hub user={user} setAlertMessage={setAlertMessage}/>}/>
                            <Route path="events" element={<Events setAlertMessage={setAlertMessage} user={user}/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Container>
        </ThemeProvider>
    )
}

export default App;