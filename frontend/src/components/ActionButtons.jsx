import { FaRocket, FaTimes } from "react-icons/fa";

function ActionButtons({
  handleGenerate,
  clearHistory
}) {

  return (
    <div className="action-buttons">

      <button
        className="generate-btn"
        onClick={handleGenerate}
      >
        🚀 Generate Response
      </button>

      <button
        className="history-btn"
        onClick={clearHistory}
      >
        🗑 Clear History
      </button>

    </div>
  );
}

export default ActionButtons;