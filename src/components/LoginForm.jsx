import "../css/LoginForm.css";
import { useState } from "react";

function LoginForm({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    // Validate input
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }
    setError("");
    // You can add your login API call here
    try {
        const response = await fetch('http://localhost:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })

        if (!response.ok) {
            throw new Error('Invalid username or password');
        }

        const data = await response.json();
        // Handle successful login, e.g., store token, redirect, etc.

        // For demonstration, we'll just log the tokens
        console.log("Login successful!");
        console.log("Access token:", data.access);
        console.log("Refresh token:", data.refresh);

        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        console.log('Login successful', data);
        setIsLoggedIn(true);
    } catch (error) {
        setError(error.message);
        console.error('Login failed', error);
    }
    setUsername("");
    setPassword("");
    
  }

  return (
    <div className="login-form">
      <h1>CineSwipe</h1>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default LoginForm;
