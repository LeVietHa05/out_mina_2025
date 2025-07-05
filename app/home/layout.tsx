import Header from "../ui/header";
import Sidebar from "../ui/sidebar";
import type { ReactNode } from 'react';

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      {/* Header: cao 80px (56 content + 12 + 12 padding) */}
      <div className="h-20">
        <Header />
      </div>

      {/* Body: Sidebar + Main */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}
