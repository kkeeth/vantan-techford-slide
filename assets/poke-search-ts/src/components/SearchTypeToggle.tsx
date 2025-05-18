import type { FC } from 'react';
import type { SearchType } from '../types';

type SearchTypeToggleProps = {
  searchType: SearchType;
  onTypeChange: (type: SearchType) => void;
};

const SearchTypeToggle: FC<SearchTypeToggleProps> = ({
  searchType,
  onTypeChange,
}) => {
  return (
    <div className="search-type-toggle">
      <button
        type="button"
        className={searchType === 'name' ? 'active' : ''}
        onClick={() => onTypeChange('name')}
      >
        Search by Name
      </button>
      <button
        type="button"
        className={searchType === 'id' ? 'active' : ''}
        onClick={() => onTypeChange('id')}
      >
        Search by ID
      </button>
    </div>
  );
};

export default SearchTypeToggle;
