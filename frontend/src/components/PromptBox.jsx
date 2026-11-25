import { FaRegEdit } from "react-icons/fa";

function PromptBox({
  prompt,
  setPrompt
}) {

  return (
    <div className="prompt-section">

      <label className="section-label">

        ✍️ Enter Your Prompt

      </label>

      <textarea
        value={prompt}
        onChange={(e) =>
          setPrompt(e.target.value)
        }
        placeholder="Ask any programming, AI, DevOps, Cloud, Database, React, Laravel or software engineering question..."
        className="prompt-textarea"
      />

    </div>
  );
}

export default PromptBox;