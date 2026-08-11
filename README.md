# Leema Research Platform

Leema is an AI research agent that discovers, validates and prioritizes customer problems from online conversations, helping founders and businesses build products people actually need. It runs a multi-stage pipeline that scouts Reddit for pain points, validates signal strength and packages recurring problems into actionable briefs.

## Getting Started

These instructions will give you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Requirements for the software and other tools to build, test and run the project:

* [Python 3.11+](https://www.python.org/)
* [Node.js 18+](https://nodejs.org/)
* [Yarn 4+](https://yarnpkg.com/)
* A Reddit app (client ID & secret)
* A [Gemini API key](https://ai.google.dev/)
* An [Infisical](https://infisical.com) project for secrets management *(optional but recommended)*

### Installing

A step by step series of examples that tell you how to get a development environment running.

Clone the repository:

```
git clone https://github.com/michaelrockson/leema-ai-agent.git
cd leema-ai-agent
```

Set up the backend:

```
cd leema-backend

# For automatic setup run this script:
chmod +x ./setup.sh
./setup.sh

# If that fails tack the manual route:
(See the backend README.md for more details)
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Fill in your secrets in `.env`, then start the backend:

```
python server.py
```

Set up the frontend:

```
cd leema-frontend
yarn install
yarn dev
```

End with an example of getting some data out of the system, e.g. running the pipeline manually:

```
python run.py
```

## Built With

* [FastAPI](https://fastapi.tiangolo.com/) - Backend framework
* [React](https://react.dev/) - Frontend framework
* [Vite](https://vitejs.dev/) - Frontend build tool
* [Infisical](https://infisical.com) - Secrets management

## Author

* **Michael Rockson** - *Initial work*
