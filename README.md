# Sargassum MVP

A full-stack application for monitoring and managing sargassum cleanup campaigns - Vincy GreenRoots Inc.

## 🌊 Features

- **Dashboard**: KPIs and operational overview
- **Map View**: Interactive Leaflet map showing beach locations and priority levels
- **Campaign Management**: Create and manage cleanup campaigns
- **Task Tracking**: Track cleanup tasks with crew assignments and volume data
- **AI Assistant**: Chat interface powered by OpenAI for operational assistance
- **Settings**: Application configuration

## 🛠️ Tech Stack

### Backend
- Python 3.11 + FastAPI
- SQLAlchemy ORM + Alembic migrations
- PostgreSQL database
- JWT Authentication
- OpenAI Integration

### Frontend
- Next.js 14 (Pages Router)
- React 18
- TailwindCSS
- Leaflet (react-leaflet)

### Infrastructure
- Docker & Docker Compose
- Nginx reverse proxy

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose

### Running with Docker

```bash
# Clone and start
git clone <repo>
cd sargassum-mvp

# Start all services
docker compose up --build

# Access:
# - Frontend: http://localhost:3000
# - Backend API: http://localhost:8000
# - Via Nginx: http://localhost
```

### Environment Variables

Create a `.env` file in the root:

```env
# OpenAI (optional - for AI assistant)
OPENAI_API_KEY=sk-your-api-key
```

## 📁 Project Structure

```
sargassum-mvp/
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI app
│   │   ├── config.py        # Settings
│   │   ├── database.py      # SQLAlchemy
│   │   ├── models/          # DB models
│   │   ├── schemas/         # Pydantic schemas
│   │   ├── routers/         # API routes
│   │   └── services/        # Business logic
│   ├── alembic/             # Migrations
│   └── Dockerfile
├── frontend/
│   ├── pages/               # Next.js pages
│   ├── components/          # React components
│   ├── lib/                 # API helpers
│   └── Dockerfile
├── nginx/
│   └── nginx.conf
└── docker-compose.yml
```

## 🔌 API Endpoints

All API routes are prefixed with `/api`:

- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register
- `GET /api/beaches` - List beaches
- `POST /api/beaches` - Create beach
- `GET /api/campaigns` - List campaigns
- `POST /api/campaigns` - Create campaign
- `GET /api/tasks` - List tasks
- `POST /api/tasks` - Create task
- `POST /api/ai/chat` - AI assistant

## 📝 License

MIT
