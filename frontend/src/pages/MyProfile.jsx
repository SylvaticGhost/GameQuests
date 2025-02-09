import React from 'react'
import Header from "../../components/Header.jsx";
import {Box, Divider, Button, Typography} from "@mui/material";

function MyProfile(){
    const [value, setValue] = React.useState(0);

    return <Box sx={{ width: '100%' }}>
        <Header value={value} setValue={setValue} />
        <Typography variant="h3" fontWeight="bold">Profile</Typography>
        <Divider>
            <Box>

            </Box>
            <Box>

            </Box>
            <Box>

            </Box>
        </Divider>
        <Box>
            <Button variant="contained">Save changes</Button>
            <Button variant="outlined">Cancel</Button>
        </Box>
    </Box>
}

export default MyProfile;
