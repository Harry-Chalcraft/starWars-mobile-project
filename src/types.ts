export type Character = {
  name: string;
  id: string;
  __typename?: string;
  birthYear?: string;
  height?: number;
  mass?: number;
  homeworld?: { name: string };
  filmConnection?: { films: Film[] };
};

export type Film = {
  title: string;
  releaseDate: string;
  openingCrawl: string;
  id: string;
  __typename: string;
  speciesConnection?: {
    totalCount: number;
  };
  vehicleConnection?: {
    totalCount: number;
  };
  planetConnection?: {
    totalCount: number;
  };
  characterConnection?: {
    characters: Character[];
  };
};
