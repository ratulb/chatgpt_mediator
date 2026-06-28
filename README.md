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

---

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

## Features

### Chat interface
- User and bot profile avatars
- **Keyboard shortcuts**: `Enter` sends, `Shift+Enter` inserts a newline
- Empty query validation with custom tooltip
- Scrollable chat history with auto-scroll on new messages

### Voice recognition (speech-to-text)
- Built-in browser `SpeechRecognition` API — **free, no API key needed**
- Works in Chrome, Edge, and Safari
- Voice commands: say *"comma"*, *"full stop"*, *"question mark"* to punctuate
- Edit commands: *"Delete all"*, *"Delete last"*, *"Delete first"*
- Language setting from voice preferences (default: en-US)
- Automatic sentence capitalization and question detection

### Speech synthesis (text-to-speech)
- Bot responses read aloud with **typing animation** — text appears as it's spoken
- Animated sound waves during speech
- Configurable **voice, volume, pitch, and rate** in Settings > Audio
- Toggle speech on/off with speaker icon
- **Replay** button to re-read any bot response
- Speech auto-cancels when navigating away

### Message management
- **Abort** in-progress requests
- **Resubmit** any user prompt (copies it back to the input box)
- **Delete** individual messages (user or bot)
- **Copy** bot responses to clipboard
- Messages classified by type: normal, aborted, ambiguous, communication failure

### Conversation persistence
- Conversations saved automatically to **localStorage** or **sessionStorage**
- Toggle storage engine in Settings > Storage
- Data migrates between stores when you switch
- Previous conversations restored on page reload

### File upload
- Upload **.txt files** — content is inserted into the input box

### Settings
- **Audio**: select system voice, adjust volume/pitch/rate sliders
- **Storage**: choose between localStorage (persistent) and sessionStorage (per-tab)
- **Connection**: switch between backend-proxy mode and direct browser-to-LLM mode, configure API key, base URL, and model

### Deployment modes
- **Express backend** — traditional Node.js server (Render, Railway, Fly)
- **Serverless functions** — Vercel, Netlify, Cloudflare Pages
- **Direct/static** — no backend at all, works on GitHub Pages

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

## Routes (client)

| Path | Page | Component |
|------|------|-----------|
| `#/` | Chat | Main conversation interface |
| `#/settings` | Settings | Audio, Storage, and Connection preferences |
| `#/actions` | Actions | Placeholder |
| `#/about` | About | About page |

---

## Project structure

```
client/              React + Vite SPA
  src/
    components/
      Chat.jsx           Main chat interface
      UserPrompt.jsx     User message bubble (resubmit, delete)
      SavedConversations.jsx  Restore previous chats
      bot/               Bot response rendering pipeline
        Bot.jsx               Orchestrator (fetch, loading, done)
        InprogressRequest.jsx Loading state with abort
        ResponseHandler.jsx   Speech → final display
        InitialRender.jsx     First render with speech + waves
        FinalRender.jsx       Final message (copy, replay, delete)
        WavySpeaker.jsx       Animated waves during speech
        WavesAndText.jsx      Text + wave animation
        AbortedRequest.jsx    Cancelled request display
      speaker/           Speech synthesis engine
        SpeechSynthesizer.jsx  Browser SpeechSynthesis wrapper
        Waves.jsx             CSS wave animation
        Constants.jsx         Default voice settings
      voicerecognition/  Speech-to-text
        VRButton.jsx          Microphone toggle + voice commands
      navbar/            Navigation
        Navbar.jsx
        menuitems/       Route pages (Home, Settings, Actions, About)
          settings/      Settings tabs (Audio, Storage, Connection)
      common/            Shared utilities
        Fetcher.jsx           Backend API caller
        StorageUtil.js        localStorage/sessionStorage manager
        Typer.jsx             Typing animation
        Loader.jsx            Loading spinner
        Tooltip.jsx           Hover tooltips
        useFetch.jsx          Generic fetch hook
        ProfiledMsgTemplate.jsx  Message layout wrapper
        UploadHelper.jsx      Text file upload
    fetcher/
      DirectFetcher.js   Browser-side OpenAI-compatible API caller

server/                Express.js API
  server.js            Express entrypoint
  llm.js               LLM provider abstraction (mock, openai, ollama, generic)
  api/chat.js          Vercel serverless handler
  netlify/functions/   Netlify serverless handler
  functions/           Cloudflare Pages handler
```
