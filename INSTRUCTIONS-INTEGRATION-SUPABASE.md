# 📋 INSTRUCTIONS D'INTÉGRATION SUPABASE HISTORIQUE

## ✅ FICHIERS DÉJÀ CRÉÉS (Dans Lovable)

- ✅ `public/assets/historique-supabase.js` (550 lignes)
- ✅ `snippets/historique-bet-page.liquid` (25 lignes)
- ✅ `snippets/historique-parlay-page.liquid` (25 lignes)
- ✅ **4 Edge Functions Supabase** (déjà déployées automatiquement)

---

## 🎯 MODIFICATIONS À FAIRE DANS SHOPIFY

### ÉTAPE 1 : Transférer les fichiers dans Shopify

#### 1.1 Fichier JavaScript
1. Ouvrir Lovable → `public/assets/historique-supabase.js`
2. **Copier tout le contenu**
3. Dans Shopify Admin → **Boutique en ligne** → **Thèmes** → **Modifier le code**
4. Dans le dossier **Assets** → **Ajouter un nouvel élément** → **Créer un fichier JavaScript vide**
5. Nom du fichier : `historique-supabase.js`
6. **Coller le contenu** et sauvegarder

#### 1.2 Snippets Liquid
1. Ouvrir Lovable → `snippets/historique-bet-page.liquid`
2. **Copier tout le contenu**
3. Dans Shopify → Dossier **Snippets** → **Ajouter un nouveau snippet**
4. Nom : `historique-bet-page`
5. **Coller le contenu** et sauvegarder

6. Faire la même chose pour `snippets/historique-parlay-page.liquid` :
   - Nom : `historique-parlay-page`

---

### ÉTAPE 2 : Modifier `dashboard-winabet-complet.liquid`

#### 2.1 Ajouter la Configuration Supabase (AVANT LA BALISE `</body>`)

**Chercher** (tout à la fin du fichier, juste avant `</body>`) :
```liquid
  </script>
</body>
```

**Remplacer par** :
```liquid
  </script>

  <!-- Configuration Supabase -->
  <script>
    window.SUPABASE_CONFIG = {
      url: 'https://ycvfyorgkhuxcosfrsxs.supabase.co',
      shopDomain: '{{ shop.permanent_domain }}'
    };
  </script>

  <!-- Inclure le fichier JS d'historique Supabase -->
  <script src="{{ 'historique-supabase.js' | asset_url }}" defer></script>
</body>
```

---

#### 2.2 Ajouter les attributs data-* aux BET_CARD (Ligne ~219)

**Chercher** (ligne 219 environ) :
```liquid
<div class="bet-card" {{ block.shopify_attributes }}>
```

**Remplacer par** :
```liquid
<div class="bet-card" 
     {{ block.shopify_attributes }}
     data-block-type="bet_card"
     data-block-id="{{ block.id }}"
     data-sport-type="{{ block.settings.sport_type | default: 'nhl' }}"
     data-ai-data-count="{{ block.settings.ai_data_count | default: 2843 }}"
     data-win-percentage="{{ block.settings.win_percentage | default: 92 }}"
     data-bet-type="{{ block.settings.bet_type | default: 'moneyline' }}"
     data-team1-name="{{ block.settings.team1_name }}"
     data-team1-logo="{{ block.settings.team1_logo | image_url: width: 200 }}"
     data-team2-name="{{ block.settings.team2_name }}"
     data-team2-logo="{{ block.settings.team2_logo | image_url: width: 200 }}"
     data-match-time="{{ block.settings.match_time }}"
     data-match-date="{{ block.settings.match_date }}"
     data-multiplier="{{ block.settings.multiplier }}"
     data-bet-units="{{ block.settings.bet_units }}"
     data-odds="{{ block.settings.odds }}"
     data-best-bookmaker="{{ block.settings.best_bookmaker }}"
     data-best-odds="{{ block.settings.best_odds }}"
     data-result="{{ block.settings.result | default: 'pending' }}"
     data-send-to-history="{{ block.settings.send_to_history }}"
     data-spread-value="{{ block.settings.spread_value }}"
     data-spread-team="{{ block.settings.spread_team }}"
     data-over-under-type="{{ block.settings.over_under_type }}"
     data-over-under-value="{{ block.settings.over_under_value }}"
     data-over-under-stat-type="{{ block.settings.over_under_stat_type }}"
>
```

