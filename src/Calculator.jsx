import { useState } from "react";
import "./Calculator.css";

export default function Calculator() {
  const [items, setItems] = useState([]);

  let lastAddedItem = items[items.length - 1];
  const plusIcon = " + ";
  const minusIcon = " - ";

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
    setItems((prevState) => [...prevState, number]);
  }

  function handlePlusClick() {
    if (items.length > 0) {
      if (lastAddedItem !== plusIcon) {
        setItems((prevState) => [...prevState, plusIcon]);
      }

      if (lastAddedItem === minusIcon) {
        items.pop();
      }
    }
  }

  function handleMinusClick() {
    if (items.length > 0) {
      if (lastAddedItem !== minusIcon) {
        setItems((prevState) => [...prevState, minusIcon]);
      }

      if (lastAddedItem === plusIcon) {
        items.pop();
      }
    }
  }

  function handleResultClick() {
    // Tranform all items into a unique string and split between the plus icon into string elements
    const numbersStr = items.join("").split(plusIcon);

    // Convert all strings elements into numbers types
    const numbersFloat = numbersStr.map((str) => parseFloat(str));

    // Sum all the numbers
    const resultSum = numbersFloat.reduce((acc, cur) => acc + cur, 0);

    setItems(resultSum);
  }

  return (
    <>
      <h1>Calculator</h1>
      <div className="calculator-wrapper">
        {/* <input type="text" /> */}
        <div className="calculator-header">
          {/* <strong>{showNumber}</strong> */}
          <strong>{items}</strong>
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
