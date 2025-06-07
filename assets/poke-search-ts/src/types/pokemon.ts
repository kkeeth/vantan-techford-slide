export type Pokemon = {
	id: number;
	name: string;
	sprites: {
		other: {
			// "official-artwork": {
			// 	front_default: string;
			// };
			showdown: {
				front_default: string;
				front_shiny: string;
				back_default: string;
				back_shiny: string;
			};
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
