# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly.

**Do not open a public issue.**

Instead, please email: **[your-email@example.com]**

Include:
- A description of the vulnerability
- Steps to reproduce (if applicable)
- The potential impact

## Response timeline

- **Acknowledgment**: within 48 hours
- **Initial assessment**: within 1 week
- **Fix or mitigation**: as soon as reasonably possible

## Scope

This policy covers the repository template itself, including:
- Dockerfile and devcontainer configuration
- Git hooks and automation scripts
- GitHub Actions workflows

## Credential safety

This template stores credentials in `.devcontainer/persist/` which is gitignored.
Never commit API keys, tokens, or passwords to the repository.
