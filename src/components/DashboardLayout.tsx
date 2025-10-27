import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import AIUpdateIndicator from "./AIUpdateIndicator";
interface DashboardLayoutProps {
  children: ReactNode;
}
const DashboardLayout = ({
  children
}: DashboardLayoutProps) => {
  return <div className="min-h-screen bg-background">
      <Sidebar />
      
      {/* Header with centered logo */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-background z-30 flex items-center justify-between px-6 md:left-64">
        <h1 className="text-2xl font-bold leading-none">
          <span className="text-foreground">WIN</span>
          <span className="text-primary">A</span>
          <span className="text-foreground">BET</span>
          <span className="text-primary text-sm">.AI</span>
        </h1>
        <AIUpdateIndicator />
      </header>
      
      <main className="md:pl-64 min-h-screen pt-16">
        <div className="p-6 md:p-8 py-0">
          {children}
        </div>
      </main>
    </div>;
};
export default DashboardLayout;