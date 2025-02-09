import React, {useState} from 'react'
import Header from "../../components/Header.jsx";
import {Avatar, Box, Divider, Button, Typography, TextField} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

function MyProfile(){
    const [value, setValue] = useState(0);

    return <Box sx={{width: '100%'}}>
        <Header value={value} setValue={setValue} />
        <Box sx={{
            display: "flex",
            padding: "24px 0px",
            flexDirection: "column",
            alignItems: "center",
            gap: 3.5
        }}
        >
        <Typography variant="h3" fontWeight="bold">Profile</Typography>
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            gap: 6
        }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 3
                }}
            >
                <Avatar sx={{ width: 90, height: 90 }} />
                <Button variant="outlined" startIcon={<EditIcon />}>Change avatar</Button>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 3
                }}
            >
                <TextField label="Username"></TextField>
                <TextField label="E-mail"></TextField>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 3.5
                }}
            >
                <Typography variant="h6">Change Password</Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: 3
                    }}
                >
                    <TextField label="Your current password"></TextField>
                    <TextField label="Your new password"></TextField>
                    <TextField label="Confirm the new password"></TextField>
                </Box>
            </Box>
        </Box>
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                gap: 3
            }}
        >
            <Button variant="contained">Save changes</Button>
            <Button variant="outlined">Cancel</Button>
        </Box>
    </Box>
    </Box>
}

export default MyProfile;
