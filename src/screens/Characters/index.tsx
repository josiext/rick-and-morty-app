import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import debounce from "just-debounce-it";

import Character from "components/Character";
import useCharacterList from "hooks/useCharacterList";
import styles from "./Characters.module.css";
import Title from "components/Title";
import { Character as ICharacter } from "types/character";

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

  const handleSearchCharacter = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setSearch({ ...search, name: value });

    const valueTrimed = value.trim();
    if (valueTrimed)
      searchCharactersDebounced({ ...search, name: valueTrimed });
  };

  const handleChangeStatus = (status: ICharacter["status"] | null) => () => {
    setSearch({ ...search, status: status });
    searchCharactersDebounced({ ...search, status });
  };

  return (
    <div>
      <header>
        <Title />
      </header>
      <main>
        <input
          value={search.name}
          onChange={(e) => handleSearchCharacter(e)}
          placeholder="Search character..."
        />

        <div>
          <RadioButton
            value="Alive"
            checked={search.status === "alive"}
            onClick={handleChangeStatus("alive")}
          />
          <RadioButton
            value="Dead"
            checked={search.status === "dead"}
            onClick={handleChangeStatus("dead")}
          />
          <RadioButton
            value="Unknown"
            checked={search.status === "unknown"}
            onClick={handleChangeStatus("unknown")}
          />
          <RadioButton
            value="All"
            checked={search.status === null}
            onClick={handleChangeStatus(null)}
          />
        </div>

        <div className={styles.character_list_container}>
          <div>
            {characters.map((character) => (
              <Character key={character.id} data={character} />
            ))}

            {!isLoading && characters.length === 0 && (
              <p>No characters to show...</p>
            )}

            {isLoading && <p>Loading.</p>}
            {error && <p>Unexpected error, please try again later.</p>}
          </div>
        </div>
      </main>
    </div>
  );
}

const RadioButton = ({
  value,
  checked,
  onClick,
}: {
  value: string;
  checked: boolean;
  onClick: (value: string) => void;
}) => {
  return (
    <>
      <label>
        {value}
        <input type="radio" onChange={() => onClick(value)} checked={checked} />
      </label>
    </>
  );
};
