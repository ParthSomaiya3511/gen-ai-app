import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import Tabs from "./Tabs";
import ChatArea from "./ChatArea";
import PromptBox from "./PromptBox";
import TaskDropdown from "./TaskDropdown";
import ActionButtons from "./ActionButtons";

function AssistantCard({
    activeTab,
    setActiveTab,
    prompt,
    setPrompt,
    loading,
    setLoading,
    messages,
    setMessages,
    history,
    setHistory,
    onClearHistory
}) {

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            alert("Please enter a prompt");
            return;
        }

        const userMessage = { role: "user", content: prompt };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setPrompt("");
        setLoading(true);

        try {
            const res = await axios.post(
                "http://localhost:8000/chat",
                {
                    message: prompt
                }
            );

            const aiResponse = res.data.response;
            const assistantMessage = { role: "assistant", content: aiResponse };
            setMessages([...updatedMessages, assistantMessage]);

            const newHistoryItem = {
                id: Date.now(),
                prompt: prompt,
                response: aiResponse,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            const updatedHistory = [newHistoryItem, ...history];
            setHistory(updatedHistory);
            localStorage.setItem("ai_assistant_history", JSON.stringify(updatedHistory));

        } catch (error) {
            console.error(error);
            alert("Backend connection failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="assistant-container">
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="assistant-card">
                {activeTab === "assistant" ? (
                    <>
                        <ChatArea
                            messages={messages}
                            loading={loading}
                            onSelectPrompt={handleSelectPrompt => setPrompt(handleSelectPrompt)}
                        />

                        <PromptBox
                            prompt={prompt}
                            setPrompt={setPrompt}
                        />

                        <TaskDropdown />

                        <ActionButtons
                            handleGenerate={handleGenerate}
                            clearHistory={onClearHistory}
                        />
                    </>
                ) : (
                    <div className="history-tab-panel">
                        <div className="history-header">
                            <h3>Saved Conversations</h3>
                            {history.length > 0 && (
                                <button onClick={onClearHistory} className="clear-history-link">
                                    Clear All Logs
                                </button>
                            )}
                        </div>

                        {history.length === 0 ? (
                            <div className="empty-history-view">
                                <span className="empty-icon">🕒</span>
                                <p>No chat history available yet.</p>
                                <p className="sub">Run prompt requests from the AI Assistant tab to populate history logs.</p>
                            </div>
                        ) : (
                            <div className="history-list">
                                {history.map((item) => (
                                    <div key={item.id} className="history-item-card">
                                        <div className="history-prompt-bubble">
                                            <span className="user-indicator">Prompt:</span> {item.prompt}
                                            <span className="timestamp-badge">{item.timestamp}</span>
                                        </div>
                                        <div className="history-response-bubble">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                {item.response}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AssistantCard;