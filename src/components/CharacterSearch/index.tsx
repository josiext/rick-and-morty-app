import RadioButton from "components/RadioButton";
import { Character } from "types/character";
import styles from "./CharacterSearch.module.css";

export interface CharacterSearchProps
  extends React.HTMLAttributes<HTMLDivElement> {
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
  className,
  ...rest
}: CharacterSearchProps) {
  return (
    <div className={`${styles.container} ${className}`} {...rest}>
      <input
        className={styles.input_name}
        value={nameValue}
        onChange={(e) => onChangeName(e.currentTarget.value)}
        placeholder="Search a character..."
      />
      <div className={styles.status_opts_container}>
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
    </div>
  );
}
