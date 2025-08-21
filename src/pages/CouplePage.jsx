import React from "react";
import { useEffect, useState } from "react";
import CreateCoupleButton from "../components/CreateCoupleButton";
import ViewCouple from "../components/ViewCouple";

function CouplePage() {
  const [coupleData, setCoupleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchCoupleData() {
    try {
      const response = await fetch(`http://localhost:8000/api/couples/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (!response.ok) {
        if (response.status === 401) {
          // try refresh before loggin out
          const refreshToken = localStorage.getItem("refreshToken");
          if (refreshToken) {
            const refreshResponse = await fetch(
              "http://localhost:8000/api/token/refresh/",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ refresh: refreshToken }),
              }
            );
            if (refreshResponse.ok) {
              const data = await refreshResponse.json();
              localStorage.setItem("accessToken", data.access);
              return fetchMovieIds(); // Retry fetching movie IDs after refreshing token
            }
          }
          // If refresh fails or no refresh token, log out
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("accessToken");
          window.location.href = "/"; // Redirect to login if unauthorized
        } else if (response.status === 404) {
          setCoupleData(null); // Set coupleData to null if not found
        } else {
          throw new Error("Network response was not ok");
        }
      }
      const data = await response.json();
      setCoupleData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchCoupleData();
  }, []);

  return (
    <div>
      <h1>Couple Page</h1>
      <p>This is the couple page content.</p>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {coupleData && (
        <ViewCouple couple={coupleData} refreshCouple={fetchCoupleData} />
      )}
      {!coupleData && !loading && !error && <p>No couple data available.</p>}
    </div>
  );
}

export default CouplePage;
