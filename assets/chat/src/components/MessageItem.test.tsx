import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { MessageItem } from './MessageItem';
import type { Message, Colors } from '../types';

const mockColors: Colors = {
  primary: '#1976d2',
  surface: '#ffffff',
  gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  gradientHover: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
  background: '#f5f5f5',
};

const mockMessage: Message = {
  id: '1',
  text: 'テストメッセージ',
  date: new Date().toISOString(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

const defaultProps = {
  message: mockMessage,
  colors: mockColors,
  isEditing: false,
  editText: '',
  searchTerm: '',
  onEditTextChange: vi.fn(),
  onStartEdit: vi.fn(),
  onSaveEdit: vi.fn(),
  onCancelEdit: vi.fn(),
  onDeleteMessage: vi.fn(),
};

describe('MessageItem', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('メッセージテキストが表示される', () => {
    render(<MessageItem {...defaultProps} />);

    expect(screen.getByText('テストメッセージ')).toBeInTheDocument();
  });

  it('⋮メニューが表示され、クリックすると編集・削除オプションが表示される', async () => {
    const user = userEvent.setup();
    render(<MessageItem {...defaultProps} />);

    // ⋮メニューボタンが表示される
    const menuButton = screen.getByTestId('MoreVertIcon').closest('button');
    expect(menuButton).toBeInTheDocument();

    // メニューをクリック
    await user.click(menuButton!);

    // 編集と削除のメニューアイテムが表示される
    expect(screen.getByText('編集')).toBeInTheDocument();
    expect(screen.getByText('削除')).toBeInTheDocument();
  });

  it('編集メニューをクリックするとonStartEditが呼ばれる', async () => {
    const user = userEvent.setup();
    const onStartEdit = vi.fn();

    render(<MessageItem {...defaultProps} onStartEdit={onStartEdit} />);

    // ⋮メニューを開く
    const menuButton = screen.getByTestId('MoreVertIcon').closest('button');
    await user.click(menuButton!);

    // 編集メニューをクリック
    await user.click(screen.getByText('編集'));

    expect(onStartEdit).toHaveBeenCalledWith('1', 'テストメッセージ');
  });

  it('削除メニューをクリックするとonDeleteMessageが呼ばれる', async () => {
    const user = userEvent.setup();
    const onDeleteMessage = vi.fn();

    render(<MessageItem {...defaultProps} onDeleteMessage={onDeleteMessage} />);

    // ⋮メニューを開く
    const menuButton = screen.getByTestId('MoreVertIcon').closest('button');
    await user.click(menuButton!);

    // 削除メニューをクリック
    await user.click(screen.getByText('削除'));

    expect(onDeleteMessage).toHaveBeenCalledWith('1');
  });

  it('編集モードでは編集フィールドが表示される', () => {
    render(
      <MessageItem
        {...defaultProps}
        isEditing={true}
        editText="編集中のテキスト"
      />,
    );

    expect(screen.getByDisplayValue('編集中のテキスト')).toBeInTheDocument();
  });

  it('編集モードでは保存ボタンとキャンセルボタンが表示される', () => {
    render(<MessageItem {...defaultProps} isEditing={true} />);

    // MUI IconButton + Icon は data-testid でアクセス
    expect(screen.getByTestId('CheckIcon')).toBeInTheDocument();
    expect(screen.getByTestId('CancelIcon')).toBeInTheDocument();
  });

  it('編集モードでは⋮メニューが非表示', () => {
    render(<MessageItem {...defaultProps} isEditing={true} />);

    expect(screen.queryByTestId('MoreVertIcon')).toBeNull();
  });

  it('編集モードで入力するとonEditTextChangeが呼ばれる', async () => {
    const user = userEvent.setup();
    const onEditTextChange = vi.fn();

    render(
      <MessageItem
        {...defaultProps}
        isEditing={true}
        editText=""
        onEditTextChange={onEditTextChange}
      />,
    );

    const textField = screen.getByRole('textbox');
    await user.type(textField, 'abc');

    // 制御されたコンポーネントなので、1文字ずつ個別に onChange が呼ばれる
    // 親が editText を更新しないため、毎回空文字 + 入力文字 = 入力文字のみ
    expect(onEditTextChange).toHaveBeenCalledTimes(3);
    expect(onEditTextChange).toHaveBeenNthCalledWith(1, 'a');
    expect(onEditTextChange).toHaveBeenNthCalledWith(2, 'b');
    expect(onEditTextChange).toHaveBeenNthCalledWith(3, 'c');
  });

  it('検索語がある場合はハイライト表示される', () => {
    render(
      <MessageItem
        {...defaultProps}
        message={{ ...mockMessage, text: 'Hello World' }}
        searchTerm="World"
      />,
    );

    expect(screen.getByText('World')).toBeInTheDocument();
  });

  it('画像がある場合は画像が表示される', () => {
    const messageWithImage: Message = {
      ...mockMessage,
      image: 'data:image/png;base64,test',
      imageName: 'test.png',
    };

    render(<MessageItem {...defaultProps} message={messageWithImage} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'data:image/png;base64,test');
    expect(image).toHaveAttribute('alt', 'test.png');
  });

  it('編集済みのメッセージには「編集済み」が表示される', () => {
    const editedMessage: Message = {
      ...mockMessage,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-02'),
    };

    render(<MessageItem {...defaultProps} message={editedMessage} />);

    expect(screen.getByText('（編集済み）')).toBeInTheDocument();
  });
});
