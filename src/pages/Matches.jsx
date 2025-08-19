import "../css/Matches.css";
import { useState, useEffect } from "react";
import MatchesList from "../components/MatchesList.jsx";

function Matches() {
    const [matches, setMatches] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchMatches = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/matches/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch matches");
            }
            const data = await response.json();
            setMatches(data);
        } catch (error) {
            console.error("Error fetching matches:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchMatches();
      }, [fetchMatches]);

    return (
        <div className="matches-page">
        <h1>Matches</h1>
        <p id="matches-intro-text">Here you can view your Matches with your partner in your couple</p>
        <div className="matches-grid">
            {loading && <p>Loading matches...</p>}
            {!loading && !error && matches.length === 0 && <p>Please swipe on movies to find matches.</p>}
            {error && <p className="error">{error}</p>}
            <MatchesList matches={matches} />
        </div>
        </div>
    );
}

export default Matches;