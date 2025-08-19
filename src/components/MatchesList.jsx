import { useState, useEffect } from "react";

function MatchesList({ matches }) {

  return (
    <div className="matches-list">
      {matches.length > 0 ? (
        <ul>
          {matches.map((match) => (
            <li key={match.id}>
              <p>{match.name}</p>
              <p>{match.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No matches found.</p>
      )}
    </div>
  );
}

export default MatchesList;