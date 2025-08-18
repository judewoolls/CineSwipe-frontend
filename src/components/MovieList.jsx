import { useEffect, useState } from "react";
import "../css/MovieCard.css";
import { API_KEY } from "../../secret.js";

// MovieList component to display a list of movies with like/dislike functionality
function MovieList() {
    const [movies, setMovies] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
  
    // Fetch movies for a given page
    const fetchMovies = async (pageNum) => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${pageNum}`
        );
        const data = await response.json();
        setMovies((prev) => [...prev, ...data.results]);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      } finally {
        setLoading(false);
      }
    };
  
    // fetch on initial load and when page changes
    useEffect(() => {
      fetchMovies(page);
    }, [page]);
  
    const handleNext = () => {
      if (currentIndex + 1 >= movies.length) {
        // if we have more pages, fetch the next one
        setPage((prev) => prev + 1);
      } else {
        // move to next movie
        setCurrentIndex((prev) => prev + 1);
      }
    };
  
    // Guard: movies not loaded yet
    if (movies.length === 0) return <p>Loading movies...</p>;
    const movie = movies[currentIndex];
    if (!movie) return <p>Loading more movies...</p>; // waiting for next page
  
    return (
      <div className="movie-card">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/150"
          }
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
