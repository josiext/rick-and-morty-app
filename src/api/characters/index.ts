import { Character } from "types/character";

const END_POINT = "https://rickandmortyapi.com/api/character";

interface getProps {
  name?: Character["name"];
  status?: Character["status"] | null;
}

const get = async (
  page: number,
  opts: getProps = {}
): Promise<{
  data: Character[];
  info: { pages: number };
}> => {
  const { name, status } = opts;

  let query = `?page=${page}`;
  if (name) query += `&name=${name}`;
  if (status) query += `&status=${status}`;

  const response = await fetch(`${END_POINT}${query}`);

  if (!response.ok && response.status === 404)
    return {
      data: [],
      info: {
        pages: 0,
      },
    };

  if (!response.ok) throw new Error("Api error.");

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
