import { render, screen } from '@testing-library/react';
import { MessageList } from './MessageList';

describe('MessageList', () => {
  it('子要素がない場合は空メッセージを表示', () => {
    render(<MessageList>{[]}</MessageList>);

    expect(screen.getByText('📝 まだメッセージがありません'))
      .toBeInTheDocument();
    expect(screen.getByText('上のフォームから最初のメッセージを投稿してみましょう！'))
      .toBeInTheDocument();
  });

  it('子要素がある場合はそのまま表示', () => {
    render(
      <MessageList>
        <div>メッセージ1</div>
        <div>メッセージ2</div>
      </MessageList>
    );

    expect(screen.getByText('メッセージ1')).toBeInTheDocument();
    expect(screen.getByText('メッセージ2')).toBeInTheDocument();
  });

  it('showCountがtrueの場合は件数を表示', () => {
    render(
      <MessageList showCount={true}>
        <div>メッセージ1</div>
        <div>メッセージ2</div>
        <div>メッセージ3</div>
      </MessageList>
    );

    expect(screen.getByText('3 件のメッセージ')).toBeInTheDocument();
  });

  it('showCountがfalseの場合は件数を非表示', () => {
    render(
      <MessageList showCount={false}>
        <div>メッセージ1</div>
        <div>メッセージ2</div>
      </MessageList>
    );

    expect(screen.queryByText(/件のメッセージ/)).toBeNull();
  });

  it('showCountのデフォルトはfalse', () => {
    render(
      <MessageList>
        <div>メッセージ1</div>
      </MessageList>
    );

    expect(screen.queryByText(/件のメッセージ/)).toBeNull();
  });
});
