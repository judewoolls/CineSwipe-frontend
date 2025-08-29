import { useState } from "react";
import "../css/CreateCoupleButton.css";

function CreateCoupleButton({ refreshCouple }) {
  async function createCouple() {
    try {
      const response = await fetch("https://cineswipe-backend-7d577091d70c.herokuapp.com/api/create-couple/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          /* data to create couple */
        }),
      });
      if (!response.ok) {
        // try refresh before loggin out
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          const refreshResponse = await fetch(
            "https://cineswipe-backend-7d577091d70c.herokuapp.com/api/token/refresh/",
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
            return createCouple(); // Retry creating couple after refreshing token
          }
        }
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Couple created successfully:", data);

      //trigger parent component to refresh the couple list
      if (refreshCouple) {
        refreshCouple();
      }
    } catch (error) {
      console.error("Error creating couple:", error);
    }
  }
  return (
    <button className="create-couple-button" onClick={createCouple}>
      Create Couple
    </button>
  );
}

export default CreateCoupleButton;
