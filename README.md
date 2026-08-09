# Leema AI Agent

Leema is an AI research agent that discovers, validates, and prioritizes customer problems from online conversations helping founders and businesses build products people actually need.


## Repository Structure

```
leema-ai-agent/
├── leema-backend/     # Python AI agent — pipeline, services, API
└── leema-frontend/    # React + TypeScript + Vite dashboard
```

## How It Works

The agent runs a five-stage pipeline:

| Stage | Description |
|---|---|
| **Scout** | Searches Reddit for pain points and validates software solvability before anything is stored |
| **Ingress** | Fetches full posts and comments for every approved submission |
| **Sentiment** | Normalises text, filters noise, and runs VADER scoring to validate signal strength |
| **Curation** | Runs structured Gemini prompts to identify recurring problems and package them as problem briefs |
| **Egress** | Persists briefs to the database and exports to configured sinks (Notion / Email) |


## Prerequisites

- **Backend**: Python 3.11+ (tested with 3.13)
- **Frontend**: Node.js 18+, Yarn 4+
- A Reddit app (client ID & secret)
- A Gemini API key (Google LLM)
- An [Infisical](https://infisical.com) project with secrets configured *(recommended)*
- Optional: Notion integration + email credentials


## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/michaelrockson/leema-ai-agent.git
cd leema-ai-agent
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd leema-backend
```

**Option A Automated Setup (Recommended)**

```bash
chmod +x ./setup.sh
./setup.sh
```

**Option B Manual Setup**

```bash
# Create and activate a virtual environment
python -m venv .venv

# Windows
source .venv/Scripts/activate
# macOS / Linux
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy the environment file
cp .env.example .env   # macOS/Linux
copy .env.example .env  # Windows
```

#### Configure `.env`

**Using Infisical (Recommended):** Provide only the Infisical connection details secrets are fetched at runtime.

```env
INFISICAL_CLIENT_ID=your_client_id
INFISICAL_CLIENT_SECRET=your_client_secret
INFISICAL_PROJECT_ID=your_project_id
```

**Without Infisical:** Fill in individual secrets directly.

```env
REDDIT_CLIENT_ID=your_reddit_id
REDDIT_CLIENT_SECRET=your_reddit_secret
GEMINI_API_KEY=your_gemini_key
DATABASE_URL=sqlite:///database.db
```

#### Run the Backend

```bash
# Start the FastAPI server
python server.py

# Run the full pipeline once (manual)
python run.py

# Start the background scheduler
python scheduler.py
```

### 3. Frontend Setup

Navigate to the frontend directory:

```bash
cd leema-frontend
```

Install dependencies with Yarn (PnP is disabled uses standard `node_modules`):

```bash
yarn install
```

Start the development server:

```bash
yarn dev
```

Build for production:

```bash
yarn build
```

## Secrets Reference

The following secrets should be configured in your Infisical project (or directly in `.env`):

| Secret | Description |
|---|---|
| `REDDIT_CLIENT_ID` | Reddit app client ID |
| `REDDIT_CLIENT_SECRET` | Reddit app client secret |
| `REDDIT_USER_AGENT` | Reddit API user agent string |
| `GEMINI_API_KEY` | Google Gemini API key |
| `NOTION_API_KEY` | Notion integration token *(optional)* |
| `NOTION_DB_ID` | Notion database ID *(optional)* |
| `EMAIL_ADDRESS` | Sender email address |
| `EMAIL_APP_PASSWORD` | Email app password |
| `RECIPIENT_ADDRESS` | Report recipient email |
| `DATABASE_URL` | SQLAlchemy database connection URL |

---

## Backend Structure

```
leema-backend/
├── scheduler.py              # Background scheduler (APScheduler)
├── run.py                    # Manual pipeline entry point
├── server.py                 # FastAPI server entry point
│
├── pipelines/                # Coordinate data flow between services
│   ├── scout_pipeline.py
│   ├── ingress_pipeline.py
│   ├── sentiment_pipeline.py
│   ├── core_pipeline.py
│   └── egress_pipeline.py
│
├── services/                 # Business logic
│   ├── scout_bot_service.py
│   ├── infisical_service.py
│   ├── ingress_service.py
│   ├── reddit_service.py
│   ├── sentiment_service.py
│   ├── core_service.py
│   └── egress_service.py
│
├── repositories/             # Data access layer (SQLAlchemy)
├── clients/                  # External API adapters (Reddit, Gemini)
├── database/                 # Models and DB initialisation
├── settings/                 # Settings & env variable mapping
└── utils/                    # Shared logger and helpers
```

## Frontend Structure

```
leema-frontend/
├── src/                      # Application source
├── public/                   # Static assets
├── index.html
├── vite.config.ts
├── tsconfig.json
├── .yarnrc.yml               # Yarn Berry config (nodeLinker: node-modules)
└── package.json
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| AI Agent / Backend | Python, FastAPI, SQLAlchemy, APScheduler, VADER, Gemini |
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v4 |
| Package Manager (FE) | Yarn 4 (Berry, no PnP) |
| Secrets | Infisical |
| Data Sources | Reddit API |
| Exports | Notion, Email |
