import { useEffect, useState } from "react";

import CharacterApi from "api/characters";
import { Character } from "types/character";

const useCharacterList = () => {
  const [data, setData] = useState<Character[]>([]);
  const [error, setError] = useState<null | Error>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadDataPage(1);
  }, []);

  const loadDataPage = async (page: number) => {
    try {
      setIsLoading(true);
      const res = await CharacterApi.get({ page });
      setData(res);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e : new Error("Api error"));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    error,
    isLoading,
    loadDataPage,
  };
};

export default useCharacterList;
