import Calculator from "./Calculator";
import app from "../styles/App.module.css";
import "../styles/styles.css";

export default function App() {
  return (
    <main>
      <h1>Calculator</h1>
      <Calculator className={app.calculator} />
    </main>
  );
}
