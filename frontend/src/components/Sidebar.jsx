import { useState, useEffect } from "react";
import {
  FaRobot,
  FaBolt,
  FaTrashAlt,
  FaCompass
} from "react-icons/fa";
import { FiSearch, FiX } from "react-icons/fi";

function Sidebar({
  isOpen,
  toggleSidebar,
  history = [],
  onNewChat,
  onClearHistory,
  onLoadHistoryItem
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const userName = localStorage.getItem("userName") || "User";
  const firstName = userName.split(" ")[0];

  // Securely filter history items with safety checks on null properties
  const filteredHistory = history.filter(item => {
    if (!item) return false;
    const promptText = item.prompt ? String(item.prompt).toLowerCase() : "";
    const responseText = item.response ? String(item.response).toLowerCase() : "";
    const query = searchTerm.toLowerCase();
    return promptText.includes(query) || responseText.includes(query);
  });

  // Listen to global ⌘K or Ctrl+K hotkeys to toggle the search popup modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      {/* FIXED TOP SECTION */}
      <div className="sidebar-fixed-top">
        <div className="sidebar-top">
          <div className="logo-wrapper">
            <div className="logo-circle">
              <FaRobot />
            </div>
            <h2 className="logo-title">
              AI Assistant Pro
            </h2>
          </div>

          <button
            className="collapse-icon-btn"
            onClick={toggleSidebar}
            aria-label="Close Sidebar"
            type="button"
          >
            ❮❮
          </button>
        </div>

        {/* New Chat Button */}
        <button
          className="new-chat-btn"
          type="button"
          onClick={onNewChat}
        >
          + New Chat
        </button>

        {/* Interactive Search Modal Trigger Button */}
        <button
          type="button"
          className="sidebar-search-trigger"
          onClick={() => setIsSearchOpen(true)}
        >
          <FiSearch className="search-icon" />
          <span>Search chats...</span>
          <kbd className="shortcut-kbd">⌘K</kbd>
        </button>
      </div>

      {/* INDEPENDENT SCROLLABLE BODY */}
      <div className="sidebar-scrollable-content">
        {/* Dynamic personalized history list */}
        <div className="chat-history-sidebar">
          <span className="history-section-title">Recent Conversations</span>
          {history.length === 0 ? (
            <p className="no-history-text">No chats found</p>
          ) : (
            <div className="history-items-scroll">
              {history.slice(0, 8).map((item) => (
                <button
                  key={item.id || item.timestamp}
                  className="sidebar-history-item-btn"
                  type="button"
                  onClick={() => {
                    if (onLoadHistoryItem) {
                      onLoadHistoryItem(item);
                    }
                    if (window.innerWidth <= 768) {
                      toggleSidebar();
                    }
                  }}
                >
                  <span className="sidebar-history-icon">💬</span>
                  <span className="sidebar-history-text">
                    <strong className="user-vice-prefix">{firstName}'s Chat:</strong> {item.prompt || "Empty Prompt"}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Llama Model Identifier Card */}
        <div className="llama-card">
          <div className="llama-icon">✦</div>
          <div>
            <h3>Powered by Llama 3</h3>
            <p>Fast • Smart • Powerful</p>
          </div>
        </div>

        {/* Select AI Tone drop-down */}
        <div className="form-group">
          <label>
            <FaCompass />
            Select AI Tone
          </label>
          <select>
            <option>Professional</option>
            <option>Software Architect</option>
            <option>Senior Developer</option>
            <option>Tech Lead</option>
          </select>
        </div>

        <div className="divider"></div>

        {/* Templates drop-down */}
        <div className="form-group">
          <label>
            <FaBolt />
            Prompt Templates
          </label>
          <span className="sub-label">Choose Template</span>
          <select>
            <option>None</option>
            <option>Code Review</option>
            <option>Debug Code</option>
            <option>Generate API</option>
            <option>Create React Component</option>
            <option>Database Design</option>
          </select>
        </div>

        {/* Clear Operations */}
        <button
          className="clear-btn"
          type="button"
          onClick={onClearHistory}
        >
          <FaTrashAlt />
          Clear Chat History
        </button>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <div className="footer-logo">✦</div>
          <h4>AI Assistant Pro</h4>
          <p>Advanced AI Platform</p>
          <span>© 2024 All Rights Reserved</span>
        </div>
      </div>

      {/* GLOBAL CENTERED SEARCH MODAL POPUP */}
      {isSearchOpen && (
        <div className="search-modal-backdrop" onClick={() => setIsSearchOpen(false)}>
          <div className="search-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="search-modal-header">
              <FiSearch className="modal-search-icon" />
              <input
                type="text"
                placeholder="Search past conversations..."
                className="modal-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsSearchOpen(false)}
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="search-modal-results">
              {filteredHistory.length === 0 ? (
                <p className="modal-no-results">No conversations match your search query</p>
              ) : (
                filteredHistory.map((item) => (
                  <div
                    key={item.id || item.timestamp}
                    className="modal-result-item"
                    onClick={() => {
                      if (onLoadHistoryItem) {
                        onLoadHistoryItem(item);
                      }
                      setIsSearchOpen(false);
                      if (window.innerWidth <= 768 && isOpen) {
                        toggleSidebar();
                      }
                    }}
                  >
                    <span className="result-chat-icon">💬</span>
                    <div className="result-content">
                      <span className="result-prompt">{item.prompt || "Empty Prompt"}</span>
                      <span className="result-meta">{firstName}'s Chat • {item.timestamp || "Past Log"}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;