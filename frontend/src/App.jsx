import { useState } from 'react';
import RegisterForm from './pages/RegisterForm';
import CreateQuest from './pages/CreateQuest';
import './App.css';
import Main from "./pages/Main.jsx";
import {BrowserRouter} from "react-router-dom";
import MyHistory from "./pages/MyHistory.jsx";
import MyProfile from "./pages/MyProfile.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>

        <BrowserRouter>
            <Main />
            <CreateQuest />
        </BrowserRouter>
    </>
  );
}

export default App;
