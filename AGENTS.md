# AGENTS.md

## Directory Structure

```text
src/
  index.ts            Public export boundary
  errors.ts           Library error base classes and feature errors
  <feature>.ts        Focused library feature modules
  <feature>.test.ts   Colocated unit tests
tests/
  <name>.test.ts      Integration tests (Bun)
dist/                 Built ESM and type declarations (build output)
```

## Architecture

### Public API

`src/index.ts` owns the package export surface. Public functions, classes, and types are re-exported from this file. Internal modules are not imported directly by consumers.

### Feature Modules

Feature modules expose small, typed APIs. Each module owns its validation rules and throws library-specific errors for invalid input.

### Errors

`errors.ts` exports `LibraryError` as the shared library error base. Feature-specific errors extend `LibraryError`.

## Distribution

The package is developed with Bun and consumed on Node.js and Bun. `tsc` emits ESM JavaScript and `.d.ts` declarations to `dist/` from `tsconfig.build.json`.

The `exports` map resolves per runtime:

- `import` → `dist/index.js` with `dist/index.d.ts` types (Node.js and other bundlers).
- `bun` → `src/index.ts` (Bun consumes the TypeScript source directly).

`prepare` builds `dist/` on `npm install`/`bun install` of the package's own directory, and — per npm's documented convention for git dependencies — before the package is packed and installed when a consumer installs this repository directly via a git or `file:` reference. `dist/` is not committed to the repository; it is rebuilt at install time. `files` publishes `dist/` and `src/` if the package is ever packed for a registry.

## Development Commands

```sh
bun run fix          # Biome autofix
bun run check        # Biome lint + tsc --noEmit
bun test             # Bun unit and integration tests
bun run build        # Emit dist/ with tsc
bun run publint      # Lint the published package surface
bun run attw         # Validate exports and type resolution across Node.js and bundlers
```

## Development Guidelines

- `bun run fix` runs before `bun run check`.
- Relative imports within `src/` use explicit `.js` extensions so `tsc` emits Node-resolvable ESM. Bun and bundler type resolution map the `.js` specifier to the `.ts` source.
- Tests assert public behavior through exports from `src/index.ts`.
- Unit tests live next to source files under `src/` and test pure transformations.
- Integration tests live under `tests/` and test filesystem, CLI, subprocess, or network behavior.
- Behavior is tested once with `bun test`; it is not mirrored per runtime. Node.js consumability is guaranteed by the `tsc` build plus `attw`, which statically models Node.js module and type resolution against `dist/`.
- Feature modules remain runtime-independent and avoid process, filesystem, and network side effects unless that is the module's explicit responsibility.
- New public APIs include tests at the package boundary.
- Package consumers import from the package root, not from nested source files.

## Documentation Rules

Documentation is written in a declarative style describing the current state of the system. Imperative or changelog-style descriptions are not used.