---

#### 2.3 Ajouter les attributs data-* aux PARLAY_CARD (Ligne ~409)

**Chercher** (ligne 409 environ) :
```liquid
<div class="bet-card" {{ block.shopify_attributes }}>
```

**Remplacer par** :
```liquid
{% capture legs_json %}[
  {% for i in (1..10) %}
    {% case i %}
      {% when 1 %}
        {% assign leg_team1_name = block.settings.leg1_team1_name %}
        {% assign leg_team1_logo = block.settings.leg1_team1_logo %}
        {% assign leg_team2_name = block.settings.leg1_team2_name %}
        {% assign leg_team2_logo = block.settings.leg1_team2_logo %}
        {% assign leg_bet_type = block.settings.leg1_bet_type %}
        {% assign leg_match_time = block.settings.leg1_match_time %}
        {% assign leg_spread_value = block.settings.leg1_spread_value %}
        {% assign leg_spread_team = block.settings.leg1_spread_team %}
        {% assign leg_over_under_type = block.settings.leg1_over_under_type %}
        {% assign leg_over_under_value = block.settings.leg1_over_under_value %}
        {% assign leg_over_under_stat_type = block.settings.leg1_over_under_stat_type %}
      {% when 2 %}
        {% assign leg_team1_name = block.settings.leg2_team1_name %}
        {% assign leg_team1_logo = block.settings.leg2_team1_logo %}
        {% assign leg_team2_name = block.settings.leg2_team2_name %}
        {% assign leg_team2_logo = block.settings.leg2_team2_logo %}
        {% assign leg_bet_type = block.settings.leg2_bet_type %}
        {% assign leg_match_time = block.settings.leg2_match_time %}
        {% assign leg_spread_value = block.settings.leg2_spread_value %}
        {% assign leg_spread_team = block.settings.leg2_spread_team %}
        {% assign leg_over_under_type = block.settings.leg2_over_under_type %}
        {% assign leg_over_under_value = block.settings.leg2_over_under_value %}
        {% assign leg_over_under_stat_type = block.settings.leg2_over_under_stat_type %}
      {% when 3 %}
        {% assign leg_team1_name = block.settings.leg3_team1_name %}
        {% assign leg_team1_logo = block.settings.leg3_team1_logo %}
        {% assign leg_team2_name = block.settings.leg3_team2_name %}
        {% assign leg_team2_logo = block.settings.leg3_team2_logo %}
        {% assign leg_bet_type = block.settings.leg3_bet_type %}
        {% assign leg_match_time = block.settings.leg3_match_time %}
        {% assign leg_spread_value = block.settings.leg3_spread_value %}
        {% assign leg_spread_team = block.settings.leg3_spread_team %}
        {% assign leg_over_under_type = block.settings.leg3_over_under_type %}
        {% assign leg_over_under_value = block.settings.leg3_over_under_value %}
        {% assign leg_over_under_stat_type = block.settings.leg3_over_under_stat_type %}
      {% when 4 %}
        {% assign leg_team1_name = block.settings.leg4_team1_name %}
        {% assign leg_team1_logo = block.settings.leg4_team1_logo %}
        {% assign leg_team2_name = block.settings.leg4_team2_name %}
        {% assign leg_team2_logo = block.settings.leg4_team2_logo %}
        {% assign leg_bet_type = block.settings.leg4_bet_type %}
        {% assign leg_match_time = block.settings.leg4_match_time %}
        {% assign leg_spread_value = block.settings.leg4_spread_value %}
        {% assign leg_spread_team = block.settings.leg4_spread_team %}
        {% assign leg_over_under_type = block.settings.leg4_over_under_type %}
        {% assign leg_over_under_value = block.settings.leg4_over_under_value %}
        {% assign leg_over_under_stat_type = block.settings.leg4_over_under_stat_type %}
      {% when 5 %}
        {% assign leg_team1_name = block.settings.leg5_team1_name %}
        {% assign leg_team1_logo = block.settings.leg5_team1_logo %}
        {% assign leg_team2_name = block.settings.leg5_team2_name %}
        {% assign leg_team2_logo = block.settings.leg5_team2_logo %}
        {% assign leg_bet_type = block.settings.leg5_bet_type %}
        {% assign leg_match_time = block.settings.leg5_match_time %}
        {% assign leg_spread_value = block.settings.leg5_spread_value %}
        {% assign leg_spread_team = block.settings.leg5_spread_team %}
        {% assign leg_over_under_type = block.settings.leg5_over_under_type %}
        {% assign leg_over_under_value = block.settings.leg5_over_under_value %}
        {% assign leg_over_under_stat_type = block.settings.leg5_over_under_stat_type %}
      {% when 6 %}
        {% assign leg_team1_name = block.settings.leg6_team1_name %}
        {% assign leg_team1_logo = block.settings.leg6_team1_logo %}
        {% assign leg_team2_name = block.settings.leg6_team2_name %}
        {% assign leg_team2_logo = block.settings.leg6_team2_logo %}
        {% assign leg_bet_type = block.settings.leg6_bet_type %}
        {% assign leg_match_time = block.settings.leg6_match_time %}
        {% assign leg_spread_value = block.settings.leg6_spread_value %}
        {% assign leg_spread_team = block.settings.leg6_spread_team %}
        {% assign leg_over_under_type = block.settings.leg6_over_under_type %}
        {% assign leg_over_under_value = block.settings.leg6_over_under_value %}
        {% assign leg_over_under_stat_type = block.settings.leg6_over_under_stat_type %}
      {% when 7 %}
        {% assign leg_team1_name = block.settings.leg7_team1_name %}
        {% assign leg_team1_logo = block.settings.leg7_team1_logo %}
        {% assign leg_team2_name = block.settings.leg7_team2_name %}
        {% assign leg_team2_logo = block.settings.leg7_team2_logo %}
        {% assign leg_bet_type = block.settings.leg7_bet_type %}
        {% assign leg_match_time = block.settings.leg7_match_time %}
        {% assign leg_spread_value = block.settings.leg7_spread_value %}
        {% assign leg_spread_team = block.settings.leg7_spread_team %}
        {% assign leg_over_under_type = block.settings.leg7_over_under_type %}
        {% assign leg_over_under_value = block.settings.leg7_over_under_value %}
        {% assign leg_over_under_stat_type = block.settings.leg7_over_under_stat_type %}
      {% when 8 %}
        {% assign leg_team1_name = block.settings.leg8_team1_name %}
        {% assign leg_team1_logo = block.settings.leg8_team1_logo %}
        {% assign leg_team2_name = block.settings.leg8_team2_name %}
        {% assign leg_team2_logo = block.settings.leg8_team2_logo %}
        {% assign leg_bet_type = block.settings.leg8_bet_type %}
        {% assign leg_match_time = block.settings.leg8_match_time %}
        {% assign leg_spread_value = block.settings.leg8_spread_value %}
        {% assign leg_spread_team = block.settings.leg8_spread_team %}
        {% assign leg_over_under_type = block.settings.leg8_over_under_type %}
        {% assign leg_over_under_value = block.settings.leg8_over_under_value %}
        {% assign leg_over_under_stat_type = block.settings.leg8_over_under_stat_type %}
      {% when 9 %}
        {% assign leg_team1_name = block.settings.leg9_team1_name %}
        {% assign leg_team1_logo = block.settings.leg9_team1_logo %}
        {% assign leg_team2_name = block.settings.leg9_team2_name %}
        {% assign leg_team2_logo = block.settings.leg9_team2_logo %}
        {% assign leg_bet_type = block.settings.leg9_bet_type %}
        {% assign leg_match_time = block.settings.leg9_match_time %}
        {% assign leg_spread_value = block.settings.leg9_spread_value %}
        {% assign leg_spread_team = block.settings.leg9_spread_team %}
        {% assign leg_over_under_type = block.settings.leg9_over_under_type %}
        {% assign leg_over_under_value = block.settings.leg9_over_under_value %}
        {% assign leg_over_under_stat_type = block.settings.leg9_over_under_stat_type %}
      {% when 10 %}
        {% assign leg_team1_name = block.settings.leg10_team1_name %}
        {% assign leg_team1_logo = block.settings.leg10_team1_logo %}
        {% assign leg_team2_name = block.settings.leg10_team2_name %}
        {% assign leg_team2_logo = block.settings.leg10_team2_logo %}
        {% assign leg_bet_type = block.settings.leg10_bet_type %}
        {% assign leg_match_time = block.settings.leg10_match_time %}
        {% assign leg_spread_value = block.settings.leg10_spread_value %}
        {% assign leg_spread_team = block.settings.leg10_spread_team %}
        {% assign leg_over_under_type = block.settings.leg10_over_under_type %}
        {% assign leg_over_under_value = block.settings.leg10_over_under_value %}
        {% assign leg_over_under_stat_type = block.settings.leg10_over_under_stat_type %}
    {% endcase %}
    
    {% if leg_team1_name != blank %}
      {% unless forloop.first %},{% endunless %}
      {
        "team1_name": "{{ leg_team1_name }}",
        "team1_logo": "{{ leg_team1_logo | image_url: width: 200 }}",
        "team2_name": "{{ leg_team2_name }}",
        "team2_logo": "{{ leg_team2_logo | image_url: width: 200 }}",
        "bet_type": "{{ leg_bet_type }}",
        "match_time": "{{ leg_match_time }}",
        "spread_value": "{{ leg_spread_value }}",
        "spread_team": "{{ leg_spread_team }}",
        "over_under_type": "{{ leg_over_under_type }}",
        "over_under_value": "{{ leg_over_under_value }}",
        "over_under_stat_type": "{{ leg_over_under_stat_type }}"
      }
    {% endif %}
  {% endfor %}
]{% endcapture %}

<div class="bet-card" 
     {{ block.shopify_attributes }}
     data-block-type="parlay_card"
     data-block-id="{{ block.id }}"
     data-sport-type="{{ block.settings.sport_type | default: 'nhl' }}"
     data-ai-data-count="{{ block.settings.ai_data_count | default: 5214 }}"
     data-win-percentage="{{ block.settings.win_percentage | default: 78 }}"
     data-multiplier="{{ block.settings.multiplier }}"
     data-bet-units="{{ block.settings.bet_units }}"
     data-odds="{{ block.settings.odds }}"
     data-best-bookmaker="{{ block.settings.best_bookmaker }}"
     data-best-odds="{{ block.settings.best_odds }}"
     data-match-date="{{ block.settings.match_date }}"
     data-match-time="{{ block.settings.match_time }}"
     data-result="{{ block.settings.result | default: 'pending' }}"
     data-send-to-history="{{ block.settings.send_to_history }}"
     data-legs='{{ legs_json | strip_newlines | strip }}'
>
```

