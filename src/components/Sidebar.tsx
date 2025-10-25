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
          "fixed left-0 top-0 z-40 h-screen transition-transform duration-300 ease-in-out",
          "md:w-64 md:bg-sidebar md:border-r md:border-sidebar-border md:translate-x-0",
          isOpen 
            ? "w-full bg-black text-white translate-x-0" 
            : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className={cn(
            "p-6 border-b",
            isOpen ? "border-white/20 md:border-sidebar-border" : "border-sidebar-border"
          )}>
            <h1 className="text-2xl font-bold leading-none">
              <span className={cn(isOpen ? "text-white md:text-sidebar-foreground" : "text-sidebar-foreground")}>WIN</span>
              <span className="text-sidebar-primary">A</span>
              <span className={cn(isOpen ? "text-white md:text-sidebar-foreground" : "text-sidebar-foreground")}>BET</span>
              <span className="text-sidebar-primary text-base align-top">.AI</span>
            </h1>
            <p className={cn(
              "text-xs mt-2",
              isOpen ? "text-white/70 md:text-sidebar-foreground/70" : "text-sidebar-foreground/70"
            )}>
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
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                    isOpen && "text-white hover:bg-white/10",
                    !isOpen && (active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"),
                    isOpen && active && "bg-white/20 font-semibold"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className={cn(
            "p-4 border-t",
            isOpen ? "border-white/20 md:border-sidebar-border" : "border-sidebar-border"
          )}>
            <div className={cn(
              "text-xs text-center",
              isOpen ? "text-white/60 md:text-sidebar-foreground/60" : "text-sidebar-foreground/60"
            )}>
              © 2024 BetPro
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
