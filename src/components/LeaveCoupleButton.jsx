function LeaveCoupleButton({ onLeaveCouple }) {
  const confirmLeaveCouple = () => {
    return window.confirm("Are you sure you want to leave the couple?");
  };
  const handleLeaveClick = async () => {
    if (!confirmLeaveCouple()) {
      return; // exit if the user doesnt confirm
    }
    try {
      const response = await fetch("https://cineswipe-backend-7d577091d70c.herokuapp.com/api/leave-couple/", {
        method: "DELETE",
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
              return handleLeaveClick(); // Retry leaving couple after refreshing token
            }
          }
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/"; // Redirect to login if unauthorized
        } else {
          throw new Error("Failed to leave couple");
        }
      }
      console.log("Successfully left couple");
      if (onLeaveCouple) {
        onLeaveCouple(); // Trigger parent component to refresh the couple data
      }
    } catch (error) {
      console.error("Error leaving couple:", error);
      alert("Failed to leave couple: " + error.message);
    }
  };

  return (
    <button className="leave-couple-button" onClick={handleLeaveClick}>
      Leave Couple
    </button>
  );
}

export default LeaveCoupleButton;
