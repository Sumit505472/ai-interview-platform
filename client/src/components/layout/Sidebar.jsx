import { NavLink } from "react-router-dom";
import {
  BarChart3,
  BrainCircuit,
  FileText,
  History,
  Settings,
  Video,
} from "lucide-react";

const navigationItems = [
  { label: "Dashboard", to: "/dashboard", icon: BarChart3 },
  { label: "Resume", to: "/resume", icon: FileText },
  { label: "Interviews", to: "/interviews", icon: Video },
  { label: "Practice", to: "/practice", icon: BrainCircuit },
  { label: "History", to: "/history", icon: History },
  { label: "Settings", to: "/profile", icon: Settings },
];

export function Sidebar({ isOpen, onClose }) {
  return (
    <aside className={`fixed inset-y-0 left-0 z-20 flex min-h-screen w-[min(280px,86vw)] flex-col bg-[#fffdfa] px-4 pb-[18px] pt-[27px] shadow-[14px_0_36px_rgba(23,33,38,0.14)] transition-transform duration-[220ms] ease-out md:relative md:w-[220px] md:translate-x-0 md:shadow-none lg:w-[248px] ${isOpen ? "translate-x-0" : "-translate-x-[105%]"}`}>
      <div className="px-[10px] pb-9 lg:pb-[50px]">
        <NavLink to="/dashboard" className="flex items-center gap-2.5 font-display text-[17px] font-extrabold text-ink" onClick={onClose}>
          <span className="inline-flex size-[34px] items-center justify-center rounded-[9px] bg-coral text-white">
            <BrainCircuit size={19} />
          </span>
          <span>Prepwise</span>
        </NavLink>
      </div>

      <nav className="grid gap-[5px]" aria-label="Main navigation">
        <span className="mb-3 mx-3 font-mono text-[10px] tracking-[0.08em] text-[#899592] uppercase">Workspace</span>
        {navigationItems.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex min-h-11 items-center gap-3 rounded-lg px-3 text-[13px] transition-colors duration-[180ms] ${isActive ? "bg-[#eaf1ec] font-bold text-[#2b604e]" : "text-[#72807d] hover:bg-[#f1f4f1] hover:text-ink"}`
            }
          >
            <Icon size={18} strokeWidth={1.8} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto flex items-center gap-2.5 border-t border-[#e4e7e4] px-[5px] pt-[18px]">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#dce9df] text-xs font-bold text-[#396652]">P</div>
        <div className="grid min-w-0 gap-[3px]">
          <strong className="text-xs font-bold text-ink">Profile & settings</strong>
          <span className="text-[10px] text-[#899592]">Manage your workspace</span>
        </div>
        <NavLink
          to="/profile"
          onClick={onClose}
          className="ml-auto p-[7px] text-[#899592] hover:text-ink"
          aria-label="Open profile settings"
        >
          <Settings size={17} />
        </NavLink>
      </div>
    </aside>
  );
}
