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
          <Card className="max-w-2xl">
            <CardHeader className="space-y-4">
              <div className="text-sm text-muted-foreground">5:00PM</div>
              
              <div className="flex items-center justify-between gap-4">
                {/* Vegas */}
                <div className="flex items-center gap-3">
                  <img src={vegasLogo} alt="Vegas" className="w-12 h-12 object-contain" />
                  <span className="font-semibold">VEGAS</span>
                </div>

                <span className="text-muted-foreground font-medium">vs</span>

                {/* Tampa Bay */}
                <div className="flex items-center gap-3">
                  <span className="font-semibold">TAMPA BAY</span>
                  <img src={tampaLogo} alt="Tampa Bay" className="w-12 h-12 object-contain" />
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="text-lg font-semibold">
                Victoire Tampa Bay
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Bet;
