import Character from "components/Character";
import useCharacterList from "hooks/useCharacterList";
import { FormEvent, useState } from "react";

export default function Characters() {
  const [search, setSearch] = useState<string>("");
  const { data: characters, isLoading, error } = useCharacterList();

  const handleSearchCharacter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSearch("");
  };

  return (
    <div>
      <form onSubmit={handleSearchCharacter}>
        <input
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          placeholder="Search character..."
        />
        <button>Aceptar</button>
      </form>

      {characters.map((character) => (
        <Character key={character.id} data={character} />
      ))}
    </div>
  );
}
