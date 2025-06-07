import type { Pokemon } from '../types/pokemon';

// 入力バリデーション用の正規表現
const NUMERIC_REGEX = /^\d+$/;
const NAME_REGEX = /^[a-zA-Z-]+$/;

// PokeAPIからポケモンデータを取得する関数
export const fetchPokemonByName = async (name: string): Promise<Pokemon> => {
  // 名前は英字とハイフンのみ許可
  if (!NAME_REGEX.test(name)) {
    throw new Error(
      'Invalid name format. Only letters and hyphens are allowed.',
    );
  }

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase().trim()}`,
  );

  if (!response.ok) {
    throw new Error('Pokémon not found. Please check the name.');
  }

  return await response.json();
};

export const fetchPokemonById = async (id: string): Promise<Pokemon> => {
  // IDは数字のみ許可
  if (!NUMERIC_REGEX.test(id)) {
    throw new Error('Invalid ID format. Only numbers are allowed.');
  }

  const numericId = Number.parseInt(id, 10);
  if (numericId <= 0) {
    throw new Error('Pokémon ID must be a positive number.');
  }

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${numericId}`,
  );

  if (!response.ok) {
    throw new Error('Pokémon not found. Please check the ID.');
  }

  return await response.json();
};
