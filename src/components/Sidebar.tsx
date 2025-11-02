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
          {/* Header - Une seule ligne avec tous les éléments */}
          <div className="py-4 px-4 flex items-center justify-between gap-3 border-b border-green-600/30">
            {/* Badge "en ligne" à gauche (masqué sur mobile) */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/[0.02] border border-white/[0.08] rounded-full">
              <div className="w-1 h-1 rounded-full bg-green-600 shadow-[0_0_4px_rgba(22,163,74,0.8)]"></div>
              <span className="text-white/70 font-medium text-xs whitespace-nowrap">
                <span className="text-white/95 font-semibold">50</span> en ligne
              </span>
            </div>

            {/* Logo centré */}
            <h1 className="text-2xl md:text-3xl font-bold leading-none tracking-tight flex-shrink-0">
              <span className="text-white">WIN</span>
              <span className="text-white">A</span>
              <span className="text-sidebar-primary">BET</span>
            </h1>
            
            {/* Mise à jour IA à droite */}
            <div className="flex items-center gap-2 px-2 md:px-3 py-1.5 bg-green-600/5 border border-green-600/15 rounded-full">
              <svg width="24" height="24" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                <defs>
                  <filter id="softGlowSidebar" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="1.2" result="b"/>
                    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                  <path id="orbit0Sidebar" d="M100 64a86 36 0 1 1 0 72a86 36 0 1 1 0-72" pathLength="1000"/>
                  <path id="orbit1Sidebar" d="M100 64a86 36 0 1 1 0 72a86 36 0 1 1 0-72" transform="rotate(55 100 100)" pathLength="1000"/>
                  <path id="orbit2Sidebar" d="M100 64a86 36 0 1 1 0 72a86 36 0 1 1 0-72" transform="rotate(-55 100 100)" pathLength="1000"/>
                </defs>
                <g stroke="#68859e" strokeWidth="2" fill="none">
                  <use href="#orbit0Sidebar"/>
                  <use href="#orbit1Sidebar"/>
                  <use href="#orbit2Sidebar"/>
                </g>
                <g strokeLinecap="round" filter="url(#softGlowSidebar)">
                  <use href="#orbit0Sidebar" stroke="#ffffff" strokeWidth="2" fill="none" strokeDasharray="120 880" vectorEffect="non-scaling-stroke" strokeOpacity="0.95">
                    <animate attributeName="stroke-dashoffset" values="0;-1000" dur="6s" repeatCount="indefinite" begin="0s"/>
                  </use>
                  <use href="#orbit1Sidebar" stroke="#ffffff" strokeWidth="2" fill="none" strokeDasharray="120 880" vectorEffect="non-scaling-stroke" strokeOpacity="0.95">
                    <animate attributeName="stroke-dashoffset" values="500;-500" dur="6s" repeatCount="indefinite" begin="0s"/>
                  </use>
                  <use href="#orbit2Sidebar" stroke="#ffffff" strokeWidth="2" fill="none" strokeDasharray="120 880" vectorEffect="non-scaling-stroke" strokeOpacity="0.95">
                    <animate attributeName="stroke-dashoffset" values="750;-250" dur="6s" repeatCount="indefinite" begin="0s"/>
                  </use>
                </g>
                <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" fill="#ffffff" fontWeight="700" fontSize="46">IA</text>
              </svg>
              <span className="hidden sm:inline text-white/95 font-semibold text-xs whitespace-nowrap">17:34</span>
            </div>
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
                      ? "bg-green-600/20 border-2 border-green-600 font-semibold text-green-500" 
                      : "bg-transparent border-2 border-transparent text-white hover:bg-green-600/10"
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
