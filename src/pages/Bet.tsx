import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Shield, Zap } from "lucide-react";

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
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <Shield className="h-6 w-6" />
                  </div>
                  <span className="font-semibold">VEGAS</span>
                </div>

                <span className="text-muted-foreground font-medium">vs</span>

                {/* Tampa Bay */}
                <div className="flex items-center gap-3">
                  <span className="font-semibold">TAMPA BAY</span>
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <Zap className="h-6 w-6" />
                  </div>
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
