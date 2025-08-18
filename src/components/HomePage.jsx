import { useState } from "react";
import LogoutButton from "./LogoutButton";

function HomePage({ setIsLoggedIn }) {
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsLoggedIn(false);
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