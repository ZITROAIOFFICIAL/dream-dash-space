import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bet from "./pages/Bet";
import Strategy from "./pages/Strategy";
import Historique from "./pages/Historique";
import HistoriqueParlay from "./pages/HistoriqueParlay";
import Parlay from "./pages/Parlay";
import Support from "./pages/Support";
import MonCompte from "./pages/MonCompte";
import Boutique from "./pages/Boutique";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Bet />} />
          <Route path="/strategie" element={<Strategy />} />
          <Route path="/historique" element={<Historique />} />
          <Route path="/historique-parlay" element={<HistoriqueParlay />} />
          <Route path="/parlay" element={<Parlay />} />
          <Route path="/support" element={<Support />} />
          <Route path="/mon-compte" element={<MonCompte />} />
          <Route path="/boutique" element={<Boutique />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
