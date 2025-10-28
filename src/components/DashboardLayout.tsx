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
      
      {/* Header with logo and AI indicator */}
      <header className="fixed top-0 left-0 right-0 bg-background z-30 md:left-64">
        <div className="flex items-center justify-center py-4">
          <h1 className="text-2xl font-bold leading-none">
            <span className="text-foreground">WIN</span>
            <span className="text-green-600">A</span>
            <span className="text-foreground">BET</span>
            <span className="text-sm text-green-600">.AI</span>
          </h1>
        </div>
        <div className="bg-black py-2 px-6 flex items-center justify-center">
          <AIUpdateIndicator />
        </div>
      </header>
      
      <main className="md:pl-64 min-h-screen pt-[110px]">
        <div className="p-6 md:p-8 py-0">
          {children}
        </div>
      </main>
    </div>;
};
export default DashboardLayout;