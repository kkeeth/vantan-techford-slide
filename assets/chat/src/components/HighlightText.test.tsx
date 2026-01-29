import { render, screen } from '@testing-library/react';
import { HighlightText } from './HighlightText';

describe('HighlightText', () => {
  it('検索語がない場合はテキストをそのまま表示', () => {
    render(
      <HighlightText text="Hello World" searchTerm="" />
    );
    expect(screen.getByText('Hello World'))
      .toBeInTheDocument();
  });

  it('検索語がある場合はハイライト', () => {
    render(
      <HighlightText text="Hello World" searchTerm="World" />
    );
    expect(screen.getByText('World'))
      .toBeInTheDocument();
  });
});