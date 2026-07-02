import Sidebar from "@/components/ui/Sidebar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-zinc-950 text-gray-900 dark:text-gray-100">
      
      {/* 1. Independent Sidebar Layer (Forced to mount at the highest global context) */}
      <div className="isolate z-9999 relative">
        <Sidebar />
      </div>

      {/* 2. Main Page Content (Shifted down below your global root navbar if needed) */}
      <main className="relative z-10 w-full max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 transition-all">
        {children}
      </main>

    </div>
  );
}