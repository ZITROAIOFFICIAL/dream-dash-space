-- Ajouter une colonne pour stocker l'équipe sélectionnée en moneyline
ALTER TABLE public.bet_history 
ADD COLUMN moneyline_team text;

-- Ajouter un commentaire explicatif
COMMENT ON COLUMN public.bet_history.moneyline_team IS 'Indique quelle équipe est sélectionnée pour les paris moneyline: team1 ou team2';