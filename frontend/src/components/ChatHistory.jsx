function ChatHistory({ history = [] }) {

  return (

    <div className="chat-history">

      <h4 className="history-title">
        Recent Chats
      </h4>

      {history.length === 0 ? (

        <div className="history-empty">
          No chat history found
        </div>

      ) : (

        history.map((chat) => (

          <div
            key={chat.id}
            className="history-item"
          >
            {chat.question}
          </div>

        ))

      )}

    </div>

  );
}

export default ChatHistory;