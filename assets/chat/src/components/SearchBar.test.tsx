import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { SearchBar } from './SearchBar';

const mockColors = {
  primary: '#1976d2',
  surface: '#ffffff',
  gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  gradientHover: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
  background: '#f5f5f5',
};

describe('SearchBar', () => {
  it('入力フィールドが表示される', () => {
    render(
      <SearchBar
        searchTerm=""
        colors={mockColors}
        onSearchChange={() => {}}
      />
    );

    expect(screen.getByPlaceholderText('メッセージを検索...'))
      .toBeInTheDocument();
  });

  it('入力するとonSearchChangeが呼ばれる', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <SearchBar
        searchTerm=""
        colors={mockColors}
        onSearchChange={handleChange}
      />
    );

    const input = screen.getByPlaceholderText('メッセージを検索...');
    await user.type(input, 'test');

    expect(handleChange).toHaveBeenCalled();
  });

  it('検索語があるとクリアボタンが表示される', () => {
    render(
      <SearchBar
        searchTerm="test"
        colors={mockColors}
        onSearchChange={() => {}}
      />
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('検索語がないとクリアボタンは非表示', () => {
    render(
      <SearchBar
        searchTerm=""
        colors={mockColors}
        onSearchChange={() => {}}
      />
    );

    expect(screen.queryByRole('button')).toBeNull();
  });

  it('クリアボタンをクリックすると空文字でonSearchChangeが呼ばれる', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <SearchBar
        searchTerm="test"
        colors={mockColors}
        onSearchChange={handleChange}
      />
    );

    const clearButton = screen.getByRole('button');
    await user.click(clearButton);

    expect(handleChange).toHaveBeenCalledWith('');
  });
});
