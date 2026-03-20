# Contributing

Thanks for your interest in contributing! Here's how to get started.

## Getting started

1. Fork and clone the repository
2. Open in VS Code and reopen in the dev container
3. Copy `.env.example` to `.env` and fill in your API keys
4. The `post-create.sh` script will set up git hooks automatically

## Development workflow

```bash
just check      # Run all pre-commit checks
just test       # Run tests
just format     # Run formatter
just changelog  # Regenerate changelog
```

## Commit messages

This project uses [Conventional Commits](https://www.conventionalcommits.org/).
All commit messages must follow this format:

```
type(optional-scope): description

[optional body]
```

Allowed types: `feat`, `fix`, `docs`, `refactor`, `perf`, `test`, `ci`, `chore`, `build`, `style`, `revert`

Examples:

```
feat: add user authentication
fix(api): handle timeout errors
docs: update README with SSH instructions
chore: update dependencies
```

The `commit-msg` hook will reject non-conforming messages.

## Pull requests

1. Create a feature branch from `main`
2. Make your changes following Conventional Commits
3. Run `just check` to verify everything passes
4. Push and open a pull request
5. Fill out the PR template

## Code of conduct

Be respectful and constructive. We're all here to build something useful.
