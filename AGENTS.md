# LLM Mediator — Agent Guide

## Project
Provider-agnostic chat UI + proxy server. Supports OpenAI, Anthropic-style (via generic), Ollama, and mock modes.

## Structure
- **`client/`** — React 19 + Vite 6 SPA (ESM). HashRouter, `base: './'` for static hosting (GitHub Pages, etc.).
- **`server/`** — Express.js API (ESM). Single POST `/` proxying to LLM via `nodemon`.
- Both have independent `package.json` — `npm install` in each separately. `./setup.sh` does both.

## Commands
| Where | Script | What |
|-------|--------|------|
| server | `npm run server` | nodemon on `:5000` |
| server | `npm start` | `node server` (prod) |
| client | `npm run dev` | Vite on `:5173`, network-accessible |
| client | `npm run build` | production build → `client/dist/` |
| client | `npm run preview` | Vite preview of production build |
| client | `npm run deploy` | `vite build && npx gh-pages -d dist` |

## LLM providers (`server/.env`)
`LLM_PROVIDER` picks the adapter in `server/llm.js`:
- `openai` (default) — needs `OPENAI_API_KEY`
- `mock` — canned replies, no key needed
- `ollama` — needs `LLM_BASE_URL` (default model `llama3.2` in template)
- `generic` — needs `LLM_BASE_URL` + `LLM_API_KEY` (OpenRouter, Groq, etc.)

Also: `LLM_MODEL` (default `gpt-4o-mini`). To add a provider, add it to the `PROVIDERS` map in `server/llm.js:28`.

## Direct mode (no backend)
Client calls OpenAI-compatible APIs from the browser. Connection settings in `localStorage` key `direct_connection`. If `apiKey` is set, `DirectFetcher.js` handles the call; otherwise POSTs to `VITE_BACKEND_URL`.

## Storage
- Conversations at key `conversations`; voice prefs at `voice_preferences`.
- Engine toggled in Settings: localStorage (persistent) vs sessionStorage (per-tab). `store_type` flag in localStorage tracks choice. `moveData()` migrates data between stores on switch.

## Routing
| Path | Component |
|------|-----------|
| `#/` | Chat |
| `#/settings` | Settings (Audio, Storage, Connection) |
| `#/capabilities` | Capabilities catalog |
| `#/about` | About |

## Serverless adapters
Three handlers exporting `getBotResponse`: Vercel (`server/api/chat.js`), Netlify (`server/netlify/functions/chat.mjs`), Cloudflare Pages (`server/functions/api/chat.js`). CI (`.github/workflows/deploy-pages.yml`) builds only `client/` and deploys to GitHub Pages on push to `main`.

## Quality
- **No test framework, no linter, no typechecker.** Nothing to run for verification.
- Feature roadmap in `ROADMAP.md`. Only Chat is active; everything else is planned.

## Stale artifacts
- `ChatGPTMediator.png` at repo root — leftover from pre-rebrand. Safe to delete.