---

#### 2.4 Remplacer les Pages d'Historique par les Snippets

**Chercher** (ligne ~866) :
```liquid
<!-- PAGE 3: HISTORIQUE BET DU JOUR -->
<div id="page-historique-bet" class="page">
  <div class="container">
    <h1>HISTORIQUE BET DU JOUR</h1>
    ... [TOUT LE CONTENU DE LA PAGE] ...
  </div>
</div>
```

**Remplacer TOUTE la section par** :
```liquid
<!-- PAGE 3: HISTORIQUE BET DU JOUR -->
{% render 'historique-bet-page' %}
```

---

**Chercher** (plus loin, ligne ~1300 environ) :
```liquid
<!-- PAGE 4: HISTORIQUE PARLAY DU JOUR -->
<div id="page-historique-parlay" class="page">
  <div class="container">
    <h1>HISTORIQUE PARLAY DU JOUR</h1>
    ... [TOUT LE CONTENU DE LA PAGE] ...
  </div>
</div>
```

**Remplacer TOUTE la section par** :
```liquid
<!-- PAGE 4: HISTORIQUE PARLAY DU JOUR -->
{% render 'historique-parlay-page' %}
```

---

#### 2.5 Ajouter l'appel aux fonctions de chargement dans navigateTo()

**Chercher** (ligne ~2916) :
```javascript
// Perform the actual navigation
function performNavigation(pageName) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });

  // Show selected page
  const targetPage = document.getElementById('page-' + pageName);
  if (targetPage) {
    targetPage.classList.add('active');
  }

  // Update active nav item
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
  const navItem = document.querySelector(`.nav-item[data-page="${pageName}"]`);
  if (navItem) {
    navItem.classList.add('active');
  }

  // Close mobile sidebar
  if (isMobileSidebarOpen) {
    toggleSidebar();
  }

  // Update current page
  currentPage = pageName;

  // Persist current page for editor reloads
  try { localStorage.setItem('dashboard_current_page', pageName); } catch {}

  // Update URL hash
  window.location.hash = pageName;
}
```

