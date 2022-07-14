import { Character as ICharacter } from "types/character";

import styles from "./Character.module.css";

function Character({ data }: { data: ICharacter }) {
  return (
    <div className={styles.container}>
      <figure>
        <img
          className={styles.image}
          alt={data.name}
          src={data.image}
          width="100%"
          height="300px"
        />
      </figure>

      <div className={styles.content}>
        <p className={styles.name}>{data.name}</p>
        <p className={styles.species}>{data.species}</p>
        <p className={styles.status}>{data.status}</p>
      </div>
    </div>
  );
}

export default Character;
