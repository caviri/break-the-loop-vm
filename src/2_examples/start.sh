#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PORT="${EXAMPLES_PORT:-8080}"

case "${1:-start}" in
    start)
        echo "Starting examples server on port ${PORT}..."
        exec python3 "${SCRIPT_DIR}/server.py"
        ;;
    stop)
        PID=$(ss -tlnp "sport = :${PORT}" 2>/dev/null \
              | grep -oP 'pid=\K[0-9]+' | head -1 || true)
        if [ -z "$PID" ]; then
            PID=$(lsof -ti "tcp:${PORT}" 2>/dev/null || true)
        fi
        if [ -z "$PID" ]; then
            PID=$(fuser "${PORT}/tcp" 2>/dev/null || true)
        fi
        PID=$(echo "$PID" | xargs)
        if [ -n "$PID" ]; then
            kill $PID 2>/dev/null || kill -9 $PID 2>/dev/null || true
            echo "Stopped server (pid ${PID}) on port ${PORT}."
        else
            echo "No server running on port ${PORT}."
        fi
        ;;
    *)
        echo "Usage: $0 {start|stop}"
        exit 1
        ;;
esac
