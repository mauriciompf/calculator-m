import { useState } from "react";
import Aritmetic from "./Aritmetic";
import Calculator from "./Calculator";
import "./app.css";

export default function App() {
  const [showAritmetic, setShowAritmetic] = useState(false);

  return (
    <>
      <button onClick={() => setShowAritmetic(!showAritmetic)}>
        Aritmetic
      </button>

      {showAritmetic && <Aritmetic />}

      <Calculator />
    </>
  );
}
