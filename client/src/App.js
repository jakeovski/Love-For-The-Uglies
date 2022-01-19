import React from 'react';
import {Container, CssBaseline, ThemeProvider} from "@mui/material";
import Login from "./Components/Login/Login";
import theme from "./Constants/theme/Theme";

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
        <Container maxWidth="xl">
            <Login/>
        </Container>
        </ThemeProvider>
    )
}

export default App;