**Ajouter AVANT `window.location.hash = pageName;`** :
```javascript
  // Charger l'historique Supabase si on navigue vers ces pages
  if (pageName === 'historique-bet' && typeof window.loadBetHistory === 'function') {
    window.loadBetHistory();
  } else if (pageName === 'historique-parlay' && typeof window.loadParlayHistory === 'function') {
    window.loadParlayHistory();
  }
```

---

## 🧪 COMMENT TESTER

### 1. Créer un Bet de Test

1. Dans l'éditeur Shopify, créer un **bet_card** avec toutes les infos
2. Cocher **"📋 Envoyer à l'historique"**
3. Sélectionner le résultat : **"✅ Gagné (Win)"** ou **"❌ Perdu (Loose)"**
4. **Sauvegarder**

### 2. Vérifier la Sauvegarde

1. Ouvrir la **Console du navigateur** (F12 → Console)
2. Recharger la page
3. Vous devriez voir :
   - `🚀 Initialisation du système d'historique Supabase`
   - `✅ Configuration Supabase initialisée`
   - `📋 Détection bet à sauvegarder: [block-id]`
   - `💾 Sauvegarde du bet dans Supabase...`
   - `✅ Bet sauvegardé: {...}`
   - **Toast vert** : "✅ Bet sauvegardé dans l'historique !"

