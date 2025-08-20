import "./App.css";
import LoginForm from "./pages/LoginForm.jsx";
import HomePage from "./pages/HomePage.jsx";
import NavBar from "./components/NavBar.jsx";
import CouplePage from "./pages/CouplePage.jsx";
import Matches from "./pages/Matches.jsx";
import SignupForm from "./pages/SignupForm.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("accessToken")
  );

  // only display NavBar if user is logged in
  return (
    <main>
      {isLoggedIn && <NavBar setIsLoggedIn={setIsLoggedIn} />}
      <Routes>
        <Route
          path="/signup"
          element={
            !isLoggedIn ? (
              <SignupForm setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/home" />
            ) : (
              <LoginForm setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
        <Route
          path="/home"
          element={
            isLoggedIn ? (
              <HomePage setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/couple"
          element={
            isLoggedIn ? (
              <CouplePage setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/matches"
          element={
            isLoggedIn ? (
              <Matches setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </main>
  );
}

export default App;
