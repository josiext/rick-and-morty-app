import { Character } from "types/character";

const END_POINT = "https://rickandmortyapi.com/api/character";

const get = async ({ page = 1 }: { page?: number } = {}): Promise<
  Character[]
> => {
  const response = await fetch(`${END_POINT}?page=${page}`);
  const data = await response.json();

  return data.results;
};

const CharacterApi = { get };

export default CharacterApi;
