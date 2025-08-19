function LeaveCoupleButton({ onLeaveCouple }) {
  const handleLeaveClick =  async () => {
    try {
        const response = await fetch('http://localhost:8000/api/leave-couple/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem('accessToken');
                window.location.href = '/'; // Redirect to login if unauthorized
            } else {
                throw new Error('Failed to leave couple');
            }
        }
        console.log('Successfully left couple');
        if (onLeaveCouple) {
            onLeaveCouple(); // Trigger parent component to refresh the couple data
        }
    } catch (error) {
        console.error('Error leaving couple:', error);
        alert('Failed to leave couple: ' + error.message);
    }
  };

  return (
    <button className="leave-couple-button" onClick={handleLeaveClick}>
      Leave Couple
    </button>
  );
}

export default LeaveCoupleButton;