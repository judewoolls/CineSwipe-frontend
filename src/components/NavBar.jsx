import "../css/NavBar.css";
import LogoutButton from "./LogoutButton";

function NavBar({ setIsLoggedIn }) {
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false); // Assuming setIsLoggedIn is passed as a prop
    
};
  return (
    <nav className="navbar">
      <p>CineSwipe</p>
      <ul>
        <li><a href="/home"><button>Home</button></a></li>
        <li><a href="/matches"><button>Matches</button></a></li>
        <li><a href="/couple"><button>Couple</button></a></li>
        <li><LogoutButton onLogout={handleLogout}/></li>
      </ul>
    </nav>
  );
}

export default NavBar;