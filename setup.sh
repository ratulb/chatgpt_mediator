#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"

echo "==> Checking for Node.js and npm..."
if ! command -v node &>/dev/null; then
  echo "ERROR: Node.js is not installed."
  echo "  Install it via your package manager:"
  echo "    Ubuntu/Debian:  sudo apt install nodejs npm"
  echo "    macOS:          brew install node"
  echo "  Or use nvm (recommended):  https://github.com/nvm-sh/nvm"
  exit 1
fi

echo "  node $(node -v)"
echo "  npm  $(npm -v)"

echo ""
echo "==> Installing server dependencies..."
cd "$ROOT/server"
cp -n .env.Example .env 2>/dev/null || true
npm install

echo ""
echo "==> Installing client dependencies..."
cd "$ROOT/client"
cp -n .env.Example .env 2>/dev/null || true
npm install

echo ""
echo "================================================================="
echo "  Setup complete!"
echo ""
echo "  Start the server (in one terminal):"
echo "    cd server && npm run server"
echo ""
echo "  Start the client (in another terminal):"
echo "    cd client && npm run dev"
echo ""
echo "  Then open http://localhost:5173"
echo ""
echo "  No API key? Set LLM_PROVIDER=mock in server/.env"
echo "================================================================="
