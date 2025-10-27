import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Target, DollarSign, Award } from "lucide-react";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import stlouisLogo from "@/assets/stlouis-logo-new.png";
import pittsburghLogo from "@/assets/pittsburgh-logo-new.png";
import vegasLogo from "@/assets/vegas-logo.png";
import tampaLogo from "@/assets/tampa-logo.png";
const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // States for ST. LOUIS vs PITTSBURGH card
  const [betAmountStLouis, setBetAmountStLouis] = useState<string>("100");
  const [isDialogOpenStLouis, setIsDialogOpenStLouis] = useState(false);
  const [showAnalysisStLouis, setShowAnalysisStLouis] = useState(false);
  const [isLoadingDialogOpenStLouis, setIsLoadingDialogOpenStLouis] = useState(false);
  const [isAnalysisDialogOpenStLouis, setIsAnalysisDialogOpenStLouis] = useState(false);

  // States for VEGAS vs TAMPA BAY card
  const [betAmountVegas, setBetAmountVegas] = useState<string>("100");
  const [isDialogOpenVegas, setIsDialogOpenVegas] = useState(false);
  const [showAnalysisVegas, setShowAnalysisVegas] = useState(false);
  const [isLoadingDialogOpenVegas, setIsLoadingDialogOpenVegas] = useState(false);
  const [isAnalysisDialogOpenVegas, setIsAnalysisDialogOpenVegas] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // ST. LOUIS vs PITTSBURGH odds
  const oddsStLouis = -105;
  const multiplierStLouis = 1 + 100 / Math.abs(oddsStLouis);

  // VEGAS vs TAMPA BAY odds
  const oddsVegas = -136;
  const multiplierVegas = 1 + 100 / Math.abs(oddsVegas);
  const calculateReturn = (amount: string, multiplier: number) => {
    const numAmount = parseFloat(amount) || 0;
    return (numAmount * multiplier).toFixed(2);
  };
  const handleShowAnalysisStLouis = () => {
    setIsLoadingDialogOpenStLouis(true);
    const randomDelay = Math.random() * (5000 - 1500) + 1500;
    setTimeout(() => {
      setIsLoadingDialogOpenStLouis(false);
      setIsAnalysisDialogOpenStLouis(true);
      setShowAnalysisStLouis(true);
    }, randomDelay);
  };
  const handleShowAnalysisVegas = () => {
    setIsLoadingDialogOpenVegas(true);
    const randomDelay = Math.random() * (5000 - 1500) + 1500;
    setTimeout(() => {
      setIsLoadingDialogOpenVegas(false);
      setIsAnalysisDialogOpenVegas(true);
      setShowAnalysisVegas(true);
    }, randomDelay);
  };
  const stats = [{
    title: "Taux de Réussite",
    value: "78%",
    icon: Target,
    description: "+5% ce mois",
    color: "text-primary"
  }, {
    title: "Paris Actifs",
    value: "12",
    icon: TrendingUp,
    description: "En cours",
    color: "text-blue-500"
  }, {
    title: "Gains Totaux",
    value: "2,450€",
    icon: DollarSign,
    description: "+380€ cette semaine",
    color: "text-green-500"
  }, {
    title: "Classement",
    value: "#24",
    icon: Award,
    description: "Sur 1,000 utilisateurs",
    color: "text-yellow-500"
  }];
  return <DashboardLayout>
      <div className="space-y-8">
        <div className="mb-2">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="relative w-5 h-5 flex-shrink-0">
              <Loader2 className="w-5 h-5 text-green-500 animate-spin absolute" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-green-500 font-bold text-[8px]">IA</span>
              </div>
            </div>
            <span className="text-white/70 text-sm">
              Dernière mise à jour IA : {currentTime.toLocaleTimeString('fr-FR', {
              hour: '2-digit',
              minute: '2-digit'
            })}
            </span>
          </div>
        </div>

        {/* ST. LOUIS vs PITTSBURGH CARD */}
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
                <span className="text-white font-semibold text-center text-[10px]">2843 DONNÉES ANALYSÉES PAR NOTRE IA POUR CE BET</span>
              </div>

              {/* AI Analysis */}
              <div className="flex items-center justify-between gap-2 text-xs py-[10px] bg-green-600 px-4">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-4xl">92%</span>
                  <span className="text-white text-xs font-bold">DE CHANCE DE GAGNER SELON NOTRE IA</span>
                </div>
                <button onClick={handleShowAnalysisStLouis} className="px-3 py-1 bg-black rounded border-2 border-green-600 font-bold text-green-400 text-xs hover:bg-green-600/20 transition-colors">
                  VOIR ANALYSE IA
                </button>

                {/* Loading Dialog */}
                <Dialog open={isLoadingDialogOpenStLouis} onOpenChange={setIsLoadingDialogOpenStLouis}>
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
                          <span className="animate-bounce" style={{
                          animationDelay: '0ms',
                          animationDuration: '1.4s'
                        }}>.</span>
                          <span className="animate-bounce" style={{
                          animationDelay: '200ms',
                          animationDuration: '1.4s'
                        }}>.</span>
                          <span className="animate-bounce" style={{
                          animationDelay: '400ms',
                          animationDuration: '1.4s'
                        }}>.</span>
                        </span>
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Analysis Dialog - ST. LOUIS */}
                <Dialog open={isAnalysisDialogOpenStLouis} onOpenChange={setIsAnalysisDialogOpenStLouis}>
                  <DialogContent className="sm:max-w-2xl bg-black border-[3px] border-green-600 p-0 max-h-[90vh] overflow-y-auto">
                    <div className="bg-black/40">
                      <div className="flex items-center justify-center gap-3 py-2 px-6">
                        <div className="relative w-6 h-6 flex-shrink-0">
                          <Loader2 className="w-6 h-6 text-white animate-spin absolute" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white font-bold text-[8px]">IA</span>
                          </div>
                        </div>
                        <span className="text-white font-semibold text-center text-xs">2843 DONNÉES ANALYSÉ PAR NOTRE IA POUR CE BET JUSQU'À PRÉSENT</span>
                      </div>
                      <div className="text-center pb-2 px-6 flex items-center justify-center gap-2">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-white/70 text-sm">
                          Dernière mise à jour IA : {currentTime.toLocaleTimeString('fr-FR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                        </span>
                      </div>
                    </div>

                    <div className="px-6 pb-6">
                      {showAnalysisStLouis && <div className="mt-4 space-y-4 animate-fade-in">
                          {/* AI Confidence Section */}
                          <div className="bg-green-600/15 border-2 border-green-600 rounded-lg p-4">
                            <div className="text-center space-y-2">
                              <div className="text-white font-bold text-sm">CHANCE DE GAGNER</div>
                              <div className="text-green-400 font-bold text-4xl">92%</div>
                              <div className="text-white/70 text-xs">STATISTIQUEMENT AVEC TOUTES CES DONNÉES CI-DESSOUS ANALYSÉES</div>
                            </div>
                            <div className="w-full bg-black/40 rounded-full h-3 overflow-hidden mt-3">
                              <div className="bg-green-600 h-full rounded-full" style={{
                            width: '92%'
                          }}></div>
                            </div>
                          </div>

                          {/* Detailed analysis sections for ST. LOUIS vs PITTSBURGH */}
                          <div className="bg-black/20 rounded-lg p-4 border border-green-600">
                            <h3 className="text-white font-bold mb-2">Analyse Personnalisée</h3>
                            <ul className="list-disc list-inside text-white/80 text-sm space-y-1">
                              <li>St. Louis a une défense solide avec un taux de réussite de 85% dans les derniers matchs.</li>
                              <li>Pittsburgh a montré une attaque agressive mais une défense vulnérable sur les contre-attaques.</li>
                              <li>Notre IA recommande Pittsburgh avec une confiance élevée basée sur les données récentes.</li>
                              <li>Expert Picks: 1 expert recommande Pittsburgh pour ce match.</li>
                            </ul>
                          </div>

                          <div className="mt-3 pt-3 border-t border-white/10">
                            <p className="text-white/60 text-[10px] italic text-center flex items-center justify-center gap-2">
                              L'ÉTAT DE NOTRE IA : <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> RÉSULTAT À JOUR À L'INSTANT MÊME
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
                    x{multiplierStLouis.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Match Details */}
              <div className="text-center space-y-2 pt-4 pb-4">
                <div className="text-sm font-bold text-white tracking-wider mb-2">
                  PARIER SUR
                </div>
                
                {/* Teams and VS */}
                <div className="grid grid-cols-3 items-center justify-items-center gap-4 px-4">
                  {/* ST. LOUIS */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-white/20 p-2">
                      <img src={stlouisLogo} alt="St. Louis" className="w-full h-full object-contain" />
                    </div>
                    <span className="font-bold text-xs text-white">ST. LOUIS</span>
                  </div>

                  {/* Center time + VS */}
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-semibold text-sm text-white">7:00 PM</span>
                    <div className="px-2 py-0.5 rounded-full border border-white/20 bg-white/0">
                      <span className="text-white font-bold text-xs">VS</span>
                    </div>
                  </div>

                  {/* PITTSBURGH */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="bg-green-600/15 border-2 border-green-600 rounded-sm p-2 flex flex-col items-center justify-center gap-1.5 py-[6px] px-[5px]">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-2">
                        <img src={pittsburghLogo} alt="Pittsburgh" className="w-full h-full object-contain" />
                      </div>
                      <span className="text-white -bottom-0.5 text-xs font-extrabold">PITTSBURGH</span>
                      <div className="text-xs font-bold text-green-400">VICTOIRE</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bet Amount & Payout */}
              <div className="flex justify-center py-0">
                <div className="text-sm font-bold text-white tracking-wider text-center">
                  VOTRE GAIN
                </div>
              </div>

              <div className="pt-1">
                <div className="grid grid-cols-2 gap-2 px-[10px] my-[15px]">
                  <Dialog open={isDialogOpenStLouis} onOpenChange={setIsDialogOpenStLouis}>
                    <DialogTrigger asChild>
                      <button className="px-4 py-3 bg-transparent border-2 border-green-600/40 rounded-sm text-center hover:bg-white/5 transition-colors cursor-pointer">
                        <div className="text-white text-xs mb-1">Votre mise</div>
                        <div className="text-green-400 font-bold text-lg">${betAmountStLouis}</div>
                        <div className="text-WHITE text-xs mt-1 font-semibold px-[5px]">Modifier</div>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md bg-black border-green-600">
                      <DialogHeader>
                        <DialogTitle className="text-white text-center">Modifier votre mise</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-4 gap-2">
                          {[10, 20, 50, 100, 150, 200, 500].map(amount => <button key={amount} onClick={() => {
                          setBetAmountStLouis(amount.toString());
                          setIsDialogOpenStLouis(false);
                        }} className={`px-3 py-2 rounded-2xl text-sm font-semibold transition-colors ${betAmountStLouis === amount.toString() ? 'bg-primary text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                              ${amount}
                            </button>)}
                          <button onClick={() => {
                          const custom = prompt("Entrez le montant:");
                          if (custom && parseFloat(custom) > 0) {
                            setBetAmountStLouis(custom);
                            setIsDialogOpenStLouis(false);
                          }
                        }} className="px-3 py-2 rounded-2xl text-sm font-semibold bg-white/10 text-white hover:bg-white/20">
                            Autre
                          </button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <div className="bg-green-600/15 border-2 border-green-600 rounded-sm text-center py-[25px] px-0">
                    <div className="text-white text-xs mb-1">Cashout x{multiplierStLouis.toFixed(2)} →</div>
                    <div className="text-green-400 font-bold text-lg">${calculateReturn(betAmountStLouis, multiplierStLouis)}</div>
                    <div className="text-white text-[10px] mt-0.5">
                      +${(parseFloat(calculateReturn(betAmountStLouis, multiplierStLouis)) - parseFloat(betAmountStLouis)).toFixed(2)} bénéfice
                    </div>
                  </div>
                </div>
              </div>

              {/* DraftKings Section */}
              <div className="pt-0">
                <div className="flex items-center justify-center gap-2 text-xs my-0 py-[10px] border-t-2 border-green-600 bg-green-600">
                  <div className="relative w-5 h-5 flex-shrink-0">
                    <Loader2 className="w-5 h-5 text-white animate-spin absolute" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-[8px]">IA</span>
                    </div>
                  </div>
                  <span className="text-white">Meilleur odds:</span>
                  <span className="font-bold text-white">DRAFTKINGS</span>
                  <span className="px-2 py-1 bg-black rounded border-2 border-green-600 font-bold text-green-400">-105</span>
                </div>
                <div className="text-center py-2 px-4">
                  <p className="text-white/60 text-[10px]">(L'IA regarde tous les sites pour trouver le meilleur odds pour ce bet.)</p>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* VEGAS vs TAMPA BAY CARD */}
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
                <span className="text-white font-semibold text-center text-[10px]">2857 DONNÉES ANALYSÉES PAR NOTRE IA POUR CE BET</span>
              </div>

              {/* AI Analysis */}
              <div className="flex items-center justify-between gap-2 text-xs py-[10px] bg-green-600 px-4">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-4xl">92%</span>
                  <span className="text-white text-xs font-bold">DE CHANCE DE GAGNER SELON NOTRE IA</span>
                </div>
                <button onClick={handleShowAnalysisVegas} className="px-3 py-1 bg-black rounded border-2 border-green-600 font-bold text-green-400 text-xs hover:bg-green-600/20 transition-colors">
                  VOIR ANALYSE IA
                </button>

                {/* Loading Dialog */}
                <Dialog open={isLoadingDialogOpenVegas} onOpenChange={setIsLoadingDialogOpenVegas}>
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
                          <span className="animate-bounce" style={{
                          animationDelay: '0ms',
                          animationDuration: '1.4s'
                        }}>.</span>
                          <span className="animate-bounce" style={{
                          animationDelay: '200ms',
                          animationDuration: '1.4s'
                        }}>.</span>
                          <span className="animate-bounce" style={{
                          animationDelay: '400ms',
                          animationDuration: '1.4s'
                        }}>.</span>
                        </span>
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Analysis Dialog - VEGAS */}
                <Dialog open={isAnalysisDialogOpenVegas} onOpenChange={setIsAnalysisDialogOpenVegas}>
                  <DialogContent className="sm:max-w-2xl bg-black border-[3px] border-green-600 p-0 max-h-[90vh] overflow-y-auto">
                    <div className="bg-black/40">
                      <div className="flex items-center justify-center gap-3 py-2 px-6">
                        <div className="relative w-6 h-6 flex-shrink-0">
                          <Loader2 className="w-6 h-6 text-white animate-spin absolute" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white font-bold text-[8px]">IA</span>
                          </div>
                        </div>
                        <span className="text-white font-semibold text-center text-xs">2857 DONNÉES ANALYSÉ PAR NOTRE IA POUR CE BET JUSQU'À PRÉSENT</span>
                      </div>
                      <div className="text-center pb-2 px-6 flex items-center justify-center gap-2">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-white/70 text-sm">
                          Dernière mise à jour IA : {currentTime.toLocaleTimeString('fr-FR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                        </span>
                      </div>
                    </div>

                    <div className="px-6 pb-6">
                      {showAnalysisVegas && <div className="mt-4 space-y-4 animate-fade-in">
                          {/* AI Confidence Section */}
                          <div className="bg-green-600/15 border-2 border-green-600 rounded-lg p-4">
                            <div className="text-center space-y-2">
                              <div className="text-white font-bold text-sm">CHANCE DE GAGNER</div>
                              <div className="text-green-400 font-bold text-4xl">92%</div>
                              <div className="text-white/70 text-xs">STATISTIQUEMENT AVEC TOUTES CES DONNÉES CI-DESSOUS ANALYSÉES</div>
                            </div>
                            <div className="w-full bg-black/40 rounded-full h-3 overflow-hidden mt-3">
                              <div className="bg-green-600 h-full rounded-full" style={{
                            width: '92%'
                          }}></div>
                            </div>
                          </div>

                          {/* Detailed analysis sections for VEGAS vs TAMPA BAY */}
                          <div className="bg-black/20 rounded-lg p-4 border border-green-600">
                            <h3 className="text-white font-bold mb-2">Analyse Personnalisée</h3>
                            <ul className="list-disc list-inside text-white/80 text-sm space-y-1">
                              <li>Vegas a une attaque puissante mais une défense moyenne.</li>
                              <li>Tampa Bay a une défense solide et une bonne gestion du jeu.</li>
                              <li>Notre IA recommande Tampa Bay avec une confiance élevée basée sur les données récentes.</li>
                              <li>Expert Picks: 2 experts recommandent Tampa Bay pour ce match.</li>
                            </ul>
                          </div>

                          <div className="mt-3 pt-3 border-t border-white/10">
                            <p className="text-white/60 text-[10px] italic text-center flex items-center justify-center gap-2">
                              L'ÉTAT DE NOTRE IA : <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> RÉSULTAT À JOUR À L'INSTANT MÊME
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
                    x{multiplierVegas.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Match Details */}
              <div className="text-center space-y-2 pt-4 pb-4">
                <div className="text-sm font-bold text-white tracking-wider mb-2">
                  PARIER SUR
                </div>
                
                {/* Teams and VS */}
                <div className="grid grid-cols-3 items-center justify-items-center gap-4 px-4">
                  {/* VEGAS */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-white/20 p-2">
                      <img src={vegasLogo} alt="Vegas" className="w-full h-full object-contain" />
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

                  {/* TAMPA BAY */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="bg-green-600/15 border-2 border-green-600 rounded-sm p-2 flex flex-col items-center justify-center gap-1.5 py-[6px] px-[17px]">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-2">
                        <img src={tampaLogo} alt="Tampa Bay" className="w-full h-full object-contain" />
                      </div>
                      <span className="text-white -bottom-0.5 text-xs font-extrabold">TAMPA BAY</span>
                      <div className="text-xs font-bold text-green-400">VICTOIRE</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bet Amount & Payout */}
              <div className="flex justify-center py-0">
                <div className="text-sm font-bold text-white tracking-wider text-center">
                  VOTRE GAIN
                </div>
              </div>

              <div className="pt-1">
                <div className="grid grid-cols-2 gap-2 px-[10px] my-[15px]">
                  <Dialog open={isDialogOpenVegas} onOpenChange={setIsDialogOpenVegas}>
                    <DialogTrigger asChild>
                      <button className="px-4 py-3 bg-transparent border-2 border-green-600/40 rounded-sm text-center hover:bg-white/5 transition-colors cursor-pointer">
                        <div className="text-white text-xs mb-1">Votre mise</div>
                        <div className="text-green-400 font-bold text-lg">${betAmountVegas}</div>
                        <div className="text-WHITE text-xs mt-1 font-semibold px-[5px]">Modifier</div>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md bg-black border-green-600">
                      <DialogHeader>
                        <DialogTitle className="text-white text-center">Modifier votre mise</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-4 gap-2">
                          {[10, 20, 50, 100, 150, 200, 500].map(amount => <button key={amount} onClick={() => {
                          setBetAmountVegas(amount.toString());
                          setIsDialogOpenVegas(false);
                        }} className={`px-3 py-2 rounded-2xl text-sm font-semibold transition-colors ${betAmountVegas === amount.toString() ? 'bg-primary text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                              ${amount}
                            </button>)}
                          <button onClick={() => {
                          const custom = prompt("Entrez le montant:");
                          if (custom && parseFloat(custom) > 0) {
                            setBetAmountVegas(custom);
                            setIsDialogOpenVegas(false);
                          }
                        }} className="px-3 py-2 rounded-2xl text-sm font-semibold bg-white/10 text-white hover:bg-white/20">
                            Autre
                          </button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <div className="bg-green-600/15 border-2 border-green-600 rounded-sm text-center py-[25px] px-0">
                    <div className="text-white text-xs mb-1">Cashout x{multiplierVegas.toFixed(2)} →</div>
                    <div className="text-green-400 font-bold text-lg">${calculateReturn(betAmountVegas, multiplierVegas)}</div>
                    <div className="text-white text-[10px] mt-0.5">
                      +${(parseFloat(calculateReturn(betAmountVegas, multiplierVegas)) - parseFloat(betAmountVegas)).toFixed(2)} bénéfice
                    </div>
                  </div>
                </div>
              </div>

              {/* DraftKings Section */}
              <div className="pt-0">
                <div className="flex items-center justify-center gap-2 text-xs my-0 py-[10px] border-t-2 border-green-600 bg-green-600">
                  <div className="relative w-5 h-5 flex-shrink-0">
                    <Loader2 className="w-5 h-5 text-white animate-spin absolute" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-[8px]">IA</span>
                    </div>
                  </div>
                  <span className="text-white">Meilleur odds:</span>
                  <span className="font-bold text-white">DRAFTKINGS</span>
                  <span className="px-2 py-1 bg-black rounded border-2 border-green-600 font-bold text-green-400">-135</span>
                </div>
                <div className="text-center py-2 px-4">
                  <p className="text-white/60 text-[10px]">(L'IA regarde tous les sites pour trouver le meilleur odds pour ce bet.)</p>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Paris Recommandés
          </h1>
          <p className="text-white/70 text-lg">
            Découvrez nos pronostics avec les meilleures cotes
          </p>
        </div>

        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Tableau de Bord
          </h1>
          <p className="text-muted-foreground text-lg">
            Bienvenue sur votre dashboard de paris sportifs
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map(stat => {
          const Icon = stat.icon;
          return <Card key={stat.title} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <CardDescription className="text-xs mt-1">
                    {stat.description}
                  </CardDescription>
                </CardContent>
              </Card>;
        })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Performance Récente</CardTitle>
              <CardDescription>Vos derniers résultats</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[{
                match: "PSG vs Lyon",
                result: "Gagné",
                amount: "+150€"
              }, {
                match: "Real vs Atlético",
                result: "Gagné",
                amount: "+180€"
              }, {
                match: "Bayern vs Leipzig",
                result: "Perdu",
                amount: "-100€"
              }, {
                match: "Chelsea vs Arsenal",
                result: "Gagné",
                amount: "+200€"
              }].map((bet, i) => <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium">{bet.match}</p>
                      <p className="text-sm text-muted-foreground">{bet.result}</p>
                    </div>
                    <span className={`font-bold ${bet.result === "Gagné" ? "text-primary" : "text-destructive"}`}>
                      {bet.amount}
                    </span>
                  </div>)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Prochains Matchs</CardTitle>
              <CardDescription>Paris recommandés aujourd'hui</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[{
                match: "Barcelona vs Real Madrid",
                time: "21:00",
                odds: "2.10"
              }, {
                match: "Man City vs Liverpool",
                time: "18:30",
                odds: "1.85"
              }, {
                match: "Juventus vs Milan",
                time: "20:45",
                odds: "1.95"
              }].map((match, i) => <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium">{match.match}</p>
                      <p className="text-sm text-muted-foreground">{match.time}</p>
                    </div>
                    <span className="font-bold text-primary text-lg">
                      {match.odds}
                    </span>
                  </div>)}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>;
};
export default Index;