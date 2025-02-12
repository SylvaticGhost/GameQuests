import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Box,
    Button,
    TextField,
    Typography,
    Drawer,
    Snackbar,
    Alert, Tab, Tabs
} from "@mui/material";
import MyQuests from "../../components/MyQuests.jsx";
import {QuestBox} from "../../components/QuestBox.jsx";
import CreateQuestPage from "./CreateQuest.jsx";

const API_URL = "http://localhost:3001/user";


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
    const [registerOpen, setRegisterOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);

    // Состояния для логина
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    // Состояния для регистрации
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [birthday, setBirthday] = useState("");

    const [errors, setErrors] = useState({});
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

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

    useEffect(() => {
        fetchUser();
    }, []);


    const validate = (data, isLogin) => {
        let valid = true;
        let newErrors = {};

        if (!data.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            newErrors.email = "Invalid email format";
            valid = false;
        }
        if (data.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
            valid = false;
        }
        if (!isLogin) {
            if (!data.nickname) {
                newErrors.nickname = "Nickname is required";
                valid = false;
            }
            if (!data.birthday.match(/^\d{4}-\d{2}-\d{2}$/)) {
                newErrors.birthday = "Invalid birthday format (YYYY-MM-DD)";
                valid = false;
            }
        }
        setErrors(newErrors);
        return valid;
    };

    const handleAuth = async (data, isLogin) => {
        if (!validate(data, isLogin)) return;
        try {
            const endpoint = isLogin ? "login" : "register";
            const method = isLogin ? "PUT" : "POST";

            const response = await axios({
                method,
                url: `${API_URL}/${endpoint}`,
                data
            });

            localStorage.setItem("token", response.data.value);
            await fetchUser();

            setRegisterOpen(false);
            setLoginOpen(false);
            setSnackbar({ open: true, message: isLogin ? "Login successful" : "Registration successful", severity: "success" });
        } catch (error) {
            console.error("Authentication failed:", error.response?.data || error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setSnackbar({ open: true, message: "Logged out successfully", severity: "info" });
    };

    const handleChange = (_, newValue) => setValue(newValue);


    const quests = [
        { id: 1, title: "BanterBrush", questions: 10, time: 2 },
        { id: 2, title: "CreativeSpace", questions: 15, time: 5 },
        { id: 3, title: "ArtHub", questions: 20, time: 3 }
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
                        <Button variant="contained" onClick={() => setRegisterOpen(true)}>Sign Up</Button>
                        <Button variant="contained" onClick={() => setLoginOpen(true)}>Login</Button>
                    </Box>
                )}
            </Box>

            {/* Регистрация */}
            <Drawer anchor="right" open={registerOpen} onClose={() => setRegisterOpen(false)}>
                <Box sx={{ width: 300, p: 2 }}>
                    <TextField label="Email" fullWidth margin="normal" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} error={!!errors.email} helperText={errors.email} />
                    <TextField label="Password" type="password" fullWidth margin="normal" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} error={!!errors.password} helperText={errors.password} />
                    <TextField label="Nickname" fullWidth margin="normal" value={nickname} onChange={(e) => setNickname(e.target.value)} error={!!errors.nickname} helperText={errors.nickname} />
                    <TextField label="Birthday (YYYY-MM-DD)" fullWidth margin="normal" value={birthday} onChange={(e) => setBirthday(e.target.value)} error={!!errors.birthday} helperText={errors.birthday} />
                    <Button variant="contained" fullWidth onClick={() => handleAuth({ email: registerEmail, password: registerPassword, nickname, birthday }, false)}>Register</Button>
                </Box>
            </Drawer>

            {/* Логин */}
            <Drawer anchor="right" open={loginOpen} onClose={() => setLoginOpen(false)}>
                <Box sx={{ width: 300, p: 2 }}>
                    <TextField label="Email" fullWidth margin="normal" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} error={!!errors.email} helperText={errors.email} />
                    <TextField label="Password" type="password" fullWidth margin="normal" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} error={!!errors.password} helperText={errors.password} />
                    <Button variant="contained" fullWidth onClick={() => handleAuth({ email: loginEmail, password: loginPassword }, true)}>Login</Button>
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
                        <QuestBox key={quest.id} id={quest.id} title={quest.title} questions={quest.questions} time={quest.time} />
                    ))}
                </Box>
            </TabsPanel>
            <TabsPanel value={value} index={1}>
                <MyQuests />
            </TabsPanel>
            <TabsPanel value={value} index={2}>
                <CreateQuestPage />
            </TabsPanel>
            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
            </Snackbar>
        </Box>
    );
}
