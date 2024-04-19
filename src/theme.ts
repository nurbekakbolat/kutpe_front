import { createTheme } from "@mui/material";
import { blue } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: {
            main: blue[500],
            light: "#fof7ff"
        },
        secondary: {
            main: "#a9a9a9"
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536
        }
    },
    components: {
        MuiIconButton: {
            styleOverrides: {
                root: {
                    '&:Mui-focusVisible': {
                        outline: 'none'
                    },
                    '&:focus': {
                        outline: 'none'
                    
                    }
                }
            }
        }, 
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    padding: "10px 20px",
                    border: "none",
                    '&:focus': {
                        outline: "none",
                        boxShadow: "none"
                    },
                    '&:active': {
                        outline: "none",
                        boxShadow: 'none',
                      },
                },
            }
        }
    }
})

export default theme;