import "../css/NavBar.css";
import LogoutButton from "./LogoutButton";
import { useState, useEffect } from "react";
import NavFold from "./NavFold";

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

        <li><a href="/home"><button>Home</button></a></li>
        <li><a href="/matches"><button>Matches</button></a></li>
        <li><a href="/couple"><button>Couple</button></a></li>
        <li><LogoutButton onLogout={handleLogout} /></li>
      </ul>
    </nav>
  );
}

export default NavBar;
