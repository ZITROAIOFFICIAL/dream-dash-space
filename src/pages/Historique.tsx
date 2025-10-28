import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import nhlLogo from "@/assets/nhl-logo.png";
import nflLogo from "@/assets/nfl-logo.png";
import stLouisLogo from "@/assets/stlouis-logo-new.png";
import pittsburghLogo from "@/assets/pittsburgh-logo-new.png";
import vegasLogo from "@/assets/vegas-logo-new.png";
import tampaLogo from "@/assets/tampa-logo-new.png";
import washingtonLogo from "@/assets/washington-logo.png";
import kansasCityLogo from "@/assets/kansascity-logo.png";
const Historique = () => {
  const history = [{
    id: 1,
    teamHome: "ST. LOUIS",
    teamAway: "PITTSBURGH",
    league: "NHL",
    betType: "MONEYLINE",
    prediction: "VICTOIRE",
    odds: -105,
    betAmount: 100,
    result: "won",
    date: "7:00 PM",
    time: "7:00 PM",
    aiPercent: 92,
    multiplier: 1.95,
    teamHomeLogo: stLouisLogo,
    teamAwayLogo: pittsburghLogo
  }, {
    id: 2,
    teamHome: "WASHINGTON",
    teamAway: "KANSAS CITY",
    league: "NFL",
    betType: "UNDER/OVER",
    prediction: "UNDER 47.5",
    odds: 488,
    betAmount: 100,
    result: "won",
    date: "1:00 PM",
    time: "1:00 PM",
    aiPercent: 85,
    multiplier: 5.88,
    teamHomeLogo: washingtonLogo,
    teamAwayLogo: kansasCityLogo
  }, {
    id: 3,
    teamHome: "VEGAS",
    teamAway: "TAMPA BAY",
    league: "NHL",
    betType: "SPREAD",
    prediction: "VEGAS -1.5",
    odds: -136,
    betAmount: 100,
    result: "lost",
    date: "9:00 PM",
    time: "9:00 PM",
    aiPercent: 88,
    multiplier: 1.74,
    teamHomeLogo: vegasLogo,
    teamAwayLogo: tampaLogo
  }, {
    id: 4,
    teamHome: "PITTSBURGH",
    teamAway: "ST. LOUIS",
    league: "NHL",
    betType: "MONEYLINE",
    prediction: "VICTOIRE",
    odds: -120,
    betAmount: 100,
    result: "won",
    date: "7:30 PM",
    time: "7:30 PM",
    aiPercent: 78,
    multiplier: 1.83,
    teamHomeLogo: pittsburghLogo,
    teamAwayLogo: stLouisLogo
  }, {
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
    time: "4:00 PM",
    aiPercent: 81,
    multiplier: 1.91,
    teamHomeLogo: kansasCityLogo,
    teamAwayLogo: tampaLogo
  }];

  // Calculate units won/lost
  const calculateUnits = (result: string, multiplier: number) => {
    if (result === "won") {
      return multiplier - 1; // Ex: x1.95 → +0.95 units
    } else if (result === "lost") {
      return -1; // Always -1 unit
    }
    return 0; // Pending
  };

  // Calculate totals
  const totalWins = history.filter(h => h.result === "won").length;
  const totalLosses = history.filter(h => h.result === "lost").length;
  const totalUnitsWon = history.filter(h => h.result === "won").reduce((sum, h) => sum + (h.multiplier - 1), 0);
  const totalUnitsLost = history.filter(h => h.result === "lost").length; // Each loss = -1 unit

  // Get units badge for each bet
  const getUnitsBadge = (result: string, multiplier: number) => {
    const units = calculateUnits(result, multiplier);
    if (result === "won") {
      return <div className="bg-green-600 rounded-lg px-6 py-3 text-center">
          <div className="text-xl font-bold text-white">
            +{units.toFixed(2)} UNITS
          </div>
        </div>;
    } else if (result === "lost") {
      return <div className="bg-red-600 rounded-lg px-6 py-3 text-center">
          <div className="text-xl font-bold text-white">
            -1.00 UNITS
          </div>
        </div>;
    } else {
      return <div className="bg-gray-600 rounded-lg px-6 py-3 text-center">
          <div className="text-xl font-bold text-white">
            EN COURS
          </div>
        </div>;
    }
  };

  // Calculate cashout amount and profit
  const getCashoutInfo = (result: string, betAmount: number, multiplier: number) => {
    const cashout = betAmount * multiplier;
    const profit = cashout - betAmount;
    if (result === "won") {
      return {
        amount: `$${cashout.toFixed(2)}`,
        profit: `+$${profit.toFixed(2)} bénéfice`,
        colorClass: "text-green-400"
      };
    } else if (result === "lost") {
      return {
        amount: "$0.00",
        profit: `-$${betAmount.toFixed(2)} perte`,
        colorClass: "text-red-400"
      };
    } else {
      return {
        amount: `$${cashout.toFixed(2)}`,
        profit: "Potentiel",
        colorClass: "text-white"
      };
    }
  };
  return <DashboardLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-white text-4xl font-bold">HISTORIQUE BET DU JOUR</h1>
          <p className="text-white text-sm">
            Consultez l'historique de vos paris du jour et analysez vos performances
          </p>
        </div>

        {/* Global Summary */}
        <div className="max-w-2xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-black border-2 border-green-600 rounded-lg p-4 text-center">
            <div className="text-green-400 font-bold text-3xl">
              {totalWins}
            </div>
            <div className="text-white/70 text-xs mt-1 font-semibold">VICTOIRES</div>
          </div>
          <div className="bg-black border-2 border-red-600 rounded-lg p-4 text-center">
            <div className="text-red-400 font-bold text-3xl">
              {totalLosses}
            </div>
            <div className="text-white/70 text-xs mt-1 font-semibold">DÉFAITES</div>
          </div>
          <div className="bg-black border-2 border-green-600 rounded-lg p-4 text-center">
            <div className="text-green-400 font-bold text-3xl">
              +{totalUnitsWon.toFixed(2)}
            </div>
            <div className="text-white/70 text-xs mt-1 font-semibold">UNITS GAGNÉS</div>
          </div>
          <div className="bg-black border-2 border-red-600 rounded-lg p-4 text-center">
            <div className="text-red-400 font-bold text-3xl">
              -{totalUnitsLost.toFixed(2)}
            </div>
            <div className="text-white/70 text-xs mt-1 font-semibold">UNITS PERDUS</div>
          </div>
        </div>

        {/* History Cards */}
        <div className="flex flex-col gap-6">
          {history.map(item => {
          const cashoutInfo = getCashoutInfo(item.result, item.betAmount, item.multiplier);
          const borderColor = item.result === "won" ? "border-green-600" : item.result === "lost" ? "border-red-600" : "border-gray-600";
          return <Card key={item.id} className={`w-full max-w-md bg-black border-2 ${borderColor} shadow-2xl overflow-hidden mx-auto rounded-lg`}>
                {/* Units Result Badge - Top */}
                <div className="mx-4 mt-4">
                  {getUnitsBadge(item.result, item.multiplier)}
                </div>

                {/* Multiplier Badge */}
                <div className="mx-4 mt-4">
                  
                </div>

                {/* PARIER SUR Section */}
                

                {/* Match Card */}
                <div className="mx-4">
                  <div className="border-2 border-green-600 rounded-lg bg-black/40 backdrop-blur-sm p-4">
                    {/* League and Time */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <img src={item.league === "NHL" ? nhlLogo : nflLogo} alt={item.league} className="w-6 h-6 object-contain" />
                        <span className="text-white text-xs font-bold">{item.league}</span>
                      </div>
                      <span className="text-white/70 text-xs font-semibold">
                        {item.result === "pending" ? item.time : "TERMINÉ"}
                      </span>
                    </div>

                    {/* Teams */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 mb-1 flex items-center justify-center">
                          <img src={item.teamHomeLogo} alt={item.teamHome} className="max-w-full max-h-full object-contain" />
                        </div>
                        <span className="font-bold text-[10px] text-white">{item.teamHome}</span>
                      </div>

                      <div className="text-white font-bold text-sm px-3">VS</div>

                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 mb-1 flex items-center justify-center">
                          <img src={item.teamAwayLogo} alt={item.teamAway} className="max-w-full max-h-full object-contain" />
                        </div>
                        <span className="font-bold text-[10px] text-white">{item.teamAway}</span>
                      </div>
                    </div>

                    {/* Bet Type and Prediction */}
                    <div className="text-center space-y-1">
                      <div className="text-white text-xs font-bold">{item.betType}</div>
                      <div className="text-green-600 text-sm font-bold">{item.prediction}</div>
                    </div>
                  </div>
                </div>

                {/* MISE Section */}
                

                {/* 1 Units Badge */}
                <div className="mx-4 mt-0">
                  
                </div>

                {/* Cashout Section */}
                <div className="mx-4 mt-4 mb-4">
                  
                </div>
              </Card>;
        })}
        </div>
      </div>
    </DashboardLayout>;
};
export default Historique;