import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Bell,
  BrainCircuit,
  ChevronRight,
  FileText,
  History,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Sparkles,
  Video,
  X,
} from "lucide-react";
import api from "../../services/api";
const navItems = [
  ["Dashboard", "/dashboard", LayoutDashboard],
  ["Resume", "/resume", FileText],
  ["Interviews", "/interviews", Video],
  ["History", "/history", History],
];
export function AppLayout({ user, setUser }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const logout = async () => {
    await api.post("/api/auth/logout").catch(() => {});
    setUser(null);
    navigate("/");
  };
  return (
    <div className="app-shell">
      {" "}
      {open && (
        <button
          className="scrim"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        />
      )}{" "}
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        {" "}
        <div className="brand">
          <span className="brand-mark">
            <BrainCircuit size={20} />
          </span>
          <span>Prepwise</span>
          <button
            className="icon-button mobile-only"
            onClick={() => setOpen(false)}
          >
            <X size={18} />
          </button>
        </div>{" "}
        <div className="side-label">Workspace</div>{" "}
        <nav>
          {navItems.map(([label, to, Icon]) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
              {label === "Resume" && (
                <ChevronRight className="nav-chevron" size={15} />
              )}
            </NavLink>
          ))}
        </nav>{" "}
        <div className="sidebar-bottom">
          <NavLink to="/profile" className="nav-item">
            <Settings size={18} />
            <span>Profile & settings</span>
          </NavLink>
          <button className="logout-button" onClick={logout}>
            <LogOut size={17} />
            <span>Sign out</span>
          </button>
        </div>{" "}
      </aside>{" "}
      <main className="main-area">
        <header className="topbar">
          <button
            className="icon-button mobile-only"
            onClick={() => setOpen(true)}
          >
            <Menu size={21} />
          </button>
          <div className="breadcrumb">
            Workspace <span>/</span> <strong>Overview</strong>
          </div>
          <div className="top-actions">
            <button className="icon-button" title="Notifications">
              <Bell size={19} />
              <i />
            </button>
            <div className="avatar">
              {(user?.name || "U").slice(0, 1).toUpperCase()}
            </div>
          </div>
        </header>
        <div className="page-content">
          <Outlet />
        </div>
      </main>{" "}
    </div>
  );
}
