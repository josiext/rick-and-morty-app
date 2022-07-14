import { useEffect, useReducer } from "react";

import CharacterApi from "api/characters";
import { Character } from "types/character";

const DEFAULT_FIRST_PAGE = 1;
const DEFAULT_LAST_PAGE = 1;
const DEFAULT_CURRENT_PAGE = 0;

enum StateActionType {
  SET_IS_LOADING = "SET_IS_LOADING",
  SET_IS_NOT_LOADING = "SET_IS_NOT_LOADING",
  SET_CURRENT_PAGE = "SET_CURRENT_PAGE",
  SET_ERROR = "SET_ERROR",
  SET_DATA = "SET_DATA",
  SET_QUERY_PARAMS = "SET_QUERY_PARAMS",
  SET_LAST_PAGE = "SET_LAST_PAGE",
  RESET = "RESET",
}

interface State {
  data: Character[];
  currentPage: number;
  lastPage: number;
  error: null | Error;
  isLoading: boolean;
  queryParams: {
    name?: Character["name"];
    status?: Character["status"] | null;
  };
}

const initialState: State = {
  data: [],
  currentPage: DEFAULT_CURRENT_PAGE,
  lastPage: DEFAULT_LAST_PAGE,
  error: null,
  isLoading: false,
  queryParams: {},
};

type StateAction =
  | { type: StateActionType.SET_IS_LOADING }
  | { type: StateActionType.SET_IS_NOT_LOADING }
  | { type: StateActionType.SET_CURRENT_PAGE; payload: State["currentPage"] }
  | { type: StateActionType.SET_ERROR; payload: State["error"] }
  | { type: StateActionType.SET_DATA; payload: State["data"] }
  | { type: StateActionType.SET_QUERY_PARAMS; payload: State["queryParams"] }
  | { type: StateActionType.SET_LAST_PAGE; payload: State["lastPage"] }
  | { type: StateActionType.RESET };

function init(initialCount: typeof initialState) {
  return initialCount;
}

function reducer(state: typeof initialState, action: StateAction) {
  switch (action.type) {
    case StateActionType.SET_IS_LOADING:
      return { ...state, isLoading: true };
    case StateActionType.SET_IS_NOT_LOADING:
      return { ...state, isLoading: false };
    case StateActionType.SET_CURRENT_PAGE:
      return { ...state, currentPage: state.currentPage + 1 };
    case StateActionType.SET_ERROR:
      return { ...state, error: action.payload };
    case StateActionType.SET_DATA:
      return { ...state, data: [...state.data, ...action.payload] };
    case StateActionType.SET_QUERY_PARAMS:
      return { ...state, queryParams: action.payload };
    case StateActionType.SET_LAST_PAGE:
      return { ...state, lastPage: action.payload };
    case StateActionType.RESET:
      return init(initialState);
    default:
      return state;
  }
}

const useCharacterList = () => {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  useEffect(() => {
    loadPage(DEFAULT_FIRST_PAGE);
  }, []);

  const loadPage = async (
    page: number,
    opts: { name?: string; status?: Character["status"] | null } = {}
  ) => {
    try {
      dispatch({ type: StateActionType.SET_IS_LOADING });

      const res = await CharacterApi.get(page, opts);

      dispatch({ type: StateActionType.SET_DATA, payload: res.data });
      dispatch({ type: StateActionType.SET_CURRENT_PAGE, payload: page });
      dispatch({ type: StateActionType.SET_QUERY_PARAMS, payload: opts });
      dispatch({
        type: StateActionType.SET_LAST_PAGE,
        payload: res.info.pages,
      });
    } catch (e) {
      console.error(e);
      dispatch({
        type: StateActionType.SET_ERROR,
        payload: e instanceof Error ? e : new Error("Api error"),
      });
    } finally {
      dispatch({ type: StateActionType.SET_IS_NOT_LOADING });
    }
  };

  const loadNextPage = async () => {
    try {
      const nextPage = state.currentPage + 1;
      if (nextPage > state.lastPage) return;
      loadPage(nextPage, state.queryParams);
    } catch (e) {
      console.error(e);
      dispatch({
        type: StateActionType.SET_ERROR,
        payload: e instanceof Error ? e : new Error("Api error"),
      });
    }
  };

  const searchCharacters = async (opts: {
    name?: Character["name"];
    status?: Character["status"] | null;
  }) => {
    dispatch({ type: StateActionType.RESET });
    await loadPage(DEFAULT_FIRST_PAGE, opts);
  };

  return {
    data: state.data as Character[],
    error: state.error,
    isLoading: state.isLoading,
    loadNextPage,
    searchCharacters,
  };
};

export default useCharacterList;
