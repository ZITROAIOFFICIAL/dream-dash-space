-- Ajouter la colonne pour le texte personnalisé Over/Under dans l'historique des bets
ALTER TABLE public.bet_history 
ADD COLUMN over_under_text_custom TEXT;