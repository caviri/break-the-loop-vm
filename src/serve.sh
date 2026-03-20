#!/usr/bin/env bash
set -euo pipefail

SRC_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PORT="${SERVE_PORT:-8080}"

usage() {
    echo "Usage: $0 <folder> [start|stop]"
    echo ""
    echo "  folder   Subfolder inside src/ to serve (or 'list' to show available)"
    echo "  start    Start the server (default)"
    echo "  stop     Stop the server running on port ${PORT}"
    echo ""
    echo "Examples:"
    echo "  $0 canvas"
    echo "  $0 2_examples"
    echo "  $0 canvas stop"
    echo "  $0 list"
    echo ""
    echo "Port can be set via SERVE_PORT (default: 8080)"
}

list_folders() {
    echo "Available folders in src/:"
    for dir in "${SRC_DIR}"/*/; do
        [ -d "$dir" ] && echo "  $(basename "$dir")"
    done
}

stop_server() {
    local PID
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
}

if [ $# -lt 1 ]; then
    usage
    exit 1
fi

FOLDER="$1"
ACTION="${2:-start}"

if [ "$FOLDER" = "list" ]; then
    list_folders
    exit 0
fi

TARGET_DIR="${SRC_DIR}/${FOLDER}"

if [ ! -d "$TARGET_DIR" ]; then
    echo "Error: folder '${FOLDER}' not found in src/"
    echo ""
    list_folders
    exit 1
fi

case "$ACTION" in
    start)
        # If the folder has its own server.py, use it; otherwise use python http.server
        if [ -f "${TARGET_DIR}/server.py" ]; then
            echo "Serving '${FOLDER}' via server.py on http://localhost:${PORT}"
            cd "$TARGET_DIR"
            exec python3 "${TARGET_DIR}/server.py"
        else
            echo "Serving '${FOLDER}' on http://localhost:${PORT}"
            cd "$TARGET_DIR"
            exec python3 -m http.server "$PORT"
        fi
        ;;
    stop)
        stop_server
        ;;
    *)
        usage
        exit 1
        ;;
esac
