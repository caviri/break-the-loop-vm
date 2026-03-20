# How to Use This Template

This document walks through everything you need to know to go from "I just created
a repo from this template" to a fully working dev environment with AI coding agents,
SSH access, and automated workflows.

---

## Table of contents

1. [Create a new repo from the template](#1-create-a-new-repo-from-the-template)
2. [Clone and configure](#2-clone-and-configure)
3. [Open the dev container](#3-open-the-dev-container)
4. [Understand the dev container](#4-understand-the-dev-container)
5. [Configure SSH access](#5-configure-ssh-access)
6. [Set up AI coding agents](#6-set-up-ai-coding-agents)
7. [Credential persistence](#7-credential-persistence)
8. [Port configuration for multiple projects](#8-port-configuration-for-multiple-projects)
9. [Git hooks and Conventional Commits](#9-git-hooks-and-conventional-commits)
10. [Changelog automation](#10-changelog-automation)
11. [Just recipes reference](#11-just-recipes-reference)
12. [CI and GitHub configuration](#12-ci-and-github-configuration)
13. [Customizing the template for your project](#13-customizing-the-template-for-your-project)
14. [Troubleshooting](#14-troubleshooting)

---

## 1. Create a new repo from the template

### On GitHub

1. Go to the template repo: `https://github.com/caviri/ai-ready-vm-repository-template`
2. Click **Use this template** > **Create a new repository**
3. Name your repo, choose public or private, and create it
4. Clone the new repo to your machine (or to your remote Ubuntu host)

### From the command line

```bash
gh repo create my-project --template caviri/ai-ready-vm-repository-template --clone
cd my-project
```

---

## 2. Clone and configure

### Copy the environment file

```bash
cp .env.example .env
```

### Edit `.env`

```bash
# Ports (change if running multiple containers on the same host)
SSH_PORT=2222
DEV_PORT=8888

# AI agent API keys
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
GOOGLE_API_KEY=AIza...
```

The `.env` file is gitignored and never committed. It stays local to each machine.

### Create persistence directories (first time only)

The `.devcontainer/persist/` directories should already exist with `.gitkeep` files.
If they don't (e.g., after a fresh clone on a new machine), create them:

```bash
mkdir -p .devcontainer/persist/{config,local-share,cache,pi,ssh}
```

---

## 3. Open the dev container

### Option A: VS Code local (Docker on your machine)

1. Install [Docker Desktop](https://docs.docker.com/get-docker/)
2. Install [VS Code](https://code.visualstudio.com/) + the
   [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
3. Open the repo folder in VS Code
4. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS) and run:
   **Dev Containers: Reopen in Container**
5. Wait for the container to build (first time takes a few minutes)

### Option B: Remote Ubuntu host via SSH

1. Install Docker on the Ubuntu host
2. Clone the repo on the host
3. In VS Code, connect to the host with
   [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh)
4. Open the repo folder on the remote host
5. Reopen in container (same as Option A, step 4)

### Option C: Direct SSH into the container

Once the container is running (via either option above), you can also SSH in directly:

```bash
ssh vscode@<host-or-ip> -p 2222
# Password: vscode
```

This is useful for running AI agents from a terminal without VS Code.

### What happens on first build

1. Docker builds the image from `.devcontainer/Dockerfile`
2. Docker Compose starts the container with ports and volumes from `docker-compose.yml`
3. `postStartCommand` starts the SSH server and fixes SSH key permissions
4. `postCreateCommand` runs `.devcontainer/post-create.sh`, which:
   - Installs pre-commit hooks (pre-commit + commit-msg stages)
   - Installs the post-commit hook (delegates to `just post-commit`)
   - Runs `just setup`

---

## 4. Understand the dev container

### What's installed

| Category | Tools |
|----------|-------|
| **OS** | Ubuntu 22.04 |
| **Languages** | Python 3.12, Node.js 20 |
| **Package managers** | pip, npm |
| **System tools** | git, curl, wget, jq, ripgrep, tmux, htop, nano, unzip |
| **Dev tools** | just, pre-commit, git-cliff |
| **AI agents** | Claude Code, Codex CLI, Pi, Gemini CLI |
| **Services** | OpenSSH server |

### User

The container runs as `vscode` (UID 1000) with passwordless sudo.
The default password for SSH is `vscode`.

### Workspace

Your repo is mounted at `/workspaces/<repo-name>` inside the container.

---

## 5. Configure SSH access

### Password authentication (default)

```bash
ssh vscode@<host> -p 2222
```

Password: `vscode`

### Key-based authentication

1. Copy your public key into the persist directory:

```bash
# From your client machine
ssh-copy-id -p 2222 vscode@<host>

# Or manually
cat ~/.ssh/id_ed25519.pub >> .devcontainer/persist/ssh/authorized_keys
```

2. The key persists across container rebuilds because `persist/ssh/` is bind-mounted.

### Change the default password

Inside the container:

```bash
sudo passwd vscode
```

Note: this does not persist across rebuilds. For persistent auth, use SSH keys.

### After a container rebuild

Host keys change when the container is rebuilt. On your client machine:

```bash
ssh-keygen -R "[<host>]:2222"
```

Then reconnect.

---

## 6. Set up AI coding agents

All four agents are pre-installed. You just need to authenticate.

### Claude Code

```bash
claude
# Follow the browser auth flow, or set ANTHROPIC_API_KEY in .env
```

The VS Code extension `Anthropic.claude-code` is also installed. Open the Claude Code
panel from the sidebar or command palette.

### Codex CLI

```bash
codex
# Follow the browser auth flow, or set OPENAI_API_KEY in .env
```

The VS Code extension `OpenAI.chatgpt` provides the IDE integration.

### Pi Coding Agent

```bash
pi
# Configure provider and model on first run
```

Pi supports custom provider extensions. Create them in `~/.pi/extensions/`
(persisted via `persist/pi/`).

### Gemini CLI

```bash
gemini
# Follow the browser auth flow, or set GOOGLE_API_KEY in .env
```

The VS Code companion extension `Google.gemini-cli-vscode-ide-companion` provides
IDE context to Gemini CLI when running in the integrated terminal.

### API keys via .env

If you set API keys in `.env`, they are injected into the container via Docker Compose
`env_file`. The agents pick them up automatically — no manual login needed.

```bash
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
GOOGLE_API_KEY=AIza...
```

---

## 7. Credential persistence

The template uses bind mounts to keep credentials and configs alive across
container rebuilds:

```
.devcontainer/persist/config/       →  ~/.config
.devcontainer/persist/local-share/  →  ~/.local/share
.devcontainer/persist/cache/        →  ~/.cache
.devcontainer/persist/pi/           →  ~/.pi
.devcontainer/persist/ssh/          →  ~/.ssh
```

### What persists

- Claude Code login tokens and settings
- Codex CLI auth tokens
- Gemini CLI credentials
- Pi agent config and custom provider extensions
- SSH authorized_keys and known_hosts
- pip/npm caches (faster rebuilds)

### What does NOT persist

- System packages (they're baked into the Docker image)
- The `vscode` user password (use SSH keys instead)
- Anything outside `~/.config`, `~/.local/share`, `~/.cache`, `~/.pi`, `~/.ssh`

### Security

The **contents** of `persist/` are gitignored. Only the empty directories (with
`.gitkeep`) are committed. Your credentials never enter version control.

---

## 8. Port configuration for multiple projects

If you run multiple dev containers on the same host, each needs unique ports.

### Example: three projects on one machine

**Project A** (`.env`):
```bash
SSH_PORT=2222
DEV_PORT=8888
```

**Project B** (`.env`):
```bash
SSH_PORT=2223
DEV_PORT=8889
```

**Project C** (`.env`):
```bash
SSH_PORT=2224
DEV_PORT=8890
```

### How it works

Docker Compose reads `SSH_PORT` and `DEV_PORT` from `.env` and maps them:

```yaml
ports:
  - "${SSH_PORT:-2222}:22"
  - "${DEV_PORT:-8888}:8888"
```

If `.env` is missing, defaults of `2222` and `8888` apply.

### Adding more ports

Edit `.devcontainer/docker-compose.yml` to add additional port mappings:

```yaml
ports:
  - "${SSH_PORT:-2222}:22"
  - "${DEV_PORT:-8888}:8888"
  - "${EXTRA_PORT:-3000}:3000"
```

And add `EXTRA_PORT=3000` to `.env.example` and `.env`.

---

## 9. Git hooks and Conventional Commits

### Hook chain

When you run `git commit`, three hooks fire in sequence:

1. **pre-commit** (pre-commit framework): checks trailing whitespace, valid YAML,
   no large files, no merge conflicts
2. **commit-msg** (conventional-pre-commit): validates the commit message follows
   Conventional Commits format
3. **post-commit** (just post-commit): regenerates `CHANGELOG.md` via git-cliff
   and amends the commit to include it

### Conventional Commits format

Every commit message must start with a type:

```
feat: add new feature
fix: correct a bug
docs: update documentation
refactor: restructure code without behavior change
perf: improve performance
test: add or update tests
ci: change CI configuration
chore: maintenance tasks
build: change build system
style: formatting, whitespace
revert: revert a previous commit
```

Optional scope and body:

```
feat(auth): add OAuth2 support

Implements Google and GitHub OAuth2 providers.
Closes #42.
```

### If a commit is rejected

The `commit-msg` hook will reject non-conforming messages with an error explaining
the expected format. Fix the message and commit again.

### Running hooks manually

```bash
just pre-commit    # Run all pre-commit checks
just post-commit   # Regenerate changelog and amend
just check         # Same as pre-commit
```

### Reinstalling hooks

If hooks stop working (e.g., after a `.git/hooks/` cleanup):

```bash
pre-commit install
pre-commit install --hook-type commit-msg
bash .devcontainer/post-create.sh
```

---

## 10. Changelog automation

### How it works

[git-cliff](https://git-cliff.org/) parses your Conventional Commit history and
generates a structured `CHANGELOG.md` grouped by type (Features, Bug Fixes, etc.).

The `post-commit` hook runs git-cliff after every commit and amends the commit
to include the updated changelog. This means `CHANGELOG.md` is always in sync.

### Configuration

The changelog format is controlled by `cliff.toml` at the repo root. The default
groups commits by type and sorts newest first.

### Manual regeneration

```bash
just changelog    # Regenerate without amending
```

### Version tags

When you tag a release (`git tag v1.0.0`), git-cliff groups commits under that
version. Untagged commits appear under "Unreleased".

---

## 11. Just recipes reference

| Recipe | Description |
|--------|-------------|
| `just` | List all available recipes |
| `just setup` | Run project-specific setup (placeholder) |
| `just check` | Run all pre-commit checks |
| `just pre-commit` | Same as `check` (hook-callable) |
| `just post-commit` | Regenerate changelog and amend commit |
| `just changelog` | Regenerate `CHANGELOG.md` (no amend) |
| `just test` | Run tests (placeholder — replace with your command) |
| `just format` | Run formatter (placeholder — replace with your command) |
| `just clean` | Remove `__pycache__`, `.pytest_cache`, `node_modules/.cache`, etc. |
| `just ssh-status` | Check if SSH server is running and show the mapped port |

### Customizing recipes

Edit `justfile` to add your own recipes or replace placeholders:

```just
# Replace the test placeholder
test:
    pytest -q

# Replace the format placeholder
format:
    ruff format .

# Add a new recipe
dev:
    npm run dev
```

---

## 12. CI and GitHub configuration

### GitHub Actions

`.github/workflows/ci.yml` runs on every push to `main` and on pull requests:

1. Checks out the code
2. Installs `just` and Python 3.12
3. Runs `just check` (pre-commit hooks on all files)

### Dependabot

`.github/dependabot.yml` checks weekly for updates to:
- GitHub Actions
- npm packages
- pip packages

### Issue templates

Two structured templates are provided:
- **Bug report**: description, steps to reproduce, expected vs actual behavior
- **Feature request**: problem, proposed solution, alternatives

Blank issues are disabled. All issues must use a template.

### Pull request template

The PR template includes a checklist: description, Conventional Commits compliance,
`just check` passing, tests, docs, and no secrets.

### CODEOWNERS

`.github/CODEOWNERS` assigns `@caviri` as the default reviewer. Update this with
your team's GitHub handles.

---

## 13. Customizing the template for your project

After creating a repo from this template, you'll want to customize several things:

### Must change

- [ ] **README.md**: Replace the template description with your project's
- [ ] **`.env.example`**: Add project-specific variables
- [ ] **`CODEOWNERS`**: Replace `@caviri` with your team
- [ ] **`SECURITY.md`**: Replace the placeholder email
- [ ] **`LICENSE`**: Update copyright holder if needed

### Should change

- [ ] **`justfile`**: Replace `test` and `format` placeholders with real commands
- [ ] **`CLAUDE.md` / `AGENTS.md`**: Update with your project's specific context
- [ ] **`.github/workflows/ci.yml`**: Add test steps, linting, build steps
- [ ] **`Dockerfile`**: Add project-specific dependencies

### May change

- [ ] **`.pre-commit-config.yaml`**: Add language-specific hooks (ruff, eslint, etc.)
- [ ] **`cliff.toml`**: Customize changelog format
- [ ] **`docker-compose.yml`**: Add services (database, cache, etc.)
- [ ] **`.editorconfig`**: Adjust indentation for your language

### Files to leave alone

- `.devcontainer/persist/` — managed by bind mounts
- `CHANGELOG.md` — auto-generated
- `.git/hooks/post-commit` — installed by post-create.sh

---

## 14. Troubleshooting

### Container fails to build

**Symptom**: "Reopen in Container" fails with a build error.

**Fix**:
1. Check Docker is running: `docker info`
2. Try a clean rebuild: **Dev Containers: Rebuild Container Without Cache**
3. Check `.env` exists and has valid syntax (no quotes around values)

### SSH connection refused

**Symptom**: `ssh: connect to host ... port 2222: Connection refused`

**Fix**:
1. Check the container is running: `docker ps`
2. Check sshd is running inside the container: `just ssh-status`
3. Check your `SSH_PORT` in `.env` matches the port you're connecting to
4. If another container uses the same port, change `SSH_PORT` in `.env` and rebuild

### Host key verification failed

**Symptom**: `WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED`

**Fix**: This happens after a container rebuild. Clear the old key:
```bash
ssh-keygen -R "[<host>]:2222"
```

### Pre-commit hooks not running

**Symptom**: Commits go through without checks.

**Fix**: Reinstall hooks:
```bash
pre-commit install
pre-commit install --hook-type commit-msg
```

The post-commit hook is a separate file:
```bash
bash .devcontainer/post-create.sh
```

### AI agent can't authenticate

**Symptom**: `claude` or `codex` asks for login every time.

**Fix**:
1. Check that `persist/config/` is mounted: `ls ~/.config`
2. If empty, the bind mount may have failed. Rebuild the container.
3. Alternatively, set the API key in `.env` to skip browser auth entirely.

### Changelog not updating

**Symptom**: `CHANGELOG.md` stays the same after commits.

**Fix**:
1. Check git-cliff is installed: `git-cliff --version`
2. Check `cliff.toml` exists at the repo root
3. Check the post-commit hook exists: `cat .git/hooks/post-commit`
4. Try manual regeneration: `just changelog`

### Ports already in use

**Symptom**: `Bind for 0.0.0.0:2222 failed: port is already allocated`

**Fix**: Another container or service is using that port. Change `SSH_PORT` or
`DEV_PORT` in `.env` to an unused port and rebuild.
