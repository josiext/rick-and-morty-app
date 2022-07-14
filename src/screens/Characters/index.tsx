import { useCallback, useEffect, useMemo, useState } from "react";
import debounce from "just-debounce-it";

import Character from "components/Character";
import useCharacterList from "hooks/useCharacterList";
import Title from "components/Title";
import { Character as ICharacter } from "types/character";
import CharacterSearch from "components/CharacterSearch";

import styles from "./Characters.module.css";

export default function Characters() {
  const [search, setSearch] = useState<{
    name: string;
    status: ICharacter["status"] | null;
  }>({ name: "", status: null });
  const {
    data: characters,
    isLoading,
    error,
    loadNextPage,
    searchCharacters,
  } = useCharacterList();

  const handleScroll = useCallback(() => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;
    if (bottom && !isLoading) loadNextPage();
  }, [loadNextPage, isLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const searchCharactersDebounced = useMemo(
    () =>
      debounce(
        (opts: { name?: string; status?: ICharacter["status"] | null }) =>
          searchCharacters(opts),
        600
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleSearchCharacter = (name: ICharacter["name"]) => {
    setSearch({ ...search, name });
    searchCharactersDebounced({ ...search, name });
  };

  const handleChangeStatus = (status: ICharacter["status"] | null) => {
    setSearch({ ...search, status: status });
    searchCharacters({ ...search, status });
  };

  return (
    <main>
      <section className={styles.header}>
        <header>
          <Title />
        </header>
        <CharacterSearch
          className={styles.search}
          nameValue={search.name}
          statusValue={search.status}
          onChangeName={(v) => handleSearchCharacter(v)}
          onChangeStatus={(v) => handleChangeStatus(v)}
        />
      </section>

      <div className={styles.character_list_container}>
        <div className={styles.character_list}>
          {characters.map((character) => (
            <Character key={character.id} data={character} />
          ))}

          {isLoading && <p>Loading...</p>}

          {!isLoading && characters.length === 0 && (
            <p>No characters to show...</p>
          )}

          {!isLoading && error && (
            <p>Unexpected error, please try again later.</p>
          )}
        </div>
      </div>
    </main>
  );
}
