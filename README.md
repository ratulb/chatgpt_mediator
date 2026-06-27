# ChatGPT Mediator

A web browser / mobile interface for talking to large language models via OpenAI-compatible APIs.

<img width="964" alt="ChatGPT Mediator" src="https://github.com/ratulb/chatgpt_mediator/blob/main/ChatGPTMediator.png">

---

## Prerequisites

This is a **Node.js** project. You need `node` (v18+) and `npm`.

```bash
# Ubuntu/Debian
sudo apt install nodejs npm

# macOS
brew install node

# Or via nvm (recommended, avoids permission issues):
# https://github.com/nvm-sh/nvm
```

Do **not** use `pip install npm` — pip is for Python packages; npm is a Node.js tool.

## Quick start

### Option A — automated setup

```bash
./setup.sh
```

### Option B — manual setup

#### 1. Server (backend)

```bash
cd server
cp .env.Example .env
npm install
npm run server
```

The server starts at `http://localhost:5000`.

**No API key?** Set `LLM_PROVIDER=mock` in `.env` — returns canned replies, no key needed.

#### 2. Client (frontend)

```bash
cd client
npm install
npm run dev
```

Opens at `http://localhost:5173`.

---

## LLM providers (server)

Set `LLM_PROVIDER` in `server/.env`:

| Provider | Description | Requires |
|----------|-------------|----------|
| `openai` (default) | OpenAI API | `OPENAI_API_KEY` |
| `mock` | Canned responses | Nothing |
| `ollama` | Local Ollama | `LLM_BASE_URL=http://localhost:11434/v1` |
| `generic` | Any OpenAI-compatible API | `LLM_BASE_URL` + `LLM_API_KEY` |

Additional env vars: `LLM_MODEL` (default `gpt-4o-mini`), `LLM_BASE_URL`, `LLM_API_KEY`.

---

## Direct mode (no backend)

The client can call LLM APIs directly from the browser. Open Settings > Connection, switch to **Direct mode**, and enter your API key + base URL + model. Works on any static host (GitHub Pages, etc.).

---

## Deployment

| Host | Mode | What to deploy |
|------|------|----------------|
| Render / Railway / Fly | Backend | `server/` — run `node server` |
| Vercel | Backend | `server/api/` + `client/` |
| Netlify | Backend | `server/netlify/functions/` + `client/` |
| Cloudflare Pages | Backend | `server/functions/` + `client/` |
| GitHub Pages | Direct only | `client/` (see below) |

### Deploying to GitHub Pages

This app uses `HashRouter` and relative asset paths (`base: './'`), so it works on GitHub Pages with zero server config.

#### Option A — Automated (via GitHub Actions)

Push to the `main` branch — the workflow in `.github/workflows/deploy-pages.yml` builds and deploys automatically.

To enable:
1. Go to your repo **Settings > Pages**
2. Under **Source**, select **GitHub Actions**
3. Push to `main` — the action runs and deploys

#### Option B — One-time deploy (via gh-pages)

```bash
cd client
npm install
npm run deploy
```

Requires `git` remote to be set. Deploys `dist/` to the `gh-pages` branch.

#### Usage after deploy

1. Open your site at `https://<user>.github.io/<repo>/`
2. Go to **Settings > Connection**
3. Switch to **Direct mode**
4. Enter your API key, base URL, and model
5. Start chatting — no backend needed

---

## Project structure

```
client/          React + Vite SPA
  src/
    components/  UI components (Chat, Settings, bot/, speaker/, ...)
    fetcher/     DirectFetcher.js — browser-side LLM calls
server/          Express.js API
  server.js      Express entrypoint
  llm.js         LLM provider abstraction (mock, openai, ollama, generic)
  api/chat.js    Vercel serverless handler
  netlify/       Netlify serverless handler
  functions/     Cloudflare Pages handler
```

---

## Routes (client)

| Path | Page |
|------|------|
| `/` | Chat |
| `/settings` | Audio, Storage, and Connection preferences |
| `/actions` | Placeholder |
| `/about` | About |

---

## Features

- Chat interface with streaming-like bot responses
- Voice recognition and speech synthesis
- Text file upload
- Conversations saved to localStorage or sessionStorage
- Abort / resubmit / delete messages
