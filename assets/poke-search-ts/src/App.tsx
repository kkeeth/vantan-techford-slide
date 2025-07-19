import { useState } from 'react';
import type { FormEvent } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import SearchToggle from './components/SearchToggle';
import PokemonCard from './components/PokemonCard';
import SkeletonLoader from './components/SkeletonLoader';
import type { SearchType } from './types/pokemon';
import { usePokemonSearch } from './hooks/usePokemonSearch';

function App() {
  const [searchType, setSearchType] = useState<SearchType>('name');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { pokemon, error, isLoading, searchPokemon, clearResults } =
    usePokemonSearch();

  // フォーム送信ハンドラ
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // 検索実行
    await searchPokemon(searchTerm, searchType);

    // 検索が完了したら入力フォームをクリア
    setSearchTerm('');
  };

  // 検索タイプが変更された時に入力をクリア
  const handleTypeChange = (type: SearchType) => {
    setSearchTerm('');
    setSearchType(type);
    clearResults();
  };

  return (
    <div className="app">
      <h1>Poké Search</h1>
      <p className="description">Search for a Pokémon by name or ID</p>
      <SearchToggle searchType={searchType} onTypeChange={handleTypeChange} />
      <SearchForm
        searchType={searchType}
        searchTerm={searchTerm}
        isLoading={isLoading}
        onSearchTermChange={setSearchTerm}
        onSubmit={handleSubmit}
      />
      {error && <div className="error-message">{error.message}</div>}
      {isLoading && <SkeletonLoader />}
      {pokemon && !isLoading && <PokemonCard pokemon={pokemon} />}
    </div>
  );
}

export default App;