### 3. Vérifier l'Affichage dans l'Historique

1. Cliquer sur **"HISTORIQUE BET DU JOUR"** dans la sidebar
2. Vous devriez voir :
   - Les **statistiques globales** (PARIS EN + / UNITS EN +)
   - La **carte du bet** avec le résultat (bordure verte ou rouge)
   - Le badge **UNITS** (+X.XX ou -1.00)

### 4. Supprimer le Block Shopify

1. Retourner dans l'éditeur Shopify
2. **Supprimer** le bet_card (ou le désactiver)
3. Sauvegarder
4. Recharger la page du dashboard
5. Le bet **reste visible** dans l'historique ! ✅

---

## ❓ DÉPANNAGE

### Erreur : "Configuration Supabase manquante"
→ Vérifier que le bloc `window.SUPABASE_CONFIG` est bien ajouté **avant** l'inclusion du fichier JS

### Le bet ne se sauvegarde pas
→ Vérifier dans la console s'il y a des erreurs
→ S'assurer que `data-send-to-history="true"` est bien présent sur le bet_card

### L'historique est vide
→ Vérifier que l'URL Supabase est correcte : `https://ycvfyorgkhuxcosfrsxs.supabase.co`
→ Vérifier dans la console Network (F12 → Network) si les appels aux edge functions aboutissent (status 200)

### Les images ne s'affichent pas
→ S'assurer que les `data-team1-logo` et `data-team2-logo` contiennent des URLs complètes

---

## 🎯 RÉSUMÉ DES MODIFICATIONS

- ✅ **3 fichiers copiés** dans Shopify (JS + 2 snippets)
- ✅ **5 modifications** dans `dashboard-winabet-complet.liquid` :
  1. Config Supabase + inclusion JS
  2. Attributs data-* sur bet_card
  3. Attributs data-* sur parlay_card
  4. Remplacement page historique bet
  5. Remplacement page historique parlay
  6. Ajout appel fonctions chargement

**Temps estimé** : 15-20 minutes

---

## 📞 BESOIN D'AIDE ?

Si tu rencontres des problèmes, partage-moi :
1. Les messages dans la **Console** (F12 → Console)
2. Les **erreurs Network** (F12 → Network → Filter par "supabase")
3. Une **capture d'écran** du problème

Bon courage ! 🚀
