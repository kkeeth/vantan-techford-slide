export type Pokemon = {
	id: number;
	name: string;
	sprites: {
		front_default: string;
		other: {
			"official-artwork": {
				front_default: string;
			};
			showdown: object;
		};
	};
	types: {
		type: {
			name: string;
		};
	}[];
	height: number;
	weight: number;
	abilities: {
		ability: {
			name: string;
		};
	}[];
};

export type SearchResult = Pokemon | null;

export type SearchError = {
	isError: boolean;
	message: string;
};

export type SearchType = "name" | "id";
