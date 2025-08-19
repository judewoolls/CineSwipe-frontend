import '../css/JoinCoupleForm.css';

function JoinCoupleForm() {
    return (<div className="join-couple-form">
        <form action="#" method="post">
            <div className="form-group"></div>
                <label htmlFor="inviteCode">Enter Invite Code</label>
                <input type="text" name="inviteCode" id="inviteCode" placeholder="e.g ABCDEFGHIJ" />
        </form>
        <button type="submit" className="btn btn-primary">Join Couple</button>
    </div>)
}

export default JoinCoupleForm;