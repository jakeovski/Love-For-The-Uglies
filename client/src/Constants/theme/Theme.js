import {createTheme} from "@mui/material";
import globalPalette from "./GlobalPalette";

/**
 * Contains information about the application's theme and global styles
 * @type {Theme} - MUI Theme
 */
const theme = createTheme({
    palette: {
        primary: {
            main: globalPalette.primary.main,
            dark: globalPalette.primary.dark,
            light: globalPalette.primary.light
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#333333',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' %3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='0' y2='1' gradientTransform='rotate(0,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%23FFCAB1'/%3E%3Cstop offset='1' stop-color='%23EF476F'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpattern id='b' width='34' height='34' patternUnits='userSpaceOnUse'%3E%3Ccircle fill='%23333333' cx='17' cy='17' r='17'/%3E%3C/pattern%3E%3Crect width='100%25' height='100%25' fill='url(%23a)'/%3E%3Crect width='100%25' height='100%25' fill='url(%23b)' fill-opacity='0.15'/%3E%3C/svg%3E")`,
                    backgroundAttachment: 'fixed',
                },
            }
        }
    }
})

export default theme;