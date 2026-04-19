// ============================================================
// Platform Sidebar — Responsive + Mobile Overlay (FIXED)
// ============================================================

import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Briefcase,
  Brain,
  MessageSquare,
  CalendarDays,
  FileText,
  Users,
  Settings,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// -------------------- Types --------------------

export type PanelKey =
  | "overview"
  | "cases"
  | "ai"
  | "messages"
  | "appointments"
  | "documents"
  | "clients"
  | "admin"
  | "settings";

interface NavItem {
  key: PanelKey;
  label: string;
  icon: LucideIcon; // ✅ FIXED TYPE
  badge?: number;
  roles?: string[];
}

// -------------------- Navigation --------------------

const NAV_ITEMS: NavItem[] = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "cases", label: "Case Management", icon: Briefcase },
  { key: "ai", label: "AI Analysis", icon: Brain },
  { key: "messages", label: "Messages", icon: MessageSquare },
  { key: "appointments", label: "Appointments", icon: CalendarDays },
  { key: "documents", label: "Document Vault", icon: FileText },
  { key: "clients", label: "Clients", icon: Users },
  {
    key: "admin",
    label: "Administration",
    icon: ShieldCheck,
    roles: ["admin"],
  },
  { key: "settings", label: "Settings", icon: Settings },
];

// -------------------- Props --------------------

interface SidebarProps {
  activePanel: PanelKey;
  onNavigate: (key: PanelKey) => void;
  unreadMessages: number;
  userRole: string;
}

// -------------------- Component --------------------

export default function Sidebar({
  activePanel,
  onNavigate,
  unreadMessages,
  userRole,
}: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close sidebar on navigation (mobile)
  const handleNavigate = (key: PanelKey) => {
    onNavigate(key);
    setMobileOpen(false);
  };

  // ESC key support
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // -------------------- Sidebar Content --------------------

  const navContent = (
    <>
      {/* Brand */}
      <div className="px-5 py-7 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
            <ShieldCheck className="text-white" size={22} />
          </div>
          <div>
            <div className="font-black text-gray-900 dark:text-white text-base tracking-tighter leading-tight">
              QuantumNexus
            </div>
            <div className="text-[10px] text-blue-600 dark:text-blue-400 font-black uppercase tracking-widest">
              Legal Platform
            </div>
          </div>
        </div>

        {/* Mobile Close */}
        <button
          className="lg:hidden p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => setMobileOpen(false)}
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 space-y-1 px-3 overflow-y-auto">
        {NAV_ITEMS.filter(
          (item) => !item.roles || item.roles.includes(userRole)
        ).map((item) => {
          const Icon = item.icon;
          const isActive = activePanel === item.key;
          const badge =
            item.key === "messages" ? unreadMessages : item.badge || 0;

          return (
            <button
              key={item.key}
              onClick={() => handleNavigate(item.key)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold
                transition-all duration-200 text-left relative overflow-hidden group
                ${isActive
                  ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white"
                }
              `}
            >
              <Icon
                size={18}
                className={`flex-shrink-0 transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"
                  }`}
              />

              <span className="flex-1 truncate">{item.label}</span>

              {badge > 0 && (
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-black ${isActive
                      ? "bg-white text-blue-600"
                      : "bg-red-500 text-white animate-pulse"
                    }`}
                >
                  {badge > 99 ? "99+" : badge}
                </span>
              )}

              {isActive && (
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-white opacity-20" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            Network Secure
          </span>
        </div>
        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tight opacity-50">
          Node: IN-DL-02 · v2.4.0
        </div>
      </div>
    </>
  );

  // -------------------- Render --------------------

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg"
        onClick={() => setMobileOpen(true)}
      >
        <Menu size={20} />
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`
          lg:hidden fixed inset-y-0 left-0 z-50
          w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
          flex flex-col transform transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {navContent}
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex-col">
        {navContent}
      </aside>
    </>
  );
}