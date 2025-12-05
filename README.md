# Sargassum MVP

A full-stack application for monitoring and managing sargassum cleanup campaigns in the Caribbean.

## 🌊 Features

- **Dashboard**: Real-time KPIs and campaign overview
- **Interactive Map**: Leaflet-based map showing beach risk levels
- **Campaign Management**: Create and manage cleanup campaigns
- **Task Tracking**: Kanban-style task management
- **AI Assistant**: Chat interface for sargassum-related queries
- **Settings**: User profile and notification preferences

## 🛠️ Tech Stack

### Backend
- Python 3.11
- FastAPI
- SQLAlchemy ORM
- Alembic (migrations)
- PostgreSQL + PostGIS
- JWT Authentication
- GeoAlchemy2
- OpenAI Integration (stub)

### Frontend
- Next.js 15 (App Router)
- React 18
- TypeScript
- TailwindCSS
- Leaflet (react-leaflet)
- Zustand (state management)
- Lucide React (icons)

### Infrastructure
- Docker & Docker Compose
- Nginx (reverse proxy)
- PostgreSQL with PostGIS

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 20+ (for local development)
- Python 3.11+ (for local development)

### Running with Docker

1. Clone the repository:
```bash
git clone <repository-url>
cd sargassum-mvp
```

2. Start all services:
```bash
docker-compose up --build
```

3. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

### Local Development

#### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Run migrations
alembic upgrade head

# Start server
uvicorn app.main:app --reload
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 📁 Project Structure

```
sargassum-mvp/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI application
│   │   ├── config.py            # Configuration
│   │   ├── database.py          # Database connection
│   │   ├── models/              # SQLAlchemy models
│   │   ├── schemas/             # Pydantic schemas
│   │   ├── routers/             # API endpoints
│   │   ├── services/            # Business logic
│   │   └── middleware/          # Auth middleware
│   ├── alembic/                 # Database migrations
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── app/                     # Next.js App Router pages
│   ├── components/              # React components
│   ├── lib/                     # API utilities
│   ├── store/                   # Zustand store
│   ├── package.json
│   └── Dockerfile
├── nginx/
│   └── nginx.conf
├── docker-compose.yml
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login and get JWT token
- `GET /auth/me` - Get current user

### Beaches
- `GET /beaches` - List all beaches
- `GET /beaches/{id}` - Get beach by ID
- `POST /beaches` - Create beach
- `PUT /beaches/{id}` - Update beach
- `DELETE /beaches/{id}` - Delete beach

### Campaigns
- `GET /campaigns` - List all campaigns
- `GET /campaigns/{id}` - Get campaign by ID
- `POST /campaigns` - Create campaign
- `PUT /campaigns/{id}` - Update campaign
- `DELETE /campaigns/{id}` - Delete campaign

### Tasks
- `GET /tasks` - List all tasks
- `GET /tasks/{id}` - Get task by ID
- `POST /tasks` - Create task
- `PUT /tasks/{id}` - Update task
- `DELETE /tasks/{id}` - Delete task

### AI
- `POST /ai/chat` - Send message to AI assistant

## 🗄️ Database Schema

### Users
- id, email, hashed_password, full_name, is_active, is_superuser

### Beaches
- id, name, description, latitude, longitude, location (PostGIS), region, country, risk_level

### Campaigns
- id, name, description, status, beach_id, start_date, end_date, coordinator_id, volunteers_needed/registered

### Tasks
- id, title, description, status, priority, campaign_id, assigned_to, due_date

## 🔒 Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@db:5432/sargassum

# JWT
SECRET_KEY=your-super-secret-key-change-in-production

# OpenAI (optional)
OPENAI_API_KEY=your-openai-api-key

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 📝 License

MIT License

