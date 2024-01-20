import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo2 from './images/logo2.svg';
import './App.css';

function App() {
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setRedirect(true);
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, []); 

  const handleClick = () => {
    setRedirect(true);
  };

  useEffect(() => {
    if (redirect) {
      navigate('/home');
    }
  }, [redirect, navigate]);

  return (
    <div className="App" onClick={handleClick}>
      <header className="App-header">
        <img src={logo2} className="App-logo" alt="logo" />
        <h1>
          A Slice of Pi
        </h1>
        <p>Click anywhere to continue</p>
      </header>
    </div>
  );
}

export default App;
