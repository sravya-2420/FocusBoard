
import {
  LayoutDashboard,
  CheckSquare,
  CalendarDays,
  Settings,
  Target
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="logo">
        <Target size={28} />
        <h2>FocusBoard</h2>
      </div>

      <p className="menu-heading">MENU</p>

      <nav className="sidebar-menu">

        <a href="#dashboard" className="menu-item active">
          <LayoutDashboard size={19} />
          <span>Dashboard</span>
        </a>

        <a href="#tasks" className="menu-item">
          <CheckSquare size={19} />
          <span>My Tasks</span>
        </a>

        <a href="#calendar" className="menu-item">
          <CalendarDays size={19} />
          <span>Calendar</span>
        </a>

      </nav>

      <div className="sidebar-bottom">
        <a href="#settings" className="menu-item">
          <Settings size={19} />
          <span>Settings</span>
        </a>
      </div>

    </aside>
  );
}

export default Sidebar;
