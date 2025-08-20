// components/LogoutButton.jsx
export default function LogoutButton({ onLogout }) {
    return (
      <button onClick={onLogout} className="logout-button">
        Log Out
      </button>
    );
  }
  