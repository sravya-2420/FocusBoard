
import { useState } from "react";
import { Bell, Search, X } from "lucide-react";

function Header({ onSearch }) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchText(value);
    onSearch(value);
  };

  const closeSearch = () => {
    setShowSearch(false);
    setSearchText("");
    onSearch("");
  };

  return (
    <header className="header">
      <div className="header-welcome">
        <p className="welcome-text">Welcome back!</p>
        <h2>Good morning, Sravya 👋</h2>
      </div>

      <div className="header-actions">
        {showSearch && (
          <div className="header-search">
            <input
              type="search"
              placeholder="Search tasks..."
              value={searchText}
              onChange={handleSearch}
              autoFocus
            />

            <button
              type="button"
              onClick={closeSearch}
              aria-label="Close search"
            >
              <X size={17} />
            </button>
          </div>
        )}

        <button
          type="button"
          className="icon-button"
          aria-label="Search"
          onClick={() => setShowSearch(!showSearch)}
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

        <div className="profile-avatar">S</div>
      </div>
    </header>
  );
}

export default Header;
