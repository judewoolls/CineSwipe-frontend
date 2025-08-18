import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginForm from './components/LoginForm.jsx';
import HomePage from './components/HomePage.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));

  return (
    <>
    { !isLoggedIn ? (
      <LoginForm setIsLoggedIn={setIsLoggedIn} />
    ) : (
      <HomePage setIsLoggedIn={setIsLoggedIn}/>
    )
    }
    </>
  )
}

export default App
