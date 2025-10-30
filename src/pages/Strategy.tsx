import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, TrendingUp, Shield, BarChart3, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Strategy = () => {
  const navigate = useNavigate();
  
  const strategies = [
    {
      title: "Analyse des Statistiques",
      description: "Nous analysons en profondeur les statistiques des équipes, leur forme récente, et les confrontations directes.",
      icon: BarChart3,
    },
    {
      title: "Gestion du Bankroll",
      description: "Mise maximale de 5% du capital par pari pour limiter les risques et assurer une croissance stable.",
      icon: Shield,
    },
    {
      title: "Sélection Rigoureuse",
      description: "Nous sélectionnons uniquement les paris avec une cote supérieure à 1.70 et un niveau de confiance élevé.",
      icon: Target,
    },
    {
      title: "Suivi des Performances",
      description: "Analyse continue de nos résultats pour ajuster et optimiser notre stratégie en temps réel.",
      icon: TrendingUp,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Notre Stratégie</h1>
          <p className="text-muted-foreground mt-2">
            Découvrez notre méthodologie pour maximiser vos gains
          </p>
        </div>

        <Card 
          className="hover:shadow-lg transition-all cursor-pointer border-primary/20 bg-primary/5"
          onClick={() => navigate('/guide-paris-sportifs')}
        >
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Guide des paris sportifs</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base">
              Comprends les bases du pari sportif — cotes, types de mises, logique du marché — et découvre comment Winabet.ai t'aide à parier plus intelligemment, sans effort.
            </CardDescription>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {strategies.map((strategy, index) => {
            const Icon = strategy.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{strategy.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {strategy.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl">Principes Clés</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">✓ Discipline</h3>
              <p className="text-muted-foreground">
                Respecter strictement notre stratégie sans laisser les émotions influencer nos décisions.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">✓ Patience</h3>
              <p className="text-muted-foreground">
                Les résultats se construisent sur le long terme. Nous privilégions la constance.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">✓ Transparence</h3>
              <p className="text-muted-foreground">
                Tous nos paris et résultats sont documentés et accessibles dans l'historique.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Strategy;
