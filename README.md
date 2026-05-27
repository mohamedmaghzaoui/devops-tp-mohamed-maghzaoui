# AIGen 🤖

Generate complex JSON and YAML mock data structures powered by AI — in seconds.

---

## Stack

**Backend**
- Python / Django — REST API & data generation logic
- SQLite — local database (`db.sqlite3`)

**Frontend**
- React.js (Vite) — UI framework
- CSS — styling

**Output formats**
- JSON, YAML

---

## Lancer le projet

**Backend**
```bash
git clone https://github.com/mohamedmaghzaoui/AIGen.git
cd AIGen/data_generator

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
API accessible at `http://localhost:8000/`

**Frontend**
```bash
cd ai-gen-app
npm install
npm run dev
```
App accessible at `http://localhost:5173/`

---

## Tester

```bash
# Backend
cd data_generator
python manage.py test

# Frontend
cd ai-gen-app
npm run test
```

---

## Architecture

La structure du projet est documentée dans [`docs/`](./docs/).

```
AIGen/
├── data_generator/        # Django backend
│   ├── api/               # REST endpoints
│   ├── manage.py
│   └── db.sqlite3
└── ai-gen-app/            # React frontend
    └── src/
        ├── api/           # API calls
        ├── components/    # UI components
        ├── pages/         # Route pages
        ├── hooks/         # Custom hooks
        ├── context/       # React context
        └── utils/         # Helpers
```

---

## Auteur

**Mohamed Maghzaoui** — software engineer passionné par l'IA, le web, l'IoT et le cloud.

🔗 [Portfolio](https://mohamedmaghzaoui.online/) · [LinkedIn](https://www.linkedin.com/in/mohamed-maghzaoui-577044256/) · [GitHub](https://github.com/mohamedmaghzaoui)
