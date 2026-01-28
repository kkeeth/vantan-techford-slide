// src/utils/validator.test.ts
import { describe, it, expect } from 'vitest';
import { validateMessage, validateFile } from './validator';

describe('validateMessage', () => {
  it('空文字の場合はエラーを返す', () => {
    expect(validateMessage('')).toBe('内容を入力してください');
  });

  it('空白のみの場合もエラーを返す', () => {
    expect(validateMessage('   ')).toBe('内容を入力してください');
  });

  it('正常な入力の場合は空文字を返す', () => {
    expect(validateMessage('こんにちは')).toBe('');
  });

  it('140文字ちょうどは有効', () => {
    const text = 'a'.repeat(140);
    expect(validateMessage(text)).toBe('');
  });

  it('141文字以上はエラー', () => {
    const text = 'a'.repeat(141);
    expect(validateMessage(text)).toContain('140');
  });
});

describe('validateFile', () => {
  const invalidExtensionImage = new File(['dummy image data'], 'test.webp', {
    type: 'image/webp',
    lastModified: Date.now(),
  });
  const overSizedImage = new File(
    [new ArrayBuffer(6 * 1024 * 1024)],
    'large.png',
    {
      type: 'image/png',
      lastModified: Date.now(),
    },
  );
  const longNameImage = new File(
    ['dummy image data'],
    'a'.repeat(101) + '.png',
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
      'JPEG, PNG, GIF ファイルのみアップロード可能です',
    );
  });

  it('ファイルサイズが大きい場合はエラーを返す', () => {});
  expect(validateFile(overSizedImage)).toBe(
    'ファイルサイズが大きすぎます（最大5MB）',
  );

  it('ファイル名が長すぎる場合はエラーを返す', () => {
    expect(validateFile(longNameImage)).toBe('ファイル名が長すぎます');
  });

  it('正常な入力の場合は空文字を返す', () => {
    expect(validateFile(validImage)).toBe('');
  });
});
