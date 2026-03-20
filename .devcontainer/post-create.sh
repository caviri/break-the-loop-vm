#!/usr/bin/env bash
set -e

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
