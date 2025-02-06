import { useState } from 'react';
import RegisterForm from './pages/RegisterForm';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <RegisterForm />
    </>
  );
}

export default App;
