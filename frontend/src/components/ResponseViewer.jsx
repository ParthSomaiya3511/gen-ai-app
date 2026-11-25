import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function ResponseViewer({ response }) {
  return (
    <div className="response-container">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {response}
      </ReactMarkdown>
    </div>
  );
}

export default ResponseViewer;