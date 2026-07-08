# ts-lib

A TypeScript library template developed with Bun and consumable on Node.js and Bun.

## Setup

```sh
bun install
```

## Usage

```ts
import { createSlug } from 'ts-lib';

const slug = createSlug('Hello, TS Library!');
console.log(slug);
```

## Consumption

The published package ships built ESM and type declarations under `dist/`, and includes `src/` for Bun consumers.

- Node.js resolves the `import` condition and loads `dist/index.js` with `dist/index.d.ts` types.
- Bun resolves the `bun` condition and loads the TypeScript source at `src/index.ts` directly.

## Development

```sh
bun run fix      # Biome autofix
bun run check    # Biome lint + tsc --noEmit
bun test         # Run all tests
bun run build    # Emit dist/ with tsc
```

`src/index.ts` owns the public export surface. Relative imports within `src/` use explicit `.js` extensions so `tsc` emits Node-resolvable ESM.
