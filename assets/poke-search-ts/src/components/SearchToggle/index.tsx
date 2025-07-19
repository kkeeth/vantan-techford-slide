import './style.css';
import type { SearchType } from '../../types/pokemon';

type SearchToggleProps = {
  searchType: SearchType;
  onTypeChange: (type: SearchType) => void;
};

const SearchToggle = ({ searchType, onTypeChange }: SearchToggleProps) => {
  return (
    <div className="search-toggle">
      <button
        type="button"
        className={`name ${searchType === 'name' ? 'active' : ''}`}
        onClick={() => onTypeChange('name')}
      >
        Search by Name
      </button>
      <button
        type="button"
        className={`id ${searchType === 'id' ? 'active' : ''}`}
        onClick={() => onTypeChange('id')}
      >
        Search by ID
      </button>
    </div>
  );
};

export default SearchToggle;
