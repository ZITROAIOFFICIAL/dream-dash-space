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
          <Card className="max-w-3xl border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="space-y-6 pb-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
                  5:00 PM
                </div>
              </div>
              
              <div className="flex items-center justify-between gap-6 py-4">
                {/* Vegas */}
                <div className="flex flex-col items-center gap-3 flex-1">
                  <img src={vegasLogo} alt="Vegas" className="w-20 h-20 object-contain" />
                  <span className="font-bold text-lg text-foreground">VEGAS</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <span className="text-muted-foreground/60 font-semibold text-sm">VS</span>
                </div>

                {/* Tampa Bay */}
                <div className="flex flex-col items-center gap-3 flex-1">
                  <img src={tampaLogo} alt="Tampa Bay" className="w-20 h-20 object-contain" />
                  <span className="font-bold text-lg text-foreground">TAMPA BAY</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-4 border-t border-border/50">
              <div className="bg-primary/10 rounded-lg p-4 text-center">
                <div className="text-xs font-medium text-muted-foreground mb-1">PRONOSTIC</div>
                <div className="text-xl font-bold text-primary">
                  Victoire Tampa Bay
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
