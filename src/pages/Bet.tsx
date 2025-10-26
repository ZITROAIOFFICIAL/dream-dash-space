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
  
  const calculateReturn = (amount: string) => {
    const numAmount = parseFloat(amount) || 0;
    // Pour -136: pour gagner $100, il faut miser $136
    // Retour total = mise + gain = mise * (1 + 100/136)
    return (numAmount * (1 + 100/136)).toFixed(2);
  };

  const handleCustomBet = () => {
    if (customAmount && parseFloat(customAmount) > 0) {
      setBetAmount(customAmount);
      setIsDialogOpen(false);
      setCustomAmount("");
    }
  };
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Paris Recommandés</h1>
          <p className="text-muted-foreground">Découvrez nos pronostics avec les meilleures cotes</p>
        </div>

        <div className="grid gap-6">
          <Card className="max-w-md bg-black border-2 border-primary shadow-2xl overflow-hidden">
            <CardHeader className="space-y-4 pb-4 pt-4">
              {/* AI Analysis */}
              <div className="text-center space-y-1">
                <h2 className="text-white text-sm">Analyse de notre <span className="text-primary font-bold">IA</span></h2>
                <div className="text-xl font-black">
                  <span className="text-primary">92%</span>
                  <span className="text-white"> de chance de gagner</span>
                </div>
              </div>

              {/* Odds Display */}
              <div className="text-center space-y-2 py-3">
                <div className="text-4xl font-black text-primary">
                  x1.65
                </div>
                <div className="h-0.5 bg-primary max-w-[200px] mx-auto"></div>
              </div>

              {/* Match Details */}
              <div className="text-center space-y-2">
                <span className="text-white/60 text-xs font-semibold">5:00 PM</span>
                <div className="flex items-center justify-center gap-3">
                  {/* Vegas */}
                  <div className="flex flex-col items-center gap-1">
                    <img src={vegasLogo} alt="Vegas" className="w-10 h-10 object-contain" />
                    <span className="font-bold text-white/80 text-xs">VEGAS</span>
                  </div>

                  <div className="px-2 py-1 bg-white/10 rounded-full border border-white/20">
                    <span className="text-white font-bold text-xs">VS</span>
                  </div>

                  {/* Tampa Bay */}
                  <div className="flex flex-col items-center gap-1">
                    <img src={tampaLogo} alt="Tampa Bay" className="w-10 h-10 object-contain" />
                    <span className="font-bold text-white text-xs">TAMPA BAY</span>
                  </div>
                </div>
                
                {/* Win Statement */}
                <div className="flex flex-col items-center gap-1 pt-1">
                  <h3 className="text-base font-black text-white tracking-tight">
                    TAMPA BAY
                  </h3>
                  <div className="text-sm font-bold text-primary">
                    VICTOIRE
                  </div>
                </div>
              </div>

              {/* Bet Amount & Payout */}
              <div className="pt-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="px-4 py-3 bg-transparent border-2 border-white/40 rounded-2xl text-center">
                    <div className="text-white/80 text-xs mb-1">Paris sportif :</div>
                    <div className="text-white font-bold text-lg">${betAmount}</div>
                  </div>
                  <div className="px-4 py-3 bg-primary rounded-2xl text-center">
                    <div className="text-black/70 text-xs mb-1">Cashout x1.65 →</div>
                    <div className="text-black font-bold text-lg">${calculateReturn(betAmount)}</div>
                  </div>
                </div>
              </div>

              {/* Simulation Calculator */}
              <div className="pt-3 border-t border-white/10">
                <div className="space-y-3">
                  <h3 className="text-center text-white/80 font-bold text-xs tracking-wide">MODIFIER VOTRE MISE</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {[10, 20, 50, 100, 150, 200, 500].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setBetAmount(amount.toString())}
                        className={`px-3 py-2 rounded-2xl text-xs font-semibold transition-colors ${
                          betAmount === amount.toString()
                            ? 'bg-primary text-black'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        ${amount}
                      </button>
                    ))}
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <button 
                          className={`px-3 py-2 rounded-2xl text-xs font-semibold transition-colors ${
                            ![10, 20, 50, 100, 150, 200, 500].includes(Number(betAmount))
                              ? 'bg-primary text-black'
                              : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                        >
                          {![10, 20, 50, 100, 150, 200, 500].includes(Number(betAmount)) 
                            ? `$${betAmount}` 
                            : 'Autre'}
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md bg-black border-primary">
                        <DialogHeader>
                          <DialogTitle className="text-white">Montant personnalisé</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Input
                              type="number"
                              placeholder="Entrez le montant"
                              value={customAmount}
                              onChange={(e) => setCustomAmount(e.target.value)}
                              className="text-center font-bold bg-white/10 text-white border-white/20"
                            />
                          </div>
                          <Button 
                            onClick={handleCustomBet}
                            className="w-full bg-primary text-black hover:bg-primary/90"
                          >
                            Miser
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>

              {/* DraftKings Section */}
              <div className="pt-3 border-t border-white/10">
                <div className="flex items-center justify-center gap-2 text-xs">
                  <span className="text-white/60">Meilleur site:</span>
                  <span className="font-bold text-white">DRAFTKINGS</span>
                  <span className="px-2 py-1 bg-primary/20 rounded border border-primary font-bold text-primary">-135</span>
                </div>
              </div>
            </CardHeader>

          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Bet;
