import Character from "components/Character";
import useCharacterList from "hooks/useCharacterList";
import { FormEvent, useCallback, useEffect, useState } from "react";
import styles from "./Characters.module.css";
import Title from "components/Title";

export default function Characters() {
  const [search, setSearch] = useState<string>("");
  const {
    data: characters,
    isLoading,
    error,
    loadNextPage,
  } = useCharacterList();

  const handleScroll = useCallback(() => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;
    if (bottom) loadNextPage();
  }, [loadNextPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const handleSearchCharacter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch("");
  };

  return (
    <div>
      <header>
        <Title />
      </header>
      <main>
        <form onSubmit={handleSearchCharacter}>
          <input
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            placeholder="Search character..."
          />
          <button>Aceptar</button>
        </form>

        <div className={styles.character_list_container}>
          <div>
            {characters.map((character) => (
              <Character key={character.id} data={character} />
            ))}

            {isLoading && <p>Loading.</p>}
            {error && <p>Unexpected error, please try again later.</p>}
          </div>
        </div>
      </main>
    </div>
  );
}
