import { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      {/* Header with centered logo */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-background border-b border-border z-30 flex items-center justify-center md:left-64">
        <h1 className="text-2xl font-bold leading-none">
          <span className="text-foreground">WIN</span>
          <span className="text-sidebar-primary">A</span>
          <span className="text-foreground">BET</span>
          <span className="text-sidebar-primary text-base align-top">.AI</span>
        </h1>
      </header>
      
      <main className="md:pl-64 min-h-screen pt-16">
        <div className="p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
