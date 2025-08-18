export async function fetchWithToken(url, options = {}) {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
  
    if (!options.headers) options.headers = {};
    options.headers["Authorization"] = `Bearer ${accessToken}`;
  
    let response = await fetch(url, options);
  
    // If access token expired, try to refresh
    if (response.status === 401 && refreshToken) {
      const refreshResponse = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });
  
      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        localStorage.setItem("access_token", data.access);
        options.headers["Authorization"] = `Bearer ${data.access}`;
        response = await fetch(url, options); // retry original request
      } else {
        // refresh token also expired
        throw new Error("Session expired, please log in again");
      }
    }
  
    return response;
  }
  
// Usage example in a component
//   import { fetchWithToken } from "./api";

// const data = await fetchWithToken("http://127.0.0.1:8000/api/profile/");
