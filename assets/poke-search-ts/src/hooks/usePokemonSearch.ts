import { useState, useCallback } from 'react';
import { fetchPokemon } from '../api/pokemonApi';
import type { Pokemon, SearchType, AppError } from '../types/pokemon';

type UsePokemonSearchReturn = {
  pokemon: Pokemon | null;
  error: AppError | null;
  isLoading: boolean;
  searchPokemon: (query: string, type: SearchType) => Promise<void>;
  clearResults: () => void;
};

export const usePokemonSearch = (): UsePokemonSearchReturn => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [error, setError] = useState<AppError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchPokemon = useCallback(
    async (query: string, type: SearchType): Promise<void> => {
      clearResults();

      try {
        setIsLoading(true);
        const result = await fetchPokemon(query, type);

        if ('status' in result && 'message' in result) {
          setError(result);
        } else {
          setPokemon(result);
        }
      } catch (error) {
        const appErr = error as AppError;
        // 予期しないエラーの場合
        setError({
          message: appErr.message || '予期しないエラーが発生しました',
          status: appErr.status || 500,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const clearResults = () => {
    setPokemon(null);
    setError(null);
  };

  return {
    pokemon,
    error,
    isLoading,
    searchPokemon,
    clearResults,
  };
};
