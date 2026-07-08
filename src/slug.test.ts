import { describe, expect, test } from 'bun:test';
import { createSlug, SlugValidationError } from './index.js';

describe('createSlug', () => {
  test('normalizes text into a lowercase hyphenated slug', () => {
    expect(createSlug(' Hello, TS Library! ')).toBe('hello-ts-library');
  });

  test('supports underscore separators', () => {
    expect(createSlug('TS Library', { separator: '_' })).toBe('ts_library');
  });

  test('removes diacritics', () => {
    expect(createSlug('Crème Brûlée')).toBe('creme-brulee');
  });

  test('limits output length without a trailing separator', () => {
    expect(createSlug('TS library template', { maxLength: 11 })).toBe(
      'ts-library',
    );
  });

  test('fails when input has no slug content', () => {
    expect(() => createSlug('---')).toThrow(SlugValidationError);
  });

  test('fails when maxLength is invalid', () => {
    expect(() => createSlug('TS', { maxLength: 0 })).toThrow(
      SlugValidationError,
    );
  });
});
