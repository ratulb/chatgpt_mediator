# LLM Mediator — Agent Guide

## Project
A lightweight, provider-agnostic layer between users and any LLM (OpenAI, Anthropic, open-weight models). Born in the weeks after ChatGPT's launch; revived as a multi-provider, multi-operation platform.

## Structure
- **`client/`** — React 19 + Vite 6 SPA (ESM). HashRouter, `base: './'` for static hosting.
- **`server/`** — Express.js API (ESM). Single POST `/` proxying to LLM. `nodemon` for dev.
- Both have independent `package.json`. Run `npm install` in each separately.

## Setup
```bash
cp client/.env.Example client/.env         # VITE_BACKEND_URL=http://localhost:5000
cp server/.env.Example server/.env         # set LLM_PROVIDER / keys
./setup.sh                                  # or: server && npm install && npm run server
                                            #     client && npm install && npm run dev
```

## Commands
| Where | Script | What |
|-------|--------|------|
| server | `npm run server` | nodemon on `:5000` |
| server | `npm start` | `node server` (prod) |
| client | `npm run dev` | Vite on `:5173`, network-accessible |
| client | `npm run build` | production build → `client/dist/` |
| client | `npm run deploy` | `vite build && gh-pages -d dist` |

## LLM providers (`server/.env`)
`LLM_PROVIDER` selects the backend adapter: `openai` (default, needs `OPENAI_API_KEY`), `mock` (canned replies, no key), `ollama` (needs `LLM_BASE_URL`), `generic` (needs `LLM_BASE_URL` + `LLM_API_KEY`). Additional: `LLM_MODEL` (default `gpt-4o-mini`).

## Direct mode (no backend)
Client calls OpenAI-compatible APIs directly from the browser. Enabled in Settings > Connection. Connection settings stored in `localStorage` under key `direct_connection`. Fetcher auto-detects: if `direct_connection.apiKey` is set, delegates to `DirectFetcher.js`; else POSTs to `VITE_BACKEND_URL`.

## Serverless adapters
Three nearly-identical handlers exporting `getBotResponse` for Vercel (`server/api/chat.js`), Netlify (`server/netlify/functions/chat.mjs`), Cloudflare Pages (`server/functions/api/chat.js`). CI (`.github/workflows/deploy-pages.yml`) builds `client/` only and deploys to GitHub Pages on push to `main`.

## Storage
- Conversations at key `conversations`; voice prefs at `voice_preferences`.
- Engine toggled in Settings (Storage): localStorage (persistent) vs sessionStorage (per-tab). `store_type` flag in localStorage tracks the choice. `moveData()` migrates on switch.

## Quality
- **No test framework, no linter, no typechecker.** Nothing to run for verification.
- `Capabilities` page is a categorized catalog of LLM operations (all disabled except Chat — see roadmap below).

## Routing
| Path | Component |
|------|-----------|
| `#/` | Chat |
| `#/settings` | Settings (Audio, Storage, Connection) |
| `#/capabilities` | Capabilities catalog (roadmap) |
| `#/about` | About |

## Implementation roadmap

### Phase 0 — Prerequisites
- Add MIT `LICENSE`
- Rename GitHub repo `chatgpt_mediator` → `llm_mediator` (user action)

### Phase 1 — Identity (done)
- Rebranded source: `<title>`, navbar brand, About page, package names, nav label → "CAPABILITIES"
- About page: three-block structure (vision / what it does / genesis)

### Phase 2 — Capabilities catalog (done)
- Data-driven grid component with categories: Text, Knowledge & Retrieval, Multimodal, Agentic, Governance
- Only Chat enabled; all others show "Available in a future update"
- Route updated from `/actions` to `/capabilities`

### Phase 3 — Connection expansion (deferred)
- Add temperature, maxTokens, systemPrompt to ConnectionSettings UI
- Centralize user-facing strings in `constants.js`
- Add BYOK trust note

### Phase 4 — Repo polish (pending)
- Overhaul `README.md`
- Add `ROADMAP.md`, `CONTRIBUTING.md`
- Replace ChatGPT-specific favicon and bot image
- GitHub Pages deploy already automated via CI

### Phase 5 — Developer UX (future)
- Streaming responses, conversation export, compare-models mode
