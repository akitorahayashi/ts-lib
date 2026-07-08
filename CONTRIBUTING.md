# Contributing

## Scope

This repository owns:

- `src/` — public exports, feature modules, library errors, and colocated unit tests
- `tests/` — integration tests run with Bun
- `tests-node/` — Node.js consumer tests against the built `dist/`
- `.github/workflows/` — CI automation

## Testing Policy

- Unit tests live next to source files under `src/` and test pure transformations.
- Integration tests live under `tests/` and test filesystem, CLI, subprocess, or network behavior.
- Node consumer tests live under `tests-node/` and import the built `dist/` output to verify Node.js compatibility.

## Workflow

1. Run `bun run fix` before committing.
2. Run `bun run check` to verify lint and types.
3. Run `bun test` to verify behavior.
4. Run `bun run build` and `bun run test:node` to verify the built package runs on Node.js.

See [AGENTS.md](AGENTS.md) for development commands, architecture, and implementation rules.

## Runtime Version

The Bun version is fixed by the `packageManager` field in `package.json`. The supported Node.js range is declared by the `engines` field. Local development and CI use the same versions.
