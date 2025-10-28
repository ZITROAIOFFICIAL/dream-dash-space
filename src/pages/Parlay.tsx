import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardHeader } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import washingtonLogo from "@/assets/washington-logo.png";
import kansascityLogo from "@/assets/kansascity-logo.png";
import stlouisLogo from "@/assets/stlouis-logo-new.png";
import pittsburghLogo from "@/assets/pittsburgh-logo-new.png";
import vegasLogo from "@/assets/vegas-logo.png";
import tampaLogo from "@/assets/tampa-logo.png";
import nflLogo from "@/assets/nfl-logo.png";
import nhlLogo from "@/assets/nhl-logo.png";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Parlay = () => {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dataCountParlayNFL, setDataCountParlayNFL] = useState(12456);
  const [dataCountParlayNHL, setDataCountParlayNHL] = useState(9823);
  
  // Filter states
  const [selectedLeague, setSelectedLeague] = useState<string>('all');
  const [sortByMultiplier, setSortByMultiplier] = useState<string>('high');
  const [sortByAI, setSortByAI] = useState<string>('high');
  const [lastSortKey, setLastSortKey] = useState<'ai' | 'multiplier'>('ai');

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
      setDataCountParlayNFL(prev => prev + Math.floor(Math.random() * 3) + 1);
      setDataCountParlayNHL(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 120000);
    return () => clearInterval(dataTimer);
  }, []);

  // States for Parlay NFL
  const [betAmountParlayNFL, setBetAmountParlayNFL] = useState<string>("100");
  const [isDialogOpenParlayNFL, setIsDialogOpenParlayNFL] = useState(false);
  const [showAnalysisParlayNFL, setShowAnalysisParlayNFL] = useState(false);
  const [isLoadingDialogOpenParlayNFL, setIsLoadingDialogOpenParlayNFL] = useState(false);
  const [isAnalysisDialogOpenParlayNFL, setIsAnalysisDialogOpenParlayNFL] = useState(false);

  // States for Parlay NHL
  const [betAmountParlayNHL, setBetAmountParlayNHL] = useState<string>("100");
  const [isDialogOpenParlayNHL, setIsDialogOpenParlayNHL] = useState(false);
  const [showAnalysisParlayNHL, setShowAnalysisParlayNHL] = useState(false);
  const [isLoadingDialogOpenParlayNHL, setIsLoadingDialogOpenParlayNHL] = useState(false);
  const [isAnalysisDialogOpenParlayNHL, setIsAnalysisDialogOpenParlayNHL] = useState(false);

  // Parlay NFL calculations - UNDER 50.5 (-110), Spread +3.5 (-120)
  const multiplierNFLUnder = 1 + 100 / 110;
  const multiplierNFLSpread = 1 + 100 / 120;
  const totalMultiplierNFL = multiplierNFLUnder * multiplierNFLSpread;

  // Parlay NHL calculations - Pittsburgh ML (+140), Vegas +1.5 (-135), St. Louis ML (-105)
  const multiplierPittsburgh = 1 + 140 / 100;
  const multiplierVegas = 1 + 100 / 135;
  const multiplierStLouis = 1 + 100 / 105;
  const totalMultiplierNHL = multiplierPittsburgh * multiplierVegas * multiplierStLouis;

  const calculateReturn = (amount: string, multiplier: number) => {
    const numAmount = parseFloat(amount) || 0;
    return (numAmount * multiplier).toFixed(2);
  };

  const shouldShowCard = (league: 'NHL' | 'NFL') => {
    if (selectedLeague !== 'all' && selectedLeague !== league) return false;
    return true;
  };

  // Prepare cards with their data
  const cards = [
    { league: 'NFL', multiplier: totalMultiplierNFL, aiPercent: 87, show: shouldShowCard('NFL') },
    { league: 'NHL', multiplier: totalMultiplierNHL, aiPercent: 94, show: shouldShowCard('NHL') }
  ].filter(card => card.show);

  // Sort cards based on the last changed sort control
  let sortedCards = [...cards];
  if (lastSortKey === 'ai') {
    if (sortByAI === 'high') {
      sortedCards.sort((a, b) => b.aiPercent - a.aiPercent);
    } else {
      sortedCards.sort((a, b) => a.aiPercent - b.aiPercent);
    }
  } else {
    if (sortByMultiplier === 'high') {
      sortedCards.sort((a, b) => b.multiplier - a.multiplier);
    } else {
      sortedCards.sort((a, b) => a.multiplier - b.multiplier);
    }
  }

  const showNFL = sortedCards.some(c => c.league === 'NFL');
  const showNHL = sortedCards.some(c => c.league === 'NHL');
  const nflIndex = sortedCards.findIndex(c => c.league === 'NFL');
  const nhlIndex = sortedCards.findIndex(c => c.league === 'NHL');
  const hasVisibleCards = sortedCards.length > 0;

  const handleShowAnalysisParlayNFL = () => {
    setIsLoadingDialogOpenParlayNFL(true);
    const randomDelay = Math.random() * (5000 - 1500) + 1500;
    setTimeout(() => {
      setIsLoadingDialogOpenParlayNFL(false);
      setIsAnalysisDialogOpenParlayNFL(true);
      setShowAnalysisParlayNFL(true);
    }, randomDelay);
  };

  const handleShowAnalysisParlayNHL = () => {
    setIsLoadingDialogOpenParlayNHL(true);
    const randomDelay = Math.random() * (5000 - 1500) + 1500;
    setTimeout(() => {
      setIsLoadingDialogOpenParlayNHL(false);
      setIsAnalysisDialogOpenParlayNHL(true);
      setShowAnalysisParlayNHL(true);
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

        {/* Filters Section */}
        <div className="max-w-md mx-auto mb-8 space-y-3">
          {/* Sport Filter */}
          <div>
            <label className="text-white text-xs font-bold mb-1.5 block">SPORT</label>
            <Select value={selectedLeague} onValueChange={setSelectedLeague}>
              <SelectTrigger className="w-full bg-black border-2 border-green-600 text-white hover:border-green-500 transition-colors">
                <SelectValue placeholder="Sport" />
              </SelectTrigger>
              <SelectContent className="bg-black border-2 border-white/20 z-50">
                <SelectItem value="all" className="text-white hover:bg-green-600/20 focus:bg-green-600/20">Tous les sports</SelectItem>
                <SelectItem value="NHL" className="text-white hover:bg-green-600/20 focus:bg-green-600/20">NHL</SelectItem>
                <SelectItem value="NFL" className="text-white hover:bg-green-600/20 focus:bg-green-600/20">NFL</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort by Multiplier */}
          <div>
            <label className="text-white text-xs font-bold mb-1.5 block">MULTIPLICATEUR DE MISE</label>
            <Select value={sortByMultiplier} onValueChange={(v) => { setSortByMultiplier(v); setLastSortKey('multiplier'); }}>
              <SelectTrigger className="w-full bg-black border-2 border-green-600 text-white hover:border-green-500 transition-colors">
                <SelectValue placeholder="Multiplicateur de mise" />
              </SelectTrigger>
              <SelectContent className="bg-black border-2 border-white/20 z-50">
                <SelectItem value="high" className="text-white hover:bg-green-600/20 focus:bg-green-600/20">Plus haut multiplicateur</SelectItem>
                <SelectItem value="low" className="text-white hover:bg-green-600/20 focus:bg-green-600/20">Plus bas multiplicateur</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort by AI % */}
          <div>
            <label className="text-white text-xs font-bold mb-1.5 block">% DE CHANCE DE GAGNER SELON IA</label>
            <Select value={sortByAI} onValueChange={(v) => { setSortByAI(v); setLastSortKey('ai'); }}>
              <SelectTrigger className="w-full bg-black border-2 border-green-600 text-white hover:border-green-500 transition-colors">
                <SelectValue placeholder="Chance de gagner IA %" />
              </SelectTrigger>
              <SelectContent className="bg-black border-2 border-white/20 z-50">
                <SelectItem value="high" className="text-white hover:bg-green-600/20 focus:bg-green-600/20">Plus haut %</SelectItem>
                <SelectItem value="low" className="text-white hover:bg-green-600/20 focus:bg-green-600/20">Plus bas %</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* No Results Message */}
        {!hasVisibleCards && (
          <div className="text-center py-12">
            <p className="text-white/70">Aucun parlay ne correspond à vos critères de recherche</p>
          </div>
        )}

        {/* Cards Container with Flex for ordering */}
        <div className="flex flex-col gap-8">
          {/* PARLAY NFL */}
          {showNFL && nflIndex !== -1 && (
          <div className="grid gap-0.5 justify-center" style={{ order: nflIndex }}>
          {/* AI Data Analysis Counter - Outside card */}
          <div className="flex items-center justify-center gap-3 px-4 pt-[5px] pb-2 bg-black w-full max-w-md mx-auto">
            <div className="relative w-6 h-6 flex-shrink-0">
              <Loader2 className="w-6 h-6 text-white animate-spin absolute" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-[8px]">IA</span>
              </div>
            </div>
            <span className="text-white font-semibold text-center text-[10px]">{dataCountParlayNFL.toLocaleString()} DONNÉES ANALYSÉES PAR NOTRE IA POUR CE PARLAY NFL</span>
          </div>
          
          <Card className="w-full max-w-md bg-black shadow-2xl overflow-hidden mx-auto rounded-lg -mt-2">
            <CardHeader className="space-y-0 p-0">

              {/* AI Analysis */}
              <div className="flex items-center justify-between gap-2 text-xs py-[10px] bg-green-600 px-4">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-4xl">87%</span>
                  <span className="text-white text-xs font-bold">DE CHANCE DE GAGNER SELON NOTRE IA</span>
                </div>
                <button
                  onClick={handleShowAnalysisParlayNFL}
                  className="px-3 py-1 bg-black rounded border-2 border-green-600 font-bold text-green-400 text-xs hover:bg-green-600/20 transition-colors"
                >
                  VOIR ANALYSE IA
                </button>

                {/* Loading Dialog */}
                <Dialog open={isLoadingDialogOpenParlayNFL} onOpenChange={setIsLoadingDialogOpenParlayNFL}>
                  <DialogContent className="sm:max-w-md bg-black border-none p-0 flex items-center justify-center [&>button]:hidden">
                    <DialogTitle className="sr-only">Chargement de l'analyse IA</DialogTitle>
                    <DialogDescription className="sr-only">Veuillez patienter pendant que nous chargeons l'analyse IA pour ce parlay NFL.</DialogDescription>
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

                {/* Analysis Dialog for Parlay NFL */}
                <Dialog open={isAnalysisDialogOpenParlayNFL} onOpenChange={setIsAnalysisDialogOpenParlayNFL}>
                  <DialogContent className="sm:max-w-2xl bg-black border-[3px] border-green-600 p-0 max-h-[90vh] overflow-y-auto">
                    <DialogTitle className="sr-only">Analyse IA du Parlay NFL</DialogTitle>
                    <DialogDescription className="sr-only">Analyse détaillée de l'IA pour ce parlay NFL incluant les probabilités et facteurs clés.</DialogDescription>
                    <div className="bg-black/40">
                      <div className="flex items-center justify-center gap-3 py-2 px-6">
                        <div className="relative w-6 h-6 flex-shrink-0">
                          <Loader2 className="w-6 h-6 text-white animate-spin absolute" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white font-bold text-[8px]">IA</span>
                          </div>
                        </div>
                        <span className="text-white font-semibold text-center text-xs">{dataCountParlayNFL.toLocaleString()} DONNÉES ANALYSÉ PAR NOTRE IA POUR CE PARLAY NFL JUSQU'À PRÉSENT</span>
                      </div>
                      <div className="text-center pb-2 px-6 flex items-center justify-center gap-2">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-white/70 text-sm">
                          Dernière mise à jour IA : {currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>

                    <div className="px-6 pb-6">
                      {showAnalysisParlayNFL && (
                        <div className="mt-4 space-y-4 animate-fade-in">
                          <div className="bg-green-600/15 border-2 border-green-600 rounded-lg p-4">
                            <div className="text-center space-y-2">
                              <div className="text-white font-bold text-sm">CHANCE DE GAGNER</div>
                              <div className="text-green-400 font-bold text-4xl">87%</div>
                              <div className="text-white/70 text-xs">STATISTIQUEMENT AVEC TOUTES CES DONNÉES CI-DESSOUS ANALYSÉES</div>
                            </div>
                            <div className="w-full bg-black/40 rounded-full h-3 overflow-hidden mt-3">
                              <div className="bg-green-600 h-full rounded-full" style={{ width: '87%' }}></div>
                            </div>
                          </div>

                          <div className="space-y-6">
                            {/* Section 1 - Analyse du marché */}
                            <h3 className="text-white font-bold text-lg mb-3">
                              Analyse du marché & meilleures cotes
                            </h3>
                            
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <div className="relative w-5 h-5 flex-shrink-0">
                                  <Loader2 className="w-5 h-5 text-white animate-spin absolute" />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-white font-bold text-[7px]">IA</span>
                                  </div>
                                </div>
                                <div className="bg-green-600/10 border-2 border-green-600 rounded-lg p-4 flex-1">
                                  <p className="text-white/80 text-sm">• Analyse de la probabilité implicite du marché pour chaque pari, obtenue par conversion des cotes en pourcentage réel.</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="relative w-5 h-5 flex-shrink-0">
                                  <Loader2 className="w-5 h-5 text-white animate-spin absolute" />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-white font-bold text-[7px]">IA</span>
                                  </div>
                                </div>
                                <div className="bg-green-600/10 border-2 border-green-600 rounded-lg p-4 flex-1">
                                  <p className="text-white/80 text-sm">• Comparaison inter-bookmakers pour identifier la meilleure cote disponible ("best price") et mesurer l'efficience du marché.</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="relative w-5 h-5 flex-shrink-0">
                                  <Loader2 className="w-5 h-5 text-white animate-spin absolute" />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-white font-bold text-[7px]">IA</span>
                                  </div>
                                </div>
                                <div className="bg-green-600/10 border-2 border-green-600 rounded-lg p-4 flex-1">
                                  <p className="text-white/80 text-sm">• Observation du mouvement de ligne (line movement) afin d'évaluer si la cote se renforce ou se détériore avec l'arrivée du sharp money.</p>
                                </div>
                              </div>
                            </div>

                            <div className="border-t border-white/10 my-6"></div>

                            {/* Section 2 - Historique H2H */}
                            <h3 className="text-white font-bold text-lg mb-3">
                              Historique des confrontations (H2H)
                            </h3>
                            
                            <div className="flex items-center gap-3">
                              <div className="relative w-5 h-5 flex-shrink-0">
                                <Loader2 className="w-5 h-5 text-white animate-spin absolute" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-white font-bold text-[7px]">IA</span>
                                </div>
                              </div>
                              <div className="bg-green-600/10 border-2 border-green-600 rounded-lg p-4 flex-1">
                                <h4 className="text-white font-bold text-sm mb-2">Analyse — Historique des confrontations (H2H)</h4>
                                <p className="text-white/80 text-sm">
                                  Analyse des duels précédents entre les équipes concernées, incluant les tendances récurrentes des matchups, la nature des rencontres (défensives, explosives, possession longue ou big plays), ainsi que les patterns stratégiques qui se répètent historiquement lorsque ces franchises se rencontrent.
                                </p>
                              </div>
                            </div>

                            <div className="border-t border-white/10 my-6"></div>

                            {/* Section 3 - Lineup projeté */}
                            <h3 className="text-white font-bold text-lg mb-3">
                              Lineup / alignement projeté du jour
                            </h3>
                            
                            <div className="flex items-center gap-3">
                              <div className="relative w-5 h-5 flex-shrink-0">
                                <Loader2 className="w-5 h-5 text-white animate-spin absolute" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-white font-bold text-[7px]">IA</span>
                                </div>
                              </div>
                              <div className="bg-green-600/10 border-2 border-green-600 rounded-lg p-4 flex-1">
                                <h4 className="text-white font-bold text-sm mb-2">Analyse — Alignement projeté du jour</h4>
                                <p className="text-white/80 text-sm">
                                  Analyse de la composition prévue pour chaque équipe, incluant l'état du roster offensif et défensif, les joueurs clés disponibles ou incertains, le statut du quarterback, ainsi que l'impact tactique attendu de l'alignement projeté sur le plan de match initial.
                                </p>
                              </div>
                            </div>

                            <div className="border-t border-white/10 my-6"></div>

                            {/* Section 4 - Jeu offensif */}
                            <h3 className="text-white font-bold text-lg mb-3">
                              Analyse du jeu offensif & discipline offensive
                            </h3>
                            
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <div className="relative w-5 h-5 flex-shrink-0">
                                  <Loader2 className="w-5 h-5 text-white animate-spin absolute" />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-white font-bold text-[7px]">IA</span>
                                  </div>
                                </div>
                                <div className="bg-green-600/10 border-2 border-green-600 rounded-lg p-4 flex-1">
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Passing Game</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse de l'efficacité aérienne, incluant l'EPA par passe, la capacité à générer des jeux explosifs (explosive pass rate), la séparation des receveurs et la réussite sur 3rd down.
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-3">
                                <div className="relative w-5 h-5 flex-shrink-0">
                                  <Loader2 className="w-5 h-5 text-white animate-spin absolute" />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-white font-bold text-[7px]">IA</span>
                                  </div>
                                </div>
                                <div className="bg-green-600/10 border-2 border-green-600 rounded-lg p-4 flex-1">
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Rushing Game</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse du jeu au sol, incluant les yards par carry, le taux de réussite au sol, la qualité du blocking et l'utilisation stratégique du run pour contrôler le clock et ouvrir le play-action.
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="border-t border-white/10 my-6"></div>

                            {/* Section 5 - Jeu défensif */}
                            <h3 className="text-white font-bold text-lg mb-3">
                              Analyse du jeu défensif & discipline défensive
                            </h3>
                            
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <div className="relative w-5 h-5 flex-shrink-0">
                                  <Loader2 className="w-5 h-5 text-white animate-spin absolute" />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-white font-bold text-[7px]">IA</span>
                                  </div>
                                </div>
                                <div className="bg-green-600/10 border-2 border-green-600 rounded-lg p-4 flex-1">
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Pass Rush</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse de la pression défensive, incluant le taux de sacks, la qualité du pass rush, les pressures générées et l'efficacité des blitzes.
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-3">
                                <div className="relative w-5 h-5 flex-shrink-0">
                                  <Loader2 className="w-5 h-5 text-white animate-spin absolute" />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-white font-bold text-[7px]">IA</span>
                                  </div>
                                </div>
                                <div className="bg-green-600/10 border-2 border-green-600 rounded-lg p-4 flex-1">
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Run Defense</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse de la défense contre le jeu au sol, incluant les yards per carry autorisés, le stuff rate et la capacité à stopper le run en situations clés.
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="border-t border-white/10 my-6"></div>

                            {/* Section 6 - Contexte */}
                            <h3 className="text-white font-bold text-lg mb-3">
                              Analyse du contexte & facteurs externes
                            </h3>
                            
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <div className="relative w-5 h-5 flex-shrink-0">
                                  <Loader2 className="w-5 h-5 text-white animate-spin absolute" />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-white font-bold text-[7px]">IA</span>
                                  </div>
                                </div>
                                <div className="bg-green-600/10 border-2 border-green-600 rounded-lg p-4 flex-1">
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Weather & conditions</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse de l'impact météorologique, incluant le vent, la pluie, la température et leur influence sur le passing game et le kicking game.
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-3">
                                <div className="relative w-5 h-5 flex-shrink-0">
                                  <Loader2 className="w-5 h-5 text-white animate-spin absolute" />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-white font-bold text-[7px]">IA</span>
                                  </div>
                                </div>
                                <div className="bg-green-600/10 border-2 border-green-600 rounded-lg p-4 flex-1">
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Momentum & trends</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse de l'élan récent de chaque équipe, des séries de victoires ou défaites, de l'importance stratégique du match (playoffs, division, wild card) et de l'impact psychologique du contexte.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 pt-3 border-t border-white/10">
                            <p className="text-white/60 text-[10px] italic text-center flex items-center justify-center gap-2">
                              L'ÉTAT DE NOTRE IA : <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> RÉSULTAT À JOUR À L'INSTANT MÊME
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Middle section with vertical borders */}
              <div className="border-x-[2px] border-green-600">
                {/* Odds Display */}
                <div className="flex justify-center pt-5 pb-0">
                  <div className="text-sm font-bold text-white tracking-wider mb-2">
                    MULTIPLICATEUR DE MISE
                  </div>
                </div>
                
                <div className="mx-4 mt-4">
                  <div className="bg-green-600 rounded-lg px-10 py-2 text-center">
                    <div className="text-3xl font-black text-white">
                      x{totalMultiplierNFL.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Parlay Legs Section */}
                <div className="text-center pb-2 pt-6">
                  <div className="text-sm font-bold text-white tracking-wider mb-2">
                    PARIS INCLUS DANS LE PARLAY NFL
                  </div>
                </div>
                
                {/* Leg 1: Washington vs Kansas City - UNDER */}
                <div className="mx-4 mb-3 border-2 border-green-600 rounded-lg bg-green-600/10 p-3">
                  <div className="text-center">
                    <div className="grid grid-cols-3 items-center justify-items-center gap-2">
                      {/* WASHINGTON */}
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1.5 border border-white/20">
                          <img src={washingtonLogo} alt="Washington" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-white text-[10px] font-bold">WASHINGTON</span>
                      </div>

                      {/* Center */}
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="font-semibold text-xs text-white">3:25 PM</span>
                        <div className="px-1.5 py-0.5 rounded-full border border-white/20 bg-white/0">
                          <span className="text-white font-bold text-[10px]">VS</span>
                        </div>
                        <div className="text-[10px] font-bold text-white tracking-wider">UNDER</div>
                        <div className="text-[10px] font-bold text-green-400">50.5</div>
                      </div>

                      {/* KANSAS CITY */}
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-white/20 p-1.5">
                          <img src={kansascityLogo} alt="Kansas City" className="w-full h-full object-contain" />
                        </div>
                        <span className="font-bold text-[10px] text-white">KANSAS CITY</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Leg 2: Washington SPREAD */}
                <div className="mx-4 mb-3 border-2 border-green-600 rounded-lg bg-green-600/10 p-3">
                  <div className="text-center">
                    <div className="grid grid-cols-3 items-center justify-items-center gap-2">
                      {/* WASHINGTON */}
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1.5 border-2 border-green-600">
                          <img src={washingtonLogo} alt="Washington" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-white text-[10px] font-extrabold">WASHINGTON</span>
                        <div className="text-[10px] font-bold text-green-400">+3.5</div>
                      </div>

                      {/* Center */}
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="font-semibold text-xs text-white">1:00 PM</span>
                        <div className="px-1.5 py-0.5 rounded-full border border-white/20 bg-white/0">
                          <span className="text-white font-bold text-[10px]">VS</span>
                        </div>
                        <div className="text-[10px] font-bold text-white tracking-wider">SPREAD</div>
                      </div>

                      {/* KANSAS CITY */}
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-white/20 p-1.5">
                          <img src={kansascityLogo} alt="Kansas City" className="w-full h-full object-contain" />
                        </div>
                        <span className="font-bold text-[10px] text-white">KANSAS CITY</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bet Amount & Payout */}
                <div className="flex justify-center pt-4 mb-2">
                  <div className="text-sm font-bold text-white tracking-wider text-center">
                    VOTRE GAIN
                  </div>
                </div>

                <div className="pt-1 py-[7px]">
                  <div className="grid grid-cols-2 gap-2 px-[10px] my-[15px]">
                    <Dialog open={isDialogOpenParlayNFL} onOpenChange={setIsDialogOpenParlayNFL}>
                      <DialogTrigger asChild>
                        <button className="px-4 py-3 bg-transparent rounded-none text-center cursor-pointer">
                          <div className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded mb-2 inline-block">Modifier</div>
                          <div className="text-white text-xs mb-1">Votre mise</div>
                          <div className="text-green-400 font-bold text-lg">${betAmountParlayNFL}</div>
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md bg-black border-green-600">
                        <DialogHeader>
                          <DialogTitle className="text-white text-center">Modifier votre mise</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-4 gap-2">
                            {[10, 20, 50, 100, 150, 200, 500].map((amount) => (
                              <button
                                key={amount}
                                onClick={() => {
                                  setBetAmountParlayNFL(amount.toString());
                                  setIsDialogOpenParlayNFL(false);
                                }}
                                className={`px-3 py-2 rounded-2xl text-sm font-semibold transition-colors ${
                                  betAmountParlayNFL === amount.toString()
                                    ? 'bg-primary text-black'
                                    : 'bg-white/10 text-white hover:bg-white/20'
                                }`}
                              >
                                ${amount}
                              </button>
                            ))}
                            <button
                              onClick={() => {
                                const custom = prompt("Entrez le montant:");
                                if (custom && parseFloat(custom) > 0) {
                                  setBetAmountParlayNFL(custom);
                                  setIsDialogOpenParlayNFL(false);
                                }
                              }}
                              className="px-3 py-2 rounded-2xl text-sm font-semibold bg-white/10 text-white hover:bg-white/20"
                            >
                              Autre
                            </button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <div className="bg-green-600/15 border-2 border-green-600 rounded-lg text-center py-[25px] px-0">
                      <div className="text-[#fff] text-xs mb-1">CASHOUT</div>
                      <div className="text-green-400 font-bold text-3xl">${calculateReturn(betAmountParlayNFL, totalMultiplierNFL)}</div>
                      <div className="text-white text-[10px] mt-0.5">
                        +${(parseFloat(calculateReturn(betAmountParlayNFL, totalMultiplierNFL)) - parseFloat(betAmountParlayNFL)).toFixed(2)} bénéfice
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* DraftKings Section */}
              <div className="pt-0">
                <div className="flex items-center justify-between text-xs my-0 py-[10px] px-6 border-t-2 border-green-600 bg-green-600">
                  <span className="text-white font-bold">MEILLEUR ODDS</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white">DRAFTKINGS</span>
                    <span className="px-2 py-1 bg-white rounded text-black font-bold">-110</span>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
        )}

        {/* PARLAY NHL */}
        {showNHL && nhlIndex !== -1 && (
        <div className="grid gap-0.5 justify-center" style={{ order: nhlIndex }}>
          {/* AI Data Analysis Counter - Outside card */}
          <div className="flex items-center justify-center gap-3 px-4 pt-[5px] pb-2 bg-black w-full max-w-md mx-auto">
            <div className="relative w-6 h-6 flex-shrink-0">
              <Loader2 className="w-6 h-6 text-white animate-spin absolute" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-[8px]">IA</span>
              </div>
            </div>
            <span className="text-white font-semibold text-center text-[10px]">{dataCountParlayNHL.toLocaleString()} DONNÉES ANALYSÉES PAR NOTRE IA POUR CE PARLAY NHL</span>
          </div>
          
          <Card className="w-full max-w-md bg-black shadow-2xl overflow-hidden mx-auto rounded-lg -mt-2">
            <CardHeader className="space-y-0 p-0">

              {/* AI Analysis */}
              <div className="flex items-center justify-between gap-2 text-xs py-[10px] bg-green-600 px-4">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-4xl">91%</span>
                  <span className="text-white text-xs font-bold">DE CHANCE DE GAGNER SELON NOTRE IA</span>
                </div>
                <button
                  onClick={handleShowAnalysisParlayNHL}
                  className="px-3 py-1 bg-black rounded border-2 border-green-600 font-bold text-green-400 text-xs hover:bg-green-600/20 transition-colors"
                >
                  VOIR ANALYSE IA
                </button>

                {/* Loading Dialog */}
                <Dialog open={isLoadingDialogOpenParlayNHL} onOpenChange={setIsLoadingDialogOpenParlayNHL}>
                  <DialogContent className="sm:max-w-md bg-black border-none p-0 flex items-center justify-center [&>button]:hidden">
                    <DialogTitle className="sr-only">Chargement de l'analyse IA</DialogTitle>
                    <DialogDescription className="sr-only">Veuillez patienter pendant que nous chargeons l'analyse IA pour ce parlay NHL.</DialogDescription>
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

                {/* Analysis Dialog for Parlay NHL */}
                <Dialog open={isAnalysisDialogOpenParlayNHL} onOpenChange={setIsAnalysisDialogOpenParlayNHL}>
                  <DialogContent className="sm:max-w-2xl bg-black border-[3px] border-green-600 p-0 max-h-[90vh] overflow-y-auto">
                    <DialogTitle className="sr-only">Analyse IA du Parlay NHL</DialogTitle>
                    <DialogDescription className="sr-only">Analyse détaillée de l'IA pour ce parlay NHL incluant les probabilités et facteurs clés.</DialogDescription>
                    <div className="bg-black/40">
                      <div className="flex items-center justify-center gap-3 py-2 px-6">
                        <div className="relative w-6 h-6 flex-shrink-0">
                          <Loader2 className="w-6 h-6 text-white animate-spin absolute" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white font-bold text-[8px]">IA</span>
                          </div>
                        </div>
                        <span className="text-white font-semibold text-center text-xs">{dataCountParlayNHL.toLocaleString()} DONNÉES ANALYSÉ PAR NOTRE IA POUR CE PARLAY NHL JUSQU'À PRÉSENT</span>
                      </div>
                      <div className="text-center pb-2 px-6 flex items-center justify-center gap-2">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-white/70 text-sm">
                          Dernière mise à jour IA : {currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>

                    <div className="px-6 pb-6">
                      {showAnalysisParlayNHL && (
                        <div className="mt-4 space-y-4 animate-fade-in">
                          <div className="bg-green-600/15 border-2 border-green-600 rounded-lg p-4">
                            <div className="text-center space-y-2">
                              <div className="text-white font-bold text-sm">CHANCE DE GAGNER</div>
                              <div className="text-green-400 font-bold text-4xl">91%</div>
                              <div className="text-white/70 text-xs">STATISTIQUEMENT AVEC TOUTES CES DONNÉES CI-DESSOUS ANALYSÉES</div>
                            </div>
                            <div className="w-full bg-black/40 rounded-full h-3 overflow-hidden mt-3">
                              <div className="bg-green-600 h-full rounded-full" style={{ width: '91%' }}></div>
                            </div>
                          </div>

                          <div className="space-y-6">
                            {/* Section 1 - Analyse du marché */}
                            <h3 className="text-white font-bold text-lg mb-3">
                              Analyse du marché & meilleures cotes
                            </h3>
                            
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <div className="relative w-5 h-5 flex-shrink-0">
                                  <Loader2 className="w-5 h-5 text-white animate-spin absolute" />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-white font-bold text-[7px]">IA</span>
                                  </div>
                                </div>
                                <div className="bg-green-600/10 border-2 border-green-600 rounded-lg p-4 flex-1">
                                  <p className="text-white/80 text-sm">• Analyse de la probabilité implicite du marché pour chaque pari, obtenue par conversion des cotes en pourcentage réel.</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="relative w-5 h-5 flex-shrink-0">
                                  <Loader2 className="w-5 h-5 text-white animate-spin absolute" />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-white font-bold text-[7px]">IA</span>
                                  </div>
                                </div>
                                <div className="bg-green-600/10 border-2 border-green-600 rounded-lg p-4 flex-1">
                                  <p className="text-white/80 text-sm">• Comparaison inter-bookmakers pour identifier la meilleure cote disponible ("best price") et mesurer l'efficience du marché.</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="relative w-5 h-5 flex-shrink-0">
                                  <Loader2 className="w-5 h-5 text-white animate-spin absolute" />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-white font-bold text-[7px]">IA</span>
                                  </div>
                                </div>
                                <div className="bg-green-600/10 border-2 border-green-600 rounded-lg p-4 flex-1">
                                  <p className="text-white/80 text-sm">• Observation du mouvement de ligne (line movement) afin d'évaluer si la cote se renforce ou se détériore avec l'arrivée du sharp money.</p>
                                </div>
                              </div>
                            </div>

                            <div className="border-t border-white/10 my-6"></div>

                            {/* Section 2 - Historique H2H */}
                            <h3 className="text-white font-bold text-lg mb-3">
                              Historique des confrontations (H2H)
                            </h3>
                            
                            <div className="flex items-center gap-3">
                              <div className="relative w-5 h-5 flex-shrink-0">
                                <Loader2 className="w-5 h-5 text-white animate-spin absolute" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-white font-bold text-[7px]">IA</span>
                                </div>
                              </div>
                              <div className="bg-green-600/10 border-2 border-green-600 rounded-lg p-4 flex-1">
                                <h4 className="text-white font-bold text-sm mb-2">Analyse — Historique des confrontations (H2H)</h4>
                                <p className="text-white/80 text-sm">
                                  Analyse des duels précédents entre les équipes concernées, incluant les tendances récurrentes des matchups, la nature des rencontres (défensives, explosives, possession longue ou big plays), ainsi que les patterns stratégiques qui se répètent historiquement.
                                </p>
                              </div>
                            </div>

                            <div className="border-t border-white/10 my-6"></div>

                            {/* Section 3 - Lineup projeté */}
                            <h3 className="text-white font-bold text-lg mb-3">
                              Lineup / alignement projeté du jour
                            </h3>
                            
                            <div className="flex items-center gap-3">
                              <div className="relative w-5 h-5 flex-shrink-0">
                                <Loader2 className="w-5 h-5 text-white animate-spin absolute" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-white font-bold text-[7px]">IA</span>
                                </div>
                              </div>
                              <div className="bg-green-600/10 border-2 border-green-600 rounded-lg p-4 flex-1">
                                <h4 className="text-white font-bold text-sm mb-2">Analyse — Alignement projeté du jour</h4>
                                <p className="text-white/80 text-sm">
                                  Analyse de la composition prévue pour chaque équipe, incluant le statut du gardien partant, l'état du roster offensif et défensif, les joueurs clés disponibles ou incertains, ainsi que l'impact tactique attendu de l'alignement projeté.
                                </p>
                              </div>
                            </div>

                            <div className="border-t border-white/10 my-6"></div>

                            {/* Section 4 - Jeu offensif */}
                            <h3 className="text-white font-bold text-lg mb-3">
                              Analyse du jeu offensif & production
                            </h3>
                            
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <div className="relative w-5 h-5 flex-shrink-0">
                                  <Loader2 className="w-5 h-5 text-white animate-spin absolute" />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-white font-bold text-[7px]">IA</span>
                                  </div>
                                </div>
                                <div className="bg-green-600/10 border-2 border-green-600 rounded-lg p-4 flex-1">
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Génération offensive</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse de la capacité à générer des occasions de qualité (expected goals xG), du taux de tirs au but, de l'efficacité du powerplay et de la créativité offensive.
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-3">
                                <div className="relative w-5 h-5 flex-shrink-0">
                                  <Loader2 className="w-5 h-5 text-white animate-spin absolute" />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-white font-bold text-[7px]">IA</span>
                                  </div>
                                </div>
                                <div className="bg-green-600/10 border-2 border-green-600 rounded-lg p-4 flex-1">
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Profondeur offensive</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse de la profondeur offensive, incluant la contribution du top-6, l'impact du bottom-6, la flexibilité tactique et la capacité à maintenir la pression offensive sur plusieurs trios.
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="border-t border-white/10 my-6"></div>

                            {/* Section 5 - Jeu défensif */}
                            <h3 className="text-white font-bold text-lg mb-3">
                              Analyse du jeu défensif & gardien de but
                            </h3>
                            
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <div className="relative w-5 h-5 flex-shrink-0">
                                  <Loader2 className="w-5 h-5 text-white animate-spin absolute" />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-white font-bold text-[7px]">IA</span>
                                  </div>
                                </div>
                                <div className="bg-green-600/10 border-2 border-green-600 rounded-lg p-4 flex-1">
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Performance du gardien</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse du taux d'arrêts (save percentage), du goals saved above expected (GSAx), de la forme récente du gardien et de son historique contre l'adversaire.
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-3">
                                <div className="relative w-5 h-5 flex-shrink-0">
                                  <Loader2 className="w-5 h-5 text-white animate-spin absolute" />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-white font-bold text-[7px]">IA</span>
                                  </div>
                                </div>
                                <div className="bg-green-600/10 border-2 border-green-600 rounded-lg p-4 flex-1">
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Stabilité défensive</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse de la profondeur défensive, basée sur la solidité du top-4, la mobilité en relance, la gestion des transitions adverses et l'efficacité du penalty kill.
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="border-t border-white/10 my-6"></div>

                            {/* Section 6 - Contexte */}
                            <h3 className="text-white font-bold text-lg mb-3">
                              Analyse du contexte & fatigue
                            </h3>
                            
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <div className="relative w-5 h-5 flex-shrink-0">
                                  <Loader2 className="w-5 h-5 text-white animate-spin absolute" />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-white font-bold text-[7px]">IA</span>
                                  </div>
                                </div>
                                <div className="bg-green-600/10 border-2 border-green-600 rounded-lg p-4 flex-1">
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Cadence & calendrier</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse du contexte physique, incluant l'enchaînement des matchs, le repos disponible, la présence éventuelle d'un back-to-back et la charge de déplacement.
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-3">
                                <div className="relative w-5 h-5 flex-shrink-0">
                                  <Loader2 className="w-5 h-5 text-white animate-spin absolute" />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-white font-bold text-[7px]">IA</span>
                                  </div>
                                </div>
                                <div className="bg-green-600/10 border-2 border-green-600 rounded-lg p-4 flex-1">
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Avantage domicile / extérieur</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse de la performance contextuelle selon que l'équipe évolue à domicile ou sur la route, et l'impact du dernier changement sur les matchups.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 pt-3 border-t border-white/10">
                            <p className="text-white/60 text-[10px] italic text-center flex items-center justify-center gap-2">
                              L'ÉTAT DE NOTRE IA : <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> RÉSULTAT À JOUR À L'INSTANT MÊME
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Middle section with vertical borders */}
              <div className="border-x-[2px] border-green-600">
                {/* Odds Display */}
                <div className="flex justify-center pt-5 pb-0">
                  <div className="text-sm font-bold text-white tracking-wider mb-2">
                    MULTIPLICATEUR DE MISE
                  </div>
                </div>
                
                <div className="mx-4 mt-4">
                  <div className="bg-green-600 rounded-lg px-10 py-2 text-center">
                    <div className="text-3xl font-black text-white">
                      x{totalMultiplierNHL.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Parlay Legs Section */}
                <div className="text-center pb-2 pt-6">
                  <div className="text-sm font-bold text-white tracking-wider mb-2">
                    PARIS INCLUS DANS LE PARLAY NHL
                  </div>
                </div>
                
                {/* Leg 1: St. Louis vs Pittsburgh - MONEYLINE */}
                <div className="mx-4 mb-3 border-2 border-green-600 rounded-lg bg-green-600/10 p-3">
                  <div className="text-center">
                    <div className="grid grid-cols-3 items-center justify-items-center gap-2">
                      {/* ST. LOUIS */}
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-white/20 p-1.5">
                          <img src={stlouisLogo} alt="St. Louis" className="w-full h-full object-contain" />
                        </div>
                        <span className="font-bold text-[10px] text-white">ST. LOUIS</span>
                      </div>

                      {/* Center */}
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="font-semibold text-xs text-white">7:00 PM</span>
                        <div className="px-1.5 py-0.5 rounded-full border border-white/20 bg-white/0">
                          <span className="text-white font-bold text-[10px]">VS</span>
                        </div>
                        <div className="text-[10px] font-bold text-white tracking-wider">MONEYLINE</div>
                      </div>

                      {/* PITTSBURGH */}
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1.5 border-2 border-green-600">
                          <img src={pittsburghLogo} alt="Pittsburgh" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-white text-[10px] font-extrabold">PITTSBURGH</span>
                        <div className="text-[10px] font-bold text-green-400">VICTOIRE</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Leg 2: Vegas vs Tampa Bay - SPREAD */}
                <div className="mx-4 mb-3 border-2 border-green-600 rounded-lg bg-green-600/10 p-3">
                  <div className="text-center">
                    <div className="grid grid-cols-3 items-center justify-items-center gap-2">
                      {/* VEGAS */}
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1.5 border border-white/20">
                          <img src={vegasLogo} alt="Vegas" className="w-full h-full object-contain" />
                        </div>
                        <span className="font-bold text-[10px] text-white">VEGAS</span>
                      </div>

                      {/* Center */}
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="font-semibold text-xs text-white">5:00 PM</span>
                        <div className="px-1.5 py-0.5 rounded-full border border-white/20 bg-white/0">
                          <span className="text-white font-bold text-[10px]">VS</span>
                        </div>
                        <div className="text-[10px] font-bold text-white tracking-wider">SPREAD</div>
                      </div>

                      {/* TAMPA BAY */}
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1.5 border-2 border-green-600">
                          <img src={tampaLogo} alt="Tampa Bay" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-white text-[10px] font-extrabold">TAMPA BAY</span>
                        <div className="text-[10px] font-bold text-green-400">+1.5</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Leg 3: St. Louis MONEYLINE */}
                <div className="mx-4 mb-3 border-2 border-green-600 rounded-lg bg-green-600/10 p-3">
                  <div className="text-center">
                    <div className="grid grid-cols-3 items-center justify-items-center gap-2">
                      {/* ST. LOUIS */}
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-green-600 p-1.5">
                          <img src={stlouisLogo} alt="St. Louis" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-white text-[10px] font-extrabold">ST. LOUIS</span>
                        <div className="text-[10px] font-bold text-green-400">VICTOIRE</div>
                      </div>

                      {/* Center */}
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="font-semibold text-xs text-white">9:00 PM</span>
                        <div className="px-1.5 py-0.5 rounded-full border border-white/20 bg-white/0">
                          <span className="text-white font-bold text-[10px]">VS</span>
                        </div>
                        <div className="text-[10px] font-bold text-white tracking-wider">MONEYLINE</div>
                      </div>

                      {/* VEGAS */}
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1.5 border border-white/20">
                          <img src={vegasLogo} alt="Vegas" className="w-full h-full object-contain" />
                        </div>
                        <span className="font-bold text-[10px] text-white">VEGAS</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bet Amount & Payout */}
                <div className="flex justify-center pt-4 mb-2">
                  <div className="text-sm font-bold text-white tracking-wider text-center">
                    VOTRE GAIN
                  </div>
                </div>

                <div className="pt-1 py-[7px]">
                  <div className="grid grid-cols-2 gap-2 px-[10px] my-[15px]">
                    <Dialog open={isDialogOpenParlayNHL} onOpenChange={setIsDialogOpenParlayNHL}>
                      <DialogTrigger asChild>
                        <button className="px-4 py-3 bg-transparent rounded-none text-center cursor-pointer">
                          <div className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded mb-2 inline-block">Modifier</div>
                          <div className="text-white text-xs mb-1">Votre mise</div>
                          <div className="text-green-400 font-bold text-lg">${betAmountParlayNHL}</div>
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md bg-black border-green-600">
                        <DialogHeader>
                          <DialogTitle className="text-white text-center">Modifier votre mise</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-4 gap-2">
                            {[10, 20, 50, 100, 150, 200, 500].map((amount) => (
                              <button
                                key={amount}
                                onClick={() => {
                                  setBetAmountParlayNHL(amount.toString());
                                  setIsDialogOpenParlayNHL(false);
                                }}
                                className={`px-3 py-2 rounded-2xl text-sm font-semibold transition-colors ${
                                  betAmountParlayNHL === amount.toString()
                                    ? 'bg-primary text-black'
                                    : 'bg-white/10 text-white hover:bg-white/20'
                                }`}
                              >
                                ${amount}
                              </button>
                            ))}
                            <button
                              onClick={() => {
                                const custom = prompt("Entrez le montant:");
                                if (custom && parseFloat(custom) > 0) {
                                  setBetAmountParlayNHL(custom);
                                  setIsDialogOpenParlayNHL(false);
                                }
                              }}
                              className="px-3 py-2 rounded-2xl text-sm font-semibold bg-white/10 text-white hover:bg-white/20"
                            >
                              Autre
                            </button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <div className="bg-green-600/15 border-2 border-green-600 rounded-lg text-center py-[25px] px-0">
                      <div className="text-[#fff] text-xs mb-1">CASHOUT</div>
                      <div className="text-green-400 font-bold text-3xl">${calculateReturn(betAmountParlayNHL, totalMultiplierNHL)}</div>
                      <div className="text-white text-[10px] mt-0.5">
                        +${(parseFloat(calculateReturn(betAmountParlayNHL, totalMultiplierNHL)) - parseFloat(betAmountParlayNHL)).toFixed(2)} bénéfice
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* DraftKings Section */}
              <div className="pt-0">
                <div className="flex items-center justify-between text-xs my-0 py-[10px] px-6 border-t-2 border-green-600 bg-green-600">
                  <span className="text-white font-bold">MEILLEUR ODDS</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white">DRAFTKINGS</span>
                    <span className="px-2 py-1 bg-white rounded text-black font-bold">+285</span>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
        )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Parlay;
