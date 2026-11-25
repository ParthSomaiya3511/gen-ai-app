import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import TopIcons from "../components/TopIcons";
import BackgroundEffects from "../components/BackgroundEffects";
import AssistantCard from "../components/AssistantCard";
import MobileMenuButton from "../components/MobileMenuButton";

function Dashboard() {
  // Set default view of desktop sidebar to open
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("assistant");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);

  // Load chat log history from local storage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("ai_assistant_history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNewChat = () => {
    setMessages([]);
    setPrompt("");
    setActiveTab("assistant");
  };

  const handleClearHistory = () => {
    setPrompt("");
    setMessages([]);
    setHistory([]);
    localStorage.removeItem("ai_assistant_history");
  };

  const handleLoadHistoryItem = (item) => {
    setMessages([
      { role: "user", content: item.prompt },
      { role: "assistant", content: item.response }
    ]);
    setActiveTab("assistant");
  };

  return (
    <div className="dashboard-container">
      <MobileMenuButton toggleSidebar={toggleSidebar} />

      {sidebarOpen && (
        <div className="sidebar-backdrop" onClick={toggleSidebar}></div>
      )}

      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        history={history}
        onNewChat={handleNewChat}
        onClearHistory={handleClearHistory}
        onLoadHistoryItem={handleLoadHistoryItem}
      />

      {/* Added dynamic classes for smooth content scaling transitions */}
      <main className={`main-content ${sidebarOpen ? "sidebar-expanded" : "sidebar-collapsed"}`}>

        {/* Floating expand toggle appearing in the top-left when sidebar is closed */}
        {!sidebarOpen && (
          <button
            type="button"
            className="desktop-sidebar-toggle"
            onClick={toggleSidebar}
            aria-label="Expand Sidebar"
          >
            ❯❯
          </button>
        )}

        <BackgroundEffects />
        <TopIcons />
        <Header />

        <AssistantCard
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          prompt={prompt}
          setPrompt={setPrompt}
          loading={loading}
          setLoading={setLoading}
          messages={messages}
          setMessages={setMessages}
          history={history}
          setHistory={setHistory}
          onClearHistory={handleClearHistory}
        />
      </main>
    </div>
  );
}

export default Dashboard;