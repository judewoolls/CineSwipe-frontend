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
      if (loading) return; // Prevent multiple fetches
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${pageNum}`
        );
        const data = await response.json();
        setMovies((prev) => [...prev, ...data.results]);
        setCurrentIndex(currentIndex + 1); // Reset index when new movies are fetched
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
        // Automatically fetch the next page if at the end of the current list
        if (!loading) {
          setPage((prev) => prev + 1);
        }
      } else {
        // Move to the next movie
        setCurrentIndex((prev) => prev + 1);
      }
    };
  
    // Guard: movies not loaded yet or loading next page
    if (movies.length === 0 || loading) {
        console.log("Loading movies...");
        if (loading) {
          console.log("Fetching more movies...");
        }

        return <p>Loading movies...</p>;
    }
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
