import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import vegasLogo from "@/assets/vegas-logo.png";
import tampaLogo from "@/assets/tampa-logo.png";
import { Loader2 } from "lucide-react";
import { useState } from "react";
const Bet = () => {
  const [betAmount, setBetAmount] = useState<string>("100");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);
  const [isAnalysisDialogOpen, setIsAnalysisDialogOpen] = useState(false);
  const handleShowAnalysis = () => {
    setIsAnalysisDialogOpen(true);
    setIsLoadingAnalysis(true);
    setTimeout(() => {
      setIsLoadingAnalysis(false);
      setShowAnalysis(true);
    }, 2000);
  };
  const odds = -136;
  const multiplier = 1 + 100 / Math.abs(odds);
  const calculateReturn = (amount: string) => {
    const numAmount = parseFloat(amount) || 0;
    return (numAmount * multiplier).toFixed(2);
  };
  const handleCustomBet = () => {
    if (customAmount && parseFloat(customAmount) > 0) {
      setBetAmount(customAmount);
      setIsDialogOpen(false);
      setCustomAmount("");
    }
  };
  return <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Paris Recommandés</h1>
          <p className="text-muted-foreground">Découvrez nos pronostics avec les meilleures cotes</p>
        </div>

        <div className="grid gap-6 justify-center">
          <Card className="w-full max-w-md bg-black border-[3px] border-green-600 shadow-2xl overflow-hidden mx-auto rounded-sm">
            <CardHeader className="space-y-0 p-0">
              {/* AI Data Analysis Counter */}
              <div className="flex items-center justify-center gap-3 py-2 px-6 bg-black/40">
                <Loader2 className="w-5 h-5 text-white animate-spin" />
                <span className="text-white font-semibold text-center text-xs">2857 DONNÉES ANALYSÉ PAR NOTRE IA POUR CE BET JUSQU'A PRÉSENT</span>
              </div>

              {/* AI Analysis */}
              <div className="flex items-center justify-between gap-2 text-xs py-[10px] bg-green-600 px-4">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-4xl">92%</span>
                  <span className="text-white text-xs font-bold">DE CHANCE DE GAGNER SELON NOTRE IA</span>
                </div>
                <Dialog open={isAnalysisDialogOpen} onOpenChange={setIsAnalysisDialogOpen}>
                  <DialogTrigger asChild>
                    <button onClick={handleShowAnalysis} className="px-3 py-1 bg-black rounded border-2 border-green-600 font-bold text-green-400 text-xs hover:bg-green-600/20 transition-colors">
                      VOIR ANALYSE IA
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl bg-black border-[3px] border-green-600 p-0 max-h-[90vh] overflow-y-auto">
                    {/* AI Data Analysis Counter - Same as main card */}
                    <div className="flex items-center justify-center gap-3 py-2 px-6 bg-black/40">
                      <Loader2 className="w-5 h-5 text-white animate-spin" />
                      <span className="text-white font-semibold text-center text-xs">2857 DONNÉES ANALYSÉ PAR NOTRE IA POUR CE BET JUSQU'A PRÉSENT</span>
                    </div>

                    <DialogHeader className="px-6 pt-4 pb-0">
                      <DialogTitle className="text-white text-xl font-bold">📊 Analyse Complète de l'IA</DialogTitle>
                      <DialogDescription className="text-white/70 text-sm">
                        Analyse détaillée basée sur 482 variables et 2857 points de données
                      </DialogDescription>
                    </DialogHeader>

                    <div className="px-6 pb-6">
                      {/* Loading Animation */}
                      {isLoadingAnalysis}

                      {/* Detailed Analysis */}
                      {showAnalysis && !isLoadingAnalysis && <div className="mt-4 space-y-4 animate-fade-in">
                          {/* Performance Section */}
                          <div className="bg-black/40 rounded-lg p-4 border border-green-600/30">
                            <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                              🏆 Performance et Statistiques
                            </h4>
                            <div className="space-y-2 text-xs">
                              <div className="bg-white/5 p-2 rounded">
                                <span className="text-white/70">Historique des confrontations:</span>
                                <span className="text-green-400 font-semibold ml-2">Tampa Bay 7-3</span>
                              </div>
                              <div className="bg-white/5 p-2 rounded">
                                <span className="text-white/70">Forme récente (10 matchs):</span>
                                <span className="text-green-400 font-semibold ml-2">8 victoires</span>
                              </div>
                              <div className="bg-white/5 p-2 rounded">
                                <span className="text-white/70">Performance à domicile:</span>
                                <span className="text-green-400 font-semibold ml-2">85% victoires</span>
                              </div>
                              <div className="bg-white/5 p-2 rounded">
                                <span className="text-white/70">Moyenne de points marqués:</span>
                                <span className="text-green-400 font-semibold ml-2">28.4 pts/match</span>
                              </div>
                            </div>
                          </div>

                          {/* Team Analysis Section */}
                          <div className="bg-black/40 rounded-lg p-4 border border-green-600/30">
                            <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                              👥 Analyse d'Équipe
                            </h4>
                            <div className="space-y-2 text-xs">
                              <div className="bg-white/5 p-2 rounded">
                                <span className="text-white/70">Joueurs clés disponibles:</span>
                                <span className="text-green-400 font-semibold ml-2">100%</span>
                              </div>
                              <div className="bg-white/5 p-2 rounded">
                                <span className="text-white/70">Blessures adverses:</span>
                                <span className="text-green-400 font-semibold ml-2">3 titulaires absents</span>
                              </div>
                              <div className="bg-white/5 p-2 rounded">
                                <span className="text-white/70">Moral de l'équipe:</span>
                                <span className="text-green-400 font-semibold ml-2">Excellent (série de 5 victoires)</span>
                              </div>
                            </div>
                          </div>

                          {/* Conditions Section */}
                          <div className="bg-black/40 rounded-lg p-4 border border-green-600/30">
                            <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                              🌤️ Conditions de Jeu
                            </h4>
                            <div className="space-y-2 text-xs">
                              <div className="bg-white/5 p-2 rounded">
                                <span className="text-white/70">Conditions météo:</span>
                                <span className="text-green-400 font-semibold ml-2">Favorables (22°C, ensoleillé)</span>
                              </div>
                              <div className="bg-white/5 p-2 rounded">
                                <span className="text-white/70">État du terrain:</span>
                                <span className="text-green-400 font-semibold ml-2">Excellent</span>
                              </div>
                              <div className="bg-white/5 p-2 rounded">
                                <span className="text-white/70">Avantage du terrain:</span>
                                <span className="text-green-400 font-semibold ml-2">Tampa Bay (+12% win rate)</span>
                              </div>
                            </div>
                          </div>

                          {/* Market Analysis Section */}
                          <div className="bg-black/40 rounded-lg p-4 border border-green-600/30">
                            <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                              📈 Analyse du Marché
                            </h4>
                            <div className="space-y-2 text-xs">
                              <div className="bg-white/5 p-2 rounded">
                                <span className="text-white/70">Consensus des experts:</span>
                                <span className="text-green-400 font-semibold ml-2">76% prédisent Tampa Bay</span>
                              </div>
                              <div className="bg-white/5 p-2 rounded">
                                <span className="text-white/70">Mouvement des cotes:</span>
                                <span className="text-green-400 font-semibold ml-2">-140 → -136 (favorable)</span>
                              </div>
                              <div className="bg-white/5 p-2 rounded">
                                <span className="text-white/70">Volume de paris:</span>
                                <span className="text-green-400 font-semibold ml-2">68% sur Tampa Bay</span>
                              </div>
                            </div>
                          </div>

                          {/* AI Confidence Section */}
                          <div className="bg-green-600/15 border-2 border-green-600 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-white font-bold text-sm">🎯 Niveau de Confiance IA</span>
                              <span className="text-green-400 font-bold text-2xl">92%</span>
                            </div>
                            <div className="w-full bg-black/40 rounded-full h-3 overflow-hidden">
                              <div className="bg-green-600 h-full rounded-full" style={{
                            width: '92%'
                          }}></div>
                            </div>
                            <p className="text-white/60 text-[10px] mt-2 text-center italic">
                              ⚡ Confiance élevée basée sur la convergence de multiples indicateurs positifs
                            </p>
                          </div>

                          <div className="mt-3 pt-3 border-t border-white/10">
                            <p className="text-white/60 text-[10px] italic text-center">
                              ⚡ Analyse basée sur 482 variables incluant statistiques historiques, 
                              forme actuelle, blessures, conditions de jeu et tendances du marché.
                            </p>
                          </div>
                        </div>}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Odds Display */}
              <div className="flex justify-center pt-4 pb-4">
                <div className="text-sm font-bold text-white tracking-wider mb-2">
                  MONEYLINE MULTIPLICATEUR
                </div>
              </div>
              
              <div className="flex justify-center py-0 -mt-6">
                <div className="bg-green-600/15 border-2 border-green-600 rounded-sm px-6 py-2">
                  <div className="text-3xl font-black text-green-400">
                    x{multiplier.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Match Details */}
              <div className="text-center space-y-2 pt-4 pb-4">
                <div className="text-sm font-bold text-white tracking-wider mb-2">
                  PARIER SUR
                </div>
                
                {/* Teams and VS (centered) */}
                <div className="grid grid-cols-3 items-center justify-items-center gap-4 px-4">
                  {/* Vegas */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-white/20">
                      <img src={vegasLogo} alt="Vegas" className="w-7 h-7 object-contain" />
                    </div>
                    <span className="font-bold text-xs text-white">VEGAS</span>
                  </div>

                  {/* Center time + VS */}
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-semibold text-sm text-white">5:00 PM</span>
                    <div className="px-2 py-0.5 rounded-full border border-white/20 bg-white/0">
                      <span className="text-white font-bold text-xs">VS</span>
                    </div>
                  </div>

                  {/* Tampa Bay */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="bg-green-600/15 border-2 border-green-600 rounded-sm p-2 flex flex-col items-center justify-center gap-1.5 py-[6px] px-[17px]">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                        <img src={tampaLogo} alt="Tampa Bay" className="w-7 h-7 object-contain" />
                      </div>
                      <span className="text-white -bottom-0.5 text-xs font-extrabold ">TAMPA BAY</span>
                      <div className="text-xs font-bold text-green-400">VICTOIRE</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Second "PARIER SUR" text */}
              <div className="flex justify-center py-0">
                <div className="text-sm font-bold text-white tracking-wider text-center ">
                  VOTRE GAIN
                </div>
              </div>

              {/* Bet Amount & Payout */}
              <div className="pt-1">
                <div className="grid grid-cols-2 gap-2 px-[10px] my-[15px]">
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <button className="px-4 py-3 bg-transparent border-2 border-green-600/40 rounded-sm text-center hover:bg-white/5 transition-colors cursor-pointer">
                        <div className="text-white text-xs mb-1">Votre mise</div>
                        <div className="text-green-400 font-bold text-lg">${betAmount}</div>
                        <div className="text-WHITE  text-xs mt-1 font-semibold px-[5px]">Modifier</div>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md bg-black border-green-600">
                      <DialogHeader>
                        <DialogTitle className="text-white text-center">Modifier votre mise</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-4 gap-2">
                          {[10, 20, 50, 100, 150, 200, 500].map(amount => <button key={amount} onClick={() => {
                          setBetAmount(amount.toString());
                          setIsDialogOpen(false);
                        }} className={`px-3 py-2 rounded-2xl text-sm font-semibold transition-colors ${betAmount === amount.toString() ? 'bg-primary text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                              ${amount}
                            </button>)}
                          <button onClick={() => {
                          const custom = prompt("Entrez le montant:");
                          if (custom && parseFloat(custom) > 0) {
                            setBetAmount(custom);
                            setIsDialogOpen(false);
                          }
                        }} className="px-3 py-2 rounded-2xl text-sm font-semibold bg-white/10 text-white hover:bg-white/20">
                            Autre
                          </button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <div className="bg-green-600/15 border-2 border-green-600 rounded-sm text-center py-[25px] px-0">
                    <div className="text-white text-xs mb-1">Cashout x{multiplier.toFixed(2)} →</div>
                    <div className="text-green-400 font-bold text-lg">${calculateReturn(betAmount)}</div>
                    <div className="text-white text-[10px] mt-0.5">
                      +${(parseFloat(calculateReturn(betAmount)) - parseFloat(betAmount)).toFixed(2)} bénéfice
                    </div>
                  </div>
                </div>
              </div>

              {/* DraftKings Section */}
              <div className="pt-0">
              <div className="flex items-center justify-center gap-2 text-xs my-0 py-[10px] border-t-2 border-green-600 bg-green-600">
                <span className="text-white">Meilleur odds:</span>
                <span className="font-bold text-white">DRAFTKINGS</span>
                <span className="px-2 py-1 bg-black rounded border-2 border-green-600 font-bold text-green-400">-135</span>
              </div>
              </div>
            </CardHeader>

          </Card>
        </div>
      </div>
    </DashboardLayout>;
};
export default Bet;