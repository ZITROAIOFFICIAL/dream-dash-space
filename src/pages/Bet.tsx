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
          <Card className="max-w-3xl bg-white border-2 border-black shadow-2xl overflow-hidden">
            {/* AI Analysis Badge */}
            <div className="bg-gradient-to-r from-primary via-primary/80 to-primary px-6 py-4 flex items-center justify-center">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                <span className="text-white text-xs font-bold tracking-widest">ANALYSE IA • 92% DE GAGNER LE BET</span>
              </div>
            </div>

            <CardHeader className="space-y-6 pb-6">
              {/* Main Prediction - BIG */}
              <div className="text-center space-y-4 py-3">
                <div className="flex items-center justify-center gap-2">
                  <img src={tampaLogo} alt="Tampa Bay" className="w-6 h-6 object-contain" />
                  <div className="text-lg font-bold text-black">
                    TAMPA BAY -136
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-black tracking-[0.25em]">MONEY LINE</div>
                </div>
                
                {/* Tampa Bay Logo + Win Statement */}
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <img src={tampaLogo} alt="Tampa Bay" className="w-32 h-32 object-contain relative z-10" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-5xl font-black text-black tracking-tight">
                      TAMPA BAY
                    </h2>
                    <div className="text-3xl font-bold text-primary">
                      VICTOIRE
                    </div>
                  </div>
                </div>
              </div>

              {/* Match Details */}
              <div className="pt-4 border-t border-black">
                <div className="flex flex-col items-center gap-3">
                  <span className="text-black text-xs font-semibold">5:00 PM</span>
                  <div className="flex items-center justify-center gap-3">
                    {/* Vegas */}
                    <div className="flex items-center gap-2">
                      <img src={vegasLogo} alt="Vegas" className="w-10 h-10 object-contain opacity-60" />
                      <span className="font-bold text-black text-sm">VEGAS</span>
                    </div>

                    <div className="px-3 py-1 bg-black/5 rounded-full border border-black">
                      <span className="text-black font-bold text-xs">VS</span>
                    </div>

                    {/* Tampa Bay */}
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-black text-sm">TAMPA BAY</span>
                      <img src={tampaLogo} alt="Tampa Bay" className="w-10 h-10 object-contain" />
                    </div>
                  </div>
                </div>
              </div>

              {/* DraftKings Section */}
              <div className="pt-4 border-t border-black">
                <div className="flex items-center justify-center gap-2 text-xs">
                  <span className="text-black">Meilleur site:</span>
                  <span className="font-bold text-black">DRAFTKINGS</span>
                  <span className="px-2 py-1 bg-primary/10 rounded border border-primary font-bold text-primary">-135</span>
                </div>
              </div>

              {/* Simulation Calculator */}
              <div className="pt-4 border-t border-black">
                <div className="space-y-4">
                  <h3 className="text-center text-black font-bold text-sm tracking-wide">VOTRE MISE</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {[10, 20, 50, 100, 150, 200, 500].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setBetAmount(amount.toString())}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                          betAmount === amount.toString()
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-black hover:bg-gray-200'
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
                              ? 'bg-black text-white'
                              : 'bg-gray-100 text-black hover:bg-gray-200'
                          }`}
                        >
                          {![10, 20, 50, 100, 150, 200, 500].includes(Number(betAmount)) 
                            ? `$${betAmount}` 
                            : 'Autre'}
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Montant personnalisé</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Input
                              type="number"
                              placeholder="Entrez le montant"
                              value={customAmount}
                              onChange={(e) => setCustomAmount(e.target.value)}
                              className="text-center font-bold"
                            />
                          </div>
                          <Button 
                            onClick={handleCustomBet}
                            className="w-full bg-black text-white hover:bg-black/90"
                          >
                            Miser
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="flex items-center justify-between px-4">
                    <span className="text-black font-semibold">Payout</span>
                    <span className="text-black text-xl font-bold">${calculateReturn(betAmount)}</span>
                  </div>
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
