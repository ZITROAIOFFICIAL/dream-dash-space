import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Clock } from "lucide-react";

const Bet = () => {
  const bets = [
    {
      id: 1,
      match: "PSG vs Marseille",
      league: "Ligue 1",
      prediction: "PSG gagne",
      odds: "1.85",
      confidence: "Haute",
      time: "Aujourd'hui 21:00",
      status: "active"
    },
    {
      id: 2,
      match: "Real Madrid vs Barcelona",
      league: "La Liga",
      prediction: "Plus de 2.5 buts",
      odds: "2.10",
      confidence: "Moyenne",
      time: "Demain 16:00",
      status: "upcoming"
    },
    {
      id: 3,
      match: "Manchester City vs Liverpool",
      league: "Premier League",
      prediction: "Les deux équipes marquent",
      odds: "1.95",
      confidence: "Haute",
      time: "Samedi 18:30",
      status: "upcoming"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Paris Recommandés</h1>
          <p className="text-muted-foreground">Découvrez nos pronostics avec les meilleures cotes</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bets.map((bet) => (
            <Card key={bet.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant={bet.status === "active" ? "default" : "secondary"}>
                    {bet.league}
                  </Badge>
                  <Badge variant={bet.confidence === "Haute" ? "default" : "outline"}>
                    {bet.confidence}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{bet.match}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {bet.time}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Pronostic</p>
                  <p className="font-semibold text-lg">{bet.prediction}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Cote</p>
                    <p className="text-2xl font-bold text-primary">{bet.odds}</p>
                  </div>
                  <Button className="gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Placer Paris
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Bet;
