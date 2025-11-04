import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import AtomIcon from "./AtomIcon";
interface DashboardLayoutProps {
  children: ReactNode;
}
const DashboardLayout = ({
  children
}: DashboardLayoutProps) => {
  return <div className="min-h-screen bg-background">
      <Sidebar />
      
      {/* Header with logo and AI indicator */}
      <header className="fixed top-0 left-0 right-0 bg-background/90 backdrop-blur-sm z-30 md:left-64 rounded-lg">
        <div className="flex items-center justify-center py-5">
          <h1 className="text-2xl leading-none" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 300 }}>
            <span className="text-foreground">WIN</span>
            <span className="text-green-600">A</span>
            <span className="text-foreground">BET</span>
            <span className="text-sm text-green-600">.AI</span>
          </h1>
        </div>
        <div className="bg-muted/50 py-2 px-6 flex items-center justify-center rounded-md">
          <AtomIcon className="w-16 h-16 text-foreground" ariaLabel="Icône atomique animée" />
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