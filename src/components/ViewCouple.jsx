import CreateCoupleButton from "./CreateCoupleButton";
import JoinCoupleForm from "./JoinCoupleForm";
import { useState, useEffect } from "react";
import "../css/ViewCouple.css";

function ViewCouple({ couple, refreshCouple }) {
  return (
    <div className="view-couple">
      <div className="couple-details">
        <h2>Your Couple Details</h2>
        <p>Partner 1: {couple.user1 ? couple.user1 : "none"}</p>
        <p>Partner 2: {couple.user2 ? couple.user2 : "none"}</p>
        <p>Invite Code: {couple.invite_code ? couple.invite_code : "none"}</p>
        {couple && couple.user1 ? null : <p>You are not in a couple</p>}
      </div>
      {couple && couple.user1 ? null : <p>You can Create or Join a couple here.</p>}
      <div className="join-couple-form-container">
      {couple.error === "No couple data found." && (
        <JoinCoupleForm refreshCouple={refreshCouple} />
      )}
      </div>
      {couple.error === "No couple data found." && (
        <CreateCoupleButton refreshCouple={refreshCouple} />
      )}
    </div>
  );
}

export default ViewCouple;
