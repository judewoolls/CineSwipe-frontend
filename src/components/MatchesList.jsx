import { useState, useEffect } from "react";

function MatchesList({ matches }) {
  return (
    <div>
      <ul className="matches-grid">
        {matches.map((match) => (
          <li key={match.id} className="match-item">
            <img
              src={
                match.poster_path
                  ? `https://image.tmdb.org/t/p/w500${match.poster_path}`
                  : "https://via.placeholder.com/150"
              }
              alt={match.title}
            />
            <p><strong>{match.title}</strong> ({match.release_date.split("-")[0]})</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MatchesList;
