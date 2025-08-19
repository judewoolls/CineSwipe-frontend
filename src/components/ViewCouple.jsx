
function ViewCouple( {couple} ) {


  return (
    <div className="view-couple">
        {couple && couple.user1 ? null : <p>No couple found. Create a Couple</p>}
      <h2>Your Couple</h2>
      <p>Partner 1: {couple.user1}</p>
      <p>Partner 2: {couple.user2 ? couple.user2 : "none" }</p>
      <p>Invite Code: {couple.invite_code}</p>
      <p>{couple.message}</p>
    </div>
  );
}

export default ViewCouple;