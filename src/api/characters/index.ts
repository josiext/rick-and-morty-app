import { Character } from "types/character";

const END_POINT = "https://rickandmortyapi.com/api/character";

const get = async ({ page = 1 }: { page?: number } = {}): Promise<{
  data: Character[];
  info: { pages: number };
}> => {
  const response = await fetch(`${END_POINT}?page=${page}`);
  const data = await response.json();

  return {
    data: data.results,
    info: {
      pages: data.info.pages,
    },
  };
};

const CharacterApi = { get };

export default CharacterApi;
