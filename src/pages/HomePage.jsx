import { useState, useEffect } from "react";
import LogoutButton from "../components/LogoutButton";
import MovieList from "../components/MovieList";
import { useNavigate } from "react-router-dom";
import "../css/homepage.css";

function HomePage({ setIsLoggedIn }) {
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsLoggedIn(false); // Assuming setIsLoggedIn is passed as a prop
        
    };

  return (
    <div className="home-page">
      <h1>Welcome to Cine<span>Swipe!</span></h1>
      <p>This is the home page content</p>
      <div className="home-page-content">
        <div className="movie-list">
            <MovieList />
        </div>
      </div>
        <LogoutButton onLogout={handleLogout} />
    </div>
  );
}

export default HomePage;