# Project Context

## Overview

This is a repository template providing a reproducible Ubuntu-based dev environment
with pre-installed AI coding agents (Claude Code, Codex, Pi, Gemini CLI),
SSH access, and credential persistence across container rebuilds.

The main creative work happens in `src/` — p5.js poster canvases and a library
of p5.js examples covering introduction, graphics, animation, and shaders.

## Structure

```
.devcontainer/              Dev container config (Dockerfile, Compose, hooks)
.devcontainer/persist/      Bind-mounted credential/config storage (gitignored contents)
.github/                    CI workflows, issue templates, PR template, CODEOWNERS
src/                        Source code (see below for detail)
  serve.sh                  Dev server — serves any src/ subfolder on port 8080
  canvas/                   Poster canvas (p5.js, 1080×1440)
  posters/                  Poster canvas (p5.js, 1080×1440) — working copy
  2_examples/               p5.js example collection with dashboard server
tests/                      Tests
docs/                       Documentation (empty, placeholder)
scripts/                    Helper scripts
```

## Source Code (`src/`)

### Poster Canvas (`src/canvas/` and `src/posters/`)

p5.js sketch for creating poster-sized artwork at 1080 × 1440 px.

| File         | Purpose                                        |
|--------------|------------------------------------------------|
| `index.html` | HTML shell — loads p5.js, panels.js, sketch.js |
| `sketch.js`  | p5.js sketch — artwork goes here               |
| `panels.js`  | Help & info overlay panels (pure DOM, no p5)   |
| `style.css`  | Dark background, centered layout, panel styles |
| `p5.min.js`  | p5.js library (local copy)                     |
| `README.md`  | Detailed docs for shortcuts, panels, usage     |

**Architecture:** `sketch.js` contains only p5.js lifecycle functions (`setup`, `draw`,
`keyPressed`). All overlay UI is in `panels.js` — a self-contained `Panels` module
using pure DOM manipulation with zero p5 dependency. `sketch.js` bridges to it via
`Panels.init()`, `Panels.update(data)`, `Panels.toggleHelp()`, `Panels.toggleInfo()`.

The overlay panels are HTML elements fixed to browser window corners (not drawn on canvas),
so saved PNGs are always clean.

**Canvas properties:**
- Dimensions: `POSTER_W` × `POSTER_H` (default 1080 × 1440, configurable in sketch.js)
- Color mode: RGB 0-255 (switch with `colorMode(HSB)` in setup)
- Renderer: P2D (switch to WEBGL in `createCanvas()` for 3D)
- Pixel density: matches device; override with `pixelDensity(1)`
- Output: PNG via `save()`

**Keyboard shortcuts:**

| Key | Action                 |
|-----|------------------------|
| `S` | Save canvas as PNG     |
| `H` | Toggle help panel      |
| `I` | Toggle info panel      |
| `C` | Clear canvas (white)   |
| `B` | Clear canvas (black)   |
| `R` | Randomize background   |

**Info panel** (bottom-right window corner) shows in real time:
canvas size, mouse coords, pixel coords, RGB, hex color, alpha, frame/FPS, pixel density,
plus a color swatch.

### Examples (`src/2_examples/`)

Organized p5.js examples with a Python dashboard server.

```
2_examples/
  start.sh              Start/stop the examples server (port 8080)
  server.py             Python HTTP server with dashboard
  1_introduction/       Hello world, p5-start, p5-basis, functions, content loading
  2_p5js/               Variables, logic (if/for), easing, save image/video
  3_graphics/           HTML print posters, SVG export, riso graphics, opentype,
                        pixel-reading animations, text-to-points
  4_animation/          Motion, easing, randomness, tricks, helpers,
                        video/GIF export, GLSL shaders (basic, uniforms, images, layers)
  p5-example/           Standalone p5 example template
```

### Dev Server (`src/serve.sh`)

Serves any `src/` subfolder over HTTP.

```bash
src/serve.sh canvas          # serve src/canvas/ on port 8080
src/serve.sh posters         # serve src/posters/ on port 8080
src/serve.sh 2_examples      # serve examples (uses server.py dashboard)
src/serve.sh list            # list available folders
src/serve.sh canvas stop     # stop server on port 8080
```

- Port configurable via `SERVE_PORT` env var (default 8080)
- Uses `exec` so Ctrl+C cleanly kills the server
- If the subfolder has a `server.py`, uses that; otherwise `python3 -m http.server`

## Commands

All project commands go through `just`:

- `just check` — run pre-commit hooks on all files
- `just pre-commit` — alias for `check`
- `just test` — run tests (placeholder)
- `just format` — run formatter (placeholder)
- `just changelog` — regenerate CHANGELOG.md
- `just clean` — remove temp files (`__pycache__`, `.pytest_cache`, `dist`, `build`, etc.)
- `just ssh-status` — check SSH server status and port
- `just post-commit` — regenerate CHANGELOG and amend (called by git hook, not manually)

## Conventions

- **Commits**: Conventional Commits required (`feat:`, `fix:`, `docs:`, `refactor:`, `perf:`, `test:`, `ci:`, `chore:`, `build:`, `style:`, `revert:`)
- **Line endings**: LF
- **Indentation**: 4 spaces (general), 2 spaces (YAML/JSON)
- **Changelog**: auto-generated by git-cliff on every commit
- **Pre-commit hooks**: trailing whitespace, end-of-file fixer, YAML check, merge conflict check, conventional commit message validation

## Do not modify

- `.devcontainer/persist/` contents — credential storage, bind-mounted at runtime
- `CHANGELOG.md` — auto-generated by git-cliff
- `.git/hooks/post-commit` — installed by post-create.sh, delegates to `just post-commit`
- `p5.min.js` — vendored p5.js library, do not edit

## Environment

- Ubuntu 22.04 container
- Python 3.12, Node 20
- SSH on port 22 (mapped to host via `SSH_PORT` in `.env`)
- API keys loaded from `.env` via Docker Compose `env_file`
- Dev server on port 8080 (configurable via `SERVE_PORT`)
