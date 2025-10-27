import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock } from "lucide-react";

const Historique = () => {
  const history = [
    {
      id: 1,
      match: "Bayern vs Dortmund",
      prediction: "Bayern gagne",
      odds: "1.75",
      result: "won",
      date: "15 Oct 2024",
      profit: "+75€"
    },
    {
      id: 2,
      match: "Juventus vs Inter",
      prediction: "Match nul",
      odds: "3.20",
      result: "lost",
      date: "14 Oct 2024",
      profit: "-100€"
    },
    {
      id: 3,
      match: "Arsenal vs Chelsea",
      prediction: "Plus de 2.5 buts",
      odds: "2.00",
      result: "won",
      date: "13 Oct 2024",
      profit: "+100€"
    },
    {
      id: 4,
      match: "Atletico vs Sevilla",
      prediction: "Atletico gagne",
      odds: "1.90",
      result: "won",
      date: "12 Oct 2024",
      profit: "+90€"
    },
    {
      id: 5,
      match: "Milan vs Roma",
      prediction: "Les deux marquent",
      odds: "1.85",
      result: "pending",
      date: "En cours",
      profit: "---"
    }
  ];

  const getStatusIcon = (result: string) => {
    switch (result) {
      case "won":
        return <CheckCircle className="h-5 w-5 text-primary" />;
      case "lost":
        return <XCircle className="h-5 w-5 text-destructive" />;
      case "pending":
        return <Clock className="h-5 w-5 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (result: string) => {
    switch (result) {
      case "won":
        return <Badge className="bg-primary">Gagné</Badge>;
      case "lost":
        return <Badge variant="destructive">Perdu</Badge>;
      case "pending":
        return <Badge variant="secondary">En cours</Badge>;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Historique Bet du jour</h1>
          <p className="text-muted-foreground">Consultez l'historique de vos paris du jour</p>
        </div>

        <div className="grid gap-4">
          {history.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(item.result)}
                    <div>
                      <CardTitle className="text-lg">{item.match}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{item.prediction}</p>
                    </div>
                  </div>
                  {getStatusBadge(item.result)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Cote</p>
                    <p className="font-semibold">{item.odds}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p className="font-semibold">{item.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Résultat</p>
                    <p className={`font-semibold ${
                      item.result === "won" ? "text-primary" : 
                      item.result === "lost" ? "text-destructive" : 
                      "text-muted-foreground"
                    }`}>
                      {item.profit}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Historique;
