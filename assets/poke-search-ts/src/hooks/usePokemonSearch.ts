import { useState } from "react";
import type { Pokemon, SearchResult, SearchError, SearchType } from "../types";
import { fetchPokemonByName, fetchPokemonById } from "../api/pokemonApi";

export const usePokemonSearch = () => {
	const [pokemon, setPokemon] = useState<SearchResult>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<SearchError>({
		isError: false,
		message: "",
	});

	const searchPokemon = async (searchTerm: string, searchType: SearchType) => {
		// 空の検索語の場合は何もしない
		if (!searchTerm.trim()) {
			setError({
				isError: true,
				message: "Please enter a Pokémon name or ID.",
			});
			return;
		}

		setIsLoading(true);
		setError({ isError: false, message: "" });

		try {
			let data: Pokemon;

			// 検索タイプに基づいて適切なAPI関数を呼び出す
			if (searchType === "name") {
				data = await fetchPokemonByName(searchTerm);
			} else {
				// searchType === 'id'
				const id = Number.parseInt(searchTerm, 10);
				if (Number.isNaN(id)) {
					throw new Error("Please enter a valid number for Pokémon ID.");
				}
				data = await fetchPokemonById(id);
				console.log(data);
			}

			setPokemon(data);
		} catch (err) {
			setPokemon(null);
			setError({
				isError: true,
				message:
					err instanceof Error ? err.message : "An unknown error occurred.",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return {
		pokemon,
		isLoading,
		error,
		searchPokemon,
		setPokemon,
		setError,
	};
};
