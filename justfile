set shell := ["bash", "-cu"]

# List available commands
default:
    @just --list

# Run project-specific setup (extend as needed)
setup:
    @echo "Setup complete. Extend this recipe for project-specific initialization."

# Run all pre-commit checks
check:
    pre-commit run --all-files

# Run pre-commit checks (alias for check, callable from hooks)
pre-commit:
    pre-commit run --all-files

# Auto-update CHANGELOG.md and amend commit (called by post-commit hook)
post-commit:
    #!/usr/bin/env bash
    if command -v git-cliff &> /dev/null && [ -f cliff.toml ]; then
        git-cliff -o CHANGELOG.md
        git add CHANGELOG.md
        if ! git diff --cached --quiet CHANGELOG.md 2>/dev/null; then
            git commit --amend --no-edit --no-verify
        fi
    fi

# Regenerate CHANGELOG.md from git history (no amend)
changelog:
    git-cliff -o CHANGELOG.md

# Run tests (placeholder — replace with your test command)
test:
    @echo "No test runner configured. Replace this recipe with your test command."

# Run formatter (placeholder — replace with your format command)
format:
    @echo "No formatter configured. Replace this recipe with your format command."

# Remove common temp and cache files
clean:
    rm -rf __pycache__ .pytest_cache .mypy_cache .ruff_cache
    rm -rf node_modules/.cache dist build *.egg-info
    @echo "Cleaned."

# Check if SSH server is running and show port
ssh-status:
    #!/usr/bin/env bash
    if ss -lnt 2>/dev/null | grep -q ':22 '; then
        echo "SSH server is running on container port 22"
        if [ -f .env ]; then
            SSH_PORT=$(grep -oP 'SSH_PORT=\K.*' .env 2>/dev/null || echo "2222")
            echo "Mapped to host port: ${SSH_PORT:-2222}"
        else
            echo "Mapped to host port: 2222 (default)"
        fi
    else
        echo "SSH server is not running."
        echo "It should start automatically via postStartCommand."
    fi
