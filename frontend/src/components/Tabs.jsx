function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className="tabs-wrapper">
      <button 
        type="button" 
        className={activeTab === "assistant" ? "tab-active" : "tab-inactive"}
        onClick={() => setActiveTab("assistant")}
      >
        <span style={{ marginRight: '6px' }}>💬</span> AI Assistant
      </button>

      <button 
        type="button" 
        className={activeTab === "history" ? "tab-active" : "tab-inactive"}
        onClick={() => setActiveTab("history")}
      >
        <span style={{ marginRight: '6px' }}>🕒</span> Chat History
      </button>
    </div>
  );
}

export default Tabs;