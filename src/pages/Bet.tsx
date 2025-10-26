import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import vegasLogo from "@/assets/vegas-logo.png";
import tampaLogo from "@/assets/tampa-logo.png";

const Bet = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Paris Recommandés</h1>
          <p className="text-muted-foreground">Découvrez nos pronostics avec les meilleures cotes</p>
        </div>

        <div className="grid gap-6">
          <Card className="max-w-3xl bg-background border-2 border-white shadow-2xl overflow-hidden">
            {/* AI Analysis Badge */}
            <div className="bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 px-6 py-2 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-primary text-xs font-bold tracking-widest">ANALYSE IA • 92%</span>
              </div>
              <div className="text-primary text-xs font-bold">
                5:00 PM
              </div>
            </div>

            <CardHeader className="space-y-6 pb-6">
              {/* Main Prediction - BIG */}
              <div className="text-center space-y-4 py-6">
                <div className="text-xs font-bold text-primary/70 tracking-[0.3em]">PRONOSTIC</div>
                
                {/* Tampa Bay Logo + Win Statement */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"></div>
                    <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-white relative z-10">
                      <img src={tampaLogo} alt="Tampa Bay" className="w-32 h-32 object-contain" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-5xl font-black text-white tracking-tight">
                      TAMPA BAY
                    </h2>
                    <div className="text-3xl font-bold text-primary">
                      VICTOIRE
                    </div>
                  </div>
                </div>
              </div>

              {/* Match Details Below */}
              <div className="pt-6 border-t border-white/10">
                <div className="flex items-center justify-center gap-6">
                  {/* Vegas */}
                  <div className="flex items-center gap-3">
                    <div className="bg-white rounded-lg p-2 shadow-md">
                      <img src={vegasLogo} alt="Vegas" className="w-10 h-10 object-contain" />
                    </div>
                    <span className="font-bold text-muted-foreground">VEGAS</span>
                  </div>

                  <div className="px-4 py-1 bg-white/5 rounded-full border border-white/10">
                    <span className="text-white/60 font-bold text-sm">VS</span>
                  </div>

                  {/* Tampa Bay */}
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-white">TAMPA BAY</span>
                    <div className="bg-white rounded-lg p-2 shadow-md">
                      <img src={tampaLogo} alt="Tampa Bay" className="w-10 h-10 object-contain" />
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pb-6 space-y-4">
              {/* AI Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/5 rounded-lg p-3 text-center border border-white/10">
                  <div className="text-xs text-primary/70 mb-1 font-bold">PRÉCISION</div>
                  <div className="text-xl font-black text-primary">92%</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center border border-white/10">
                  <div className="text-xs text-primary/70 mb-1 font-bold">CONFIANCE</div>
                  <div className="text-xl font-black text-primary">HIGH</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center border border-white/10">
                  <div className="text-xs text-primary/70 mb-1 font-bold">SOURCES</div>
                  <div className="text-xl font-black text-primary">250+</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Bet;
