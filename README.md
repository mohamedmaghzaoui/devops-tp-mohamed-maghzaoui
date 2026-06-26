# AIGen 🤖

AIGen est un générateur de structures JSON/YAML alimenté par IA, conçu pour créer rapidement des données de test ou des maquettes de schémas complexes.

---

## Fonctionnalités principales

- Génération de données dynamiques basées sur un schéma défini par l’utilisateur
- UI React/Vite pour construire visuellement des schémas JSON imbriqués
- Backend Django REST pour orchestrer les appels à l’IA et stocker les résultats
- Sortie JSON gérée et renvoyée au frontend

---

## Architecture

AIGen se compose de deux applications distinctes :

- `data_generator/` : backend Django, API REST et Dockerfile
- `ai-gen-app/` : frontend React/Vite et hooks métier

```
AIGen/
├── data_generator/        # Django backend
│   ├── api/               # Routes, modèles, sérializers
│   ├── manage.py
│   ├── Dockerfile
│   └── db.sqlite3
├── ai-gen-app/            # React frontend
│   ├── src/
│   │   ├── api/           # abstractions d’API
│   │   ├── components/    # UI
│   │   ├── hooks/         # logique métier
│   │   └── styles/
└── docs/                  # documentation projet
```

---

## Endpoints API

Le backend expose les endpoints suivants via `/api/` :

### `GET /api/health/`
Vérifie l’état du service.

Réponse exemple :

```json
{
  "status": "ok"
}
```

### `POST /api/generate/`
Génère un JSON à partir d’un schéma envoyé en body.

Payload attendu :

```json
{
  "schema": [
    {
      "name": "username",
      "type": "string",
      "format": "email",
      "regex": null,
      "children": []
    },
    {
      "name": "profile",
      "type": "object",
      "children": [
        {
          "name": "age",
          "type": "number",
          "children": []
        }
      ]
    }
  ],
  "count": 10
}
```

Réponse exemple :

```json
{
  "id": 1,
  "prompt": "...prompt généré...",
  "generated_data": {
    "username": "alice@example.com",
    "profile": {
      "age": 29
    }
  },
  "created_at": "2026-06-26T12:00:00Z"
}
```

### `GET /api/generations/`
Récupère l’historique des générations enregistrées.

Réponse exemple :

```json
[
  {
    "id": 1,
    "prompt": "...",
    "generated_data": { "username": "alice@example.com" },
    "created_at": "2026-06-26T12:00:00Z"
  }
]
```

---

## Installation et lancement

### Backend Django

```bash
cd data_generator
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Le backend est alors accessible sur `http://localhost:8000/`.

### Frontend React

```bash
cd ai-gen-app
npm install
npm run dev
```

Le frontend est disponible sur `http://localhost:5173/`.

---

## Variables d’environnement

Le backend utilise :

- `SECRET_KEY` : clé Django locale
- `DEBUG` : mode de debug
- `GEMINI_API_KEY` : clé pour l’API Google Generative

Le frontend peut utiliser `VITE_API_URL` pour remplacer l’URL par défaut :

```bash
VITE_API_URL=http://localhost:8000/api
```

---

## Tests

### Backend

```bash
cd data_generator
python manage.py test
```

### Frontend

```bash
cd ai-gen-app
npm run test
```

---

## Déploiement

Ce projet n’a pas encore été déployé en production, mais j’ai déjà déployé une autre application de notre projet fil rouge avec un frontend sur Netlify et un backend sur Render :

- Frontend : https://edutwin.netlify.app/
- Backend : https://edutwin-backend-dev.onrender.com/

Pour AIGen, la stratégie de déploiement recommandée serait :

1. construire l’application React et héberger les fichiers statiques sur Netlify ou Vercel
2. déployer le backend Django sur Render, Railway ou un service équivalent
3. gérer les secrets via les variables d’environnement de la plateforme

---

## Bonnes pratiques

- Ne pas committer `.env`
- Utiliser GitHub Secrets pour `GEMINI_API_KEY`
- Vérifier `CORS_ALLOW_ALL_ORIGINS` avant un déploiement réel
- Ajouter des tests backend dans la CI

---

## Auteur

**Mohamed Maghzaoui** — développeur web et IA.

🔗 [Portfolio](https://mohamedmaghzaoui.online/) · [LinkedIn](https://www.linkedin.com/in/mohamed-maghzaoui-577044256/) · [GitHub](https://github.com/mohamedmaghzaoui)
