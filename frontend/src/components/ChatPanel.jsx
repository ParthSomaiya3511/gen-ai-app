import { useState } from "react";
import {
  FaRocket,
  FaTimes
} from "react-icons/fa";

function ChatPanel() {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm">

      <div className="flex gap-5 mb-8">

        <button className="bg-blue-600 text-white px-8 py-4 rounded-xl">
          AI Assistant
        </button>

        <button className="border px-8 py-4 rounded-xl">
          Chat History
        </button>

      </div>

      <label className="font-semibold">
        Enter Your Prompt
      </label>

      <textarea
        rows={10}
        value={prompt}
        onChange={(e)=>setPrompt(e.target.value)}
        className="w-full border rounded-2xl mt-3 p-5"
        placeholder="Ask any IT, Software Development, Programming, AI, Cloud, DevOps, Database or Cybersecurity question..."
      />

      <div className="mt-8">

        <label className="font-semibold">
          Select AI Task
        </label>

        <select className="w-full mt-3 border rounded-xl p-4">
          <option>Write Content</option>
          <option>Write Code</option>
          <option>Debug Code</option>
          <option>Generate API</option>
          <option>System Design</option>
        </select>

      </div>

      <div className="grid grid-cols-2 gap-6 mt-8">

        <button className="bg-gradient-to-r from-blue-600 to-cyan-400 text-white rounded-2xl py-4 font-semibold">
          <FaRocket className="inline mr-2" />
          Generate Response
        </button>

        <button className="bg-gradient-to-r from-cyan-400 to-blue-600 text-white rounded-2xl py-4 font-semibold">
          <FaTimes className="inline mr-2" />
          Clear History
        </button>

      </div>

    </div>
  );
}

export default ChatPanel;