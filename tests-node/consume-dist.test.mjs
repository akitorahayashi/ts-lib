import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  createSlug,
  LibraryError,
  SlugValidationError,
} from '../dist/index.js';

test('built ESM output runs createSlug on Node', () => {
  assert.equal(createSlug('Hello, TS Library!'), 'hello-ts-library');
});

test('exported errors keep the library hierarchy on Node', () => {
  assert.throws(
    () => createSlug('---'),
    (error) =>
      error instanceof SlugValidationError && error instanceof LibraryError,
  );
});
