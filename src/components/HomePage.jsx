import { useState } from "react";
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";

function HomePage({ setIsLoggedIn }) {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsLoggedIn(false); // Assuming setIsLoggedIn is passed as a prop
        
    };
  const [message, setMessage] = useState("Welcome to CineSwipe!");

  return (
    <div className="home-page">
      <h1>{message}</h1>
      <p>This is the home page content</p>
        <LogoutButton onLogout={handleLogout} />
    </div>
  );
}

export default HomePage;