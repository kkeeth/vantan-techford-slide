import type { FormEvent } from 'react';
import { useState } from 'react';
import './App.css';
import type { SearchType } from './types/pokemon';
import SearchTypeToggle from './components/SearchTypeToggle';
import SearchForm from './components/SearchForm';
import PokemonCard from './components/PokemonCard';
import SkeletonLoader from './components/SkeletonLoader';
import { usePokemonSearch } from './hooks/usePokemonSearch';

const App = () => {
  // 状態管理
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchType, setSearchType] = useState<SearchType>('name');
  const { pokemon, isLoading, error, searchPokemon, setPokemon, setError } =
    usePokemonSearch();

  // フォーム送信ハンドラ
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // 現在の検索語を保存
    const currentSearchTerm = searchTerm;

    // 検索実行
    await searchPokemon(currentSearchTerm, searchType);

    // 検索が完了したら入力フォームをクリア
    setSearchTerm('');
  };

  // 検索タイプが変更された時に入力をクリア
  const handleTypeChange = (type: SearchType) => {
    setSearchTerm('');
    setPokemon(null);
    setSearchType(type);
    setError({ isError: false, message: '' });
  };

  return (
    <div className="app">
      <h1>Poké Search</h1>
      <p className="description">Search for a Pokémon by name or ID</p>

      <SearchTypeToggle
        searchType={searchType}
        onTypeChange={handleTypeChange}
      />

      <SearchForm
        searchTerm={searchTerm}
        searchType={searchType}
        isLoading={isLoading}
        onSearchTermChange={setSearchTerm}
        onSubmit={handleSubmit}
      />

      {error.isError && <div className="error-message">{error.message}</div>}

      {isLoading && <SkeletonLoader />}

      {pokemon && !isLoading && <PokemonCard pokemon={pokemon} />}
    </div>
  );
};

export default App;
