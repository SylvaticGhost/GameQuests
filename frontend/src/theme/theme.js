import { createTheme } from "@mui/material/styles";

const NeonTheme = createTheme({
    palette: {
        primary: {
            main: "#E15FED",
        },
        secondary: {
            main: "#6EDCD9",
        },
        background: {
            default: "#121212",
            paper: "#1E1E1E",
        },
        text: {
            primary: "#FFFFFF",
            secondary: "#A9ACFF",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    textTransform: "none",
                    fontWeight: "bold",
                    transition: "0.3s",
                    "&:hover": {
                        boxShadow: "0px 0px 15px #F8A9FF",
                        backgroundColor: "transparent",
                        border: "2px solid #F8A9FF",
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiInputBase-root": {
                        color: "#FFFFFF",
                        borderRadius: 8,
                        backgroundColor: "#1E1E1E",
                        "&:hover": {
                            boxShadow: "0px 0px 10px #6EDCD9",
                        },
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#A9ACFF",
                    },
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    "& .MuiTab-root": {
                        color: "#FFFFFF",
                        "&.Mui-selected": {
                            color: "#A9ACFF",
                        },
                    },
                    "& .MuiTabs-indicator": {
                        backgroundColor: "#A9ACFF",
                    },
                },
            },
        },
    },
});

export default NeonTheme;
