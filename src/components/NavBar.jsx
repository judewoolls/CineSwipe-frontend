import "../css/NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <p>CineSwipe</p>
      <ul>
        <li><a href="/home">Home</a></li>
        <li><a href="#">Matches</a></li>
        <li><a href="#">Profile</a></li>
        <li><a href="/logout">Logout</a></li>
      </ul>
    </nav>
  );
}

export default NavBar;