import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('テキストが表示される', () => {
    render(<Button>クリック</Button>);

    expect(screen.getByText('クリック')).toBeInTheDocument();
  });

  it('クリックでonClickが呼ばれる', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>クリック</Button>);

    await user.click(screen.getByText('クリック'));

    expect(handleClick).toHaveBeenCalled();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disabled 時はクリックできない', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <Button onClick={handleClick} disabled>
        送信
      </Button>,
    );

    // disabled なボタンはクリックしても反応しない
    await user.click(screen.getByRole('button'));

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('disabled 時は disabled 属性がある', () => {
    render(<Button disabled>送信</Button>);

    expect(screen.getByRole('button')).toBeDisabled();
  });
});
