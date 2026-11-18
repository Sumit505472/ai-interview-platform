import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

export function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f7f8f7]">
      {isSidebarOpen && (
        <button
          className="fixed inset-0 z-[15] border-0 bg-[#17212652]"
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close navigation"
        />
      )}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="min-w-0 flex-1">
        <Navbar
          isSidebarOpen={isSidebarOpen}
          onMenuClick={() => setIsSidebarOpen((open) => !open)}
        />
        <main className="min-h-[calc(100vh-70px)] px-[18px] py-[30px] pb-[52px] min-[761px]:min-h-[calc(100vh-78px)] min-[761px]:px-[clamp(20px,4vw,56px)] min-[761px]:py-[42px] min-[761px]:pb-[72px]">
          <div className="mx-auto max-w-[1240px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
