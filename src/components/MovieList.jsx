import { useEffect, useState } from "react";
import "../css/MovieCard.css";
import { API_KEY } from "../../secret.js";
import { motion, useAnimation } from "framer-motion";

// MovieList component to display a list of movies with like/dislike functionality
function MovieList() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const controls = useAnimation();
  const [isDragging, setIsDragging] = useState(false);
  const [shadow, setShadow] = useState("none");

  const handleDrag = (event, info) => {
    const offset = info.offset.x;
    const intensity = Math.min(Math.abs(offset), 20); // Limit intensity to 20

  if (offset > 20) {
    // Swiping right → green glow
    setShadow(`10px 10px 30px rgba(0, 255, 0, ${intensity / 20})`);
  } else if (offset < -20) {
    // Swiping left → red glow
    setShadow(`-10px 10px 30px rgba(255, 0, 0, ${intensity / 20})`);
  } else {
    setShadow("none");
  }
};


  const handleDragEnd = (event, info) => {
    const swipeThreshold = 150;
    if (info.offset.x > swipeThreshold) {
      controls.start({ x: 500, opacity: 0 }).then(() => {
        setShadow("none");
        handleLike();
        controls.set({ x: 0, opacity: 1, rotate: 0 }); // instantly reset for next card
      });
    } else if (info.offset.x < -swipeThreshold) {
      controls.start({ x: -500, opacity: 0 }).then(() => {
        setShadow("none");
        handleNext();
        controls.set({ x: 0, opacity: 1, rotate: 0 }); // instantly reset for next card
      });
    } else {
      controls.start({ x: 0, y: 0, rotate: 0 }); // snap back only if no swipe
      setShadow("none");
    }
    setIsDragging(false);
  };
  
  const handleNext = () => {
    if (currentIndex + 1 >= movies.length) {
      if (!loading) setPage((prev) => prev + 1);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
    setShadow("none");
  };
  

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



  const handleLike = async () => {
    const token = localStorage.getItem("accessToken");
    const movie = movies[currentIndex];
    if (!movie) return; // safety check

    try {
      const response = await fetch("https://cineswipe-backend-7d577091d70c.herokuapp.com/api/liked-movies/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          movie_id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          release_year: movie.release_date
            ? movie.release_date.split("-")[0]
            : null,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          // try refresh before loggin out
          const refreshToken = localStorage.getItem("refreshToken");
          if (refreshToken) {
            const refreshResponse = await fetch(
              "https://cineswipe-backend-7d577091d70c.herokuapp.com/api/token/refresh/",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ refresh: refreshToken }),
              }
            );
            if (refreshResponse.ok) {
              const data = await refreshResponse.json();
              localStorage.setItem("accessToken", data.access);
              return handleLike(); // Retry fetching movie IDs after refreshing token
            }
          }
          // If refresh fails or no refresh token, log out
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/"; // Redirect to login if unauthorized
        }
        throw new Error("Failed to save movie");
      }

      console.log("Movie saved:", movie.title);
    } catch (error) {
      console.error("Error saving movie:", error);
    } finally {
      handleNext();
    }
  };

  // Guard: movies not loaded yet or loading next page
  if (movies.length === 0 || loading) return <p>Loading movies...</p>;
  const movie = movies[currentIndex];
  if (!movie) return <p>Loading more movies...</p>; // waiting for next page

  return (
    <motion.div
      className="swipe-card movie-card"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.5}
      whileTap={{ scale: 1.05 }}
      animate={controls}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      onDrag={handleDrag}
      style={{
        position: "absolute",
        boxShadow: shadow,
        transition: "box-shadow 0.1s ease-out"
      }}

    >
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/150"
        }
        alt={movie.title}
      />
      <h3>{movie.title}</h3>
      <div
        className="buttons"
        style={{ marginTop: "10px", marginBottom: "10px" }}
      >
        <button onClick={handleNext}>❌ Dislike</button>
        <button onClick={handleLike}>❤️ Like</button>
      </div>
    </motion.div>
  );
}

export default MovieList;
