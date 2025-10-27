import { Menu, X, Trophy, Layers, History, Clock, MessageCircle, User, ShoppingBag, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { label: "BET DU JOUR", path: "/", icon: Trophy },
    { label: "PARLAY DU JOUR", path: "/parlay", icon: Layers },
    { label: "HISTORIQUE BET DU JOUR", path: "/historique", icon: History, secondIcon: Trophy },
    { label: "HISTORIQUE PARLAY DU JOUR", path: "/historique-parlay", icon: Clock, secondIcon: Layers },
    { label: "NOTRE STRATÉGIE", path: "/strategie", icon: Trophy },
    { label: "MON COMPTE", path: "/mon-compte", icon: User },
    { label: "BOUTIQUE", path: "/boutique", icon: ShoppingBag },
    { label: "SUPPORT", path: "/support", icon: MessageCircle },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden text-white hover:bg-transparent focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-7 w-7 stroke-[1.5]" /> : <Menu className="h-7 w-7 stroke-[1.5]" />}
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
          {/* Header with logo and close button */}
          <div className="h-16 flex items-center justify-center relative">
          <h1 className="text-2xl font-bold leading-none">
            <span className="text-white">WIN</span>
            <span className="text-sidebar-primary">A</span>
            <span className="text-white">BET</span>
            <span className="text-sidebar-primary text-sm">.AI</span>
          </h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;
              const SecondIcon = item.secondIcon;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200",
                    active 
                      ? "bg-primary/20 border-2 border-primary font-semibold text-primary" 
                      : "bg-transparent border-2 border-transparent text-white hover:bg-white/10"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                    {SecondIcon && <SecondIcon className="h-4 w-4" />}
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4">
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
