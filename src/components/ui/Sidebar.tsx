"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FilePieChart,
  Activity,
  Cpu,
  History,
  User,
  ChevronRight,
  ChevronLeft,
  FileText,
  Target,
  AlertTriangle
} from "lucide-react";
import { useSession } from "next-auth/react";

// const sidebarLinks = [
//   { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
//   { href: "/file-analysis", label: "File Analysis", icon: FilePieChart },
//   { href: "/real-time-monitoring", label: "Real-Time Monitoring", icon: Activity },
//   { href: "/prediction", label: "Prediction", icon: Cpu },
//   { href: "/alerts-history", label: "Alerts & History", icon: History },
//   { href: "/profile", label: "Profile", icon: User },
// ];

const sidebarLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/file-analysis", label: "File Analysis", icon: FileText },
  { href: "/real-time-monitoring", label: "Real-Time Monitoring", icon: Activity },
  { href: "/prediction", label: "Prediction", icon: Target },
  { href: "/alerts-history", label: "Alerts & History", icon: AlertTriangle },
  { href: "/profile", label: "Profile", icon: User },
];

export default function Sidebar() {
  // const {data: session, status} = useSession()
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // const isAuthenticated = status === "authenticated" || !!session;
  // if(!isAuthenticated) return null;

  return (
    <>
      {/* 1. Backdrop Overlay: Only shows when the sidebar is drawn open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-zinc-950/30 backdrop-blur-xs transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 2. Floating Action Trigger: Stays fixed to the left window edge when closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-1/2 -translate-y-1/2 left-0 z-50 flex items-center justify-center w-8 h-14 bg-violet-600 hover:bg-violet-700 text-white rounded-r-xl shadow-lg border-y border-r border-violet-500/20 transition-all cursor-pointer group"
          title="Open Menu"
        >
          <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      )}

      {/* 3. The Left-to-Right Sidebar Panel */}
      <aside
        className={`fixed top-0 bottom-0 left-0 h-screen w-72 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 shadow-2xl flex flex-col transition-all duration-300 ease-in-out select-none
    ${isOpen ? "translate-x-0 opacity-100 pointer-events-auto z-99999" : "-translate-x-full opacity-0 pointer-events-none z-0"}`}
      >
        {/* Integrated Collapse Tab: Rides on the outside edge of the sidebar when open */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-1/2 -translate-y-1/2 left-full flex items-center justify-center w-8 h-14 bg-white dark:bg-zinc-900 text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-r-xl shadow-xl border-y border-r border-gray-200 dark:border-zinc-800 transition-all cursor-pointer"
          title="Collapse Menu"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Branding Block */}
        <div className="h-20 flex items-center px-6 border-b border-gray-100 dark:border-zinc-800/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-linear-to-br from-violet-500 to-purple-600 rounded-xl shadow-md">
              <span className="text-white font-extrabold text-base">N</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
              NIDS<span className="text-violet-600">AI</span>
            </span>
          </div>
        </div>

        {/* Core Sidebar Links */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)} // Auto-closes on click selection
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all group ${isActive
                    ? "bg-linear-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-600/20"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800/50 hover:text-gray-900 dark:hover:text-white"
                  }`}
              >
                <Icon
                  size={20}
                  className={`shrink-0 transition-colors ${isActive ? "text-white" : "text-gray-400 group-hover:text-violet-500"
                    }`}
                />
                <span className="truncate">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Corporate Identity Footer */}
        <div className="p-4 border-t border-gray-100 dark:border-zinc-800/50 bg-gray-50/50 dark:bg-zinc-900/30 shrink-0">
          <div className="flex items-center gap-3 px-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              System Core Active
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}