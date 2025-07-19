import { useState, useCallback } from 'react';
import { fetchPokemon } from '../api/pokemonApi';
import type { Pokemon, SearchType, AppError } from '../types/pokemon';

type UsePokemonSearchReturn = {
  pokemon: Pokemon | null | AppError;
  error: AppError | null;
  isLoading: boolean;
  searchPokemon: (query: string, type: SearchType) => Promise<void>;
  clearResults: () => void;
};

export const usePokemonSearch = (): UsePokemonSearchReturn => {
  const [pokemon, setPokemon] = useState<Pokemon | null | AppError>(null);
  const [error, setError] = useState<AppError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchPokemon = useCallback(
    async (query: string, type: SearchType): Promise<void> => {
      clearResults();

      try {
        setIsLoading(true);
        const result = await fetchPokemon(query, type);
        setPokemon(result);
      } catch (err) {
        const apiError = err as AppError;
        setError(apiError);
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
