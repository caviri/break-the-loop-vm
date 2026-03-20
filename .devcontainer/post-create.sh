#!/usr/bin/env bash
set -e

# Bind mounts may set ~/.local ownership to root; reclaim it.
sudo chown vscode:vscode "$HOME/.local" 2>/dev/null || true
mkdir -p "$HOME/.local/bin" "$HOME/.local/state"

# Claude binary persists in ~/.local/share (bind-mounted) across rebuilds.
# Only the symlink in ~/.local/bin needs recreating.
if ! [ -x "$HOME/.local/bin/claude" ]; then
    existing=$(ls -1 "$HOME/.local/share/claude/versions/"* 2>/dev/null | head -1)
    if [ -n "$existing" ] && [ -x "$existing" ]; then
        echo "Re-linking persisted Claude binary..."
        ln -sf "$existing" "$HOME/.local/bin/claude"
    else
        echo "Installing Claude Code CLI..."
        curl -fsSL https://claude.ai/install.sh | bash
    fi
fi

# Install pre-commit framework hooks (pre-commit + commit-msg stages)
if [ -f .pre-commit-config.yaml ]; then
    pre-commit install
    pre-commit install --hook-type commit-msg
fi

# Install post-commit hook that delegates to justfile
mkdir -p .git/hooks
cat > .git/hooks/post-commit << 'HOOK'
#!/usr/bin/env bash
export PATH="$HOME/.npm-global/bin:$PATH"
just post-commit
HOOK
chmod +x .git/hooks/post-commit

# Run project setup
[ -f justfile ] && just setup || true
