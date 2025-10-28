import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, Clock } from "lucide-react";
import nhlLogo from "@/assets/nhl-logo.png";
import nflLogo from "@/assets/nfl-logo.png";

const Historique = () => {
  const history = [
    {
      id: 1,
      teamHome: "ST. LOUIS",
      teamAway: "PITTSBURGH",
      league: "NHL",
      betType: "MONEYLINE",
      prediction: "ST. LOUIS GAGNE",
      odds: -105,
      betAmount: 100,
      result: "won",
      date: "15 Oct 2024",
      aiPercent: 92,
      multiplier: 1.95
    },
    {
      id: 2,
      teamHome: "WASHINGTON",
      teamAway: "KANSAS CITY",
      league: "NFL",
      betType: "UNDER/OVER",
      prediction: "UNDER 47.5",
      odds: 488,
      betAmount: 100,
      result: "won",
      date: "14 Oct 2024",
      aiPercent: 85,
      multiplier: 5.88
    },
    {
      id: 3,
      teamHome: "VEGAS",
      teamAway: "TAMPA BAY",
      league: "NHL",
      betType: "SPREAD",
      prediction: "VEGAS -1.5",
      odds: -136,
      betAmount: 100,
      result: "lost",
      date: "13 Oct 2024",
      aiPercent: 88,
      multiplier: 1.74
    },
    {
      id: 4,
      teamHome: "PITTSBURGH",
      teamAway: "ST. LOUIS",
      league: "NHL",
      betType: "MONEYLINE",
      prediction: "PITTSBURGH GAGNE",
      odds: -120,
      betAmount: 100,
      result: "won",
      date: "12 Oct 2024",
      aiPercent: 78,
      multiplier: 1.83
    },
    {
      id: 5,
      teamHome: "KANSAS CITY",
      teamAway: "TAMPA BAY",
      league: "NFL",
      betType: "SPREAD",
      prediction: "KANSAS CITY -3.5",
      odds: -110,
      betAmount: 100,
      result: "pending",
      date: "EN COURS",
      aiPercent: 81,
      multiplier: 1.91
    }
  ];

  const getStatusBadge = (result: string) => {
    switch (result) {
      case "won":
        return (
          <div className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded">
            <CheckCircle2 className="h-5 w-5 text-white" />
            <span className="text-white font-bold text-sm">GAGNÉ</span>
          </div>
        );
      case "lost":
        return (
          <div className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded">
            <XCircle className="h-5 w-5 text-white" />
            <span className="text-white font-bold text-sm">PERDU</span>
          </div>
        );
      case "pending":
        return (
          <div className="flex items-center gap-2 bg-gray-600 px-4 py-2 rounded">
            <Clock className="h-5 w-5 text-white" />
            <span className="text-white font-bold text-sm">EN COURS</span>
          </div>
        );
      default:
        return null;
    }
  };

  const calculateProfit = (result: string, betAmount: number, multiplier: number) => {
    if (result === "won") {
      return `+${(betAmount * multiplier - betAmount).toFixed(2)}$`;
    } else if (result === "lost") {
      return `-${betAmount.toFixed(2)}$`;
    }
    return "---";
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-white text-4xl font-bold">HISTORIQUE BET DU JOUR</h1>
          <p className="text-white text-sm">
            Consultez l'historique de vos paris du jour et analysez vos performances
          </p>
        </div>

        {/* History Cards */}
        <div className="flex flex-col gap-6">
          {history.map((item) => (
            <Card
              key={item.id}
              className="w-full max-w-md bg-black border-2 border-green-600 shadow-2xl overflow-hidden mx-auto rounded-lg"
            >
              {/* Status Banner */}
              <div className="flex items-center justify-between gap-2 text-xs bg-green-600 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-lg">{item.aiPercent}%</span>
                  <span className="text-white text-xs font-bold">
                    DE CHANCE DE GAGNER SELON NOTRE IA
                  </span>
                </div>
                {getStatusBadge(item.result)}
              </div>

              {/* Match Info */}
              <div className="bg-black/40 border-b-2 border-white/10 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.league === "NHL" ? nhlLogo : nflLogo}
                      alt={item.league}
                      className="w-8 h-8 object-contain"
                    />
                    <span className="text-white font-bold text-xs">{item.league}</span>
                  </div>
                  <span className="text-white/70 text-xs">{item.date}</span>
                </div>

                <div className="text-center py-3">
                  <h3 className="text-white font-bold text-lg mb-1">
                    {item.teamHome} vs {item.teamAway}
                  </h3>
                  <div className="inline-block bg-white/10 px-3 py-1 rounded">
                    <span className="text-white text-xs font-bold">{item.betType}</span>
                  </div>
                </div>
              </div>

              {/* Bet Details */}
              <div className="bg-black/40 border-b-2 border-white/10 p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70 text-xs">PRÉDICTION:</span>
                    <span className="text-white font-bold text-sm">{item.prediction}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70 text-xs">COTE:</span>
                    <span className="text-white font-bold text-sm">
                      {item.odds > 0 ? `+${item.odds}` : item.odds}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70 text-xs">MULTIPLICATEUR:</span>
                    <span className="text-green-400 font-bold text-sm">
                      {item.multiplier.toFixed(2)}x
                    </span>
                  </div>
                </div>
              </div>

              {/* Result Section */}
              <div className="bg-black p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-white/70 text-xs block mb-1">MISE</span>
                    <span className="text-white font-bold text-lg">{item.betAmount}$</span>
                  </div>
                  <div className="text-right">
                    <span className="text-white/70 text-xs block mb-1">
                      {item.result === "pending" ? "CASHOUT POTENTIEL" : "RÉSULTAT"}
                    </span>
                    <span
                      className={`font-bold text-lg ${
                        item.result === "won"
                          ? "text-green-400"
                          : item.result === "lost"
                          ? "text-red-400"
                          : "text-white"
                      }`}
                    >
                      {item.result === "pending"
                        ? `${(item.betAmount * item.multiplier).toFixed(2)}$`
                        : calculateProfit(item.result, item.betAmount, item.multiplier)}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats Summary - Optional */}
        <div className="max-w-md mx-auto mt-8 grid grid-cols-3 gap-4">
          <div className="bg-black border-2 border-green-600 rounded-lg p-4 text-center">
            <div className="text-green-400 font-bold text-2xl">
              {history.filter((h) => h.result === "won").length}
            </div>
            <div className="text-white/70 text-xs mt-1">GAGNÉS</div>
          </div>
          <div className="bg-black border-2 border-red-600 rounded-lg p-4 text-center">
            <div className="text-red-400 font-bold text-2xl">
              {history.filter((h) => h.result === "lost").length}
            </div>
            <div className="text-white/70 text-xs mt-1">PERDUS</div>
          </div>
          <div className="bg-black border-2 border-gray-600 rounded-lg p-4 text-center">
            <div className="text-white font-bold text-2xl">
              {history.filter((h) => h.result === "pending").length}
            </div>
            <div className="text-white/70 text-xs mt-1">EN COURS</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Historique;
