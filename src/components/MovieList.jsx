import { useEffect, useState } from "react";
import "../css/MovieCard.css";
import { API_KEY } from "../../secret.js";

const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;


function MovieList() {
    const [movies, setMovies] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      async function fetchMovies() {
        const response = await fetch(API_URL);
        const data = await response.json();
        setMovies(data.results);
      }
      fetchMovies();
    }, []);
  
    // Handles moving to the next movie
    const handleNext = () => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    };
  
    if (movies.length === 0) return <p>Loading movies...</p>;
    if (currentIndex >= movies.length) return <p>No more movies!</p>;
  
    const movie = movies[currentIndex];
  
    return (
      <div className="movie-card">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <h3>{movie.title}</h3>
  
        <div className="buttons">
          <button onClick={handleNext}>❌ Dislike</button>
          <button onClick={handleNext}>❤️ Like</button>
        </div>
      </div>
    );
  }

export default MovieList;
