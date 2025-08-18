import './App.css'
import LoginForm from './components/LoginForm.jsx';
import HomePage from './components/HomePage.jsx';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));

  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <Navigate to="/home" /> : <LoginForm setIsLoggedIn={setIsLoggedIn} />}
      />
      <Route
        path="/home"
        element={isLoggedIn ? <HomePage setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;
