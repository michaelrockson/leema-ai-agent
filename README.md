# Leema-Identification-Agent

Leema is an AI research agent that discovers, validates and prioritises customer problems from online conversations, helping founders and businesses build products people actually need.

## How It Works

The agent runs a four-stage pipeline:

- Scout: Searches Reddit for potential pain points and uses an agent to validate software solvability before anything
  is stored.
- Ingress: Fetches full posts and comments for every approved submission ID.
- Sentiment: Normalizes text, filters noise, and runs VADER scoring to validate signal strength.
- Curation: Runs structured Gemini prompts to identify recurring problems and package them as problem briefs.
- Egress: Persists briefs to the database and exports to configured sinks (Notion / Email).

## Prerequisites

- Python 3.11+ (tested with 3.13)
- A Reddit app (client ID & secret)
- A Gemini API key (Google LLM)
- An [Infisical](https://infisical.com) project with secrets configured
- Optional: Notion integration + Email credentials

## Install

### Option 1. Automated Setup (Recommended)

Clone the repository:

   ```bash
   git clone https://github.com/michaelrockson/Leema-Identification-Agent.git
   cd Leema-Identification-Agent
   ```

Run the setup script:

   ```bash
   chmod +x ./setup.sh
   ./setup.sh
   ```

```bash
git clone https://github.com/michaelrockson/Leema-Identification-Agent.git
cd Leema-Identification-Agent 
```

### Option 2. Manual Setup

Clone the repository and navigate to the directory.
Create and activate a virtual environment:

   ```bash
   python -m venv .venv
   # Windows
   source .venv/Scripts/activate
   # macOS/Linux
   source .venv/bin/activate
   ```

Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

Initialize the environment file:

   ```bash
   # Windows
   copy .env.example .env
   # macOS/Linux
   cp .env.example .env
   ```

### Configure `.env`

Open the `.env` file and fill in your credentials.

**If using Infisical (Recommended for security):**
You only need to provide the Infisical connection details. The agent will fetch all other secrets from your Infisical
project at runtime.

```env
INFISICAL_CLIENT_ID=your_client_id
INFISICAL_CLIENT_SECRET=your_client_secret
INFISICAL_PROJECT_ID=your_project_id
```

**If NOT using Infisical:**
Leave the Infisical fields blank and fill in the individual secrets directly in the `.env` file (Reddit, Gemini,
Database, etc.).

```env
REDDIT_CLIENT_ID=your_reddit_id
REDDIT_CLIENT_SECRET=your_reddit_secret
GEMINI_API_KEY=your_gemini_key
DATABASE_URL=sqlite:///database.db
...
```

### Run

Run the background scheduler:

```cmd
python scheduler.py
```

Run the full pipeline once manually:

```cmd
python run.py
```

## Project Structure

```
Agent/
├── scheduler.py                # Background scheduler (APScheduler)
├── run.py                      # Manual entry point
├── server.py                   # FastAPI server entry point
│
├── pipelines/              # Coordinate the data flow between services
│   ├── scout_pipeline.py       # Discovery & validation (Scout Bot)
│   ├── ingress_pipeline.py     # Targeted data collection
│   ├── sentiment_pipeline.py   # Sentiment analysis
│   ├── core_pipeline.py        # AI Curation (Gemini)
│   └── egress_pipeline.py      # Data delivery (Notion/Email)
│
├── services/                   # Business logic
│   ├── scout_bot_service.py    # Agentic scouting & ID staging
│   ├── infisical_service.py    # Runtime secrets loading from Infisical
│   ├── ingress_service.py      # Reddit data collection
│   ├── reddit_service.py       # Scraping & storage pipeline coordinator
│   ├── sentiment_service.py    # Sentiment analysis
│   ├── core_service.py         # Curator Agent (Gemini)
│   └── egress_service.py       # Email & Notion exporters
│
├── repositories/               # Data access layer (SQLAlchemy)
│   ├── validated_post_repository.py
│   ├── post_repository.py
│   ├── comment_repository.py
│   ├── sentiment_repository.py
│   └── brief_repository.py
│
├── clients/                    # External API adapters
│   ├── reddit_client.py
│   └── gemini_client.py
│
├── database/                   # Models and DB initialization
│   └── models.py
│
├── settings/
│   └── settings.py             # Settings & env variable mapping
│
└── utils/
    ├── logger.py               # Shared logger
    └── helpers.py              # Shared utilities: serializers, Reddit fetchers,
                                #   data integrity checks, text chunking,
                                #   Notion block builders & email formatter
```

## Secrets Management

Secrets are loaded dynamically at startup using `InfisicalSecretsService`. When the app initializes,
`settings/settings.py` authenticates with Infisical and injects all project secrets into the environment before any
constants are resolved.

The following secrets should be configured in your Infisical project:

| Secret                 | Description                           |
|------------------------|---------------------------------------|
| `REDDIT_CLIENT_ID`     | Reddit app client ID                  |
| `REDDIT_CLIENT_SECRET` | Reddit app client secret              |
| `REDDIT_USER_AGENT`    | Reddit API user agent string          |
| `GEMINI_API_KEY`       | Google Gemini API key                 |
| `NOTION_API_KEY`       | Notion integration token *(optional)* |
| `NOTION_DB_ID`         | Notion database ID *(optional)*       |
| `EMAIL_ADDRESS`        | Sender email address                  |
| `EMAIL_APP_PASSWORD`   | Email app password                    |
| `RECIPIENT_ADDRESS`    | Report recipient email                |
| `DATABASE_URL`         | SQLAlchemy database connection URL    |

## Features

- Reddit ingestion and data collection
- Sentiment analysis pipeline
- Gemini-based Curator Agent
- Notion sync (optional) and email notifications
- Repository pattern (data access layer)
- Dynamic secrets loading via Infisical
- Egress helpers extracted to utils/helpers.py

## Notes & Limitations

- Backend infrastructure only no UI
- Focused exclusively on Reddit as a data source
- LLM inference costs apply depending on Gemini usage tier
