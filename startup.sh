#!/bin/sh
set -eu
cd /workspace
if curl -sf -o /dev/null --max-time 2 http://127.0.0.1:8080/; then
  exit 0
fi
# Prefer the HiredFrex publication preview (vanilla site + job portal).
if [ -f /workspace/scripts/serve-hiredfrex.mjs ]; then
  node /workspace/scripts/serve-hiredfrex.mjs >>/tmp/app-startup.log 2>&1 &
  exit 0
fi
node scripts/preview.mjs stop || true
npm run dev >>/tmp/app-startup.log 2>&1 &
