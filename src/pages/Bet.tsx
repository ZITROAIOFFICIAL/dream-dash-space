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
          <Card className="max-w-3xl bg-background border-2 border-white/20 shadow-2xl overflow-hidden">
            {/* AI Analysis Badge */}
            <div className="bg-gradient-to-r from-primary via-primary/80 to-primary px-6 py-4 flex items-center justify-center border-2 border-white shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                <span className="text-white text-xs font-bold tracking-widest">ANALYSE IA • 92% DE GAGNER LE BET</span>
                <div className="text-white text-xs font-bold">• 5:00 PM</div>
              </div>
            </div>

            <CardHeader className="space-y-6 pb-6">
              {/* Main Prediction - BIG */}
              <div className="text-center space-y-4 py-6">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-primary/70 tracking-[0.3em]">PRONOSTIC</div>
                  <div className="text-xs font-bold text-white/60 tracking-[0.25em]">MONEY LINE</div>
                </div>
                
                {/* Tampa Bay Logo + Win Statement */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full animate-pulse"></div>
                    <img src={tampaLogo} alt="Tampa Bay" className="w-32 h-32 object-contain relative z-10" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-5xl font-black text-white tracking-tight drop-shadow-lg">
                      TAMPA BAY
                    </h2>
                    <div className="text-3xl font-bold text-primary drop-shadow-[0_0_20px_rgba(139,92,246,0.5)]">
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
                    <img src={vegasLogo} alt="Vegas" className="w-12 h-12 object-contain opacity-60" />
                    <span className="font-bold text-muted-foreground">VEGAS</span>
                  </div>

                  <div className="px-4 py-1 bg-white/5 rounded-full border border-white/10">
                    <span className="text-white/60 font-bold text-sm">VS</span>
                  </div>

                  {/* Tampa Bay */}
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-white">TAMPA BAY</span>
                    <img src={tampaLogo} alt="Tampa Bay" className="w-12 h-12 object-contain" />
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

export default Bet;
