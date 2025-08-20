function NavFold({ isFolded, setIsFolded }) {
    return (
        <button className="nav-fold-button" onClick={() => setIsFolded(!isFolded)}>
            <span>{isFolded ? "☰" : "✕"}</span>
        </button>
    );
}

  
export default NavFold;