import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FiCopy, FiCheck } from "react-icons/fi";

// State-managed Copy Code controller
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button className="copy-btn" onClick={handleCopy} type="button">
      {copied ? (
        <>
          <FiCheck style={{ color: "#34d399" }} /> Copied!
        </>
      ) : (
        <>
          <FiCopy /> Copy
        </>
      )}
    </button>
  );
}

function MessageBubble({ role, content }) {
  return (
    <div
      className={
        role === "user"
          ? "user-bubble"
          : "assistant-bubble"
      }
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ inline, className, children }) {
            const match = /language-(\w+)/.exec(className || "");

            if (!inline && match) {
              const lang = match[1];
              return (
                <div className="code-block">
                  <div className="code-block-header">
                    <span className="code-lang">{lang}</span>
                    <CopyButton text={String(children)} />
                  </div>

                  <SyntaxHighlighter
                    language={lang}
                    style={vscDarkPlus}
                    PreTag="div"
                    customStyle={{
                      margin: 0,
                      padding: "16px",
                      background: "#0f172a",
                      fontSize: "13.5px",
                    }}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                </div>
              );
            }

            return (
              <code className="inline-code">
                {children}
              </code>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default MessageBubble;