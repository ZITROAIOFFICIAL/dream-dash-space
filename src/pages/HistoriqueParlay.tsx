import DashboardLayout from "@/components/DashboardLayout";
import stLouisLogo from "@/assets/stlouis-logo-new.png";
import pittsburghLogo from "@/assets/pittsburgh-logo-new.png";
import vegasLogo from "@/assets/vegas-logo-new.png";
import tampaLogo from "@/assets/tampa-logo-new.png";
import washingtonLogo from "@/assets/washington-logo.png";
import kansasCityLogo from "@/assets/kansascity-logo.png";

interface ParlayLeg {
  teamHome: string;
  teamAway: string;
  betType: string;
  prediction: string;
  teamHomeLogo: string;
  teamAwayLogo: string;
  matchTime?: string;
}

interface ParlayBet {
  id: number;
  legs: ParlayLeg[];
  multiplier: number;
  betAmount: number;
  result: "won" | "lost" | "pending";
  date: string;
  odds: number;
}

const HistoriqueParlay = () => {
  const parlayHistory: ParlayBet[] = [
    {
      id: 1,
      legs: [
        {
          teamHome: "ST. LOUIS",
          teamAway: "PITTSBURGH",
          betType: "MONEYLINE",
          prediction: "VICTOIRE",
          teamHomeLogo: stLouisLogo,
          teamAwayLogo: pittsburghLogo,
          matchTime: "7:00 PM"
        },
        {
          teamHome: "VEGAS",
          teamAway: "TAMPA BAY",
          betType: "SPREAD",
          prediction: "VEGAS -1.5",
          teamHomeLogo: vegasLogo,
          teamAwayLogo: tampaLogo,
          matchTime: "9:00 PM"
        },
        {
          teamHome: "WASHINGTON",
          teamAway: "KANSAS CITY",
          betType: "UNDER/OVER",
          prediction: "UNDER 47.5",
          teamHomeLogo: washingtonLogo,
          teamAwayLogo: kansasCityLogo,
          matchTime: "1:00 PM"
        }
      ],
      multiplier: 8.45,
      betAmount: 100,
      result: "won",
      date: "10/25/2025",
      odds: 745
    },
    {
      id: 2,
      legs: [
        {
          teamHome: "PITTSBURGH",
          teamAway: "ST. LOUIS",
          betType: "MONEYLINE",
          prediction: "VICTOIRE",
          teamHomeLogo: pittsburghLogo,
          teamAwayLogo: stLouisLogo,
          matchTime: "7:30 PM"
        },
        {
          teamHome: "KANSAS CITY",
          teamAway: "TAMPA BAY",
          betType: "SPREAD",
          prediction: "KANSAS CITY -3.5",
          teamHomeLogo: kansasCityLogo,
          teamAwayLogo: tampaLogo,
          matchTime: "4:00 PM"
        }
      ],
      multiplier: 4.25,
      betAmount: 100,
      result: "won",
      date: "10/22/2025",
      odds: 325
    }
  ];

  // Calculate totals
  const totalWins = parlayHistory.filter(h => h.result === "won").length;
  const totalLosses = parlayHistory.filter(h => h.result === "lost").length;
  const totalUnitsWon = parlayHistory.filter(h => h.result === "won").reduce((sum, h) => sum + (h.multiplier - 1), 0);
  const totalUnitsLost = parlayHistory.filter(h => h.result === "lost").length;

  const getUnitsBadge = (result: string, multiplier: number) => {
    const units = result === "won" ? multiplier - 1 : result === "lost" ? -1 : 0;
    if (result === "won") {
      return (
        <div className="bg-green-600 rounded-lg px-6 py-3 text-center">
          <div className="text-xl font-bold text-white">
            +{units.toFixed(2)} UNITS
          </div>
        </div>
      );
    } else if (result === "lost") {
      return (
        <div className="bg-red-600 rounded-lg px-6 py-3 text-center">
          <div className="text-xl font-bold text-white">
            -1.00 UNITS
          </div>
        </div>
      );
    } else {
      return (
        <div className="bg-gray-600 rounded-lg px-6 py-3 text-center">
          <div className="text-xl font-bold text-white">
            EN COURS
          </div>
        </div>
      );
    }
  };

  const getSelectedTeam = (betType: string, prediction: string, teamHome: string) => {
    if (betType === "MONEYLINE" && prediction === "VICTOIRE") {
      return "home";
    } else if (betType === "SPREAD") {
      const teamInPrediction = prediction.split(/[-+]/)[0].trim();
      return teamInPrediction === teamHome ? "home" : "away";
    }
    return null;
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-white text-4xl font-bold">HISTORIQUE PARLAY DU JOUR</h1>
          <p className="text-white text-sm">
            Consultez l'historique des paris combinés de winabet.ai
          </p>
        </div>

        {/* Global Summary */}
        <div className="max-w-2xl mx-auto grid grid-cols-2 gap-4 mb-8">
          <div className="bg-black border-2 border-green-600 rounded-lg p-4 text-center">
            <div className="text-green-400 font-bold text-3xl">
              +{totalWins - totalLosses}
            </div>
            <div className="text-white/70 text-xs mt-1 font-semibold">PARIS EN +</div>
          </div>
          <div className="bg-black border-2 border-green-600 rounded-lg p-4 text-center">
            <div className="text-green-400 font-bold text-3xl">
              +{(totalUnitsWon - totalUnitsLost).toFixed(2)}
            </div>
            <div className="text-white/70 text-xs mt-1 font-semibold">UNITS EN +</div>
          </div>
        </div>

        {/* Parlay Cards */}
        <div className="flex flex-col gap-6">
          {parlayHistory.map(parlay => (
            <div key={parlay.id} className="w-full max-w-md mx-auto">
              {/* Units Result Badge - Top */}
              <div className="mb-4">
                {getUnitsBadge(parlay.result, parlay.multiplier)}
              </div>

              {/* Parlay Card with Multiple Legs */}
              <div className="border-2 border-green-600 rounded-lg bg-black p-6 space-y-6">
                {/* Date centered at top */}
                <div className="text-center">
                  <span className="text-white text-base font-bold">
                    {parlay.date}
                  </span>
                </div>

                {/* All Legs */}
                {parlay.legs.map((leg, index) => {
                  const selectedTeam = getSelectedTeam(leg.betType, leg.prediction, leg.teamHome);
                  
                  return (
                    <div key={index}>
                      {/* Separator between legs (not before first leg) */}
                      {index > 0 && (
                        <div className="border-t border-green-600/30 my-6"></div>
                      )}

                      {/* Teams with VS in center */}
                      <div className="flex items-center justify-center gap-6 mb-4">
                        {/* Home Team */}
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center p-3">
                            <img 
                              src={leg.teamHomeLogo} 
                              alt={leg.teamHome} 
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <span className="text-white text-xs font-bold">
                            {leg.teamHome}
                          </span>
                          {selectedTeam === "home" && (
                            <span className="text-green-400 text-sm font-bold">
                              {leg.prediction}
                            </span>
                          )}
                        </div>

                        {/* VS */}
                        <div className="text-white font-bold text-lg">VS</div>

                        {/* Away Team */}
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center p-3">
                            <img 
                              src={leg.teamAwayLogo} 
                              alt={leg.teamAway} 
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <span className="text-white text-xs font-bold">
                            {leg.teamAway}
                          </span>
                          {selectedTeam === "away" && (
                            <span className="text-green-400 text-sm font-bold">
                              {leg.prediction}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Bet Type centered */}
                      <div className="text-center">
                        <span className="text-white text-sm font-bold">
                          {leg.betType}
                        </span>
                        {leg.betType === "UNDER/OVER" && (
                          <div className="text-green-400 text-sm font-bold mt-1">
                            {leg.prediction}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HistoriqueParlay;
