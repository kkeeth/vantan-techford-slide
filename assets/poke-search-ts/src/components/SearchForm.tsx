import type { FormEvent, FC } from "react";
import type { SearchType } from "../types";

type SearchFormProps = {
	searchTerm: string;
	searchType: SearchType;
	isLoading: boolean;
	onSearchTermChange: (term: string) => void;
	onSubmit: (e: FormEvent) => void;
};

const SearchForm: FC<SearchFormProps> = ({
	searchTerm,
	searchType,
	isLoading,
	onSearchTermChange,
	onSubmit,
}) => {
	return (
		<form onSubmit={onSubmit} className="search-form">
			<input
				type={searchType === "id" ? "number" : "text"}
				placeholder={
					searchType === "name"
						? "Enter Pokémon name (e.g. pikachu)"
						: "Enter Pokémon ID (e.g. 25)"
				}
				value={searchTerm}
				onChange={(e) => onSearchTermChange(e.target.value)}
				min={searchType === "id" ? 1 : undefined}
			/>
			<button type="submit" disabled={isLoading}>
				{isLoading ? "Searching..." : "Search"}
			</button>
		</form>
	);
};

export default SearchForm;
