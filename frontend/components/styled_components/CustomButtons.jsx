import Button from '@mui/material/Typography';
import { styled } from "@mui/material/styles";
import {createTheme} from "@mui/material";

const theme = createTheme({
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    variants: [
                        {
                            props: { variant: 'contained' },
                            style: {
                                borderWidth: '3px',
                            },
                        },
                    ],
                },
            },
        },
    },
});


const ButtonContainedPink = styled(Button)`
    font-family: "Space Mono", monospace;
    font-size: 6em; // 96px
    font-weight: bold;
`;

export {ButtonContainedPink};
