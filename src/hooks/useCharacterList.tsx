import { useEffect, useState } from "react";

import CharacterApi from "api/characters";
import { Character } from "types/character";

const FIRST_PAGE = 1;

const useCharacterList = () => {
  const [lastPage, setLastPage] = useState(1);
  const [data, setData] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState<null | Error>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadPage(FIRST_PAGE).then(() => setCurrentPage(FIRST_PAGE));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadPage = async (page: number) => {
    try {
      setIsLoading(true);
      if (page <= currentPage || page > lastPage) return;
      const res = await CharacterApi.get({ page });
      setData((prev) => [...prev, ...res.data]);
      setLastPage(res.info.pages);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e : new Error("Api error"));
    } finally {
      setIsLoading(false);
    }
  };

  const loadNextPage = async () => {
    try {
      setIsLoading(true);
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      loadPage(nextPage);
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
    loadNextPage,
  };
};

export default useCharacterList;
