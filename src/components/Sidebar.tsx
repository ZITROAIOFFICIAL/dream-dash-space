import { Menu, X, Trophy, Layers, History, Clock, MessageCircle, User, ShoppingBag, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import AIUpdateIndicator from "./AIUpdateIndicator";

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
        className="fixed top-4 left-4 z-50 md:hidden text-white hover:bg-transparent hover:text-white active:bg-transparent active:text-white focus:bg-transparent focus:text-white focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="h-8 w-8 stroke-[1.2]" />
        ) : (
          <div aria-hidden="true" className="flex flex-col items-center justify-center gap-1.5">
            <span className="block h-[1px] w-5 bg-white rounded-full"></span>
            <span className="block h-[1px] w-5 bg-white rounded-full"></span>
            <span className="block h-[1px] w-5 bg-white rounded-full"></span>
          </div>
        )}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-black text-white transition-transform duration-300 ease-in-out",
          "md:w-64 md:border-r md:border-white/10 md:translate-x-0",
          isOpen ? "w-full md:w-64 translate-x-0" : "w-full md:w-64 -translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header with logo */}
          <div className="h-16 flex items-center justify-center relative border-b border-white/10">
            <h1 className="text-2xl font-bold leading-none">
              <span className="text-white">WIN</span>
              <span className="text-sidebar-primary">A</span>
              <span className="text-white">BET</span>
              <span className="text-sidebar-primary text-sm">.AI</span>
            </h1>
          </div>

          {/* AI Update Indicator */}
          <div className="px-4 py-3 border-b border-white/10">
            <AIUpdateIndicator />
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
                    "flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 text-sm",
                    active 
                      ? "bg-primary/20 border-2 border-primary font-semibold text-primary" 
                      : "bg-transparent border-2 border-transparent text-white hover:bg-white/10"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                    {SecondIcon && <SecondIcon className="h-5 w-5" />}
                  </div>
                  <ChevronRight className="h-5 w-5" />
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
