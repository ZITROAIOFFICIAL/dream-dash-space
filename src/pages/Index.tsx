import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Target, DollarSign, Award } from "lucide-react";

const Index = () => {
  const stats = [
    {
      title: "Taux de Réussite",
      value: "78%",
      icon: Target,
      description: "+5% ce mois",
      color: "text-primary"
    },
    {
      title: "Paris Actifs",
      value: "12",
      icon: TrendingUp,
      description: "En cours",
      color: "text-blue-500"
    },
    {
      title: "Gains Totaux",
      value: "2,450€",
      icon: DollarSign,
      description: "+380€ cette semaine",
      color: "text-green-500"
    },
    {
      title: "Classement",
      value: "#24",
      icon: Award,
      description: "Sur 1,000 utilisateurs",
      color: "text-yellow-500"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Paris Recommandés
          </h1>
          <p className="text-white/70 text-lg">
            Découvrez nos pronostics avec les meilleures cotes
          </p>
        </div>

        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Tableau de Bord
          </h1>
          <p className="text-muted-foreground text-lg">
            Bienvenue sur votre dashboard de paris sportifs
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <CardDescription className="text-xs mt-1">
                    {stat.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Performance Récente</CardTitle>
              <CardDescription>Vos derniers résultats</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { match: "PSG vs Lyon", result: "Gagné", amount: "+150€" },
                  { match: "Real vs Atlético", result: "Gagné", amount: "+180€" },
                  { match: "Bayern vs Leipzig", result: "Perdu", amount: "-100€" },
                  { match: "Chelsea vs Arsenal", result: "Gagné", amount: "+200€" }
                ].map((bet, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium">{bet.match}</p>
                      <p className="text-sm text-muted-foreground">{bet.result}</p>
                    </div>
                    <span className={`font-bold ${
                      bet.result === "Gagné" ? "text-primary" : "text-destructive"
                    }`}>
                      {bet.amount}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Prochains Matchs</CardTitle>
              <CardDescription>Paris recommandés aujourd'hui</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { match: "Barcelona vs Real Madrid", time: "21:00", odds: "2.10" },
                  { match: "Man City vs Liverpool", time: "18:30", odds: "1.85" },
                  { match: "Juventus vs Milan", time: "20:45", odds: "1.95" }
                ].map((match, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium">{match.match}</p>
                      <p className="text-sm text-muted-foreground">{match.time}</p>
                    </div>
                    <span className="font-bold text-primary text-lg">
                      {match.odds}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
