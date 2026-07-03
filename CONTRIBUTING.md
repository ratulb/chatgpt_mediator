# Contributing

## Getting started

1. Fork and clone the repo
2. Run `./setup.sh` to install dependencies
3. Create a branch: `git checkout -b feature/your-feature`

## Development

```bash
# Start both server and client in separate terminals
cd server && npm run server
cd client && npm run dev
```

## Project structure

- `client/` — React + Vite SPA
- `server/` — Express.js API
- Adding a new LLM provider? Add it to `server/llm.js` adapter map
- Adding a new capability? Add it to `client/src/components/navbar/menuitems/Capabilities.jsx` data array

## Before submitting

- Verify the client builds: `cd client && npm run build`
- There is no test framework or linter configured — just make sure the code runs

## Pull requests

- Keep changes focused — one feature or fix per PR
- Update `ROADMAP.md` if you add a capability
- Update `AGENTS.md` if you add commands, dependencies, or change the project structure
