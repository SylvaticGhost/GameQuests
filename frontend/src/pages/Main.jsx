import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Box,
    Button,
    TextField,
    Typography,
    Tabs,
    Tab,
    Drawer,
    Snackbar,
    Alert
} from "@mui/material";
import MyQuests from "../../components/MyQuests.jsx";
import { QuestBox } from "../../components/QuestBox.jsx";
import CreateQuestPage from "./CreateQuest.jsx";

const API_URL = "http://localhost:4000/user";

function TabsPanel({ children, value, index }) {
    return (
        <div role="tabpanel" hidden={value !== index}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

export default function Main() {
    const [value, setValue] = useState(0);
    const [user, setUser] = useState(null);
    const [authOpen, setAuthOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ email: "", password: "" });
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await axios.get(`${API_URL}/me`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setUser(response.data);
                } catch (error) {
                    console.error("Failed to fetch user:", error);
                    localStorage.removeItem("token");
                }
            }
        };
        fetchUser();
    }, []);

    const validate = () => {
        let valid = true;
        let newErrors = { email: "", password: "" };

        if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            newErrors.email = "Invalid email format";
            valid = false;
        }
        if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleAuth = async (isLogin) => {
        if (!validate()) return;
        try {
            const endpoint = isLogin ? "login" : "register";
            const response = await axios.post(`${API_URL}/${endpoint}`, { email, password });

            localStorage.setItem("token", response.data.token);
            setUser(response.data.user);
            setAuthOpen(false);
            setSnackbar({ open: true, message: isLogin ? "Login successful!" : "Registration successful!", severity: "success" });
        } catch (error) {
            console.error("Authentication failed:", error);
            setSnackbar({ open: true, message: error.response?.data?.message || "Authentication failed", severity: "error" });
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setSnackbar({ open: true, message: "Logged out successfully", severity: "info" });
    };

    const handleChange = (_, newValue) => setValue(newValue);
    const closeSnackbar = () => setSnackbar({ ...snackbar, open: false });

    const quests = [
        { id: 1, title: "BanterBrush", questions: 10, people: 2 },
        { id: 2, title: "CreativeSpace", questions: 15, people: 5 },
        { id: 3, title: "ArtHub", questions: 20, people: 3 }
    ];

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
                <Typography variant="h5">Quests</Typography>
                {user ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Typography>{user.email}</Typography>
                        <Button variant="outlined" onClick={handleLogout}>Logout</Button>
                    </Box>
                ) : (
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <Button variant="contained" onClick={() => setAuthOpen(true)}>Sign Up</Button>
                        <Button variant="contained" onClick={() => setAuthOpen(true)}>Login</Button>
                    </Box>
                )}
            </Box>

            <Drawer anchor="right" open={authOpen} onClose={() => setAuthOpen(false)}>
                <Box sx={{ width: 300, p: 2 }}>
                    <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                    <Button variant="contained" fullWidth onClick={() => handleAuth(false)}>Register</Button>
                    <Button variant="contained" fullWidth onClick={() => handleAuth(true)}>Login</Button>
                </Box>
            </Drawer>

            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="EXPLORE" />
                    <Tab label="My quests" />
                    <Tab label="Create quest" />
                </Tabs>
            </Box>
            <TabsPanel value={value} index={0}>
                <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, mt: 4 }}>
                    {quests.map((quest) => (
                        <QuestBox key={quest.id} id={quest.id} title={quest.title} questions={quest.questions} people={quest.people} />
                    ))}
                </Box>
            </TabsPanel>
            <TabsPanel value={value} index={1}>
                <MyQuests />
            </TabsPanel>
            <TabsPanel value={value} index={2}>
                <CreateQuestPage />
            </TabsPanel>

            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={closeSnackbar}>
                <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
            </Snackbar>
        </Box>
    );
}
