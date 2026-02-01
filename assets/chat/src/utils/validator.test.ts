// src/utils/validator.test.ts
import { describe, it, expect } from 'vitest';
import {
  validateMessage,
  validateFile,
  MAX_MESSAGE_LENGTH,
  MAX_SIZE,
  MAX_FILENAME_LENGTH,
  ERROR_MESSAGES,
  FILE_ERROR_MESSAGES,
} from './validator';

describe('validateMessage', () => {
  it('空文字の場合はエラーを返す', () => {
    expect(validateMessage('')).toBe(ERROR_MESSAGES.EMPTY);
  });

  it('空白のみの場合もエラーを返す', () => {
    expect(validateMessage('   ')).toBe(ERROR_MESSAGES.EMPTY);
  });

  it('正常な入力の場合は空文字を返す', () => {
    expect(validateMessage('こんにちは')).toBe('');
  });

  it(`${MAX_MESSAGE_LENGTH}文字ちょうどは有効`, () => {
    const text = 'a'.repeat(MAX_MESSAGE_LENGTH);
    expect(validateMessage(text)).toBe('');
  });

  it(`${MAX_MESSAGE_LENGTH + 1}文字以上はエラー`, () => {
    const text = 'a'.repeat(MAX_MESSAGE_LENGTH + 1);
    expect(validateMessage(text)).toBe(ERROR_MESSAGES.TOO_LONG);
  });
});

describe('validateFile', () => {
  const invalidExtensionImage = new File(['dummy image data'], 'test.webp', {
    type: 'image/webp',
    lastModified: Date.now(),
  });
  const overSizedImage = new File(
    [new ArrayBuffer((MAX_SIZE + 1) * 1024 * 1024)],
    'large.png',
    {
      type: 'image/png',
      lastModified: Date.now(),
    },
  );
  const longNameImage = new File(
    ['dummy image data'],
    'a'.repeat(MAX_FILENAME_LENGTH + 1) + '.png',
    {
      type: 'image/png',
      lastModified: Date.now(),
    },
  );
  const validImage = new File(['dummy image data'], 'valid.png', {
    type: 'image/png',
    lastModified: Date.now(),
  });

  it('対象外の拡張子ファイルの場合はエラーを返す', () => {
    expect(validateFile(invalidExtensionImage)).toBe(
      FILE_ERROR_MESSAGES.INVALID_TYPE,
    );
  });

  it('ファイルサイズが大きい場合はエラーを返す', () => {
    expect(validateFile(overSizedImage)).toBe(FILE_ERROR_MESSAGES.TOO_LARGE);
  });

  it('ファイル名が長すぎる場合はエラーを返す', () => {
    expect(validateFile(longNameImage)).toBe(FILE_ERROR_MESSAGES.NAME_TOO_LONG);
  });

  it('正常な入力の場合は空文字を返す', () => {
    expect(validateFile(validImage)).toBe('');
  });
});
