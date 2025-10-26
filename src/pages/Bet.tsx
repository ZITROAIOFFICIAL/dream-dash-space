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
          <Card className="max-w-3xl bg-white border-0 shadow-xl overflow-hidden">
            {/* AI Analysis Badge */}
            <div className="bg-gradient-to-r from-primary/90 via-primary to-primary/80 px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-semibold tracking-wide">ANALYSE IA EN COURS</span>
              </div>
              <div className="text-white text-xs bg-white/20 px-3 py-1 rounded-full">
                250+ sources analysées
              </div>
            </div>

            <CardHeader className="space-y-6 pb-4 bg-white">
              <div className="flex items-center justify-between">
                <div className="text-sm font-bold text-gray-800 bg-gray-100 px-4 py-2 rounded-lg">
                  🕐 5:00 PM
                </div>
                <div className="flex items-center gap-2 bg-gradient-to-r from-primary/10 to-primary/5 px-4 py-2 rounded-lg border border-primary/20">
                  <div className="text-xs font-semibold text-primary">SCORE IA</div>
                  <div className="text-2xl font-bold text-primary">92%</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between gap-6 py-6 relative">
                {/* Decorative line */}
                <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                
                {/* Vegas */}
                <div className="flex flex-col items-center gap-3 flex-1 relative z-10">
                  <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-2xl shadow-md border border-gray-100">
                    <img src={vegasLogo} alt="Vegas" className="w-20 h-20 object-contain" />
                  </div>
                  <span className="font-bold text-lg text-gray-800">VEGAS</span>
                </div>

                <div className="flex flex-col items-center gap-2 relative z-10 bg-white px-4">
                  <span className="text-gray-400 font-bold text-xl">VS</span>
                </div>

                {/* Tampa Bay */}
                <div className="flex flex-col items-center gap-3 flex-1 relative z-10">
                  <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-2xl shadow-md border border-gray-100">
                    <img src={tampaLogo} alt="Tampa Bay" className="w-20 h-20 object-contain" />
                  </div>
                  <span className="font-bold text-lg text-gray-800">TAMPA BAY</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-4 bg-white space-y-4">
              {/* Pronostic */}
              <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-white rounded-2xl p-6 text-center border-2 border-primary/20 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
                
                <div className="relative z-10">
                  <div className="text-xs font-bold text-primary/70 mb-2 tracking-widest">PRONOSTIC IA</div>
                  <div className="text-3xl font-black text-primary mb-3">
                    Victoire Tampa Bay
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span>Basé sur l'analyse de statistiques, tendances et historiques</span>
                  </div>
                </div>
              </div>

              {/* AI Research Indicators */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-100">
                  <div className="text-xs text-gray-500 mb-1">Précision</div>
                  <div className="text-lg font-bold text-gray-800">92%</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-100">
                  <div className="text-xs text-gray-500 mb-1">Confiance</div>
                  <div className="text-lg font-bold text-gray-800">Élevée</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-100">
                  <div className="text-xs text-gray-500 mb-1">Sources</div>
                  <div className="text-lg font-bold text-gray-800">250+</div>
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
