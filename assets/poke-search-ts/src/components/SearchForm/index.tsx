import type { FormEvent, ChangeEvent } from 'react';
import './style.css';
import type { SearchType } from '../../types/pokemon';

type SearchFormProps = {
  searchTerm: string;
  searchType: SearchType;
  isLoading: boolean;
  onSearchTermChange: (term: string) => void;
  onSubmit: (e: FormEvent) => void;
};

const SearchForm = ({
  searchTerm,
  searchType,
  isLoading,
  onSearchTermChange,
  onSubmit,
}: SearchFormProps) => {
  const handleTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchTermChange(e.target.value);
  };

  return (
    <form onSubmit={onSubmit} className="search-form">
      <input
        type={searchType === 'id' ? 'number' : 'text'}
        placeholder={
          searchType === 'name'
            ? 'Enter name (e.g. pikachu)'
            : 'Enter ID (e.g. 25)'
        }
        value={searchTerm}
        onChange={handleTermChange}
        min={searchType === 'id' ? 1 : undefined}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};

export default SearchForm;
