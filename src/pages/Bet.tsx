import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import vegasLogo from "@/assets/vegas-logo.png";
import tampaLogo from "@/assets/tampa-logo.png";
import { useState } from "react";
const Bet = () => {
  const [betAmount, setBetAmount] = useState<string>("100");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const odds = -136;
  const multiplier = 1 + 100 / Math.abs(odds);
  const calculateReturn = (amount: string) => {
    const numAmount = parseFloat(amount) || 0;
    return (numAmount * multiplier).toFixed(2);
  };
  const handleCustomBet = () => {
    if (customAmount && parseFloat(customAmount) > 0) {
      setBetAmount(customAmount);
      setIsDialogOpen(false);
      setCustomAmount("");
    }
  };
  return <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Paris Recommandés</h1>
          <p className="text-muted-foreground">Découvrez nos pronostics avec les meilleures cotes</p>
        </div>

        <div className="grid gap-6 justify-center">
          <Card className="w-full max-w-md bg-black border-2 border-primary shadow-2xl overflow-hidden mx-auto">
            <CardHeader className="space-y-4 pb-4 pt-4 px-0">
              {/* AI Analysis */}
              <div className="text-center space-y-1">
                <h2 className="text-white text-sm">Analyse de notre <span className="text-primary font-bold">IA</span></h2>
                <div className="text-xl font-black">
                  <span className="text-primary">92%</span>
                  <span className="text-white"> de chance de gagner</span>
                </div>
              </div>

              {/* Odds Display */}
              <div className="flex justify-center py-3">
                <div className="bg-primary/20 border-2 border-primary rounded-lg px-6 py-2">
                  <div className="text-3xl font-black text-primary">
                    x{multiplier.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Match Details */}
              <div className="text-center space-y-2">
                <div className="text-xs font-bold text-white/70 tracking-wider mb-2">
                  PARIER SUR
                </div>
                
                {/* Teams and VS (centered) */}
                <div className="grid grid-cols-3 items-center justify-items-center gap-4 px-4">
                  {/* Vegas */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-white/20">
                      <img src={vegasLogo} alt="Vegas" className="w-7 h-7 object-contain" />
                    </div>
                    <span className="font-bold text-white/80 text-xs">VEGAS</span>
                  </div>

                  {/* Center time + VS */}
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-white/60 text-xs font-semibold">5:00 PM</span>
                    <div className="px-2 py-0.5 bg-white/10 rounded-full border border-white/20">
                      <span className="text-white font-bold text-xs">VS</span>
                    </div>
                  </div>

                  {/* Tampa Bay */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="bg-primary/20 border-2 border-primary rounded-lg p-2 flex flex-col items-center justify-center gap-1.5">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                        <img src={tampaLogo} alt="Tampa Bay" className="w-7 h-7 object-contain" />
                      </div>
                      <span className="font-bold text-white text-xs">TAMPA BAY</span>
                      <div className="text-xs font-bold text-primary">VICTOIRE</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bet Amount & Payout */}
              <div className="pt-3">
                <div className="grid grid-cols-2 gap-2">
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <button className="px-4 py-3 bg-transparent border-2 border-white/40 rounded-2xl text-center hover:bg-white/5 transition-colors cursor-pointer">
                        <div className="text-white/80 text-xs mb-1 px-[5px]">Votre mise</div>
                        <div className="text-white font-bold text-lg">${betAmount}</div>
                        <div className="text-primary text-xs mt-1 font-semibold">Modifier</div>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md bg-black border-primary">
                      <DialogHeader>
                        <DialogTitle className="text-white text-center">Modifier votre mise</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-4 gap-2">
                          {[10, 20, 50, 100, 150, 200, 500].map(amount => <button key={amount} onClick={() => {
                          setBetAmount(amount.toString());
                          setIsDialogOpen(false);
                        }} className={`px-3 py-2 rounded-2xl text-sm font-semibold transition-colors ${betAmount === amount.toString() ? 'bg-primary text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                              ${amount}
                            </button>)}
                          <button onClick={() => {
                          const custom = prompt("Entrez le montant:");
                          if (custom && parseFloat(custom) > 0) {
                            setBetAmount(custom);
                            setIsDialogOpen(false);
                          }
                        }} className="px-3 py-2 rounded-2xl text-sm font-semibold bg-white/10 text-white hover:bg-white/20">
                            Autre
                          </button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <div className="px-4 py-3 bg-primary/20 border-2 border-primary rounded-2xl text-center">
                    <div className="text-white/70 text-xs mb-1">Cashout x{multiplier.toFixed(2)} →</div>
                    <div className="text-primary font-bold text-lg">${calculateReturn(betAmount)}</div>
                  </div>
                </div>
              </div>

              {/* DraftKings Section */}
              <div className="pt-3 border-t border-white/10">
                <div className="flex items-center justify-center gap-2 text-xs">
                  <span className="text-white/60">Meilleur odds:</span>
                  <span className="font-bold text-white">DRAFTKINGS</span>
                  <span className="px-2 py-1 bg-primary/20 rounded border border-primary font-bold text-primary">-135</span>
                </div>
              </div>
            </CardHeader>

          </Card>
        </div>
      </div>
    </DashboardLayout>;
};
export default Bet;