import styles from "./App.module.css";
import Title from "./components/Title";
import Characters from "./screens/Characters";

function App() {
  return (
    <div className={styles.container}>
      <header className="App-header">
        <Title />
      </header>

      <main>
        <Characters />
      </main>
    </div>
  );
}

export default App;
