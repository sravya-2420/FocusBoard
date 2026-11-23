
import { Bell, Search } from "lucide-react";

function Header() {
  return (
    <header className="header">
      <div className="header-welcome">
        <p className="welcome-text">Welcome back!</p>
        <h2>Good morning, Sravya 👋</h2>
      </div>

      <div className="header-actions">
        <button
          type="button"
          className="icon-button"
          aria-label="Search"
        >
          <Search size={20} />
        </button>

        <button
          type="button"
          className="icon-button"
          aria-label="Notifications"
        >
          <Bell size={20} />
        </button>

        <div className="profile-avatar" aria-label="Profile">
          S
        </div>
      </div>
    </header>
  );
}

export default Header;
