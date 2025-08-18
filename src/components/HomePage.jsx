import { useState, useEffect } from "react";
import LogoutButton from "./LogoutButton";
import MovieList from "./MovieList";
import { useNavigate } from "react-router-dom";
import "../css/homepage.css";

function HomePage({ setIsLoggedIn }) {
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
      <div className="home-page-content">
        <p>Get Swiping!</p>
        <div className="movie-list">
            <MovieList />
        </div>
      </div>
        <LogoutButton onLogout={handleLogout} />
    </div>
  );
}

export default HomePage;