import { useState } from "react";
import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";

function TopIcons() {
  const [showMenu, setShowMenu] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const name = localStorage.getItem("userName")?.trim() || "User";
  const email = localStorage.getItem("userEmail")?.trim() || "";
  const firstLetter = name[0]?.toUpperCase() || "U";

  return (
    <div className="top-icons">
      <div className="profile-wrapper">
        <div
          className="user-avatar"
          onClick={() => setShowMenu(!showMenu)}
        >
          {firstLetter}
        </div>

        {showMenu && (
          <div className="profile-menu">
            <div className="profile-info">
              <strong>{name}</strong>
              <span className="profile-email">{email}</span>
            </div>

            <button type="button">
              <FiUser className="menu-icon" /> My Profile
            </button>

            <button type="button">
              <FiSettings className="menu-icon" /> Settings
            </button>

            <button
              type="button"
              onClick={() => {
                setShowMenu(false);
                setShowConfirm(true); // Triggers custom logout confirmation popup
              }}
            >
              <FiLogOut className="menu-icon" /> Logout
            </button>
          </div>
        )}
      </div>

      {showConfirm && (
        <div className="custom-alert-backdrop" onClick={() => setShowConfirm(false)}>
          <div className="custom-alert-card" onClick={(e) => e.stopPropagation()}>
            <div className="alert-icon-container warning">
              ⚠️
            </div>
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to log out of AI Assistant Pro?</p>
            
            <div className="confirm-buttons-group">
              <button 
                type="button" 
                className="confirm-cancel-btn"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="confirm-action-btn"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/"; 
                }}
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TopIcons;