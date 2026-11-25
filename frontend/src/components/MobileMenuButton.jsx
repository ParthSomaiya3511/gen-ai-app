import { FiMenu } from "react-icons/fi";

function MobileMenuButton({ toggleSidebar }) {
  return (
    <button
      type="button"
      className="mobile-menu-btn"
      onClick={toggleSidebar}
      aria-label="Open Sidebar Menu"
    >
      <FiMenu size={20} />
    </button>
  );
}

export default MobileMenuButton;