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
        MuiTab: {
            styleOverrides: {
                root: {
                    color: 'rgba(255, 255, 255, 0.68)',
                    '&.Mui-disabled': {
                        color: 'gray',
                    },
                },
                indicator: {
                    color: 'rgba(255, 255, 255, 1)',
                    boxShadow: "0px 1px 4px 0px var(--pink, #E15FED), 0px 1px 4px 0px var(--pink, #E15FED)",
                },
            }
        },
        MuiButton: {
            variants: [
                {
                    props: {variant: 'contained'},
                    style: {
                        textTransform: 'none',
                        '&:hover': {
                            boxShadow: "0px 1px 4px 0px var(--pink, #E15FED), 0px -1px 4px 0px var(--pink, #E15FED), 0px -1px 4px 0px var(--pink, #E15FED), 0px 1px 4px 0px var(--pink, #E15FED)",
                        },
                        '&.Mui-disabled': {
                            color: 'rgba(40, 41, 48, 1)',
                            backgroundColor: 'gray',
                        },
                    },
                },
                {
                    props: {variant: 'outlined'},
                    style: {
                        textTransform: 'none',
                        borderColor: 'rgba(255, 255, 255, 0.68)',
                        '&:hover': {
                            borderColor: 'rgba(255, 255, 255, 1)',
                            boxShadow: "0px 1px 4px 0px var(--pink, #E15FED), 0px -1px 4px 0px var(--pink, #E15FED), 0px -1px 4px 0px var(--pink, #E15FED), 0px 1px 4px 0px var(--pink, #E15FED)",

                        },
                        '&.Mui-disabled': {
                            color: 'gray',
                            borderColor: 'gray',
                        },
                    },
                },
            ],
        },
        MuiIconButton:{
            styleOverrides: {
                root: {
                    color: 'rgba(255, 255, 255, 0.68)',
                    '&:hover': {
                        color: 'rgba(248, 169, 255, 1)',
                    },
                    '&.Mui-disabled': {
                        color: 'gray',
                    },
                }
            }

        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.68)',
                    },
                    '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.68)',
                        boxShadow: "0px 1px 4px 0px var(--pink, #E15FED), 0px 1px 4px 0px var(--pink, #E15FED)",

                    },
                    '&.Mui-focused fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.68)',
                        boxShadow: "0px 1px 4px 0px var(--pink, #E15FED), 0px 1px 4px 0px var(--pink, #E15FED)",
                    },
                },
                input: {
                    color: 'rgba(255, 255, 255, 1)',
                    '&::placeholder': {
                        color: 'rgba(255, 255, 255, 0.65)',
                    }
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.68)',
                    },
                    '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.68)',
                        boxShadow: "0px 1px 4px 0px var(--pink, #E15FED), 0px 1px 4px 0px var(--pink, #E15FED)",

                    },
                    '&.Mui-focused fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.68)',
                        boxShadow: "0px 1px 4px 0px var(--pink, #E15FED), 0px 1px 4px 0px var(--pink, #E15FED)",
                    },
                },
                input: {
                    color: 'rgba(255, 255, 255, 1)',
                    '&::placeholder': {
                        color: 'rgba(255, 255, 255, 0.65)',
                    }
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: 'rgba(255, 255, 255, 0.65)',
                    '&.Mui-focused': {
                        color: 'rgba(255, 255, 255, 1)',
                    },
                },
            },
        },
    }
});

export default theme;
