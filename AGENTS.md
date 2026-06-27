# ChatGPT Mediator — Agent Guide

## Project structure
- **`client/`** — React + Vite SPA (ESM). Runs `vite dev --host 0.0.0.0` for network access.
- **`server/`** — Express.js API (ESM). Single POST `/` proxying to OpenAI. Uses modern `openai` v4 SDK.
- Both have independent `package.json`, `package-lock.json`. Run `npm install` in each separately.

## Prerequisites
- **Node.js v18+** and **npm** (install via `apt`, `brew`, or `nvm`). Do **not** use `pip install npm` — this is a Node.js project, not Python.
- Run `./setup.sh` for automated install, or follow the manual steps below.

## Setup
```bash
# server
cp server/.env.Example server/.env  # set OPENAI_API_KEY or use mock mode
cd server && npm install && npm run server  # nodemon on :5000

# client
cd client && npm install && npm run dev     # Vite on :5173
```

## Key wiring
- Backend URL comes from `VITE_BACKEND_URL` (default `http://localhost:5000`). Set in `client/.env`.
- Conversations stored in `localStorage` or `sessionStorage` (toggle in Settings). Key: `conversations`, format: `[{messageId, prompt, time, user, type}]`.
- Voice prefs stored at key `voice_preferences`; `store_type` flag determines storage engine.
- Server supports multiple LLM providers via `LLM_PROVIDER` env var (see below).

## Routes (client)
| Path | Component |
|------|-----------|
| `/` | `Chat` — main chat UI |
| `/settings` | Audio + Storage + Connection preferences |
| `/actions` | Empty placeholder |
| `/about` | About page |

## LLM provider modes (server env vars)

| `LLM_PROVIDER` | Description | Requires |
|----------------|-------------|----------|
| `openai` (default) | OpenAI API (via v4 SDK) | `OPENAI_API_KEY` |
| `mock` | Canned responses, no API key | Nothing |
| `ollama` | Local Ollama instance | `LLM_BASE_URL=http://localhost:11434/v1` |
| `generic` | Any OpenAI-compatible API | `LLM_BASE_URL` + `LLM_API_KEY` |

Additional env vars: `LLM_MODEL` (default `gpt-4o-mini`), `LLM_BASE_URL`, `LLM_API_KEY`.

## Direct mode (no backend at all)
The client can call LLM APIs directly from the browser. Enabled in Connection Settings. Works on any static host including GitHub Pages.

## Deployment
| Host | Mode | What to deploy |
|------|------|----------------|
| Render / Railway / Fly | Backend | `server/` Express app |
| Vercel | Backend (serverless) | `server/api/` functions + `client/` |
| Netlify | Backend (serverless) | `server/netlify/functions/` + `client/` |
| Cloudflare Pages | Backend (serverless) | `server/functions/` + `client/` |
| GitHub Pages | Direct only | `client/` (user provides key) |

## Testing / Quality
- No test framework, no linter, no typechecker configured.

## Notable quirks
- `Actions` page is an empty placeholder. `/about` route exists but the About component is minimal.
- Server has no `build` script; only `nodemon` for dev. Production uses `node server/server.js`.

## Modernization plan (executing)

### Step 1 — Configurable backend URL
`Fetcher.jsx` reads `import.meta.env.VITE_BACKEND_URL` instead of a hardcoded URL.
Default: `http://localhost:5000`. Set in `client/.env`.

### Step 2 — Server mock mode
When `MOCK_RESPONSES=true`, `/post` returns a canned reply without calling any LLM.

### Step 3 — Fix StoragePreferences bug
`<select defaultValue>` → `<select value>`. Fix option values to match actual keys.

### Step 4 — Dependency bumps
Client: React 19, Vite 6, `@vitejs/plugin-react` 4+, `react-router-dom` 7+.
Server: `openai` v4 SDK, migrate to `chat.completions.create`.

### Step 5 — LLM provider abstraction (`server/llm.js`)
Adapter pattern: mock, openai, ollama, generic. Selected by `LLM_PROVIDER`.

### Step 6 — Direct mode fetcher (`client/src/fetcher/DirectFetcher.js`)
Browser-side fetch to any OpenAI-compatible API. Settings UI for API key + base URL.

### Step 7 — Universal serverless adapter
Shared handler exported for Vercel (`api/chat.js`), Netlify (`netlify/functions/chat.mjs`), Cloudflare Pages (`functions/api/chat.js`).
