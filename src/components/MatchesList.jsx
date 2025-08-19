import { useState, useEffect } from "react";

function MatchesList({ matches }) {

  return (
    <div>
        <ul className="matches-grid">
          {matches.map((match) => (
            <li key={match.movie_id} className="match-item">
              <p>{match.movie_id}</p>
              <p>{match.description}</p>
            </li>
          ))}
        </ul>
    </div>
  );
}

export default MatchesList;