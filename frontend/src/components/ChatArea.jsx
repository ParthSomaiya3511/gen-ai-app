import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import MessageBubble from "./MessageBubble";

function ChatArea({ messages, loading, onSelectPrompt }) {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [messages, loading]);

    return (
        <div className="chat-area">
            {messages.length === 0 && (
                <div className="empty-chat">
                    <div className="welcome-icon-container">
                        <span className="welcome-icon-glow">✨</span>
                    </div>

                    <h2 className="welcome-title">
                        Welcome to <span className="gradient-brand-text">AI Assistant</span>
                    </h2>

                    <p className="welcome-subtitle">
                        Your high-performance companion for coding, database query optimization, DevOps workflows, and system architecture.
                    </p>

                    {/* Quick-starter recommendation cards (click to auto-populate prompt) */}
                    <div className="welcome-grid">
                        <div
                            className="welcome-card"
                            onClick={() => onSelectPrompt && onSelectPrompt("Generate a secure JWT authentication middleware in Express.js")}
                        >
                            <div className="card-header">
                                <span className="card-emoji">💻</span>
                                <h4>Write Code</h4>
                            </div>
                            <p>Build robust backend logic and schema controllers instantly</p>
                        </div>

                        <div
                            className="welcome-card"
                            onClick={() => onSelectPrompt && onSelectPrompt("Isolate the rendering loops in my React useEffect hooks")}
                        >
                            <div className="card-header">
                                <span className="card-emoji">🐛</span>
                                <h4>Debug System</h4>
                            </div>
                            <p>Locate tricky bottlenecks and fix nested memory leaks</p>
                        </div>

                        <div
                            className="welcome-card"
                            onClick={() => onSelectPrompt && onSelectPrompt("Optimize index searches on high-concurrency MongoDB databases")}
                        >
                            <div className="card-header">
                                <span className="card-emoji">⚡</span>
                                <h4>Optimize Performance</h4>
                            </div>
                            <p>Refactor queries and systems for sub-millisecond loads</p>
                        </div>

                        <div
                            className="welcome-card"
                            onClick={() => onSelectPrompt && onSelectPrompt("Draft a high-availability AWS auto-scaling infrastructure strategy")}
                        >
                            <div className="card-header">
                                <span className="card-emoji">🌐</span>
                                <h4>Cloud & DevOps</h4>
                            </div>
                            <p>Draft containerized architectures and stable pipelines</p>
                        </div>
                    </div>
                </div>
            )}

            {messages.map((message, index) => (

                <MessageBubble
                    key={index}
                    role={message.role}
                    content={message.content}
                />

            ))}

            {loading && (
                <div className="assistant-bubble loading-bubble">
                    <div className="loading-wrapper">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            )}

            <div ref={bottomRef}></div>
        </div>
    );
}

export default ChatArea;