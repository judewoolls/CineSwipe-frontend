import "../css/Matches.css";
import { useState, useEffect } from "react";
import MatchesList from "../components/MatchesList.jsx";
import { API_KEY } from "../../secret.js";

function Matches() {
  const [matches, setMatches] = useState([]);
  const [movieIds, setMovieIds] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMovieIds = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/matches/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (!response.ok) {
        if (response.status === 401) {
          // try refresh before loggin out
          const refreshToken = localStorage.getItem("refreshToken");
          if (refreshToken) {
            const refreshResponse = await fetch("http://localhost:8000/api/token/refresh/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ refresh: refreshToken }),
            });
            if (refreshResponse.ok) {
              const data = await refreshResponse.json();
              localStorage.setItem("accessToken", data.access);
              return fetchMovieIds(); // Retry fetching movie IDs after refreshing token
            }
          }

          // If refresh fails or no refresh token, log out
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          setError("Unauthorized. Please log in again.");
          setLoading(false);
          window.location.href = "/"; // Redirect to login if unauthorized
        }
        throw new Error("Failed to fetch matches");
      }
      const data = await response.json();
      setMovieIds(data.map((match) => match.movie_id));
    } catch (error) {
      console.error("Error fetching matches:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  // Fetch movie data from TMDb
  const fetchMovies = async (ids) => {
    if (ids.length === 0) {
      setMatches([]);
      setLoading(false);
      return;
    }

    try {
      const moviePromises = ids.map((id) =>
        fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        ).then((res) => {
          if (!res.ok) throw new Error(`Failed to fetch movie ${id}`);
          return res.json();
        })
      );

      const allMovies = await Promise.all(moviePromises);
      setMatches(allMovies);
    } catch (err) {
      console.error("Error fetching movie details:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieIds();
  }, []);

  useEffect(() => {
    if (movieIds.length > 0) {
      fetchMovies(movieIds);
    } else {
      setLoading(false);
    }
  }, [movieIds]);

  return (
    <div className="matches-page">
      <h1>Matches</h1>
      <p id="matches-intro-text">
        Here you can view your Matches with your partner in your couple
      </p>
      {loading && <p>Loading matches...</p>}
      {!loading && !error && matches.length === 0 && (
        <p>Please swipe on movies to find matches.</p>
      )}
      {error && <p className="error">{error}</p>}
      <div className="matches-list">
        <MatchesList matches={matches} />
      </div>
    </div>
  );
}

export default Matches;
