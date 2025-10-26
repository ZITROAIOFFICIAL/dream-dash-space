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
          <Card className="max-w-3xl bg-black border-2 border-primary shadow-2xl overflow-hidden">
            <CardHeader className="space-y-6 pb-6 pt-6">
              {/* AI Analysis */}
              <div className="text-center space-y-2">
                <div className="space-y-1">
                  <h2 className="text-white text-lg">Analyse de notre <span className="text-primary font-bold">IA</span></h2>
                  <div className="text-4xl font-black">
                    <span className="text-primary">92%</span>
                    <span className="text-white"> de chance de gagner</span>
                  </div>
                </div>
              </div>

              {/* Odds Display */}
              <div className="text-center space-y-4 py-6">
                <div className="text-8xl font-black text-primary">
                  x1.65
                </div>
                <div className="h-1 bg-primary max-w-md mx-auto"></div>
              </div>

              {/* Match Details */}
              <div className="text-center space-y-3">
                <span className="text-white/60 text-xs font-semibold">5:00 PM</span>
                <div className="flex items-center justify-center gap-3">
                  {/* Vegas */}
                  <div className="flex items-center gap-2">
                    <img src={vegasLogo} alt="Vegas" className="w-8 h-8 object-contain opacity-60" />
                    <span className="font-bold text-white/60 text-sm">VEGAS</span>
                  </div>

                  <div className="px-3 py-1 bg-white/10 rounded-full border border-white/20">
                    <span className="text-white font-bold text-xs">VS</span>
                  </div>

                  {/* Tampa Bay */}
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">TAMPA BAY</span>
                    <img src={tampaLogo} alt="Tampa Bay" className="w-8 h-8 object-contain" />
                  </div>
                </div>
                
                {/* Win Statement */}
                <div className="flex flex-col items-center gap-1 pt-2">
                  <div className="relative">
                    <img src={tampaLogo} alt="Tampa Bay" className="w-16 h-16 object-contain relative z-10" />
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight">
                    TAMPA BAY
                  </h3>
                  <div className="text-lg font-bold text-primary">
                    VICTOIRE
                  </div>
                </div>
              </div>

              {/* Bet Amount & Payout */}
              <div className="pt-4 space-y-3">
                <div className="flex items-center justify-center gap-3">
                  <div className="px-6 py-2 bg-transparent border-2 border-white/40 rounded-full">
                    <span className="text-white font-semibold text-sm">Paris sportif : ${betAmount}</span>
                  </div>
                  <div className="px-6 py-2 bg-primary rounded-full">
                    <span className="text-black font-bold text-sm">Cashout x1.65 → ${calculateReturn(betAmount)}</span>
                  </div>
                </div>
              </div>

              {/* Simulation Calculator */}
              <div className="pt-4 border-t border-white/10">
                <div className="space-y-4">
                  <h3 className="text-center text-white/80 font-bold text-sm tracking-wide">MODIFIER VOTRE MISE</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {[10, 20, 50, 100, 150, 200, 500].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setBetAmount(amount.toString())}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
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
                          className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
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
              <div className="pt-4 border-t border-white/10">
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
