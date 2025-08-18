import './App.css'
import LoginForm from './components/LoginForm.jsx';
import HomePage from './components/HomePage.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const isLoggedIn = !!localStorage.getItem('accessToken');

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={isLoggedIn ? <Navigate to="/home" /> : <LoginForm />} 
        />
        <Route 
          path="/home" 
          element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}

export default App
