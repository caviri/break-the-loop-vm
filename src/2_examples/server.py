#!/usr/bin/env python3
"""
Example browser server.

Serves a dashboard that lists all p5.js / HTML examples in src/2_examples/
and lets you open any of them in the browser.
"""

import http.server
import json
import os
import socketserver
from pathlib import Path
from urllib.parse import quote, unquote

PORT = int(os.environ.get("EXAMPLES_PORT", 8080))
BASE_DIR = Path(__file__).resolve().parent


def discover_examples() -> dict[str, list[dict]]:
    """Walk the examples tree and return categories with their examples."""
    categories: dict[str, list[dict]] = {}
    for index_html in sorted(BASE_DIR.rglob("index.html")):
        rel = index_html.relative_to(BASE_DIR)
        parts = rel.parts
        if len(parts) < 2:
            continue
        category = parts[0]
        name = "/".join(parts[1:-1])  # strip leading category and trailing index.html
        if not name:
            continue
        categories.setdefault(category, []).append({
            "name": name,
            "path": str(rel.parent),
        })
    return dict(sorted(categories.items()))


DASHBOARD_HTML = """\
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Examples Dashboard</title>
<style>
  :root {
    --bg: #0e1117;
    --card: #161b22;
    --border: #30363d;
    --text: #e6edf3;
    --muted: #8b949e;
    --accent: #58a6ff;
    --accent-hover: #79c0ff;
    --cat-1: #f78166;
    --cat-2: #d2a8ff;
    --cat-3: #7ee787;
    --cat-4: #ffa657;
    --cat-5: #ff7b72;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    padding: 2rem;
  }
  header {
    max-width: 960px;
    margin: 0 auto 2rem;
  }
  header h1 {
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: .25rem;
  }
  header p { color: var(--muted); font-size: .9rem; }
  .search-bar {
    max-width: 960px;
    margin: 0 auto 1.5rem;
  }
  .search-bar input {
    width: 100%;
    padding: .65rem 1rem;
    border-radius: 6px;
    border: 1px solid var(--border);
    background: var(--card);
    color: var(--text);
    font-size: .95rem;
    outline: none;
    transition: border-color .15s;
  }
  .search-bar input:focus { border-color: var(--accent); }
  .category {
    max-width: 960px;
    margin: 0 auto 2rem;
  }
  .category-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: .75rem;
    padding-left: .25rem;
    display: flex;
    align-items: center;
    gap: .5rem;
  }
  .category-title .dot {
    width: 10px; height: 10px;
    border-radius: 50%;
    display: inline-block;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: .75rem;
  }
  .card {
    display: block;
    padding: .85rem 1rem;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 8px;
    text-decoration: none;
    color: var(--text);
    transition: border-color .15s, transform .1s;
  }
  .card:hover {
    border-color: var(--accent);
    transform: translateY(-1px);
  }
  .card .card-name {
    font-weight: 500;
    font-size: .95rem;
    margin-bottom: .2rem;
  }
  .card .card-path {
    color: var(--muted);
    font-size: .75rem;
    font-family: 'SF Mono', SFMono-Regular, Consolas, monospace;
  }
  .hidden { display: none !important; }
  .empty-msg {
    max-width: 960px;
    margin: 2rem auto;
    text-align: center;
    color: var(--muted);
    display: none;
  }
</style>
</head>
<body>
<header>
  <h1>p5.js Examples</h1>
  <p>Click any card to open the example. Served from <code>src/2_examples/</code></p>
</header>
<div class="search-bar">
  <input type="text" id="search" placeholder="Filter examples..." autofocus>
</div>
<div id="content"></div>
<div class="empty-msg" id="empty">No examples match your search.</div>
<script>
const EXAMPLES = __EXAMPLES_JSON__;
const COLORS = ['var(--cat-1)','var(--cat-2)','var(--cat-3)','var(--cat-4)','var(--cat-5)'];
const content = document.getElementById('content');
const emptyMsg = document.getElementById('empty');

function render(filter) {
  content.innerHTML = '';
  let total = 0;
  Object.keys(EXAMPLES).forEach((cat, ci) => {
    const items = EXAMPLES[cat].filter(e =>
      !filter || e.name.toLowerCase().includes(filter) || cat.toLowerCase().includes(filter)
    );
    if (!items.length) return;
    total += items.length;
    const section = document.createElement('div');
    section.className = 'category';
    section.innerHTML = `<div class="category-title">
      <span class="dot" style="background:${COLORS[ci % COLORS.length]}"></span>
      ${cat.replace(/_/g, ' ')}
    </div>`;
    const grid = document.createElement('div');
    grid.className = 'grid';
    items.forEach(ex => {
      const a = document.createElement('a');
      a.className = 'card';
      a.href = '/' + ex.path + '/index.html';
      a.target = '_blank';
      a.innerHTML = `<div class="card-name">${ex.name.replace(/[-_]/g, ' ')}</div>
        <div class="card-path">${ex.path}/</div>`;
      grid.appendChild(a);
    });
    section.appendChild(grid);
    content.appendChild(section);
  });
  emptyMsg.style.display = total ? 'none' : 'block';
}

document.getElementById('search').addEventListener('input', e => {
  render(e.target.value.toLowerCase().trim());
});
render('');
</script>
</body>
</html>
"""


class ExampleHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(BASE_DIR), **kwargs)

    def do_GET(self):
        if self.path == "/" or self.path == "/index.html":
            self.send_dashboard()
            return
        if self.path == "/api/examples":
            self.send_json(discover_examples())
            return
        super().do_GET()

    def send_dashboard(self):
        examples = discover_examples()
        html = DASHBOARD_HTML.replace("__EXAMPLES_JSON__", json.dumps(examples))
        body = html.encode()
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def send_json(self, data):
        body = json.dumps(data, indent=2).encode()
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, format, *args):
        print(f"  {self.address_string()} - {format % args}")


class ReusableTCPServer(socketserver.TCPServer):
    allow_reuse_address = True
    allow_reuse_port = True

    def server_bind(self):
        import socket
        self.socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        try:
            self.socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEPORT, 1)
        except (AttributeError, OSError):
            pass
        super().server_bind()


def main():
    with ReusableTCPServer(("", PORT), ExampleHandler) as httpd:
        print(f"\n  Examples server running at http://localhost:{PORT}")
        print(f"  Serving from: {BASE_DIR}")
        print(f"  API endpoint:  http://localhost:{PORT}/api/examples")
        print(f"\n  Press Ctrl+C to stop.\n")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n  Shutting down.")


if __name__ == "__main__":
    main()
