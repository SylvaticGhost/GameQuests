import { useState } from 'react';
import RegisterForm from './pages/RegisterForm';
import CreateQuest from './pages/CreateQuest';
import './App.css';
import Main from "./pages/Main.jsx";
import {BrowserRouter} from "react-router-dom";
import MyHistory from "./pages/MyHistory.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import QuestCard from "../components/QuestCard.jsx";
import Achievements from "./pages/Achievements.jsx";
import {ThemeProvider} from "@mui/material";
import theme from "../components/styled_components/CustomTheme.jsx";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
            {/*<Main/>
             <CreateQuest />*/}
            <MyProfile/>
            </ThemeProvider>
        </BrowserRouter>
    </>
  );
}

export default App;
