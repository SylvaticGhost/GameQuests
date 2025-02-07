import { useState } from 'react';
import RegisterForm from './pages/RegisterForm';
import './App.css';
import Main from "./pages/Main.jsx";
import {BrowserRouter} from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
        <BrowserRouter>
            <Main />
        </BrowserRouter>
    </>
  );
}

export default App;
