# DevOps Strategy pour AIGen

## 1. Architecture technique cible
AIGen est conçu comme une application full-stack simple avec un frontend React/Vite et un backend Django REST. Le frontend est livré depuis `ai-gen-app` et consomme l’API Django exposée par `data_generator`. La base de données locale SQLite est utilisée en développement, tandis que le backend Django embarque des appels aux services d’IA via les variables d’environnement `GEMINI_API_KEY` et potentiellement `OPENAI_API_KEY`.

Architecture cible:

```
+----------------+      +-----------------------+      +----------------+
| Frontend       | <--> | Django Backend         | <--> | SQLite / AI API|
| ai-gen-app     |      | data_generator        |      | (GEMINI_API_KEY)|
+----------------+      +-----------------------+      +----------------+
      5173                  8000
```

Cette architecture privilégie la séparation claire entre l’UI React et l’API Django, ce qui facilite le déploiement en conteneurs et l’ajout futur d’un reverse proxy ou d’un CDN.

## 2. Structure du repository
Le repository est organisé en deux principales applications:
- `ai-gen-app/`: interface utilisateur React, tests frontend, configuration Vite et linting.
- `data_generator/`: backend Django, API REST, Dockerfile, et gestion de la base de données.

Le niveau racine contient `docker-compose.yml` pour orchestrer le backend en développement, et `.github/workflows/ci.yml` pour la pipeline CI. La documentation est centralisée dans `docs/`.

## 3. Workflow Git
Le projet utilise un workflow Git simple basé sur les branches `main` et `develop`:
- `develop` pour l’intégration continue des fonctionnalités en cours.
- `main` pour les versions stables et déployables.

Les contributions passent par des branches de fonctionnalité nommées `feature/<description>` ou `fix/<description>`. Les pull requests sont validées par revue de code et tests CI. Les commits doivent être atomiques, avec des messages clairs décrivant chaque changement.

## 4. Services Docker prévus
Le fichier `docker-compose.yml` définit actuellement un seul service backend:
- `backend`: construction Docker depuis `data_generator`, exposé sur le port `8000`, chevauchement du dossier source avec `/app`, et chargement de `.env`.

Pour production, le plan consiste à ajouter un service reverse proxy (Nginx) et éventuellement un service frontend statique ou un CDN. Une évolution naturelle est de séparer le frontend dans un conteneur de build et de servir les artefacts via Nginx.

## 5. Variables d'environnement
Les variables d’environnement gérées par le projet sont:
- `SECRET_KEY`: clé Django pour le secret local.
- `DEBUG`: mode debug actif en développement.
- `GEMINI_API_KEY`: clé pour les appels aux services d’IA Google Generative.

`docker-compose.yml` charge `data_generator/.env`. En CI, `GEMINI_API_KEY` est transmis en tant que secret GitHub Action. La stratégie est de ne jamais committer de clés dans le repo et d’utiliser un `.env.example` à terme pour documenter les variables requises.

## 6. Stratégie de tests
Les tests actuels sont principalement frontend via Vitest et React Testing Library. La pipeline CI exécute `npm test` dans `ai-gen-app` après `npm install` et lint.

La stratégie prévoit:
- maintenir les tests unitaires pour les composants React et hooks (`tests/` frontend).
- ajouter des tests backend Django dans `data_generator/api/tests.py` pour les endpoints REST.
- utiliser la couverture `npm run test:coverage` pour s’assurer que les composants critiques sont testés.

## 7. Pipeline CI prévu
La pipeline actuelle se trouve dans `.github/workflows/ci.yml` et couvre:
- checkout du code
- installation de Node.js
- installation des dépendances frontend
- linting frontend
- exécution des tests frontend
- build du frontend

L’évolution souhaitée inclut l’ajout d’un job backend pour:
- installer les dépendances Python
- lancer les tests Django
- vérifier les migrations
- construire le container Docker backend

## 8. Sécurité et secrets
La sécurité repose sur:
- l’exclusion des secrets du repository avec `.gitignore` (ex: `.env`).
- l’utilisation de GitHub Secrets pour `GEMINI_API_KEY`.
- le mode `DEBUG=True` limité au développement local via `settings.py`.

À terme, il est recommandé de renforcer:
- la configuration CORS contrôlée plutôt que `CORS_ALLOW_ALL_ORIGINS = True`.
- la rotation des clés d’API IA.
- l’ajout de policies de sécurité pour Django (CSRF, X-Frame-Options, HTTPS) lorsque l’application devient publique.

## 9. Logs prévus
Le backend Django émet des logs natifs de développement. La roadmap DevOps prévoit:
- configurer un logger Django personnalisé dans `settings.py`.
- envoyer les logs d’erreur et requête vers un fichier ou stdout pour la collecte Docker.
- éventuellement intégrer un service centralisé comme Loki ou Papertrail pour les environnements cloud.

Pour l’instant, le journal principal reste la sortie console de `python manage.py runserver` et les erreurs de build du frontend.

## 10. Risques DevOps
Risques identifiés:
- dépendance à SQLite en local, ce qui limite la scalabilité en production.
- absence de tests backend et de validation d’API dans la CI actuellement.
- clés d’IA exposées si un `.env` mal géré est committé.

Mitigation:
- migrer vers PostgreSQL ou un service de base de données managé pour production.
- ajouter des jobs CI backend et des tests d’intégration.
- valider les règles `.gitignore` et utiliser des scans secrets avant commit.

## 11. Commandes de lancement
Les commandes de développement actuelles sont:
- backend: `cd data_generator && python -m venv .venv && .venv/Scripts/activate && pip install -r requirements.txt && python manage.py migrate && python manage.py runserver`
- frontend: `cd ai-gen-app && npm install && npm run dev`
- Docker backend: `docker compose up --build`

Tests:
- `cd data_generator && python manage.py test`
- `cd ai-gen-app && npm run test`
- `cd ai-gen-app && npm run lint`

## 12. Prochaines actions
1. ajouter un job CI backend dans `.github/workflows/ci.yml` pour exécuter les tests Django.
2. créer un fichier `data_generator/.env.example` documentant les variables obligatoires.
3. introduire une configuration de logger Django pour la sortie vers stdout et un fichier.
4. planifier la migration vers PostgreSQL pour un déploiement production.
5. consolider la documentation Docker pour le frontend et le backend.
