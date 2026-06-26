# Sécurité du projet

## GitHub Code Security

Les fonctionnalités suivantes sont activées :

- Dependabot alerts
- Dependabot security updates
- Secret scanning

Ces outils permettent de détecter automatiquement :
- les vulnérabilités dans les dépendances
- les failles de sécurité connues
- les secrets exposés dans le code

## Preuve

Capture d’écran disponible dans :

docs/images/github-security.png

## Risques DevOps

### R1 — Clé OpenAI exposée
- Probabilité : Moyenne
- Impact : Critique (facturation non contrôlée, fuite de quotas)
- Action : stocker la clé dans `.env`, utiliser GitHub Secrets, empêcher le commit de fichiers secrets et planifier une rotation régulière.

### R2 — IA externe down en demo
- Probabilité : Moyenne
- Impact : Élevé (fonctionnalité de génération indisponible)
- Action : documenter le comportement en cas d’API indisponible, afficher des erreurs utilisateur claires et prévoir un fallback ou une file d’attente légère.

### R3 — Config CORS trop permissive
- Probabilité : Moyenne
- Impact : Moyen (exposition front-end à des origines non autorisées)
- Action : restreindre `CORS_ALLOW_ALL_ORIGINS = True` en production, limiter les origines autorisées et tester les headers CORS.

### R4 — Pipeline CI sans tests backend
- Probabilité : Élevée
- Impact : Élevé (régressions backend non détectées)
- Action : ajouter un job CI dédié pour exécuter les tests Django et vérifier les migrations avant merge.

### R5 — Utilisation de SQLite en production
- Probabilité : Moyenne
- Impact : Critique (verrous de concurrence, perte de scalabilité)
- Action : planifier la migration vers PostgreSQL ou une base gérée pour les environnements réels et documenter la configuration de déploiement.
