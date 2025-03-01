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
import GoogleIcon from "@mui/icons-material/Google";
import Header from "../../components/Header.jsx";

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

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [birthday, setBirthday] = useState("");

    const [errors, setErrors] = useState({});
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

            localStorage.setItem("token", response.data.token);
            setUser(response.data.user);
            setRegisterOpen(false);
            setLoginOpen(false);
            setSnackbar({ open: true, message: isLogin ? "Login successful" : "Registration successful", severity: "success" });
        } catch (error) {
            console.error("Authentication failed:", error.response?.data || error);
        }
    };

    const handleGoogleAuth = () => {
        window.location.href = `${API_URL}/google`;
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setSnackbar({ open: true, message: "Logged out successfully", severity: "info" });
    };

    const handleChange = (_, newValue) => setValue(newValue);

    const [quests, setQuests] = useState([]);

    useEffect(() => {
        const fetchQuests = async () => {
            try {
                const response = await fetch("https://localhost:3001/quest/search", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({}),
                });

                console.log("Response:", response);

                if (!response.ok) {
                    throw new Error(`Failed to fetch quests, status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Response JSON:", data);

                setQuests(data);
            } catch (error) {
                console.error("Error fetching quests:", error);
            }
        };

        fetchQuests();
    }, []);

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
                    <Button
                        variant="outlined"
                        startIcon={<GoogleIcon />}
                        onClick={handleGoogleAuth}
                        sx={{ boxShadow: "0px 0px 15px #6EDCD9" }}
                    >
                        Continue with Google
                    </Button>
                </Box>
            )}
        </Box>

            <Drawer anchor="right" open={registerOpen} onClose={() => setRegisterOpen(false)}>
                <Box sx={{ width: 300, p: 2 }}>
                    <TextField label="Email" fullWidth margin="normal" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} error={!!errors.email} helperText={errors.email} />
                    <TextField label="Password" type="password" fullWidth margin="normal" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} error={!!errors.password} helperText={errors.password} />
                    <TextField label="Nickname" fullWidth margin="normal" value={nickname} onChange={(e) => setNickname(e.target.value)} error={!!errors.nickname} helperText={errors.nickname} />
                    <TextField label="Birthday (YYYY-MM-DD)" fullWidth margin="normal" value={birthday} onChange={(e) => setBirthday(e.target.value)} error={!!errors.birthday} helperText={errors.birthday} />
                    <Button variant="contained" fullWidth onClick={() => handleAuth({ email: registerEmail, password: registerPassword, nickname, birthday }, false)}>Register</Button>
                    <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<GoogleIcon />}
                        onClick={handleGoogleAuth}
                        sx={{ mt: 2, boxShadow: "0px 0px 15px #6EDCD9" }}
                    >
                        Sign Up with Google
                    </Button>
                </Box>
            </Drawer>

            <Drawer anchor="right" open={loginOpen} onClose={() => setLoginOpen(false)}>
                <Box sx={{ width: 300, p: 2 }}>
                    <TextField label="Email" fullWidth margin="normal" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} error={!!errors.email} helperText={errors.email} />
                    <TextField label="Password" type="password" fullWidth margin="normal" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} error={!!errors.password} helperText={errors.password} />
                    <Button variant="contained" fullWidth onClick={() => handleAuth({ email: loginEmail, password: loginPassword }, true)}>Login</Button>
                    <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<GoogleIcon />}
                        onClick={handleGoogleAuth}
                        sx={{ mt: 2, boxShadow: "0px 0px 15px #6EDCD9" }}
                    >
                        Login with Google
                    </Button>
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
                    {quests.length > 0 ? (
                        quests.map((quest) => (
                            <QuestBox key={quest.id} id={quest.id} title={quest.title} questions={quest.questions} time={quest.time} />
                        ))
                    ) : (
                        <p>No quests available</p>
                    )}
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
