import DashboardLayout from "@/components/DashboardLayout";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

const Parlay = () => {
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    const shouldBeFast = Math.random() < 0.85; // 85% rapide, 15% lent
    const randomDelay = shouldBeFast 
      ? Math.random() * (700 - 500) + 500  // 0.5s à 0.7s
      : 2000;  // 2 secondes
    setTimeout(() => {
      setIsPageLoading(false);
    }, randomDelay);
  }, []);

  if (isPageLoading) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="relative w-24 h-24 flex-shrink-0">
            <Loader2 className="w-24 h-24 text-white animate-spin absolute" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-2xl">IA</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold leading-none">
            <span className="text-white">WIN</span>
            <span className="text-primary">A</span>
            <span className="text-white">BET</span>
            <span className="text-primary text-sm">.AI</span>
          </h1>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Parlay du jour</h1>
          <p className="text-muted-foreground mt-2">
            Gérez vos paris combinés
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Parlay;
