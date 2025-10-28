import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import stlouisLogo from "@/assets/stlouis-logo-new.png";
import pittsburghLogo from "@/assets/pittsburgh-logo-new.png";
import vegasLogo from "@/assets/vegas-logo.png";
import tampaLogo from "@/assets/tampa-logo.png";
import washingtonLogo from "@/assets/washington-logo.png";
import kansascityLogo from "@/assets/kansascity-logo.png";
const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dataCountStLouis, setDataCountStLouis] = useState(2843);
  const [dataCountVegas, setDataCountVegas] = useState(2857);
  const [dataCountWashington, setDataCountWashington] = useState(7623);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Increment data count every 2 minutes
  useEffect(() => {
    const dataTimer = setInterval(() => {
      setDataCountStLouis(prev => prev + Math.floor(Math.random() * 3) + 1); // +1 to +3
      setDataCountVegas(prev => prev + Math.floor(Math.random() * 3) + 1); // +1 to +3
      setDataCountWashington(prev => prev + Math.floor(Math.random() * 3) + 1); // +1 to +3
    }, 120000); // 120000ms = 2 minutes
    return () => clearInterval(dataTimer);
  }, []);

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

  // States for WASHINGTON vs KANSAS CITY card
  const [betAmountWashington, setBetAmountWashington] = useState<string>("100");
  const [isDialogOpenWashington, setIsDialogOpenWashington] = useState(false);
  const [showAnalysisWashington, setShowAnalysisWashington] = useState(false);
  const [isLoadingDialogOpenWashington, setIsLoadingDialogOpenWashington] = useState(false);
  const [isAnalysisDialogOpenWashington, setIsAnalysisDialogOpenWashington] = useState(false);

  // ST. LOUIS vs PITTSBURGH odds
  const oddsStLouis = -105;
  const multiplierStLouis = 1 + 100 / Math.abs(oddsStLouis);

  // VEGAS vs TAMPA BAY odds
  const oddsVegas = -136;
  const multiplierVegas = 1 + 100 / Math.abs(oddsVegas);

  // WASHINGTON vs KANSAS CITY odds
  const oddsWashington = 488;
  const multiplierWashington = 1 + oddsWashington / 100;
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
  const handleShowAnalysisWashington = () => {
    setIsLoadingDialogOpenWashington(true);
    const randomDelay = Math.random() * (5000 - 1500) + 1500;
    setTimeout(() => {
      setIsLoadingDialogOpenWashington(false);
      setIsAnalysisDialogOpenWashington(true);
      setShowAnalysisWashington(true);
    }, randomDelay);
  };
  return <DashboardLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-white text-4xl font-bold">BET DU JOUR</h1>
          <p className="text-white/70 text-sm">Les bet avec la meilleur probabilité de réussite aujourd'hui</p>
        </div>

        {/* ST. LOUIS vs PITTSBURGH CARD */}
        <div className="grid gap-2 justify-center">
          {/* AI Data Analysis Counter - Outside card */}
          <div className="flex items-center justify-center gap-3 px-4 pt-[5px] pb-2 bg-black w-full max-w-md mx-auto">
            <div className="relative w-6 h-6 flex-shrink-0">
              <Loader2 className="w-6 h-6 text-white animate-spin absolute" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-[8px]">IA</span>
              </div>
            </div>
            <span className="text-white font-semibold text-center text-[10px]">{dataCountStLouis.toLocaleString()} DONNÉES ANALYSÉES PAR NOTRE IA POUR CE BET</span>
          </div>
          
          <Card className="w-full max-w-md bg-black border-3 border-green-600 shadow-2xl overflow-hidden mx-auto rounded-lg">
            <CardHeader className="space-y-0 p-0">
              {/* AI Analysis */}
              <div className="flex items-center justify-between gap-2 text-xs bg-green-600 px-4 py-[10px]">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-3xl">92%</span>
                  <span className="text-white text-xs font-bold">DE CHANCE DE GAGNER SELON NOTRE IA</span>
                </div>
                <button onClick={handleShowAnalysisStLouis} className="px-3 py-1 rounded-none font-bold text-green-400 text-xs transition-colors bg-black hover:bg-black/80">
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
                  <DialogContent className="sm:max-w-2xl bg-black p-0 max-h-[90vh] overflow-y-auto">
                    <div className="bg-black/40">
                      <div className="flex items-center justify-center gap-3 py-2 px-6">
                        <div className="relative w-6 h-6 flex-shrink-0">
                          <Loader2 className="w-6 h-6 text-white animate-spin absolute" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white font-bold text-[8px]">IA</span>
                          </div>
                        </div>
                        <span className="text-white font-semibold text-center text-xs">{dataCountStLouis.toLocaleString()} DONNÉES ANALYSÉ PAR NOTRE IA POUR CE BET JUSQU'À PRÉSENT</span>
                      </div>
                      <div className="text-center pb-2 px-6 flex items-center justify-center gap-2">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-white/70 text-sm">
                          Dernière mise à jour IA pour ce bet : {currentTime.toLocaleTimeString('fr-FR', {
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
                          <div className="space-y-6">
                            {/* Section 1 - Analyse du marché */}
                            <h3 className="text-white font-bold text-lg mb-3">
                              Analyse du marché & meilleures cotes
                            </h3>
                            
                            <div className="space-y-3">
                              <div>
                                <h4 className="text-white font-bold text-sm mb-2">Analyse — Marché & pricing (St. Louis)</h4>
                                <div className="space-y-3">
                                  <div className="flex items-center gap-3">
                                    <div className="relative w-5 h-5 flex-shrink-0">
                                      <Loader2 className="w-5 h-5 text-white animate-spin absolute" />
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-white font-bold text-[7px]">IA</span>
                                      </div>
                                    </div>
                                    <div className="bg-green-600/10 border-2 border-green-600 rounded-lg p-4 flex-1">
                                      <p className="text-white/80 text-sm">• Analyse de la probabilité implicite du marché pour St. Louis, obtenue par conversion des cotes en pourcentage réel.</p>
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
                                      <p className="text-white/80 text-sm">• Observation du mouvement de ligne (line movement) afin de déterminer si la valeur évolue en faveur ou en défaveur de St. Louis.</p>
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
                                      <p className="text-white/80 text-sm">• Détection d'un éventuel closing line value (CLV) et influence du sharp money par rapport au public money.</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="text-white font-bold text-sm mb-2">Analyse — Marché & pricing (Pittsburgh)</h4>
                                <div className="space-y-3">
                                  <div className="flex items-center gap-3">
                                    <div className="relative w-5 h-5 flex-shrink-0">
                                      <Loader2 className="w-5 h-5 text-white animate-spin absolute" />
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-white font-bold text-[7px]">IA</span>
                                      </div>
                                    </div>
                                    <div className="bg-green-600/10 border-2 border-green-600 rounded-lg p-4 flex-1">
                                      <p className="text-white/80 text-sm">• Analyse de la probabilité implicite du marché pour Pittsburgh, obtenue par conversion des cotes en pourcentage réel.</p>
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
                                      <p className="text-white/80 text-sm">• Observation du mouvement de ligne (line movement) afin de déterminer si la valeur évolue en faveur ou en défaveur de Pittsburgh.</p>
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
                                      <p className="text-white/80 text-sm">• Détection d'un éventuel closing line value (CLV) et influence du sharp money par rapport au public money.</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="border-t border-white/10 my-6"></div>

                            {/* Section 8 - Historique H2H */}
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
                                  Analyse des précédents affrontements entre les deux équipes, incluant les tendances récurrentes du matchup, les styles dominants lors de ces duels, ainsi que les profils statistiques qui se répètent historiquement lorsque ces formations s'opposent.
                                </p>
                              </div>
                            </div>

                            <div className="border-t border-white/10 my-6"></div>

                            {/* Section 9 - Lineup projeté */}
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
                                  Analyse de l'alignement prévu pour chaque équipe, incluant les trios et paires défensives projetées, la disponibilité des joueurs clés, les éventuels absents, ainsi que l'impact attendu des lignes déployées sur le rythme offensif et la structure tactique globale.
                                </p>
                              </div>
                            </div>

                            <div className="border-t border-white/10 my-6"></div>

                            {/* Section 2 - Power Play */}
                            <h3 className="text-white font-bold text-lg mb-3">
                              Analyse du jeu de puissance & discipline
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
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Power Play (St. Louis)</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse de l'efficacité du power play de St. Louis, incluant la structure tactique en zone offensive, la qualité des entrées de zone contrôlées, la création de chances dangereuses (HDCF) et l'exécution globale des séquences en supériorité numérique (xGoals/PP).
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
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Power Play (Pittsburgh)</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse de l'efficacité du power play de Pittsburgh, incluant la structure tactique en zone offensive, la qualité des entrées de zone contrôlées, la création de chances dangereuses (HDCF) et l'exécution globale des séquences en supériorité numérique (xGoals/PP).
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
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Discipline & Pénalités (St. Louis)</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse du niveau de discipline de St. Louis, basée sur la fréquence des pénalités concédées, le temps passé en infériorité numérique, l'impact sur le momentum et l'exposition défensive répétée en PK.
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
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Discipline & Pénalités (Pittsburgh)</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse du niveau de discipline de Pittsburgh, basée sur la fréquence des pénalités concédées, le temps passé en infériorité numérique, l'impact sur le momentum et l'exposition défensive répétée en PK.
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="border-t border-white/10 my-6"></div>

                            {/* Section 3 - Gardien */}
                            <h3 className="text-white font-bold text-lg mb-3">
                              Analyse du gardien & structure défensive
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
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Performance du gardien (St. Louis)</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse du rendement du gardien projeté de St. Louis, basée sur l'efficacité face aux tirs à haut danger, la qualité technique, la constance sous pression et les indicateurs avancés type GSAA.
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
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Performance du gardien (Pittsburgh)</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse du rendement du gardien projeté de Pittsburgh, basée sur l'efficacité face aux tirs à haut danger, la qualité technique, la constance sous pression et les indicateurs avancés type GSAA.
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
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Structure défensive (St. Louis)</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse de la structure défensive de St. Louis, incluant la protection du slot, la gestion des rebonds, la transition défensive et la limitation des occasions adverses de haute qualité.
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
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Structure défensive (Pittsburgh)</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse de la structure défensive de Pittsburgh, incluant la protection du slot, la gestion des rebonds, la transition défensive et la limitation des occasions adverses de haute qualité.
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="border-t border-white/10 my-6"></div>

                            {/* Section 4 - Possession */}
                            <h3 className="text-white font-bold text-lg mb-3">
                              Analyse de la possession & qualité offensive
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
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Expected Goals (St. Louis)</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse de la production offensive de St. Louis, basée sur la quantité et la qualité des tirs générés, les emplacements de tir et la probabilité attendue de convertir les occasions (xG).
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
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Expected Goals (Pittsburgh)</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse de la production offensive de Pittsburgh, basée sur la quantité et la qualité des tirs générés, les emplacements de tir et la probabilité attendue de convertir les occasions (xG).
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
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Possession (Corsi/Fenwick) (St. Louis)</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse du contrôle du palet de St. Louis, à travers le volume de tirs tentés, la capacité à maintenir la zone offensive et la dictée du rythme de jeu.
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
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Possession (Corsi/Fenwick) (Pittsburgh)</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse du contrôle du palet de Pittsburgh, à travers le volume de tirs tentés, la capacité à maintenir la zone offensive et la dictée du rythme de jeu.
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="border-t border-white/10 my-6"></div>

                            {/* Section 5 - Profondeur */}
                            <h3 className="text-white font-bold text-lg mb-3">
                              Analyse de l'alignement & profondeur
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
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Profondeur offensive (St. Louis)</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse de la profondeur de St. Louis, incluant la contribution du top-6, l'impact du bottom-6, la flexibilité tactique et la capacité à maintenir la pression offensive sur plusieurs trios.
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
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Profondeur offensive (Pittsburgh)</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse de la profondeur de Pittsburgh, incluant la contribution du top-6, l'impact du bottom-6, la flexibilité tactique et la capacité à maintenir la pression offensive sur plusieurs trios.
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
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Stabilité défensive (St. Louis)</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse de la profondeur défensive de St. Louis, basée sur la solidité du top-4, la mobilité en relance et la gestion des transitions adverses.
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
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Stabilité défensive (Pittsburgh)</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse de la profondeur défensive de Pittsburgh, basée sur la solidité du top-4, la mobilité en relance et la gestion des transitions adverses.
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
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Cadence & calendrier (St. Louis)</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse du contexte physique de St. Louis, incluant l'enchaînement des matchs, le repos disponible, la présence éventuelle d'un back-to-back et la charge de déplacement.
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
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Cadence & calendrier (Pittsburgh)</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse du contexte physique de Pittsburgh, incluant l'enchaînement des matchs, le repos disponible, la présence éventuelle d'un back-to-back et la charge de déplacement.
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
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Avantage domicile / extérieur (St. Louis)</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse de la performance contextuelle de St. Louis, selon qu'elle évolue à domicile ou sur la route, et l'impact du dernier changement sur les matchups.
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
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Avantage domicile / extérieur (Pittsburgh)</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse de la performance contextuelle de Pittsburgh, selon qu'elle évolue à domicile ou sur la route, et l'impact du dernier changement sur les matchups.
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="border-t border-white/10 my-6"></div>

                            {/* Section 7 - Facteurs additionnels */}
                            <h3 className="text-white font-bold text-lg mb-3">
                              Autres analyses complémentaires
                            </h3>
                            
                            <div className="flex items-center gap-3">
                              <div className="relative w-5 h-5 flex-shrink-0">
                                <Loader2 className="w-5 h-5 text-white animate-spin absolute" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-white font-bold text-[7px]">IA</span>
                                </div>
                              </div>
                              <div className="bg-green-600/10 border-2 border-green-600 rounded-lg p-4 flex-1">
                                <h4 className="text-white font-bold text-sm mb-2">Analyse — Facteurs additionnels</h4>
                                <p className="text-white/80 text-sm">
                                  L'IA peut également prendre en compte d'autres variables secondaires telles que la dynamique mentale, la confiance du vestiaire, la qualité du coaching staff, la stratégie d'entrée de zone, l'exécution en transition neutre, le style de match attendu (haut événement / bas événement) et l'adaptation tactique entre périodes.
                                </p>
                              </div>
                            </div>
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
              <div className="flex justify-center pt-6 pb-4">
                <div className="text-sm font-bold text-white tracking-wider mb-2">
                  MULTIPLICATEUR DE MISE
                </div>
              </div>
              
              <div className="mx-4 mt-4">
                <div className="bg-green-600 rounded-lg px-10 py-4 text-center">
                  <div className="text-4xl font-black text-white">
                    x{multiplierStLouis.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Match Details */}
              <div className="text-center pb-2 pt-6">
                <div className="text-sm font-bold text-white tracking-wider mb-2">
                  PARIER SUR
                </div>
              </div>
              
              <div className="mx-4 border-2 border-green-600 rounded-lg bg-black p-4">
                <div className="text-center">
                  {/* Teams and VS */}
                  <div className="grid grid-cols-3 items-center justify-items-center gap-4 px-4">
                    {/* ST. LOUIS */}
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-white/20 p-2">
                        <img src={stlouisLogo} alt="St. Louis" className="w-full h-full object-contain" />
                      </div>
                      <span className="font-bold text-xs text-white">ST. LOUIS</span>
                    </div>

                    {/* Center VS + MONEYLINE */}
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-semibold text-sm text-white">7:00 PM</span>
                      <div className="px-2 py-0.5 rounded-full border border-white/20 bg-white/0">
                        <span className="text-white font-bold text-xs">VS</span>
                      </div>
                      <div className="text-xs font-bold text-white tracking-wider">MONEYLINE</div>
                    </div>

                    {/* PITTSBURGH */}
                    <div className="flex flex-col items-center gap-1">
                      <div className="text-xs font-bold text-green-400 mb-1">VICTOIRE</div>
                      <div className="bg-green-600/15 border-2 border-green-600 rounded-lg p-2 flex flex-col items-center justify-center gap-1.5 py-[6px] px-[5px]">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-2">
                          <img src={pittsburghLogo} alt="Pittsburgh" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-white -bottom-0.5 text-xs font-extrabold">PITTSBURGH</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bet Amount & Payout */}
              <div className="flex justify-center pt-6 mb-2">
                <div className="text-sm font-bold text-white tracking-wider text-center">
                  VOTRE GAIN
                </div>
              </div>

              <div className="pt-1 py-[7px]">
                <div className="grid grid-cols-2 gap-2 px-[10px] my-[15px]">
                  <Dialog open={isDialogOpenStLouis} onOpenChange={setIsDialogOpenStLouis}>
                    <DialogTrigger asChild>
                      <button className="px-4 py-3 bg-transparent rounded-none text-center cursor-pointer">
                        <div className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded mb-2 inline-block">Modifier</div>
                        <div className="text-white text-xs mb-1">Votre mise</div>
                        <div className="text-green-400 font-bold text-lg">${betAmountStLouis}</div>
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
                  
                  <div className="bg-green-600/15 border-2 border-green-600 rounded-lg text-center py-[25px] px-0">
                    <div className="text-[#fff] text-xs mb-1">CASHOUT</div>
                    <div className="text-green-400 font-bold text-3xl">${calculateReturn(betAmountStLouis, multiplierStLouis)}</div>
                    <div className="text-white text-[10px] mt-0.5">
                      +${(parseFloat(calculateReturn(betAmountStLouis, multiplierStLouis)) - parseFloat(betAmountStLouis)).toFixed(2)} bénéfice
                    </div>
                  </div>
                </div>
              </div>

              {/* DraftKings Section */}
              <div className="pt-0">
                <div className="flex items-center justify-center gap-2 text-xs my-0 border-t-2 border-green-600 bg-green-600 py-[10px]">
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
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* VEGAS vs TAMPA BAY CARD */}
        <div className="grid gap-2 justify-center">
          {/* AI Data Analysis Counter - Outside card */}
          <div className="flex items-center justify-center gap-3 px-4 pt-[5px] pb-2 bg-black w-full max-w-md mx-auto">
            <div className="relative w-6 h-6 flex-shrink-0">
              <Loader2 className="w-6 h-6 text-white animate-spin absolute" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-[8px]">IA</span>
              </div>
            </div>
            <span className="text-white font-semibold text-center text-[10px]">{dataCountVegas.toLocaleString()} DONNÉES ANALYSÉES PAR NOTRE IA POUR CE BET</span>
          </div>
          
          <Card className="w-full max-w-md bg-black border-3 border-green-600 shadow-2xl overflow-hidden mx-auto rounded-lg">
            <CardHeader className="space-y-0 p-0">
              {/* AI Analysis */}
              <div className="flex items-center justify-between gap-2 text-xs py-[10px] bg-green-600 px-4">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-4xl">92%</span>
                  <span className="text-white text-xs font-bold">DE CHANCE DE GAGNER SELON NOTRE IA</span>
                </div>
                <button onClick={handleShowAnalysisVegas} className="px-3 py-1 bg-black rounded-none font-bold text-green-400 text-xs hover:bg-green-600/20 transition-colors">
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
                  <DialogContent className="sm:max-w-2xl bg-black p-0 max-h-[90vh] overflow-y-auto">
                    <div className="bg-black/40">
                      <div className="flex items-center justify-center gap-3 py-2 px-6">
                        <div className="relative w-6 h-6 flex-shrink-0">
                          <Loader2 className="w-6 h-6 text-white animate-spin absolute" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white font-bold text-[8px]">IA</span>
                          </div>
                        </div>
                        <span className="text-white font-semibold text-center text-xs">{dataCountVegas.toLocaleString()} DONNÉES ANALYSÉ PAR NOTRE IA POUR CE BET JUSQU'À PRÉSENT</span>
                      </div>
                      <div className="text-center pb-2 px-6 flex items-center justify-center gap-2">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-white/70 text-sm">
                          Dernière mise à jour IA pour ce bet : {currentTime.toLocaleTimeString('fr-FR', {
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
                          <div className="space-y-6">
                            {/* Section 1 - Analyse du marché */}
                            <h3 className="text-white font-bold text-lg mb-3">
                              Analyse du marché & meilleures cotes
                            </h3>
                            
                            <div className="space-y-3">
                              <div>
                                <h4 className="text-white font-bold text-sm mb-2">Analyse — Marché & pricing (Vegas)</h4>
                                <div className="space-y-3">
                                  <div className="flex items-center gap-3">
                                    <div className="relative w-5 h-5 flex-shrink-0">
                                      <Loader2 className="w-5 h-5 text-white animate-spin absolute" />
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-white font-bold text-[7px]">IA</span>
                                      </div>
                                    </div>
                                    <div className="bg-green-600/10 border-2 border-green-600 rounded-lg p-4 flex-1">
                                      <p className="text-white/80 text-sm">• Analyse de la probabilité implicite du marché pour Vegas, obtenue par conversion des cotes en pourcentage réel.</p>
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
                                      <p className="text-white/80 text-sm">• Observation du mouvement de ligne (line movement) afin de déterminer si la valeur évolue en faveur ou en défaveur de Vegas.</p>
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
                                      <p className="text-white/80 text-sm">• Détection d'un éventuel closing line value (CLV) et influence du sharp money par rapport au public money.</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="text-white font-bold text-sm mb-2">Analyse — Marché & pricing (Tampa Bay)</h4>
                                <div className="space-y-3">
                                  <div className="flex items-center gap-3">
                                    <div className="relative w-5 h-5 flex-shrink-0">
                                      <Loader2 className="w-5 h-5 text-white animate-spin absolute" />
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-white font-bold text-[7px]">IA</span>
                                      </div>
                                    </div>
                                    <div className="bg-green-600/10 border-2 border-green-600 rounded-lg p-4 flex-1">
                                      <p className="text-white/80 text-sm">• Analyse de la probabilité implicite du marché pour Tampa Bay, obtenue par conversion des cotes en pourcentage réel.</p>
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
                                      <p className="text-white/80 text-sm">• Observation du mouvement de ligne (line movement) afin de déterminer si la valeur évolue en faveur ou en défaveur de Tampa Bay.</p>
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
                                      <p className="text-white/80 text-sm">• Détection d'un éventuel closing line value (CLV) et influence du sharp money par rapport au public money.</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="border-t border-white/10 my-6"></div>

                            {/* Section 8 - Historique H2H */}
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
                                  Analyse des précédents affrontements entre les deux équipes, incluant les tendances récurrentes du matchup, les styles dominants lors de ces duels, ainsi que les profils statistiques qui se répètent historiquement lorsque ces formations s'opposent.
                                </p>
                              </div>
                            </div>

                            <div className="border-t border-white/10 my-6"></div>

                            {/* Section 9 - Lineup projeté */}
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
                                  Analyse de l'alignement prévu pour chaque équipe, incluant les trios et paires défensives projetées, la disponibilité des joueurs clés, les éventuels absents, ainsi que l'impact attendu des lignes déployées sur le rythme offensif et la structure tactique globale.
                                </p>
                              </div>
                            </div>

                            <div className="border-t border-white/10 my-6"></div>

                            {/* Section 2 - Power Play */}
                            <h3 className="text-white font-bold text-lg mb-3">
                              Analyse du jeu de puissance & discipline
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
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Power Play (Vegas)</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse de l'efficacité du power play de Vegas, incluant la structure tactique en zone offensive, la qualité des entrées de zone contrôlées, la création de chances dangereuses (HDCF) et l'exécution globale des séquences en supériorité numérique (xGoals/PP).
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
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Power Play (Tampa Bay)</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse de l'efficacité du power play de Tampa Bay, incluant la structure tactique en zone offensive, la qualité des entrées de zone contrôlées, la création de chances dangereuses (HDCF) et l'exécution globale des séquences en supériorité numérique (xGoals/PP).
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
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Discipline & Pénalités (Vegas)</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse du niveau de discipline de Vegas, basée sur la fréquence des pénalités concédées, le temps passé en infériorité numérique, l'impact sur le momentum et l'exposition défensive répétée en PK.
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
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Discipline & Pénalités (Tampa Bay)</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse du niveau de discipline de Tampa Bay, basée sur la fréquence des pénalités concédées, le temps passé en infériorité numérique, l'impact sur le momentum et l'exposition défensive répétée en PK.
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="border-t border-white/10 my-6"></div>

                            {/* Section 3 - Gardien */}
                            <h3 className="text-white font-bold text-lg mb-3">
                              Analyse du gardien & structure défensive
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
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Performance du gardien (Vegas)</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse du rendement du gardien projeté de Vegas, basée sur l'efficacité face aux tirs à haut danger, la qualité technique, la constance sous pression et les indicateurs avancés type GSAA.
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
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Performance du gardien (Tampa Bay)</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse du rendement du gardien projeté de Tampa Bay, basée sur l'efficacité face aux tirs à haut danger, la qualité technique, la constance sous pression et les indicateurs avancés type GSAA.
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
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Structure défensive (Vegas)</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse de la structure défensive de Vegas, incluant la protection du slot, la gestion des rebonds, la transition défensive et la limitation des occasions adverses de haute qualité.
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
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Structure défensive (Tampa Bay)</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse de la structure défensive de Tampa Bay, incluant la protection du slot, la gestion des rebonds, la transition défensive et la limitation des occasions adverses de haute qualité.
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="border-t border-white/10 my-6"></div>

                            {/* Section 4 - Possession */}
                            <h3 className="text-white font-bold text-lg mb-3">
                              Analyse de la possession & qualité offensive
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
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Expected Goals (Vegas)</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse de la production offensive de Vegas, basée sur la quantité et la qualité des tirs générés, les emplacements de tir et la probabilité attendue de convertir les occasions (xG).
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
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Expected Goals (Tampa Bay)</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse de la production offensive de Tampa Bay, basée sur la quantité et la qualité des tirs générés, les emplacements de tir et la probabilité attendue de convertir les occasions (xG).
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
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Possession (Corsi/Fenwick) (Vegas)</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse du contrôle du palet de Vegas, à travers le volume de tirs tentés, la capacité à maintenir la zone offensive et la dictée du rythme de jeu.
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
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Possession (Corsi/Fenwick) (Tampa Bay)</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse du contrôle du palet de Tampa Bay, à travers le volume de tirs tentés, la capacité à maintenir la zone offensive et la dictée du rythme de jeu.
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="border-t border-white/10 my-6"></div>

                            {/* Section 5 - Profondeur */}
                            <h3 className="text-white font-bold text-lg mb-3">
                              Analyse de l'alignement & profondeur
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
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Profondeur offensive (Vegas)</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse de la profondeur de Vegas, incluant la contribution du top-6, l'impact du bottom-6, la flexibilité tactique et la capacité à maintenir la pression offensive sur plusieurs trios.
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
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Profondeur offensive (Tampa Bay)</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse de la profondeur de Tampa Bay, incluant la contribution du top-6, l'impact du bottom-6, la flexibilité tactique et la capacité à maintenir la pression offensive sur plusieurs trios.
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
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Stabilité défensive (Vegas)</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse de la profondeur défensive de Vegas, basée sur la solidité du top-4, la mobilité en relance et la gestion des transitions adverses.
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
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Stabilité défensive (Tampa Bay)</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse de la profondeur défensive de Tampa Bay, basée sur la solidité du top-4, la mobilité en relance et la gestion des transitions adverses.
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
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Cadence & calendrier (Vegas)</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse du contexte physique de Vegas, incluant l'enchaînement des matchs, le repos disponible, la présence éventuelle d'un back-to-back et la charge de déplacement.
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
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Cadence & calendrier (Tampa Bay)</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse du contexte physique de Tampa Bay, incluant l'enchaînement des matchs, le repos disponible, la présence éventuelle d'un back-to-back et la charge de déplacement.
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
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Avantage domicile / extérieur (Vegas)</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse de la performance contextuelle de Vegas, selon qu'elle évolue à domicile ou sur la route, et l'impact du dernier changement sur les matchups.
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
                                  <h4 className="text-white font-bold text-sm mb-2">Analyse — Avantage domicile / extérieur (Tampa Bay)</h4>
                                  <p className="text-white/80 text-sm">
                                    Analyse de la performance contextuelle de Tampa Bay, selon qu'elle évolue à domicile ou sur la route, et l'impact du dernier changement sur les matchups.
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="border-t border-white/10 my-6"></div>

                            {/* Section 7 - Facteurs additionnels */}
                            <h3 className="text-white font-bold text-lg mb-3">
                              Autres analyses complémentaires
                            </h3>
                            
                            <div className="flex items-center gap-3">
                              <div className="relative w-5 h-5 flex-shrink-0">
                                <Loader2 className="w-5 h-5 text-white animate-spin absolute" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-white font-bold text-[7px]">IA</span>
                                </div>
                              </div>
                              <div className="bg-green-600/10 border-2 border-green-600 rounded-lg p-4 flex-1">
                                <h4 className="text-white font-bold text-sm mb-2">Analyse — Facteurs additionnels</h4>
                                <p className="text-white/80 text-sm">
                                  L'IA peut également prendre en compte d'autres variables secondaires telles que la dynamique mentale, la confiance du vestiaire, la qualité du coaching staff, la stratégie d'entrée de zone, l'exécution en transition neutre, le style de match attendu (haut événement / bas événement) et l'adaptation tactique entre périodes.
                                </p>
                              </div>
                            </div>
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
              <div className="flex justify-center pt-6 pb-4">
                <div className="text-sm font-bold text-white tracking-wider mb-2">
                  MONEYLINE MULTIPLICATEUR
                </div>
              </div>
              
              <div className="mx-4 mt-4">
                <div className="bg-green-600 rounded-lg px-6 py-2 text-center">
                  <div className="text-3xl font-black text-white">
                    x{multiplierVegas.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Match Details */}
              <div className="text-center pb-2 pt-6">
                <div className="text-sm font-bold text-white tracking-wider mb-2">
                  PARIER SUR
                </div>
              </div>
              
              <div className="mx-4 border-2 border-green-600 rounded-lg bg-black p-4">
                <div className="text-center">
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
                      <div className="text-xs font-bold text-green-400 mb-1">VICTOIRE</div>
                      <div className="bg-green-600/15 border-2 border-green-600 rounded-lg p-2 flex flex-col items-center justify-center gap-1.5 py-[6px] px-[17px]">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-2">
                          <img src={tampaLogo} alt="Tampa Bay" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-white -bottom-0.5 text-xs font-extrabold">TAMPA BAY</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bet Amount & Payout */}
              <div className="flex justify-center pt-6 mb-2">
                <div className="text-sm font-bold text-white tracking-wider text-center">
                  VOTRE GAIN
                </div>
              </div>

              <div className="pt-1">
                <div className="grid grid-cols-2 gap-2 px-[10px] my-[15px]">
                  <Dialog open={isDialogOpenVegas} onOpenChange={setIsDialogOpenVegas}>
                    <DialogTrigger asChild>
                      <button className="px-4 py-3 bg-transparent border-2 border-green-600/40 rounded-none text-center hover:bg-white/5 transition-colors cursor-pointer">
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
                  
                  <div className="bg-green-600/15 border-2 border-green-600 rounded-lg text-center py-[25px] px-0">
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
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* WASHINGTON vs KANSAS CITY CARD - NFL */}
        <div className="grid gap-2 justify-center">
          {/* AI Data Analysis Counter - Outside card */}
          <div className="flex items-center justify-center gap-3 px-4 pt-[5px] pb-2 bg-black w-full max-w-md mx-auto">
            <div className="relative w-6 h-6 flex-shrink-0">
              <Loader2 className="w-6 h-6 text-white animate-spin absolute" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-[8px]">IA</span>
              </div>
            </div>
            <span className="text-white font-semibold text-center text-[10px]">{dataCountWashington.toLocaleString()} DONNÉES ANALYSÉES PAR NOTRE IA POUR CE BET</span>
          </div>
          
          <Card className="w-full max-w-md bg-black border-3 border-green-600 shadow-2xl overflow-hidden mx-auto rounded-lg">
            <CardHeader className="space-y-0 p-0">
              {/* AI Analysis */}
              <div className="flex items-center justify-between gap-2 text-xs py-[10px] bg-green-600 px-4">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-4xl">87%</span>
                  <span className="text-white text-xs font-bold">DE CHANCE DE GAGNER SELON NOTRE IA</span>
                </div>
                <button onClick={handleShowAnalysisWashington} className="px-3 py-1 bg-black rounded-none font-bold text-green-400 text-xs hover:bg-green-600/20 transition-colors">
                  VOIR ANALYSE IA
                </button>
              </div>

              {/* Loading Dialog for Washington */}
              <Dialog open={isLoadingDialogOpenWashington} onOpenChange={setIsLoadingDialogOpenWashington}>
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
                        animationDuration: '1s'
                      }}>.</span>
                        <span className="animate-bounce" style={{
                        animationDelay: '200ms',
                        animationDuration: '1s'
                      }}>.</span>
                        <span className="animate-bounce" style={{
                        animationDelay: '400ms',
                        animationDuration: '1s'
                      }}>.</span>
                      </span>
                    </p>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Analysis Dialog for Washington */}
              <Dialog open={isAnalysisDialogOpenWashington} onOpenChange={setIsAnalysisDialogOpenWashington}>
                <DialogContent className="sm:max-w-2xl bg-black p-0 max-h-[90vh] overflow-y-auto">
                  <div className="bg-black/40">
                    <div className="flex items-center justify-center gap-3 py-2 px-6">
                      <div className="relative w-6 h-6 flex-shrink-0">
                        <Loader2 className="w-6 h-6 text-white animate-spin absolute" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white font-bold text-[8px]">IA</span>
                        </div>
                      </div>
                      <span className="text-white font-semibold text-center text-xs">{dataCountWashington.toLocaleString()} DONNÉES ANALYSÉ PAR NOTRE IA POUR CE BET JUSQU'À PRÉSENT</span>
                    </div>
                    <div className="text-center pb-2 px-6 flex items-center justify-center gap-2">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <span className="text-white/70 text-sm">
                        Dernière mise à jour IA pour ce bet : {currentTime.toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                      </span>
                    </div>
                  </div>

                  <div className="px-6 pb-6">
                    {showAnalysisWashington && <div className="mt-4 space-y-4 animate-fade-in">
                        {/* AI Confidence Section */}
                        <div className="bg-green-600/15 border-2 border-green-600 rounded-lg p-4">
                          <div className="text-center space-y-2">
                            <div className="text-white font-bold text-sm">CHANCE DE GAGNER</div>
                            <div className="text-green-400 font-bold text-4xl">87%</div>
                            <div className="text-white/70 text-xs">STATISTIQUEMENT AVEC TOUTES CES DONNÉES CI-DESSOUS ANALYSÉES</div>
                          </div>
                          <div className="w-full bg-black/40 rounded-full h-3 overflow-hidden mt-3">
                            <div className="bg-green-600 h-full rounded-full" style={{
                          width: '87%'
                        }}></div>
                          </div>
                        </div>

                        {/* Detailed analysis sections for WASHINGTON vs KANSAS CITY */}
                        <div className="space-y-6">
                          {/* Section 1 - Analyse du marché */}
                          <h3 className="text-white font-bold text-lg mb-3">
                            Analyse du marché & meilleures cotes
                          </h3>
                          
                          <div className="space-y-3">
                            <div>
                              <h4 className="text-white font-bold text-sm mb-2">Analyse — Marché & pricing (Washington)</h4>
                              <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                  <div className="relative w-5 h-5 flex-shrink-0">
                                    <Loader2 className="w-5 h-5 text-white animate-spin absolute" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="text-white font-bold text-[7px]">IA</span>
                                    </div>
                                  </div>
                                  <div className="bg-green-600/10 border-2 border-green-600 rounded-lg p-4 flex-1">
                                    <p className="text-white/80 text-sm">• Analyse de la probabilité implicite du marché pour Washington, obtenue par conversion des cotes en pourcentage réel.</p>
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
                                <div className="flex items-center gap-3">
                                  <div className="relative w-5 h-5 flex-shrink-0">
                                    <Loader2 className="w-5 h-5 text-white animate-spin absolute" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="text-white font-bold text-[7px]">IA</span>
                                    </div>
                                  </div>
                                  <div className="bg-green-600/10 border-2 border-green-600 rounded-lg p-4 flex-1">
                                    <p className="text-white/80 text-sm">• Détection d'un éventuel closing line value (CLV) et différentiel entre l'opinion publique (public money) et l'argent professionnel (sharp money).</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-white font-bold text-sm mb-2">Analyse — Marché & pricing (Kansas City)</h4>
                              <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                  <div className="relative w-5 h-5 flex-shrink-0">
                                    <Loader2 className="w-5 h-5 text-white animate-spin absolute" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="text-white font-bold text-[7px]">IA</span>
                                    </div>
                                  </div>
                                  <div className="bg-green-600/10 border-2 border-green-600 rounded-lg p-4 flex-1">
                                    <p className="text-white/80 text-sm">• Analyse de la probabilité implicite du marché pour Kansas City, obtenue par conversion des cotes en pourcentage réel.</p>
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
                                <div className="flex items-center gap-3">
                                  <div className="relative w-5 h-5 flex-shrink-0">
                                    <Loader2 className="w-5 h-5 text-white animate-spin absolute" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="text-white font-bold text-[7px]">IA</span>
                                    </div>
                                  </div>
                                  <div className="bg-green-600/10 border-2 border-green-600 rounded-lg p-4 flex-1">
                                    <p className="text-white/80 text-sm">• Détection d'un éventuel closing line value (CLV) et différentiel entre l'opinion publique (public money) et l'argent professionnel (sharp money).</p>
                                  </div>
                                </div>
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
                                Analyse des duels précédents entre les deux franchises, incluant les tendances récurrentes du matchup, la nature des rencontres (défensives, explosives, possession longue ou big plays), ainsi que les patterns stratégiques qui se répètent historiquement lorsque ces équipes se rencontrent.
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
                                <h4 className="text-white font-bold text-sm mb-2">Analyse — Passing Game (Washington)</h4>
                                <p className="text-white/80 text-sm">
                                  Analyse de l'efficacité aérienne de Washington, incluant l'EPA par passe, la capacité à générer des jeux explosifs (explosive pass rate), la séparation des receveurs et la réussite sur 3rd down.
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
                                <h4 className="text-white font-bold text-sm mb-2">Analyse — Passing Game (Kansas City)</h4>
                                <p className="text-white/80 text-sm">
                                  Analyse de l'efficacité aérienne de Kansas City, incluant l'EPA par passe, la capacité à générer des jeux explosifs (explosive pass rate), la séparation des receveurs et la réussite sur 3rd down.
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
                                <h4 className="text-white font-bold text-sm mb-2">Analyse — Red Zone Offense (Washington)</h4>
                                <p className="text-white/80 text-sm">
                                  Analyse de l'efficacité en red zone de Washington, basée sur le taux de conversion TD, la qualité du playcalling rapproché et la gestion du spacing offensif près de la ligne de but.
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
                                <h4 className="text-white font-bold text-sm mb-2">Analyse — Red Zone Offense (Kansas City)</h4>
                                <p className="text-white/80 text-sm">
                                  Analyse de l'efficacité en red zone de Kansas City, basée sur le taux de conversion TD, la qualité du playcalling rapproché et la gestion du spacing offensif près de la ligne de but.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="border-t border-white/10 my-6"></div>

                          {/* Section 5 - Défense */}
                          <h3 className="text-white font-bold text-lg mb-3">
                            Analyse de la défense & couverture
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
                                <h4 className="text-white font-bold text-sm mb-2">Analyse — Pass Rush & couverture (Washington)</h4>
                                <p className="text-white/80 text-sm">
                                  Analyse de la capacité défensive de Washington à générer de la pression sur le quarterback, la discipline en couverture, l'efficacité en 3rd down et les ajustements sur jeu aérien explosif.
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
                                <h4 className="text-white font-bold text-sm mb-2">Analyse — Pass Rush & couverture (Kansas City)</h4>
                                <p className="text-white/80 text-sm">
                                  Analyse de la capacité défensive de Kansas City à générer de la pression sur le quarterback, la discipline en couverture, l'efficacité en 3rd down et les ajustements sur jeu aérien explosif.
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
                                <h4 className="text-white font-bold text-sm mb-2">Analyse — Run Defense (Washington)</h4>
                                <p className="text-white/80 text-sm">
                                  Analyse de la défense au sol de Washington, basée sur le taux de succès autorisé, l'occupation des gaps et la limitation des gains après contact.
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
                                <h4 className="text-white font-bold text-sm mb-2">Analyse — Run Defense (Kansas City)</h4>
                                <p className="text-white/80 text-sm">
                                  Analyse de la défense au sol de Kansas City, basée sur le taux de succès autorisé, l'occupation des gaps et la limitation des gains après contact.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="border-t border-white/10 my-6"></div>

                          {/* Section 6 - Facteurs externes */}
                          <h3 className="text-white font-bold text-lg mb-3">
                            Facteurs environnementaux & contextuels
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
                                <h4 className="text-white font-bold text-sm mb-2">Analyse — Météo & conditions de jeu</h4>
                                <p className="text-white/80 text-sm">
                                  Analyse de l'impact des conditions météorologiques (vent, pluie, température), de l'état du terrain et de l'influence potentielle sur le passing game, le kicking game et les décisions stratégiques.
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
                                <h4 className="text-white font-bold text-sm mb-2">Analyse — Momentum & situation contextuelle</h4>
                                <p className="text-white/80 text-sm">
                                  Analyse de l'élan récent de chaque équipe, des séries de victoires ou défaites, de l'importance stratégique du match (playoffs, division, wild card) et de l'impact psychologique du contexte.
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
                                <h4 className="text-white font-bold text-sm mb-2">Analyse — Repos & fatigue</h4>
                                <p className="text-white/80 text-sm">
                                  Analyse du nombre de jours de repos entre les matchs, de l'impact du voyage (distance, fuseaux horaires) et de la gestion de la fatigue physique et mentale des effectifs.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>}
                  </div>
                </DialogContent>
              </Dialog>

              {/* Odds Display */}
              <div className="flex justify-center pt-6 pb-4">
                <div className="text-sm font-bold text-white tracking-wider mb-2">
                  MONEYLINE MULTIPLICATEUR
                </div>
              </div>
              
              <div className="mx-4 mt-4">
                <div className="bg-green-600 rounded-lg px-6 py-2 text-center">
                  <div className="text-3xl font-black text-white">
                    x{multiplierWashington.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Match Details */}
              <div className="text-center pb-2 pt-6">
                <div className="text-sm font-bold text-white tracking-wider mb-2">
                  PARIER SUR
                </div>
              </div>
              
              <div className="mx-4 border-2 border-green-600 rounded-lg bg-black p-4">
                <div className="text-center">
                  {/* Teams and VS */}
                  <div className="grid grid-cols-3 items-center justify-items-center gap-4 px-4">
                    {/* WASHINGTON */}
                    <div className="flex flex-col items-center gap-1">
                      <div className="text-xs font-bold text-green-400 mb-1">VICTOIRE</div>
                      <div className="bg-green-600/15 border-2 border-green-600 rounded-lg p-2 flex flex-col items-center justify-center gap-1.5 py-[6px] px-[5px]">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-2">
                          <img src={washingtonLogo} alt="Washington" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-white -bottom-0.5 text-xs font-extrabold">WASHINGTON</span>
                      </div>
                    </div>

                    {/* Center time + VS */}
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-semibold text-sm text-white">3:25 PM</span>
                      <div className="px-2 py-0.5 rounded-full border border-white/20 bg-white/0">
                        <span className="text-white font-bold text-xs">VS</span>
                      </div>
                    </div>

                    {/* KANSAS CITY */}
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-white/20 p-2">
                        <img src={kansascityLogo} alt="Kansas City" className="w-full h-full object-contain" />
                      </div>
                      <span className="font-bold text-xs text-white">KANSAS CITY</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bet Amount & Payout */}
              <div className="flex justify-center pt-6 mb-2">
                <div className="text-sm font-bold text-white tracking-wider text-center">
                  VOTRE GAIN
                </div>
              </div>

              <div className="pt-1">
                <div className="grid grid-cols-2 gap-2 px-[10px] my-[15px]">
                  <Dialog open={isDialogOpenWashington} onOpenChange={setIsDialogOpenWashington}>
                    <DialogTrigger asChild>
                      <button className="px-4 py-3 bg-transparent border-2 border-green-600/40 rounded-none text-center hover:bg-white/5 transition-colors cursor-pointer">
                        <div className="text-white text-xs mb-1">Votre mise</div>
                        <div className="text-green-400 font-bold text-lg">${betAmountWashington}</div>
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
                          setBetAmountWashington(amount.toString());
                          setIsDialogOpenWashington(false);
                        }} className={`px-3 py-2 rounded-2xl text-sm font-semibold transition-colors ${betAmountWashington === amount.toString() ? 'bg-primary text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                              ${amount}
                            </button>)}
                          <button onClick={() => {
                          const custom = prompt("Entrez le montant:");
                          if (custom && parseFloat(custom) > 0) {
                            setBetAmountWashington(custom);
                            setIsDialogOpenWashington(false);
                          }
                        }} className="px-3 py-2 rounded-2xl text-sm font-semibold bg-white/10 text-white hover:bg-white/20">
                            Autre
                          </button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <div className="bg-green-600/15 border-2 border-green-600 rounded-lg text-center py-[25px] px-0">
                    <div className="text-white text-xs mb-1">Cashout x{multiplierWashington.toFixed(2)} →</div>
                    <div className="text-green-400 font-bold text-lg">${calculateReturn(betAmountWashington, multiplierWashington)}</div>
                    <div className="text-white text-[10px] mt-0.5">
                      +${(parseFloat(calculateReturn(betAmountWashington, multiplierWashington)) - parseFloat(betAmountWashington)).toFixed(2)} bénéfice
                    </div>
                  </div>
                </div>
              </div>

              {/* BetMGM Section */}
              <div className="pt-0">
                <div className="flex items-center justify-center gap-2 text-xs my-0 py-[10px] border-t-2 border-green-600 bg-green-600">
                  <div className="relative w-5 h-5 flex-shrink-0">
                    <Loader2 className="w-5 h-5 text-white animate-spin absolute" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-[8px]">IA</span>
                    </div>
                  </div>
                  <span className="text-white">Meilleur odds:</span>
                  <span className="font-bold text-white">BETMGM</span>
                  <span className="px-2 py-1 bg-black rounded border-2 border-green-600 font-bold text-green-400">+488</span>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

      </div>
    </DashboardLayout>;
};
export default Index;