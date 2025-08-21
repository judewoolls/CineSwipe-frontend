import "../css/JoinCoupleForm.css";
import { useState, useEffect } from "react";

function JoinCoupleForm({ refreshCouple }) {
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    // Validate input
    if (!inviteCode) {
      setError("Invite code is required");
      return;
    }
    setError("");
    // call api to join couple
    try {
      const response = await fetch("http://localhost:8000/api/join-couple/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ invite_code: inviteCode }),
      });
      if (!response.ok) {
        if (response.status === 400) {
          setError("Invalid invite code");
        } else if (response.status === 401) {
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
              return submit(); // Retry joining couple after refreshing token
            }
          }
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/"; // Redirect to login if unauthorized
        } else {
          throw new Error("Network response was not ok");
        }
      } else {
        const data = await response.json();
        console.log("Joined couple successfully:", data);
        // Trigger parent component to refresh the couple data
        if (refreshCouple) {
          refreshCouple();
        }
      }
    } catch (error) {
      setError(error.message);
      console.error("Error joining couple:", error);
    } finally {
      setInviteCode(""); // Reset invite code input
    }
  }

  return (
    <div className="join-couple-form">
      <form onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="inviteCode">Enter Invite Code</label>
          <input
            type="text"
            name="inviteCode"
            id="inviteCode"
            placeholder="e.g ABCDEFGHIJ"
            onChange={(e) => setInviteCode(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Join Couple
        </button>
      </form>
    </div>
  );
}

export default JoinCoupleForm;
