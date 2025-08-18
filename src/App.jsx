import './App.css'
import LoginForm from './components/LoginForm.jsx';
import HomePage from './components/HomePage.jsx';
import NavBar from './components/NavBar.jsx';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));

  // only display NavBar if user is logged in
  return (
    <main>
      {isLoggedIn && <NavBar setIsLoggedIn={setIsLoggedIn} />} 
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
    </main>
  );
}


export default App;
