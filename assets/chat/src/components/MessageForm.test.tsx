import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { MessageForm } from './MessageForm';
import type { Colors } from '../types';

const mockColors: Colors = {
  primary: '#3b82f6',
  surface: '#ffffff',
  gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
  gradientHover: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
  background: '#f1f5f9',
};

const defaultProps = {
  text: '',
  isPosting: false,
  image: null,
  colors: mockColors,
  onTextChange: vi.fn(),
  onSubmit: vi.fn(),
  onSelectImage: vi.fn(),
  onDeleteImage: vi.fn(),
};

describe('MessageForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('テキストフィールドが表示される', () => {
    render(<MessageForm {...defaultProps} />);

    expect(screen.getByPlaceholderText('今の気分はいかがでしょうか？'))
      .toBeInTheDocument();
  });

  it('入力するとonTextChangeが呼ばれる', async () => {
    const user = userEvent.setup();
    const onTextChange = vi.fn();

    render(<MessageForm {...defaultProps} onTextChange={onTextChange} />);

    const input = screen.getByPlaceholderText('今の気分はいかがでしょうか？');
    await user.type(input, 'テスト');

    expect(onTextChange).toHaveBeenCalled();
  });

  it('textの値がフィールドに反映される', () => {
    render(<MessageForm {...defaultProps} text="入力済みテキスト" />);

    expect(screen.getByDisplayValue('入力済みテキスト')).toBeInTheDocument();
  });

  it('送信ボタンが表示される', () => {
    render(<MessageForm {...defaultProps} />);

    const submitButton = screen.getByRole('button', { name: /投稿する/ });
    expect(submitButton).toHaveAttribute('type', 'submit');
  });

  it('画像追加ボタンが表示される', () => {
    render(<MessageForm {...defaultProps} />);

    expect(screen.getByRole('button', { name: /画像を追加/ })).toBeInTheDocument();
  });
});
