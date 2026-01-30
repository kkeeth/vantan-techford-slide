import { render, screen } from '@testing-library/react';
import { MessageList } from './MessageList';
import type { Colors } from '../types';

const mockColors: Colors = {
  primary: '#1976d2',
  primaryDark: '#1565c0',
  error: '#d32f2f',
  background: '#f5f5f5',
  paper: '#ffffff',
  border: '#e0e0e0',
  borderLight: '#f0f0f0',
  surface: '#ffffff',
  textPrimary: '#333333',
  textSecondary: '#666666',
  textMuted: '#999999',
};

const defaultProps = {
  colors: mockColors,
  showCount: false,
  isSearching: false,
};

describe('MessageList', () => {
  it('子要素がない場合は空メッセージを表示', () => {
    render(<MessageList {...defaultProps}>{[]}</MessageList>);

    expect(screen.getByText('まだメッセージがありません'))
      .toBeInTheDocument();
    expect(screen.getByText('上のフォームから最初のメッセージを投稿してみましょう'))
      .toBeInTheDocument();
  });

  it('検索中で結果がない場合は検索結果なしメッセージを表示', () => {
    render(<MessageList {...defaultProps} isSearching={true}>{[]}</MessageList>);

    expect(screen.getByText('検索結果がありません'))
      .toBeInTheDocument();
    expect(screen.getByText('別のキーワードで検索してみてください'))
      .toBeInTheDocument();
  });

  it('子要素がある場合はそのまま表示', () => {
    render(
      <MessageList {...defaultProps}>
        <div>メッセージ1</div>
        <div>メッセージ2</div>
      </MessageList>
    );

    expect(screen.getByText('メッセージ1')).toBeInTheDocument();
    expect(screen.getByText('メッセージ2')).toBeInTheDocument();
  });

  it('showCountがtrueの場合は件数を表示', () => {
    render(
      <MessageList {...defaultProps} showCount={true}>
        <div>メッセージ1</div>
        <div>メッセージ2</div>
        <div>メッセージ3</div>
      </MessageList>
    );

    expect(screen.getByText('3 件のメッセージ')).toBeInTheDocument();
  });

  it('showCountがfalseの場合は件数を非表示', () => {
    render(
      <MessageList {...defaultProps} showCount={false}>
        <div>メッセージ1</div>
        <div>メッセージ2</div>
      </MessageList>
    );

    expect(screen.queryByText(/件のメッセージ/)).toBeNull();
  });

  it('showCountのデフォルトはfalse', () => {
    render(
      <MessageList {...defaultProps}>
        <div>メッセージ1</div>
      </MessageList>
    );

    expect(screen.queryByText(/件のメッセージ/)).toBeNull();
  });
});
