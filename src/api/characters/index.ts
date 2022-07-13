import { Character } from "types/character";

const END_POINT = "https://rickandmortyapi.com/api/character";

const get = async (
  page: number,
  {
    name,
    status,
  }: {
    name?: Character["name"];
    status?: Character["status"];
  } = {}
): Promise<{
  data: Character[];
  info: { pages: number };
}> => {
  let query = `?page=${page}`;
  if (name) query += `&name=${name}`;
  if (status) query += `&status=${status}`;

  const response = await fetch(`${END_POINT}${query}`);
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
