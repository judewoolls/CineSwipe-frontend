import "../css/Matches.css";
import { useState, useEffect } from "react";
import MatchesList from "../components/MatchesList.jsx";

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
          `https://api.themoviedb.org/3/movie/${id}?api_key=b6f8cb2da00f3f7c8b9044f5c6e86ceb&language=en-US`
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
