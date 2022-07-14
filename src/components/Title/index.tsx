import styles from "./Title.module.css";

export default function Title() {
  return (
    <h1 className={styles.title}>
      Rick {"&"} Morty <p className={styles.subtitle}>Characters</p>
    </h1>
  );
}
