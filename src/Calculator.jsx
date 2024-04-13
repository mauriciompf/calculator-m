import { useState } from "react";
import "./Calculator.css";

export default function Calculator() {
  // const [showNumber, setShowNumber] = useState("");
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
    // setShowNumber((prevState) => String(prevState) + String(number));

    setItems((prevState) => [...prevState, [number]]);
  }

  function handlePlusClick() {
    // setItems((prevState) => prevState + "+");

    if (items.length > 0) {
      if (lastAddedItem !== plusIcon) {
        setItems((prevState) => [...prevState, plusIcon]);
      }

      if (lastAddedItem === minusIcon) {
        items.pop();
      }
    }

    // if (items.length > 0 && items[items.length - 1] !== plusIcon) {
    //   setItems((prevState) => [...prevState, plusIcon]);
    // }

    // if (lastAddedItem === " - ") {
    //   items.pop();
    //   // setItems((prevState) => [...prevState, "+"]);
    // }

    // setShowNumber((prevState) => prevState + "+");
    // if (showNumber[showNumber.length - 1] === "-") {
    //   setShowNumber((prevState) => (prevState = "+"));
    // }
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

    // if (items.length > 0 && items[items.length - 1] !== minusIcon) {
    //   setItems((prevState) => [...prevState, minusIcon]);
    // }

    // if (items[items.length - 1] === plusIcon) {
    //   items.pop();
    // }

    // setShowNumber((prevState) => prevState + "-");
  }

  function handleResultClick() {
    // console.log(showNumber[showNumber.length - 1]);
    // console.log(showNumber.lastIndexOf(" + "));

    console.log(items);
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
