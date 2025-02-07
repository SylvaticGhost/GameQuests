import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Drawer, TextField } from "@mui/material";

export default function MyQuests() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    let isAuthenticated = false

    const handleCreateClick = () => {
        if (isAuthenticated) {
            navigate("/create");
        } else {
            setOpen(true);
        }
    };

    return (
        <Box>
            <Button variant="contained" onClick={handleCreateClick}>
                Create
            </Button>
            <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
                <Box sx={{ width: 300, p: 2 }}>
                    <TextField label="Email" fullWidth margin="normal" />
                    <TextField label="Password" type="password" fullWidth margin="normal" />
                    <Button variant="contained" fullWidth>
                        Login / Register
                    </Button>
                </Box>
            </Drawer>
        </Box>
    );
}
