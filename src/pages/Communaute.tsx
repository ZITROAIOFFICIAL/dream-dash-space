import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThumbsUp, MessageCircle, TrendingUp } from "lucide-react";

const Communaute = () => {
  const posts = [
    {
      id: 1,
      author: "MaxBet",
      avatar: "MB",
      badge: "Expert",
      content: "PSG va dominer ce soir contre Marseille. J'ai confiance en Mbappé pour marquer au moins 2 buts. Cote intéressante à 3.5 !",
      likes: 24,
      comments: 8,
      time: "Il y a 2h"
    },
    {
      id: 2,
      author: "SportAnalyzer",
      avatar: "SA",
      badge: "Pro",
      content: "Statistiques Real Madrid vs Barcelona : Les 5 derniers matchs ont tous eu plus de 2.5 buts. Je mise dessus pour demain.",
      likes: 35,
      comments: 12,
      time: "Il y a 4h"
    },
    {
      id: 3,
      author: "BetMaster",
      avatar: "BM",
      badge: "VIP",
      content: "Belle série cette semaine ! 4 paris gagnants sur 5. La clé c'est l'analyse et la patience 📊",
      likes: 45,
      comments: 15,
      time: "Il y a 6h"
    },
    {
      id: 4,
      author: "FootballFan",
      avatar: "FF",
      badge: "Membre",
      content: "Qui a des pronostics pour Manchester City ce weekend ? Hésitant entre victoire simple et plus de 2.5 buts.",
      likes: 18,
      comments: 22,
      time: "Il y a 8h"
    }
  ];

  const topBettors = [
    { name: "ProBetter", wins: 85, avatar: "PB" },
    { name: "SportKing", wins: 78, avatar: "SK" },
    { name: "BetGenius", wins: 72, avatar: "BG" }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Communauté</h1>
          <p className="text-muted-foreground">Partagez et découvrez des pronostics avec la communauté</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {post.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-base">{post.author}</CardTitle>
                          <Badge variant="secondary" className="text-xs">{post.badge}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{post.time}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">{post.content}</p>
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <ThumbsUp className="h-4 w-4" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <MessageCircle className="h-4 w-4" />
                      {post.comments}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Top Parieurs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topBettors.map((bettor, index) => (
                  <div key={bettor.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-muted-foreground">#{index + 1}</span>
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-secondary text-xs">
                          {bettor.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{bettor.name}</span>
                    </div>
                    <Badge className="bg-primary">{bettor.wins}%</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Communaute;
