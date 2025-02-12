import {createTheme, styled} from '@mui/material/styles';
import Typography from "@mui/material/Typography";

// Or Create your Own theme:
const theme = createTheme({
    typography: {
        h1: {
            fontFamily: "\"Space Mono\", monospace",
            fontSize: "6em", // 96px
            fontWeight: "bold",
        },
        h2: {
            fontFamily: "\"Space Mono\", monospace",
            fontSize: "3.75em", // 60px
            fontWeight: "normal",
        },
        h3: {
            fontFamily: "\"Space Mono\", monospace",
            fontSize: "3em", // 48px
            fontWeight: "normal",
        },
        h4: {
            fontFamily: "\"Space Mono\", monospace",
            fontSize: "2.25em", // 36px
            fontWeight: "normal",
        },
        h5: {
            fontFamily: "\"Roboto\", sans-serif",
            fontSize: "1.5em", // 24px
            fontWeight: "normal",
        },
        h6: {
            fontFamily: "\"Roboto\", sans-serif",
            fontSize: "1.25em", // 20px
            fontWeight: "normal",
        },
        body2: {
            fontFamily: "\"Roboto\", sans-serif",
            fontSize: "1.125em", // 18px
            fontWeight: "normal",
        },
        body1: {
            fontFamily: "\"Roboto\", sans-serif",
            fontSize: "1em", // 16px
            fontWeight: "normal",
        },
        button: {
            fontFamily: "\"Roboto\", sans-serif",
            fontSize: "1.125em", // 18px
            fontWeight: "normal",
        },
        overline: {
            fontFamily: "\"Roboto\", sans-serif",
            fontSize: "0.75em", // 12px
            fontWeight: "normal",
        },
    },
    palette: {
        text: {
            primary: 'rgba(255, 255, 255, 1)',
        },
        primary: {
            main: 'rgba(248, 169, 255, 1)',
            light: 'rgba(250, 191, 255, 1)',
            dark: 'rgba(225, 95, 237, 1)',
            contrastText: 'rgba(40, 41, 48, 1)',
        },
        secondary: {
            main: 'rgba(169, 172, 255, 1)',
            light: 'rgba(203, 204, 255, 1)',
            dark: 'rgba(51, 47, 208, 1)',
            contrastText: 'rgba(40, 41, 48, 1)',
        },
        error: {
            main: 'rgba(237, 95, 97, 1)',
            light: 'rgba(255, 149, 151, 1)',
            dark: 'rgba(221, 73, 112, 1)',
            contrastText: 'rgba(40, 41, 48, 1)',
        },
        warning: {
            main: 'rgba(250, 234, 72, 1)',
            light: 'rgba(255, 243, 118, 1)',
            dark: 'rgba(204, 214, 66, 1)',
            contrastText: 'rgba(40, 41, 48, 1)',
        },
        info: {
            main: 'rgba(169, 172, 255, 1)',
            light: 'rgba(203, 204, 255, 1)',
            dark: 'rgba(51, 47, 208, 1)',
            contrastText: 'rgba(40, 41, 48, 1)',
        },
        success: {
            main: 'rgba(110, 220, 217, 1)',
            light: 'rgba(148, 228, 226, 1)',
            dark: 'rgba(59, 173, 194, 1)',
            contrastText: 'rgba(40, 41, 48, 1)',
        }
    },
    components: {
        MuiIconButton:{
            styleOverrides: {
                textTransform: "none",
                color: 'rgba(255, 255, 255, 0.68)',
            }
        },
        MuiInput: {
            variants:[
                {
                    props: {variant: "outlined"},
                    style: {
                        borderColor: 'rgba(255, 255, 255, 0.68)',
                    }
                },
                {
                    props: {variant: "filled"},
                    style: {
                        color: 'rgba(255, 255, 255, 0.68)',
                    }
                },
                {
                    props: {variant: "standard"},
                    style: {
                        color: 'rgba(255, 255, 255, 0.68)',
                    }
                },
            ]
        }
    }
});

export default theme;
