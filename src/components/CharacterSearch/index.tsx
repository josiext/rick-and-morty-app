import { Character } from "types/character";

export interface CharacterSearchProps {
  nameValue: Character["name"];
  statusValue: Character["status"] | null;
  onChangeName: (name: Character["name"]) => void;
  onChangeStatus: (status: Character["status"] | null) => void;
}

export default function CharacterSearch({
  nameValue,
  statusValue,
  onChangeName,
  onChangeStatus,
}: CharacterSearchProps) {
  return (
    <>
      <input
        value={nameValue}
        onChange={(e) => onChangeName(e.currentTarget.value)}
        placeholder="Search character..."
      />
      <div>
        <RadioButton
          value="Alive"
          checked={statusValue === "alive"}
          onClick={() => onChangeStatus("alive")}
        />
        <RadioButton
          value="Dead"
          checked={statusValue === "dead"}
          onClick={() => onChangeStatus("dead")}
        />
        <RadioButton
          value="Unknown"
          checked={statusValue === "unknown"}
          onClick={() => onChangeStatus("unknown")}
        />
        <RadioButton
          value="All"
          checked={statusValue === null}
          onClick={() => onChangeStatus(null)}
        />
      </div>
    </>
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
