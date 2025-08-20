import "../css/NavBar.css";
import LogoutButton from "./LogoutButton";
import { useState, useEffect } from "react";
import NavFold from "./NavFold";
import { Link } from "react-router-dom";

function NavBar({ setIsLoggedIn }) {
  const [isFolded, setIsFolded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false); // Assuming setIsLoggedIn is passed as a prop
  };
  // Listen for screen resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="navbar">
      <p>CineSwipe</p>
      {isMobile && <NavFold isFolded={isFolded} setIsFolded={setIsFolded} />}

      <ul className={`nav-links ${isMobile && !isFolded ? "show" : "hide"}`}>

        <li><Link to="/home" onClick={() => {setIsFolded(true)}}><button>Home</button></Link></li>
        <li><Link to="/matches" onClick={() => {setIsFolded(true)}}><button>Matches</button></Link></li>
        <li><Link to="/couple" onClick={() => {setIsFolded(true)}}><button>Couple</button></Link></li>
        <li><LogoutButton onLogout={handleLogout} /></li>
      </ul>
    </nav>
  );
}

export default NavBar;
