import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, ChevronDown, Menu, UserRound, X } from "lucide-react";

const routeTitles = {
  "/dashboard": "Dashboard",
  "/resume": "Resume",
  "/interviews": "Interviews",
  "/practice": "Practice",
  "/history": "History",
  "/profile": "Settings",
};

export function Navbar({ onMenuClick, isSidebarOpen }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { pathname } = useLocation();
  const title = routeTitles[pathname] || "Workspace";

  return (
    <header className="sticky top-0 z-10 flex h-[70px] items-center justify-between border-b border-[#e4e7e4] bg-[rgba(255,253,250,0.94)] px-5 min-[761px]:h-[78px] min-[761px]:px-[clamp(20px,4vw,56px)]">
      <div className="flex items-center gap-4">
        <button
          className="relative inline-flex min-h-[38px] min-w-[38px] items-center justify-center p-2 text-[#71807d] hover:text-ink min-[761px]:hidden"
          onClick={onMenuClick}
          aria-label={isSidebarOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isSidebarOpen}
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div>
          <span className="font-mono text-[9px] tracking-[0.08em] text-[#899592] uppercase sm:text-[10px]">Workspace</span>
          <h1 className="mt-1 font-display text-lg leading-[1.15] sm:text-xl">{title}</h1>
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-[18px]">
        <button className="relative inline-flex min-h-[38px] min-w-[38px] items-center justify-center p-2 text-[#71807d] hover:text-ink" aria-label="Notifications">
          <Bell size={19} />
          <span className="notification-dot" />
        </button>
        <div className="relative">
          <button
            className="flex cursor-pointer items-center gap-[9px] bg-transparent p-1 pr-0 text-left text-ink sm:pr-1"
            onClick={() => setIsProfileOpen((open) => !open)}
            aria-expanded={isProfileOpen}
            aria-haspopup="menu"
          >
            <span className="flex size-[34px] items-center justify-center rounded-full bg-[#dce9df] font-bold text-[#396652]">
              <UserRound size={16} />
            </span>
            <span className="hidden gap-0.5 sm:grid">
              <strong className="text-xs">Profile</strong>
            </span>
            <ChevronDown className="hidden sm:block" size={16} />
          </button>
          {isProfileOpen && (
            <div className="absolute right-0 top-[calc(100%+10px)] z-[30] grid min-w-40 rounded-lg border border-[#e0e5e1] bg-[#fffdfa] p-1.5 shadow-[0_14px_30px_rgba(23,33,38,0.1)]" role="menu">
              <Link className="rounded-[5px] px-[11px] py-2.5 text-xs text-ink hover:bg-[#f1f4f1]" to="/profile" onClick={() => setIsProfileOpen(false)}>
                Profile
              </Link>
              <Link className="rounded-[5px] px-[11px] py-2.5 text-xs text-ink hover:bg-[#f1f4f1]" to="/profile" onClick={() => setIsProfileOpen(false)}>
                Settings
              </Link>
              <button className="rounded-[5px] border-0 bg-transparent px-[11px] py-2.5 text-left text-xs text-ink hover:bg-[#f1f4f1]" type="button" onClick={() => setIsProfileOpen(false)}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
