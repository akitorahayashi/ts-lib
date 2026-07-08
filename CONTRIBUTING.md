# Contributing

## Scope

This repository owns:

- `src/` — public exports, feature modules, library errors, and colocated unit tests
- `tests/` — integration tests run with Bun
- `.github/workflows/` — CI automation

## Testing Policy

- Unit tests live next to source files under `src/` and test pure transformations.
- Integration tests live under `tests/` and test filesystem, CLI, subprocess, or network behavior.
- Behavior is tested once with `bun test`; features are not re-tested per runtime. Node.js consumability is guaranteed by the `tsc` build and `attw`, which statically models Node.js module and type resolution against `dist/`.

## Workflow

1. Run `bun run fix` before committing.
2. Run `bun run check` to verify lint and types.
3. Run `bun test` to verify behavior.
4. Run `bun run build`, then `bun run publint` and `bun run attw` to verify the published package resolves on Node.js and bundlers.

See [AGENTS.md](AGENTS.md) for development commands, architecture, and implementation rules.

## Runtime Version

The Bun version is fixed by the `packageManager` field in `package.json`. The supported Node.js range is declared by the `engines` field. Local development and CI use the same versions.
