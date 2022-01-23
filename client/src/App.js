import React from 'react';
import {Container, CssBaseline, ThemeProvider} from "@mui/material";
import Login from "./Components/Login/Login";
import theme from "./Constants/theme/Theme";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Components/Home/Home";

//TODO:Refresh token functionality
const App = () => {


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container maxWidth="xl">
                <BrowserRouter>
                    <Routes>
                        <Route index element={<Login/>}/>
                        <Route path="home" element={<Home/>}/>
                    </Routes>
                </BrowserRouter>
            </Container>
        </ThemeProvider>
    )
}

export default App;