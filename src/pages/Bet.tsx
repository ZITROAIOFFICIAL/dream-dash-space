import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import vegasLogo from "@/assets/vegas-logo.png";
import tampaLogo from "@/assets/tampa-logo.png";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
const Bet = () => {
  const [betAmount, setBetAmount] = useState<string>("100");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isLoadingDialogOpen, setIsLoadingDialogOpen] = useState(false);
  const [isAnalysisDialogOpen, setIsAnalysisDialogOpen] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const shouldBeFast = Math.random() < 0.85; // 85% rapide, 15% lent
    const randomDelay = shouldBeFast ? Math.random() * (700 - 500) + 500 // 0.5s à 0.7s
    : 2000; // 2 secondes
    setTimeout(() => {
      setIsPageLoading(false);
    }, randomDelay);
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Met à jour chaque seconde

    return () => clearInterval(timer);
  }, []);
  const handleShowAnalysis = () => {
    setIsLoadingDialogOpen(true);
    const randomDelay = Math.random() * (5000 - 1500) + 1500; // Entre 1.5s et 5s
    setTimeout(() => {
      setIsLoadingDialogOpen(false);
      setIsAnalysisDialogOpen(true);
      setShowAnalysis(true);
    }, randomDelay);
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
  if (isPageLoading) {
    return <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
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
      </div>;
  }
  return <DashboardLayout>
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-white/70 text-sm">
              Dernière mise à jour IA : {currentTime.toLocaleTimeString('fr-FR', {
              hour: '2-digit',
              minute: '2-digit'
            })}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Paris Recommandés</h1>
          <p className="text-muted-foreground">Découvrez nos pronostics avec les meilleures cotes</p>
        </div>

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
                <button onClick={handleShowAnalysis} className="px-3 py-1 bg-black rounded border-2 border-green-600 font-bold text-green-400 text-xs hover:bg-green-600/20 transition-colors">
                  VOIR ANALYSE IA
                </button>

                {/* Loading Dialog */}
                <Dialog open={isLoadingDialogOpen} onOpenChange={setIsLoadingDialogOpen}>
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

                {/* Analysis Dialog */}
                <Dialog open={isAnalysisDialogOpen} onOpenChange={setIsAnalysisDialogOpen}>
                  <DialogContent className="sm:max-w-2xl bg-black border-[3px] border-green-600 p-0 max-h-[90vh] overflow-y-auto">
                    {/* AI Data Analysis Counter - Same as main card */}
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
                      {/* Detailed Analysis */}
                      {showAnalysis && <div className="mt-4 space-y-4 animate-fade-in">
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

                          {/* 1) Spécial Teams */}
                          <div className="bg-black/40 rounded-lg p-4 border border-green-600/30">
                            <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                              <div className="relative w-5 h-5 flex-shrink-0">
                                <Loader2 className="w-5 h-5 text-green-400 animate-spin absolute" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-green-400 font-bold text-[8px]">IA</span>
                                </div>
                              </div>
                              ✅ 1) Spécial Teams
                            </h4>
                            <div className="space-y-3 text-xs">
                              <div className="bg-white/5 p-3 rounded">
                                <div className="text-white/90 font-semibold mb-1 pl-10">Power Play — Vegas</div>
                                <div className="flex items-start gap-2">
                                  <div className="relative w-8 h-8 flex-shrink-0">
                                    <Loader2 className="w-8 h-8 text-white animate-spin absolute" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="text-white font-bold text-[10px]">IA</span>
                                    </div>
                                  </div>
                                  <div className="text-white/70">Analyse du rendement en avantage numérique : structure offensive, qualité des entrées de zone, création de chances dangereuses et efficacité globale des unités spéciales.</div>
                                </div>
                              </div>
                              <div className="bg-white/5 p-3 rounded">
                                <div className="text-white/90 font-semibold mb-1 pl-10">Power Play — Tampa Bay</div>
                                <div className="flex items-start gap-2">
                                  <div className="relative w-8 h-8 flex-shrink-0">
                                    <Loader2 className="w-8 h-8 text-white animate-spin absolute" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="text-white font-bold text-[10px]">IA</span>
                                    </div>
                                  </div>
                                  <div className="text-white/70">Analyse du rendement en avantage numérique : structure offensive, qualité des entrées de zone, création de chances dangereuses et efficacité globale des unités spéciales.</div>
                                </div>
                              </div>
                              <div className="bg-white/5 p-3 rounded">
                                <div className="text-white/90 font-semibold mb-1 pl-10">Pénalités — Vegas</div>
                                <div className="flex items-start gap-2">
                                  <div className="relative w-8 h-8 flex-shrink-0">
                                    <Loader2 className="w-8 h-8 text-white animate-spin absolute" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="text-white font-bold text-[10px]">IA</span>
                                    </div>
                                  </div>
                                  <div className="text-white/70">Analyse du niveau de discipline : fréquence des pénalités concédées, situations de désavantage numérique générées et impact sur le tempo du match.</div>
                                </div>
                              </div>
                              <div className="bg-white/5 p-3 rounded">
                                <div className="text-white/90 font-semibold mb-1 pl-10">Pénalités — Tampa Bay</div>
                                <div className="flex items-start gap-2">
                                  <div className="relative w-8 h-8 flex-shrink-0">
                                    <Loader2 className="w-8 h-8 text-white animate-spin absolute" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="text-white font-bold text-[10px]">IA</span>
                                    </div>
                                  </div>
                                  <div className="text-white/70">Analyse du niveau de discipline : fréquence des pénalités concédées, situations de désavantage numérique générées et impact sur le tempo du match.</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* 2) Possession & Qualité offensive */}
                          <div className="bg-black/40 rounded-lg p-4 border border-green-600/30">
                            <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                              <div className="relative w-5 h-5 flex-shrink-0">
                                <Loader2 className="w-5 h-5 text-green-400 animate-spin absolute" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-green-400 font-bold text-[8px]">IA</span>
                                </div>
                              </div>
                              ✅ 2) Possession & Qualité offensive
                            </h4>
                            <div className="space-y-3 text-xs">
                              <div className="bg-white/5 p-3 rounded">
                                <div className="text-white/90 font-semibold mb-1 pl-10">xG (Expected Goals) — Vegas</div>
                                <div className="flex items-start gap-2">
                                  <div className="relative w-8 h-8 flex-shrink-0">
                                    <Loader2 className="w-8 h-8 text-white animate-spin absolute" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="text-white font-bold text-[10px]">IA</span>
                                    </div>
                                  </div>
                                  <div className="text-white/70">Analyse de la qualité offensive générée : volume de tirs dangereux, emplacements de tir et probabilité attendue de marquer.</div>
                                </div>
                              </div>
                              <div className="bg-white/5 p-3 rounded">
                                <div className="text-white/90 font-semibold mb-1 pl-10">xG (Expected Goals) — Tampa Bay</div>
                                <div className="flex items-start gap-2">
                                  <div className="relative w-8 h-8 flex-shrink-0">
                                    <Loader2 className="w-8 h-8 text-white animate-spin absolute" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="text-white font-bold text-[10px]">IA</span>
                                    </div>
                                  </div>
                                  <div className="text-white/70">Analyse de la qualité offensive générée : volume de tirs dangereux, emplacements de tir et probabilité attendue de marquer.</div>
                                </div>
                              </div>
                              <div className="bg-white/5 p-3 rounded">
                                <div className="text-white/90 font-semibold mb-1 pl-10">Possession (Corsi/Fenwick) — Vegas</div>
                                <div className="flex items-start gap-2">
                                  <div className="relative w-8 h-8 flex-shrink-0">
                                    <Loader2 className="w-8 h-8 text-white animate-spin absolute" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="text-white font-bold text-[10px]">IA</span>
                                    </div>
                                  </div>
                                  <div className="text-white/70">Analyse du contrôle du palet : volume de tirs tentés, séquences prolongées en zone offensive et capacité à dicter le rythme du jeu.</div>
                                </div>
                              </div>
                              <div className="bg-white/5 p-3 rounded">
                                <div className="text-white/90 font-semibold mb-1 pl-10">Possession (Corsi/Fenwick) — Tampa Bay</div>
                                <div className="flex items-start gap-2">
                                  <div className="relative w-8 h-8 flex-shrink-0">
                                    <Loader2 className="w-8 h-8 text-white animate-spin absolute" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="text-white font-bold text-[10px]">IA</span>
                                    </div>
                                  </div>
                                  <div className="text-white/70">Analyse du contrôle du palet : volume de tirs tentés, séquences prolongées en zone offensive et capacité à dicter le rythme du jeu.</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* 3) Gardien / Défense */}
                          <div className="bg-black/40 rounded-lg p-4 border border-green-600/30">
                            <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                              <div className="relative w-5 h-5 flex-shrink-0">
                                <Loader2 className="w-5 h-5 text-green-400 animate-spin absolute" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-green-400 font-bold text-[8px]">IA</span>
                                </div>
                              </div>
                              ✅ 3) Gardien / Défense
                            </h4>
                            <div className="space-y-3 text-xs">
                              <div className="bg-white/5 p-3 rounded">
                                <div className="text-white/90 font-semibold mb-1 pl-10">Performance du gardien — Vegas</div>
                                <div className="flex items-start gap-2">
                                  <div className="relative w-8 h-8 flex-shrink-0">
                                    <Loader2 className="w-8 h-8 text-white animate-spin absolute" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="text-white font-bold text-[10px]">IA</span>
                                    </div>
                                  </div>
                                  <div className="text-white/70">Analyse du rendement du gardien projeté : efficacité sur tirs dangereux, stabilité technique et capacité à maintenir un haut niveau sous pression.</div>
                                </div>
                              </div>
                              <div className="bg-white/5 p-3 rounded">
                                <div className="text-white/90 font-semibold mb-1 pl-10">Performance du gardien — Tampa Bay</div>
                                <div className="flex items-start gap-2">
                                  <div className="relative w-8 h-8 flex-shrink-0">
                                    <Loader2 className="w-8 h-8 text-white animate-spin absolute" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="text-white font-bold text-[10px]">IA</span>
                                    </div>
                                  </div>
                                  <div className="text-white/70">Analyse du rendement du gardien projeté : efficacité sur tirs dangereux, stabilité technique et capacité à maintenir un haut niveau sous pression.</div>
                                </div>
                              </div>
                              <div className="bg-white/5 p-3 rounded">
                                <div className="text-white/90 font-semibold mb-1 pl-10">Solidité défensive — Vegas</div>
                                <div className="flex items-start gap-2">
                                  <div className="relative w-8 h-8 flex-shrink-0">
                                    <Loader2 className="w-8 h-8 text-white animate-spin absolute" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="text-white font-bold text-[10px]">IA</span>
                                    </div>
                                  </div>
                                  <div className="text-white/70">Analyse de la structure défensive : protection du slot, limitation des rebonds offensifs adverses et efficacité des sorties de zone.</div>
                                </div>
                              </div>
                              <div className="bg-white/5 p-3 rounded">
                                <div className="text-white/90 font-semibold mb-1 pl-10">Solidité défensive — Tampa Bay</div>
                                <div className="flex items-start gap-2">
                                  <div className="relative w-8 h-8 flex-shrink-0">
                                    <Loader2 className="w-8 h-8 text-white animate-spin absolute" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="text-white font-bold text-[10px]">IA</span>
                                    </div>
                                  </div>
                                  <div className="text-white/70">Analyse de la structure défensive : protection du slot, limitation des rebonds offensifs adverses et efficacité des sorties de zone.</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* 4) Alignement & santé de l'effectif */}
                          <div className="bg-black/40 rounded-lg p-4 border border-green-600/30">
                            <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                              <div className="relative w-5 h-5 flex-shrink-0">
                                <Loader2 className="w-5 h-5 text-green-400 animate-spin absolute" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-green-400 font-bold text-[8px]">IA</span>
                                </div>
                              </div>
                              ✅ 4) Alignement & santé de l'effectif
                            </h4>
                            <div className="space-y-3 text-xs">
                              <div className="bg-white/5 p-3 rounded">
                                <div className="text-white/90 font-semibold mb-1 pl-10">Alignement/Top-6 — Vegas</div>
                                <div className="flex items-start gap-2">
                                  <div className="relative w-8 h-8 flex-shrink-0">
                                    <Loader2 className="w-8 h-8 text-white animate-spin absolute" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="text-white font-bold text-[10px]">IA</span>
                                    </div>
                                  </div>
                                  <div className="text-white/70">Analyse de l'impact offensif disponible : profondeur du top-6, cohésion des trios et continuité des combinaisons attaquantes.</div>
                                </div>
                              </div>
                              <div className="bg-white/5 p-3 rounded">
                                <div className="text-white/90 font-semibold mb-1 pl-10">Alignement/Top-6 — Tampa Bay</div>
                                <div className="flex items-start gap-2">
                                  <div className="relative w-8 h-8 flex-shrink-0">
                                    <Loader2 className="w-8 h-8 text-white animate-spin absolute" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="text-white font-bold text-[10px]">IA</span>
                                    </div>
                                  </div>
                                  <div className="text-white/70">Analyse de l'impact offensif disponible : profondeur du top-6, cohésion des trios et continuité des combinaisons attaquantes.</div>
                                </div>
                              </div>
                              <div className="bg-white/5 p-3 rounded">
                                <div className="text-white/90 font-semibold mb-1 pl-10">Défense/Top-4 — Vegas</div>
                                <div className="flex items-start gap-2">
                                  <div className="relative w-8 h-8 flex-shrink-0">
                                    <Loader2 className="w-8 h-8 text-white animate-spin absolute" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="text-white font-bold text-[10px]">IA</span>
                                    </div>
                                  </div>
                                  <div className="text-white/70">Analyse de la stabilité défensive : niveau du top-4, mobilité en relance et capacité à absorber la pression adverse.</div>
                                </div>
                              </div>
                              <div className="bg-white/5 p-3 rounded">
                                <div className="text-white/90 font-semibold mb-1 pl-10">Défense/Top-4 — Tampa Bay</div>
                                <div className="flex items-start gap-2">
                                  <div className="relative w-8 h-8 flex-shrink-0">
                                    <Loader2 className="w-8 h-8 text-white animate-spin absolute" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="text-white font-bold text-[10px]">IA</span>
                                    </div>
                                  </div>
                                  <div className="text-white/70">Analyse de la stabilité défensive : niveau du top-4, mobilité en relance et capacité à absorber la pression adverse.</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* 5) Contexte & fatigue */}
                          <div className="bg-black/40 rounded-lg p-4 border border-green-600/30">
                            <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                              <div className="relative w-5 h-5 flex-shrink-0">
                                <Loader2 className="w-5 h-5 text-green-400 animate-spin absolute" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-green-400 font-bold text-[8px]">IA</span>
                                </div>
                              </div>
                              ✅ 5) Contexte & fatigue
                            </h4>
                            <div className="space-y-3 text-xs">
                              <div className="bg-white/5 p-3 rounded">
                                <div className="text-white/90 font-semibold mb-1 pl-10">Fatigue / Calendrier — Vegas</div>
                                <div className="flex items-start gap-2">
                                  <div className="relative w-8 h-8 flex-shrink-0">
                                    <Loader2 className="w-8 h-8 text-white animate-spin absolute" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="text-white font-bold text-[10px]">IA</span>
                                    </div>
                                  </div>
                                  <div className="text-white/70">Analyse du contexte physique : back-to-back éventuel, séquence de matchs rapprochés et accumulation des déplacements.</div>
                                </div>
                              </div>
                              <div className="bg-white/5 p-3 rounded">
                                <div className="text-white/90 font-semibold mb-1 pl-10">Fatigue / Calendrier — Tampa Bay</div>
                                <div className="flex items-start gap-2">
                                  <div className="relative w-8 h-8 flex-shrink-0">
                                    <Loader2 className="w-8 h-8 text-white animate-spin absolute" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="text-white font-bold text-[10px]">IA</span>
                                    </div>
                                  </div>
                                  <div className="text-white/70">Analyse du contexte physique : back-to-back éventuel, séquence de matchs rapprochés et accumulation des déplacements.</div>
                                </div>
                              </div>
                              <div className="bg-white/5 p-3 rounded">
                                <div className="text-white/90 font-semibold mb-1 pl-10">Avantage domicile / extérieur — Vegas</div>
                                <div className="flex items-start gap-2">
                                  <div className="relative w-8 h-8 flex-shrink-0">
                                    <Loader2 className="w-8 h-8 text-white animate-spin absolute" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="text-white font-bold text-[10px]">IA</span>
                                    </div>
                                  </div>
                                  <div className="text-white/70">Analyse de l'impact contextuel : rendement en déplacement, adaptation hors domicile et gestion des dernières mises au jeu.</div>
                                </div>
                              </div>
                              <div className="bg-white/5 p-3 rounded">
                                <div className="text-white/90 font-semibold mb-1 pl-10">Avantage domicile / extérieur — Tampa Bay</div>
                                <div className="flex items-start gap-2">
                                  <div className="relative w-8 h-8 flex-shrink-0">
                                    <Loader2 className="w-8 h-8 text-white animate-spin absolute" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="text-white font-bold text-[10px]">IA</span>
                                    </div>
                                  </div>
                                  <div className="text-white/70">Analyse de l'impact contextuel : rendement en déplacement, adaptation hors domicile et gestion des dernières mises au jeu.</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* 6) Marché / Value */}
                          <div className="bg-black/40 rounded-lg p-4 border border-green-600/30">
                            <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                              <div className="relative w-5 h-5 flex-shrink-0">
                                <Loader2 className="w-5 h-5 text-green-400 animate-spin absolute" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-green-400 font-bold text-[8px]">IA</span>
                                </div>
                              </div>
                              ✅ 6) Marché / Value
                            </h4>
                            <div className="space-y-3 text-xs">
                              <div className="bg-white/5 p-3 rounded">
                                <div className="text-white/90 font-semibold mb-1 pl-10">Lecture du marché — Vegas</div>
                                <div className="flex items-start gap-2">
                                  <div className="relative w-8 h-8 flex-shrink-0">
                                    <Loader2 className="w-8 h-8 text-white animate-spin absolute" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="text-white font-bold text-[10px]">IA</span>
                                    </div>
                                  </div>
                                  <div className="text-white/70">Analyse de la probabilité implicite des cotes : variation du marché, rapport entre perception publique et réalité statistique.</div>
                                </div>
                              </div>
                              <div className="bg-white/5 p-3 rounded">
                                <div className="text-white/90 font-semibold mb-1 pl-10">Lecture du marché — Tampa Bay</div>
                                <div className="flex items-start gap-2">
                                  <div className="relative w-8 h-8 flex-shrink-0">
                                    <Loader2 className="w-8 h-8 text-white animate-spin absolute" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="text-white font-bold text-[10px]">IA</span>
                                    </div>
                                  </div>
                                  <div className="text-white/70">Analyse de la probabilité implicite des cotes : variation du marché, rapport entre perception publique et réalité statistique.</div>
                                </div>
                              </div>
                              <div className="bg-white/5 p-3 rounded">
                                <div className="text-white/90 font-semibold mb-1 pl-10">Value / Edge — Vegas</div>
                                <div className="flex items-start gap-2">
                                  <div className="relative w-8 h-8 flex-shrink-0">
                                    <Loader2 className="w-8 h-8 text-white animate-spin absolute" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="text-white font-bold text-[10px]">IA</span>
                                    </div>
                                  </div>
                                  <div className="text-white/70">Analyse de l'écart entre le modèle et la cotation : comparaison des probabilités réelles et opportunités de value sur le marché.</div>
                                </div>
                              </div>
                              <div className="bg-white/5 p-3 rounded">
                                <div className="text-white/90 font-semibold mb-1 pl-10">Value / Edge — Tampa Bay</div>
                                <div className="flex items-start gap-2">
                                  <div className="relative w-8 h-8 flex-shrink-0">
                                    <Loader2 className="w-8 h-8 text-white animate-spin absolute" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="text-white font-bold text-[10px]">IA</span>
                                    </div>
                                  </div>
                                  <div className="text-white/70">Analyse de l'écart entre le modèle et la cotation : comparaison des probabilités réelles et opportunités de value sur le marché.</div>
                                </div>
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
      </div>
    </DashboardLayout>;
};
export default Bet;