import { TrendingUp, History, Target, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { icon: TrendingUp, label: "Bet du jour", path: "/" },
    { icon: Target, label: "Notre Stratégie", path: "/strategie" },
    { icon: History, label: "Historique", path: "/historique" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-black text-white transition-transform duration-300 ease-in-out",
          "md:w-64 md:border-r md:border-white/10 md:translate-x-0",
          isOpen ? "w-full translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <h1 className="text-2xl font-bold leading-none">
              <span className="text-white">WIN</span>
              <span className="text-sidebar-primary">A</span>
              <span className="text-white">BET</span>
              <span className="text-sidebar-primary text-base align-top">.AI</span>
            </h1>
            <p className="text-xs mt-2 text-white/70">
              Paris Sportifs Pro
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-white",
                    active 
                      ? "bg-white/20 font-semibold" 
                      : "hover:bg-white/10"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <div className="text-xs text-center text-white/60">
              © 2024 WINABET.AI
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
