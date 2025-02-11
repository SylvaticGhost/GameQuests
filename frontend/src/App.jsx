import { useState } from 'react';
import './App.css';
import Main from "./pages/Main.jsx";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import QuestView from "./pages/QuestView.jsx";
import QuestProcess from "./pages/QuestProcess.jsx";

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/quest" element={<QuestView />} />
              <Route path="/quest_complete" element={<QuestProcess />} />
          </Routes>
      </Router>
  );
}

export default App;
