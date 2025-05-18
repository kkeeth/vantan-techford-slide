import type { Pokemon } from "../types";

// PokeAPIからポケモンデータを取得する関数
export const fetchPokemonByName = async (name: string): Promise<Pokemon> => {
	const response = await fetch(
		`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase().trim()}`,
	);

	if (!response.ok) {
		throw new Error("Pokémon not found. Please check the name.");
	}

	return await response.json();
};

export const fetchPokemonById = async (id: number): Promise<Pokemon> => {
	if (id <= 0) {
		throw new Error("Pokémon ID must be a positive number.");
	}

	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

	if (!response.ok) {
		throw new Error("Pokémon not found. Please check the ID.");
	}

	return await response.json();
};
