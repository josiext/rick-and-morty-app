import { Character as ICharacter } from "types/character";
import styles from "./Character.module.css";

function Character({ data }: { data: ICharacter }) {
  return (
    <div className={styles.container}>
      <img alt={data.name} src={data.image} />
      <div>
        <p>{data.name}</p>
        <p>{data.species}</p>
        <p>{data.status}</p>
      </div>
    </div>
  );
}

export default Character;
