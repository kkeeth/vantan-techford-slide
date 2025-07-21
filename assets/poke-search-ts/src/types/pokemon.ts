export type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    other: {
      showdown: {
        front_default: string | undefined;
        back_default: string | undefined;
        front_shiny: string | undefined;
        back_shiny: string | undefined;
      };
    };
  };
  types: {
    type: {
      name: string;
      url: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
      url: string;
    };
  }[];
};

export type SearchType = 'name' | 'id';

export type AppError = {
  message: string;
  status: number;
};
