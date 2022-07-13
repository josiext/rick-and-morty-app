import { useEffect, useState } from "react";

import CharacterApi from "api/characters";
import { Character } from "types/character";

const DEFAULT_FIRST_PAGE = 1;
const DEFAULT_LAST_PAGE = 1;
const DEFAULT_CURRENT_PAGE = 0;

const useCharacterList = () => {
  const [lastPage, setLastPage] = useState(DEFAULT_LAST_PAGE);
  const [data, setData] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);
  const [error, setError] = useState<null | Error>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [queryParams, setQueryParams] = useState({});

  useEffect(() => {
    loadPage(DEFAULT_FIRST_PAGE).then(() => setCurrentPage(DEFAULT_FIRST_PAGE));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadPage = async (page: number) => {
    try {
      setIsLoading(true);
      console.log(queryParams);
      if (page <= currentPage || page > lastPage) return;
      console.log(queryParams);
      const res = await CharacterApi.get(page, queryParams);
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

  const searchCharacters = (opts: {
    name?: Character["name"];
    status?: Character["status"];
  }) => {
    setLastPage(DEFAULT_LAST_PAGE);
    setData([]);
    setError(null);
    setQueryParams(opts);
    loadPage(DEFAULT_FIRST_PAGE).then(() =>
      setCurrentPage(DEFAULT_CURRENT_PAGE)
    );
  };

  return {
    data,
    error,
    isLoading,
    loadNextPage,
    searchCharacters,
  };
};

export default useCharacterList;
