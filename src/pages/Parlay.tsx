import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardHeader } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import stlouisLogo from "@/assets/stlouis-logo-new.png";
import pittsburghLogo from "@/assets/pittsburgh-logo-new.png";
import vegasLogo from "@/assets/vegas-logo.png";
import tampaLogo from "@/assets/tampa-logo.png";
import washingtonLogo from "@/assets/washington-logo.png";
import kansascityLogo from "@/assets/kansascity-logo.png";

const Parlay = () => {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dataCountParlay1, setDataCountParlay1] = useState(8523);
  const [dataCountParlay2, setDataCountParlay2] = useState(7894);

  useEffect(() => {
    const shouldBeFast = Math.random() < 0.85;
    const randomDelay = shouldBeFast ? Math.random() * (700 - 500) + 500 : 2000;
    setTimeout(() => {
      setIsPageLoading(false);
    }, randomDelay);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const dataTimer = setInterval(() => {
      setDataCountParlay1(prev => prev + Math.floor(Math.random() * 3) + 1);
      setDataCountParlay2(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 120000);
    return () => clearInterval(dataTimer);
  }, []);

  // States for Parlay 1 (3-leg: St. Louis + Vegas + Washington)
  const [betAmountParlay1, setBetAmountParlay1] = useState<string>("100");
  const [isDialogOpenParlay1, setIsDialogOpenParlay1] = useState(false);
  const [showAnalysisParlay1, setShowAnalysisParlay1] = useState(false);
  const [isLoadingDialogOpenParlay1, setIsLoadingDialogOpenParlay1] = useState(false);
  const [isAnalysisDialogOpenParlay1, setIsAnalysisDialogOpenParlay1] = useState(false);

  // States for Parlay 2 (2-leg: Vegas + St. Louis)
  const [betAmountParlay2, setBetAmountParlay2] = useState<string>("100");
  const [isDialogOpenParlay2, setIsDialogOpenParlay2] = useState(false);
  const [showAnalysisParlay2, setShowAnalysisParlay2] = useState(false);
  const [isLoadingDialogOpenParlay2, setIsLoadingDialogOpenParlay2] = useState(false);
  const [isAnalysisDialogOpenParlay2, setIsAnalysisDialogOpenParlay2] = useState(false);

  // Parlay 1 calculations (Under -114, Pittsburgh +140, Chicago -144, New Orleans -107)
  const multiplierUnder = 1 + 100 / 114;
  const multiplierPittsburgh = 1 + 140 / 100;
  const multiplierChicago = 1 + 100 / 144;
  const multiplierNewOrleans = 1 + 100 / 107;
  const totalMultiplierParlay1 = multiplierUnder * multiplierPittsburgh * multiplierChicago * multiplierNewOrleans;

  // Parlay 2 calculations (Pittsburgh +140, Under -114, Chicago -144)
  const totalMultiplierParlay2 = multiplierPittsburgh * multiplierUnder * multiplierChicago;

  const calculateReturn = (amount: string, multiplier: number) => {
    const numAmount = parseFloat(amount) || 0;
    return (numAmount * multiplier).toFixed(2);
  };

  const handleShowAnalysisParlay1 = () => {
    setIsLoadingDialogOpenParlay1(true);
    const randomDelay = Math.random() * (5000 - 1500) + 1500;
    setTimeout(() => {
      setIsLoadingDialogOpenParlay1(false);
      setIsAnalysisDialogOpenParlay1(true);
      setShowAnalysisParlay1(true);
    }, randomDelay);
  };

  const handleShowAnalysisParlay2 = () => {
    setIsLoadingDialogOpenParlay2(true);
    const randomDelay = Math.random() * (5000 - 1500) + 1500;
    setTimeout(() => {
      setIsLoadingDialogOpenParlay2(false);
      setIsAnalysisDialogOpenParlay2(true);
      setShowAnalysisParlay2(true);
    }, randomDelay);
  };

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
      <div className="space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-white text-4xl font-bold">PARLAY DU JOUR</h1>
          <p className="text-white/70 text-sm">Les parlay avec la meilleur probabilité de réussite aujourd'hui</p>
        </div>

        {/* PARLAY 1: 3-Leg (St. Louis + Vegas + Washington) */}
        <div className="grid gap-6 justify-center">
          <Card className="w-full max-w-md bg-black border-[3px] border-green-600 shadow-2xl overflow-hidden mx-auto rounded-sm">
            <CardHeader className="space-y-0 p-0">
              {/* AI Data Analysis Counter */}
              <div className="flex items-center justify-center gap-3 py-2 px-6 bg-black/40">
                <div className="relative w-6 h-6 flex-shrink-0">
                  <Loader2 className="w-6 h-6 text-white animate-spin absolute" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold text-[8px]">IA</span>
                  </div>
                </div>
                <span className="text-white font-semibold text-center text-[10px]">
                  {dataCountParlay1.toLocaleString()} DONNÉES ANALYSÉES PAR NOTRE IA POUR CE PARLAY
                </span>
              </div>

              {/* AI Analysis */}
              <div className="flex items-center justify-between gap-2 text-xs py-[10px] bg-green-600 px-4">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-4xl">74%</span>
                  <span className="text-white text-xs font-bold">DE CHANCE DE GAGNER SELON NOTRE IA</span>
                </div>
                <button
                  onClick={handleShowAnalysisParlay1}
                  className="px-3 py-1 bg-black rounded border-2 border-green-600 font-bold text-green-400 text-xs hover:bg-green-600/20 transition-colors"
                >
                  VOIR ANALYSE IA
                </button>

                {/* Loading Dialog */}
                <Dialog open={isLoadingDialogOpenParlay1} onOpenChange={setIsLoadingDialogOpenParlay1}>
                  <DialogContent className="sm:max-w-md bg-black border-none p-0 flex items-center justify-center [&>button]:hidden">
                    <div className="w-full h-full min-h-[400px] bg-black flex flex-col items-center justify-center gap-8 p-12">
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
                      <p className="text-white/70 text-sm text-center max-w-xs">
                        CHARGEMENT DE NOTRE IA ET DES DONNÉES LES PLUS RÉCENTES
                        <span className="inline-flex ml-0.5">
                          <span className="animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1.4s' }}>.</span>
                          <span className="animate-bounce" style={{ animationDelay: '200ms', animationDuration: '1.4s' }}>.</span>
                          <span className="animate-bounce" style={{ animationDelay: '400ms', animationDuration: '1.4s' }}>.</span>
                        </span>
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Moneyline Multiplier */}
              <div className="py-4 px-6 bg-black/95">
                <div className="text-center text-white font-bold text-xs mb-2">PARLAY MULTIPLICATEUR</div>
                <div className="bg-green-600 text-white font-bold text-4xl py-3 px-4 rounded-lg text-center">
                  x{totalMultiplierParlay1.toFixed(2)}
                </div>
              </div>

              {/* Bet On - Multiple Bets */}
              <div className="py-4 px-6 bg-black/95">
                <div className="text-center text-white font-bold text-xs mb-4">PARIER SUR</div>
                
                {/* Bet 1: Z. Flowers Under 68.5 Receiving Yards */}
                <div className="mb-4 pb-4 border-b border-white/10">
                  <div className="bg-green-600/10 border border-green-600 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-bold text-xs">BAL @ MIA</span>
                      <span className="text-white/70 text-[10px]">Thu 8:15 pm EDT</span>
                    </div>
                    <div className="text-white text-sm font-bold mb-1">Under 68.5</div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/90 text-xs">Z. Flowers Receiving Yards</span>
                      <span className="text-white font-bold text-sm">-114</span>
                    </div>
                  </div>
                </div>

                {/* Bet 2: Pittsburgh Moneyline */}
                <div className="mb-4 pb-4 border-b border-white/10">
                  <div className="bg-green-600/10 border border-green-600 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-bold text-xs">IND @ PIT</span>
                      <span className="text-white/70 text-[10px]">Nov 02, 1:00 pm EST</span>
                    </div>
                    <div className="text-white text-sm font-bold mb-1">Pittsburgh</div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/90 text-xs">Moneyline</span>
                      <span className="text-white font-bold text-sm">+140</span>
                    </div>
                  </div>
                </div>

                {/* Bet 3: Chicago Moneyline */}
                <div className="mb-4 pb-4 border-b border-white/10">
                  <div className="bg-green-600/10 border border-green-600 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-bold text-xs">CHI @ CIN</span>
                      <span className="text-white/70 text-[10px]">Nov 02, 1:00 pm EST</span>
                    </div>
                    <div className="text-white text-sm font-bold mb-1">Chicago</div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/90 text-xs">Moneyline</span>
                      <span className="text-white font-bold text-sm">-144</span>
                    </div>
                  </div>
                </div>

                {/* Bet 4: New Orleans +13.5 Spread */}
                <div>
                  <div className="bg-green-600/10 border border-green-600 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-bold text-xs">NO @ LAR</span>
                      <span className="text-white/70 text-[10px]">Nov 02, 4:05 pm EST</span>
                    </div>
                    <div className="text-white text-sm font-bold mb-1">New Orleans +13.5</div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/90 text-xs">Spread</span>
                      <span className="text-white font-bold text-sm">-107</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Your Gain */}
              <div className="py-4 px-6 bg-black/95">
                <div className="text-center text-white font-bold text-xs mb-3">VOTRE GAIN</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <button
                      onClick={() => setIsDialogOpenParlay1(true)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors text-sm"
                    >
                      MODIFIER VOTRE MISE
                    </button>
                    <div className="text-center text-white/70 text-xs">Mise: {betAmountParlay1}$</div>
                  </div>
                  <div className="bg-green-600/20 border-2 border-green-600 rounded-lg p-3 flex flex-col items-center justify-center">
                    <div className="text-white text-xs mb-1">CASHOUT</div>
                    <div className="text-green-400 font-bold text-xl">
                      {calculateReturn(betAmountParlay1, totalMultiplierParlay1)}$
                    </div>
                    <div className="text-white/70 text-[10px]">
                      Bénéfice: +{(parseFloat(calculateReturn(betAmountParlay1, totalMultiplierParlay1)) - parseFloat(betAmountParlay1)).toFixed(2)}$
                    </div>
                  </div>
                </div>

                <Dialog open={isDialogOpenParlay1} onOpenChange={setIsDialogOpenParlay1}>
                  <DialogContent className="sm:max-w-md bg-black border-[3px] border-green-600">
                    <div className="space-y-4">
                      <div className="text-center">
                        <h3 className="text-white font-bold text-lg mb-2">MODIFIER VOTRE MISE</h3>
                        <p className="text-white/70 text-sm">Entrez le montant que vous souhaitez parier</p>
                      </div>
                      <div className="space-y-2">
                        <input
                          type="number"
                          value={betAmountParlay1}
                          onChange={(e) => setBetAmountParlay1(e.target.value)}
                          className="w-full bg-black border-2 border-green-600 text-white font-bold text-2xl py-3 px-4 rounded-lg text-center"
                          placeholder="100"
                        />
                        <div className="text-center text-white/70 text-sm">
                          Retour potentiel: {calculateReturn(betAmountParlay1, totalMultiplierParlay1)}$
                        </div>
                      </div>
                      <button
                        onClick={() => setIsDialogOpenParlay1(false)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                      >
                        CONFIRMER
                      </button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Best Odds */}
              <div className="bg-green-600 py-2 px-6">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white font-bold">MEILLEUR ODDS</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white">FANDUEL</span>
                    <span className="text-black font-bold bg-white px-2 py-1 rounded">+{((totalMultiplierParlay1 - 1) * 100).toFixed(0)}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* PARLAY 2: 2-Leg (Vegas + St. Louis) */}
          <Card className="w-full max-w-md bg-black border-[3px] border-green-600 shadow-2xl overflow-hidden mx-auto rounded-sm">
            <CardHeader className="space-y-0 p-0">
              {/* AI Data Analysis Counter */}
              <div className="flex items-center justify-center gap-3 py-2 px-6 bg-black/40">
                <div className="relative w-6 h-6 flex-shrink-0">
                  <Loader2 className="w-6 h-6 text-white animate-spin absolute" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold text-[8px]">IA</span>
                  </div>
                </div>
                <span className="text-white font-semibold text-center text-[10px]">
                  {dataCountParlay2.toLocaleString()} DONNÉES ANALYSÉES PAR NOTRE IA POUR CE PARLAY
                </span>
              </div>

              {/* AI Analysis */}
              <div className="flex items-center justify-between gap-2 text-xs py-[10px] bg-green-600 px-4">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-4xl">85%</span>
                  <span className="text-white text-xs font-bold">DE CHANCE DE GAGNER SELON NOTRE IA</span>
                </div>
                <button
                  onClick={handleShowAnalysisParlay2}
                  className="px-3 py-1 bg-black rounded border-2 border-green-600 font-bold text-green-400 text-xs hover:bg-green-600/20 transition-colors"
                >
                  VOIR ANALYSE IA
                </button>

                {/* Loading Dialog */}
                <Dialog open={isLoadingDialogOpenParlay2} onOpenChange={setIsLoadingDialogOpenParlay2}>
                  <DialogContent className="sm:max-w-md bg-black border-none p-0 flex items-center justify-center [&>button]:hidden">
                    <div className="w-full h-full min-h-[400px] bg-black flex flex-col items-center justify-center gap-8 p-12">
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
                      <p className="text-white/70 text-sm text-center max-w-xs">
                        CHARGEMENT DE NOTRE IA ET DES DONNÉES LES PLUS RÉCENTES
                        <span className="inline-flex ml-0.5">
                          <span className="animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1.4s' }}>.</span>
                          <span className="animate-bounce" style={{ animationDelay: '200ms', animationDuration: '1.4s' }}>.</span>
                          <span className="animate-bounce" style={{ animationDelay: '400ms', animationDuration: '1.4s' }}>.</span>
                        </span>
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Moneyline Multiplier */}
              <div className="py-4 px-6 bg-black/95">
                <div className="text-center text-white font-bold text-xs mb-2">PARLAY MULTIPLICATEUR</div>
                <div className="bg-green-600 text-white font-bold text-4xl py-3 px-4 rounded-lg text-center">
                  x{totalMultiplierParlay2.toFixed(2)}
                </div>
              </div>

              {/* Bet On - Multiple Bets */}
              <div className="py-4 px-6 bg-black/95">
                <div className="text-center text-white font-bold text-xs mb-4">PARIER SUR</div>
                
                {/* Bet 1: Pittsburgh Moneyline */}
                <div className="mb-4 pb-4 border-b border-white/10">
                  <div className="bg-green-600/10 border border-green-600 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-bold text-xs">IND @ PIT</span>
                      <span className="text-white/70 text-[10px]">Nov 02, 1:00 pm EST</span>
                    </div>
                    <div className="text-white text-sm font-bold mb-1">Pittsburgh</div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/90 text-xs">Moneyline</span>
                      <span className="text-white font-bold text-sm">+140</span>
                    </div>
                  </div>
                </div>

                {/* Bet 2: Z. Flowers Under 68.5 Receiving Yards */}
                <div className="mb-4 pb-4 border-b border-white/10">
                  <div className="bg-green-600/10 border border-green-600 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-bold text-xs">BAL @ MIA</span>
                      <span className="text-white/70 text-[10px]">Thu 8:15 pm EDT</span>
                    </div>
                    <div className="text-white text-sm font-bold mb-1">Under 68.5</div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/90 text-xs">Z. Flowers Receiving Yards</span>
                      <span className="text-white font-bold text-sm">-114</span>
                    </div>
                  </div>
                </div>

                {/* Bet 3: Chicago Moneyline */}
                <div>
                  <div className="bg-green-600/10 border border-green-600 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-bold text-xs">CHI @ CIN</span>
                      <span className="text-white/70 text-[10px]">Nov 02, 1:00 pm EST</span>
                    </div>
                    <div className="text-white text-sm font-bold mb-1">Chicago</div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/90 text-xs">Moneyline</span>
                      <span className="text-white font-bold text-sm">-144</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Your Gain */}
              <div className="py-4 px-6 bg-black/95">
                <div className="text-center text-white font-bold text-xs mb-3">VOTRE GAIN</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <button
                      onClick={() => setIsDialogOpenParlay2(true)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors text-sm"
                    >
                      MODIFIER VOTRE MISE
                    </button>
                    <div className="text-center text-white/70 text-xs">Mise: {betAmountParlay2}$</div>
                  </div>
                  <div className="bg-green-600/20 border-2 border-green-600 rounded-lg p-3 flex flex-col items-center justify-center">
                    <div className="text-white text-xs mb-1">CASHOUT</div>
                    <div className="text-green-400 font-bold text-xl">
                      {calculateReturn(betAmountParlay2, totalMultiplierParlay2)}$
                    </div>
                    <div className="text-white/70 text-[10px]">
                      Bénéfice: +{(parseFloat(calculateReturn(betAmountParlay2, totalMultiplierParlay2)) - parseFloat(betAmountParlay2)).toFixed(2)}$
                    </div>
                  </div>
                </div>

                <Dialog open={isDialogOpenParlay2} onOpenChange={setIsDialogOpenParlay2}>
                  <DialogContent className="sm:max-w-md bg-black border-[3px] border-green-600">
                    <div className="space-y-4">
                      <div className="text-center">
                        <h3 className="text-white font-bold text-lg mb-2">MODIFIER VOTRE MISE</h3>
                        <p className="text-white/70 text-sm">Entrez le montant que vous souhaitez parier</p>
                      </div>
                      <div className="space-y-2">
                        <input
                          type="number"
                          value={betAmountParlay2}
                          onChange={(e) => setBetAmountParlay2(e.target.value)}
                          className="w-full bg-black border-2 border-green-600 text-white font-bold text-2xl py-3 px-4 rounded-lg text-center"
                          placeholder="100"
                        />
                        <div className="text-center text-white/70 text-sm">
                          Retour potentiel: {calculateReturn(betAmountParlay2, totalMultiplierParlay2)}$
                        </div>
                      </div>
                      <button
                        onClick={() => setIsDialogOpenParlay2(false)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                      >
                        CONFIRMER
                      </button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Best Odds */}
              <div className="bg-green-600 py-2 px-6">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white font-bold">MEILLEUR ODDS</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white">DRAFTKINGS</span>
                    <span className="text-black font-bold bg-white px-2 py-1 rounded">+{((totalMultiplierParlay2 - 1) * 100).toFixed(0)}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Parlay;