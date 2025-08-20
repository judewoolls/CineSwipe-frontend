import { useState, useEffect } from "react";
import LogoutButton from "../components/LogoutButton";
import MovieList from "../components/MovieList";
import { useNavigate } from "react-router-dom";
import "../css/homepage.css";

function HomePage({ setIsLoggedIn }) {


  return (
    <div className="home-page">
      <h1>Welcome to Cine<span>Swipe!</span></h1>
      <p>Get Swiping!</p>
      <div className="home-page-content">
        <div className="movie-list">
            <MovieList />
        </div>
      </div>
    </div>
  );
}

export default HomePage;