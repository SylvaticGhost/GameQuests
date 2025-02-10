import { useState } from 'react';
import RegisterForm from './pages/RegisterForm';
import CreateQuest from './pages/CreateQuest';
import './App.css';
import Main from "./pages/Main.jsx";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import QuestView from "./pages/QuestView.jsx";

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/quest" element={<QuestView />} />
          </Routes>
      </Router>
  );
}

export default App;
