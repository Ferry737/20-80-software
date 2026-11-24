<div align="center">

# 20/80 Software

**A productivity platform that applies the Pareto principle to your own work: find the 20% of tasks that produce 80% of the outcome — and clear the rest.**
Full-stack monorepo: FastAPI backend, Next.js glass-UI web app, Flutter mobile client, one `docker compose up`.

[![FastAPI](https://img.shields.io/badge/FastAPI-async-009688?style=for-the-badge&logo=fastapi&logoColor=white)](./backend/app/main.py)
[![Next.js](https://img.shields.io/badge/Next.js-web-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](./web/package.json)
[![Flutter](https://img.shields.io/badge/Flutter-mobile-02569B?style=for-the-badge&logo=flutter&logoColor=white)](./mobile/pubspec.yaml)
[![Docker](https://img.shields.io/badge/Docker%20Compose-5%20services-2496ED?style=for-the-badge&logo=docker&logoColor=white)](./docker-compose.yml)
[![Status](https://img.shields.io/badge/status-in%20development-ffb454?style=for-the-badge)](#-status)

[Quick start](#-quick-start) · [Architecture](#-architecture) · [Status](#-status)

</div>

---

## ✨ The stack

| Layer | Tech | Why |
|---|---|---|
| **API** | FastAPI · SQLAlchemy 2 (async) · Alembic · Pydantic v2 | Typed, async, migrated schema |
| **Data** | PostgreSQL 16 · Redis 7 · ChromaDB | Relational state, cache/queues, vector store |
| **Jobs** | Celery 5 on Redis | Background work off the request path |
| **Auth** | JWT (`python-jose`) + bcrypt | Token auth, hashed passwords |
| **Web** | Next.js · TypeScript · Tailwind · glass components | Fast, consistent UI |
| **Mobile** | Flutter (`mobile/`) | Same API, native feel |
| **Infra** | `docker-compose.yml` with healthchecks | One command, whole stack |

## 🏗 Architecture

```
┌─────────────┐   ┌──────────────┐        ┌──────────────────────────────┐
│  Flutter     │   │  Next.js web │        │  FastAPI backend             │
│  mobile      │──▶│  (port 3000) │──────▶ │  (port 8000)                 │
└─────────────┘   └──────────────┘        │  config · database · main    │
                                          └───────┬───────┬───────┬──────┘
                                                  │       │       │
                                          ┌───────▼──┐ ┌──▼────┐ ┌▼─────────┐
                                          │ Postgres │ │ Redis │ │ ChromaDB │
                                          │  16      │ │  7    │ │  0.5     │
                                          └──────────┘ └───────┘ └──────────┘
                                                       │
                                                 Celery workers
```

## 🚀 Quick start

```bash
git clone https://github.com/Ferry737/20-80-software.git
cd 20-80-software
cp backend/.env.example backend/.env      # fill in secrets — never commit .env
docker compose up --build
```

| Service | URL |
|---|---|
| Web | http://localhost:3000 |
| API | http://localhost:8000 (docs at `/docs`) |
| Postgres / Redis / Chroma | 5432 · 6379 · 8001 |

## 📁 Repository layout

```
20-80-software/
├── docker-compose.yml        ← postgres · redis · chromadb · backend · frontend
├── backend/
│   ├── app/{main,config,database}.py
│   ├── pyproject.toml · requirements.txt · Dockerfile · .env.example
├── web/
│   ├── app/{layout,page}.tsx · components/{GlassButton,GlassPanel,SectionHeader,Shell}.tsx
│   ├── lib/api.ts · tailwind.config.ts · Dockerfile
└── mobile/
    └── lib/{main,app,home}.dart · pubspec.yaml
```

## 📊 Status

**In development.** The platform skeleton — services, auth, data layer, web and mobile shells — is in place and boots with Docker. Feature work is ongoing; see `web/progress-report.html` in the repo for the running progress log.

---

<div align="center">
<sub>Built by <a href="https://github.com/Ferry737">Ferry</a></sub><br>
<sub>Do the 20%. Skip the 80%.</sub>
</div>
