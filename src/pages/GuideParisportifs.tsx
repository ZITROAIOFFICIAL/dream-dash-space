import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

const GuideParisportifs = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Guide des paris sportifs</h1>
            <p className="text-muted-foreground mt-1">
              Comprends les bases du pari sportif — cotes, types de mises, logique du marché — et découvre comment Winabet.ai t'aide à parier plus intelligemment, sans effort.
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Guide des paris sportifs</CardTitle>
            <CardDescription>
              Apprends à comprendre le fonctionnement des paris sportifs avec l'aide de Winabet.ai. De la lecture des cotes jusqu'aux types de mises les plus courants, découvre les bases nécessaires pour savoir ce que tu fais avant de placer ton premier pari.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <p>
                Les paris sportifs peuvent sembler complexes au début, mais une fois que tu comprends la logique derrière chaque chiffre, tout devient clair. Winabet.ai t'explique comment lire les cotes américaines, comme +150 ou –120, et ce qu'elles signifient réellement.
              </p>
              <p>
                Une cote positive indique combien tu gagnes pour 100 $ misés, tandis qu'une cote négative montre combien tu dois miser pour en gagner 100. Ces chiffres traduisent la probabilité implicite d'un résultat — une notion essentielle pour savoir si une cote est juste ou non.
              </p>
              <p>
                Mais le véritable avantage de Winabet.ai, c'est que tu n'as même pas besoin de tout comprendre pour en profiter. Notre IA analyse les matchs, les statistiques et le marché en temps réel, puis te propose directement les bets les plus rentables du moment. Tu peux simplement suivre les recommandations et miser en quelques secondes. Cependant, mieux tu comprends comment tout cela fonctionne, mieux tu sauras pourquoi chaque pari est choisi, et tu développeras une vraie compréhension du jeu derrière les chiffres.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Types de paris</CardTitle>
            <CardDescription>
              Moneyline, Over/Under, Spreads, Prop Bets : découvre les formats les plus utilisés et apprends à choisir le bon type de pari selon le contexte.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              Avant de miser, il faut savoir sur quoi tu mises. Winabet.ai te présente les formats les plus courants et t'explique leur fonctionnement de façon simple et concrète :
            </p>
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">• Moneyline</h4>
                <p className="text-muted-foreground pl-4">
                  Le pari le plus direct. Tu choisis quelle équipe va gagner. Exemple : Montréal +180 → tu gagnes 180 $ pour chaque 100 $ misés si Montréal gagne.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">• Point Spread</h4>
                <p className="text-muted-foreground pl-4">
                  Tu paries sur l'écart de victoire. Exemple : Montréal +1.5 → ton pari est gagnant si Montréal perd par un seul but ou gagne le match.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">• Over/Under (Total)</h4>
                <p className="text-muted-foreground pl-4">
                  Tu paries sur le total de points ou de buts marqués, supérieur ou inférieur à une ligne donnée.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">• Prop Bets</h4>
                <p className="text-muted-foreground pl-4">
                  Tu paries sur un événement précis, comme le nombre de buts d'un joueur ou le total de verges d'un quarterback.
                </p>
              </div>
            </div>
            <p className="text-muted-foreground">
              Winabet.ai t'aide à comprendre ces formats, mais surtout, son IA choisit automatiquement les paris les plus prometteurs selon les données de match et les tendances du marché. Même sans expérience, tu peux suivre les recommandations de Winabet.ai et placer les bons paris en toute confiance — comprendre le système, c'est un plus, pas une obligation.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Paris NHL & NFL</CardTitle>
            <CardDescription>
              Chaque sport a ses particularités, et comprendre ces différences aide à mieux saisir pourquoi certains paris sont plus rentables que d'autres.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              Winabet.ai t'explique comment fonctionnent les paris sur les deux ligues les plus populaires : la NHL et la NFL.
            </p>
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">NHL</h4>
                <p className="text-muted-foreground">
                  En NHL, les résultats peuvent changer d'un jour à l'autre. Le gardien partant, le calendrier des matchs ou la forme du moment influencent fortement les cotes. Winabet.ai surveille tous ces paramètres pour ajuster ses analyses et t'indiquer les paris les plus logiques à placer.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">NFL</h4>
                <p className="text-muted-foreground">
                  En NFL, la saison est courte mais intense. Chaque semaine, les cotes bougent selon les blessures, les conditions météo ou la popularité d'une équipe. Tu apprendras à reconnaître les lignes typiques comme +3.5, –7 ou –10.5, mais surtout à comprendre pourquoi certaines cotes valent plus que d'autres.
                </p>
              </div>
            </div>
            <p className="text-muted-foreground">
              Et encore une fois, Winabet.ai fait tout le travail d'analyse pour toi. L'IA traite les statistiques, les historiques et les conditions du moment pour te recommander directement les paris à plus forte probabilité de succès. Tu n'as pas besoin de tout connaître pour en profiter, mais savoir comment ça marche te permettra de mieux comprendre pourquoi chaque pari a été choisi.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lire les cotes</CardTitle>
            <CardDescription>
              Comprendre une cote, c'est comprendre la probabilité réelle derrière ton pari.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              Winabet.ai t'apprend à lire les +200, –150 et autres formats pour que tu saches ce que signifient vraiment les chiffres affichés avant de miser.
            </p>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Une cote +200 indique que tu gagnes 200 $ pour chaque 100 $ misés si le pari réussit, soit une probabilité d'environ 33 %. Une cote –150, au contraire, veut dire que tu dois miser 150 $ pour gagner 100 $, ce qui représente environ 60 % de chances de réussite.
              </p>
              <p className="text-muted-foreground">
                Ces chiffres ne sont pas arbitraires : ils traduisent la perception du marché sur la probabilité d'un résultat. Winabet.ai t'aide à comprendre cette logique, mais surtout, son IA fait déjà les calculs à ta place. Elle identifie automatiquement les cotes mal évaluées, repère les paris sous-cotés et te les recommande directement.
              </p>
              <p className="text-muted-foreground">
                Même si tu n'as jamais parié auparavant, tu peux simplement suivre les sélections proposées par Winabet.ai. Mais comprendre comment une cote fonctionne te permettra d'avoir une longueur d'avance sur les autres utilisateurs, en sachant pourquoi un pari est rentable — pas seulement qu'il l'est.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default GuideParisportifs;
