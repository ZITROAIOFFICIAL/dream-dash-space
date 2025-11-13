import { Menu, X, Trophy, Layers, History, Clock, MessageCircle, User, ShoppingBag, ChevronRight, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import AIUpdateIndicator from "./AIUpdateIndicator";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { label: "Bet du jour", path: "/", icon: Trophy },
    { label: "Parlay du jour", path: "/parlay", icon: Layers },
    { label: "Historique Bet du jour", path: "/historique", icon: History, secondIcon: Trophy },
    { label: "Historique Parlay du jour", path: "/historique-parlay", icon: Clock, secondIcon: Layers },
    { label: "Notre stratégie", path: "/strategie", icon: Trophy },
    { label: "Abonnement", path: "https://winabet.ai/#rejoindre", icon: Sparkles },
    { label: "Mon compte", path: "/mon-compte", icon: User },
    { label: "Boutique", path: "/boutique", icon: ShoppingBag },
    { label: "Support", path: "/support", icon: MessageCircle },
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
          "fixed left-0 top-0 z-40 h-screen bg-black text-white",
          "md:w-64 md:border-r md:border-white/10",
          isOpen ? "w-full md:w-64" : "w-full md:w-64 hidden md:block"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header with logo */}
          <div className="py-4 flex items-center justify-center">
            <h1 className="text-2xl leading-none" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 300 }}>
              <span className="text-white">WIN</span>
              <span className="text-sidebar-primary">A</span>
              <span className="text-white">BET</span>
              <span className="text-white text-sm" style={{ marginLeft: '-0.15em' }}>.AI</span>
            </h1>
          </div>

          {/* AI Update Indicator */}
          <div className="bg-black py-2 px-4 flex items-center justify-center">
            <AIUpdateIndicator />
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;
              const SecondIcon = item.secondIcon;
              const isExternal = item.path.startsWith('http');
              
              const linkClassName = cn(
                "flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 text-lg font-bold",
                active 
                  ? "bg-green-600/20 border-2 border-green-600 font-bold text-green-500" 
                  : "bg-transparent border-2 border-transparent text-white hover:bg-green-600/10"
              );

              const linkContent = (
                <>
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                    {SecondIcon && <SecondIcon className="h-5 w-5" />}
                  </div>
                  <ChevronRight className="h-5 w-5" />
                </>
              );
              
              return isExternal ? (
                <a
                  key={item.path}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className={linkClassName}
                >
                  {linkContent}
                </a>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={linkClassName}
                >
                  {linkContent}
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
