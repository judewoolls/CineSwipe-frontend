import "../css/Matches.css";

function Matches() {
    return (
        <div className="matches-page">
        <h1>Matches</h1>
        <p id="matches-intro-text">Here you can view your Matches with your partner in your couple</p>
        <div className="matches-grid">
            {/* insert the match list component */}
        </div>
        </div>
    );
}

export default Matches;