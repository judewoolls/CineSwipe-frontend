import CreateCoupleButton from "./CreateCoupleButton";
import { useState, useEffect } from "react";

function ViewCouple( {couple, refreshCouple } ) {


  return (
    <div className="view-couple">
        {couple && couple.user1 ? null : <h2>No couple found. Create a Couple</h2>}
      <h2>Your Couple</h2>
      <p>Partner 1: {couple.user1 ? couple.user1 : "Your are not in a couple"}</p>
      <p>Partner 2: {couple.user2 ? couple.user2 : "none" }</p>
      <p>Invite Code: {couple.invite_code}</p>
       {(couple.error === "No couple data found.") && <CreateCoupleButton  refreshCouple={refreshCouple}/>} 
    </div>
  );
}

export default ViewCouple;