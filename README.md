# LLM Mediator

A lightweight, provider-agnostic layer between users and any large language model — OpenAI, Anthropic, open-weight models, or whatever comes next.

---

## Quick start

### Automated setup

```bash
./setup.sh
```

### Manual setup

```bash
# 1. Server (backend)
cd server
cp .env.Example .env
npm install
npm run server       # nodemon on :5000

# 2. Client (frontend)
cd client
npm install
npm run dev          # Vite on :5173
```

**No API key?** Set `LLM_PROVIDER=mock` in `server/.env` — returns canned replies, no key needed.

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

The client can call LLM APIs directly from the browser. Open **Settings > Connection**, switch to **Direct mode**, and enter your API key, base URL, model, and optional system prompt. Works on any static host (GitHub Pages, etc.).

Your API key is stored in browser `localStorage` and goes directly to the provider you configure — it is never sent to any intermediary server.

---

## Features

### Chat interface
- Multi-provider chat (switch via Connection settings)
- Keyboard shortcuts: `Enter` sends, `Shift+Enter` inserts a newline
- Message actions: resubmit, delete, copy, replay with speech
- Abort in-progress requests

### Voice (speech-to-text)
- Built-in browser `SpeechRecognition` API — free, no API key needed
- Voice commands for punctuation and editing
- Configurable language

### Speech synthesis (text-to-speech)
- Bot responses read aloud with typing animation
- Configurable voice, volume, pitch, and rate

### Connection management
- Backend proxy mode (default) or direct browser-to-LLM mode
- Temperature, max tokens, and system prompt configuration
- Bring your own API key — nothing stored server-side

### Conversation persistence
- Saved automatically to `localStorage` or `sessionStorage`
- Toggle storage engine in Settings — data migrates when you switch
- Previous conversations restored on page reload

### File upload
- Upload `.txt` files — content is inserted into the input box

---

## Deployment

| Host | Mode | What to deploy |
|------|------|----------------|
| Render / Railway / Fly | Backend | `server/` — run `node server` |
| Vercel | Backend | `server/api/` + `client/` |
| Netlify | Backend | `server/netlify/functions/` + `client/` |
| Cloudflare Pages | Backend | `server/functions/` + `client/` |
| GitHub Pages | Direct only | `client/` (see below) |

This app uses `HashRouter` and relative asset paths (`base: './'`), so it works on GitHub Pages with zero server config.

### GitHub Pages (automated)

Push to `main` — the workflow in `.github/workflows/deploy-pages.yml` builds and deploys `client/` automatically. Enable it in your repo Settings > Pages (source: GitHub Actions).

### GitHub Pages (one-time)

```bash
cd client
npm run deploy
```

---

## Routes

| Path | Page |
|------|------|
| `#/` | Chat |
| `#/settings` | Settings (Audio, Storage, Connection) |
| `#/capabilities` | Capabilities catalog |
| `#/about` | About |

---

## Project structure

```
client/              React + Vite SPA
  src/
    components/      UI components (chat, bot, voice, settings)
    fetcher/         API fetchers (DirectFetcher, backend proxy)
    assets/          Images and icons
server/              Express.js API
  server.js          Entrypoint
  llm.js             Provider abstraction (mock, openai, ollama, generic)
  api/chat.js        Vercel serverless handler
  netlify/functions/ Netlify serverless handler
  functions/         Cloudflare Pages handler
```

---

## License

GNU AGPL v3
