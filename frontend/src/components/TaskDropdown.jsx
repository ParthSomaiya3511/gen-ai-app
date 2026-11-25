import { FaBrain } from "react-icons/fa";

function TaskDropdown() {
  return (
    <div className="task-section">
      <label className="section-label">
        <FaBrain /> Select AI Task
      </label>

      <select className="task-dropdown">
        <option>Write Content</option>
        <option>Write Code</option>
        <option>Debug Code</option>
        <option>Generate API</option>
        <option>Database Design</option>
        <option>System Design</option>
      </select>
    </div>
  );
}

export default TaskDropdown;