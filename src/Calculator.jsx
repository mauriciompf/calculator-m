import { useState } from "react";
import "./Calculator.css";

export default function Calculator() {
  const [showNumber, setShowNumber] = useState("");

  function CreateNumbers({ onClick }) {
    let a = [];
    for (let i = 0; i < 10; i++) {
      a.push(i);
    }

    return a.map((item) => {
      return (
        <button key={item} onClick={() => onClick(item)}>
          {item}
        </button>
      );
    });
  }

  function handleNumberClick(number) {
    setShowNumber((prevState) => {
      return String(prevState) + String(number);
    });
  }

  function handlePlusClick() {
    setShowNumber((prevState) => {
      return prevState + " + ";
    });
  }

  function handleMinusClick() {
    setShowNumber((prevState) => {
      return prevState + " - ";
    });
  }

  function handleResultClick() {}

  return (
    <>
      <h1>Calculator</h1>
      <div className="calculator-wrapper">
        {/* <input type="text" /> */}
        <div className="calculator-header">
          <strong>{showNumber}</strong>
        </div>
        <div className="btn-wrapper">
          <CreateNumbers onClick={handleNumberClick} />
          <button onClick={handlePlusClick}>+</button>
          <button onClick={handleMinusClick}>-</button>
          <button onClick={handleResultClick}>=</button>
        </div>
      </div>
    </>
  );
}
