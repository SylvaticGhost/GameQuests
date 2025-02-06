import { useState } from 'react';
import RegisterForm from './pages/RegisterForm';
import CreateQuest from './pages/CreateQuest';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
       <CreateQuest />
    </>
  );
}

export default App;
