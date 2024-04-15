import { useState } from "react";
import "./Calculator.css";

export default function Calculator() {
  const [items, setItems] = useState([]);

  let lastAddedItem = items[items.length - 1];
  const plusIcon = " + ";
  let minusIcon = " - ";

  function CreateNumbers({ onClick }) {
    let digitNumber = [7, 8, 9, 4, 5, 6, 3, 2, 1, 0];

    return digitNumber.map((item) => {
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
    if (items.length === 0) return;

    if (lastAddedItem !== plusIcon) {
      setItems((prevState) => [...prevState, plusIcon]);
    }

    if (lastAddedItem === minusIcon) {
      items.pop();
    }

    if (lastAddedItem === "-") {
      items.pop();
    }
  }

  function handleMinusClick() {
    if (items.length === 0) {
      minusIcon = "-";
    }

    if (lastAddedItem !== "-") {
      if (lastAddedItem !== minusIcon) {
        setItems((prevState) => [...prevState, minusIcon]);
      }
    }

    if (lastAddedItem === plusIcon) {
      items.pop();
    }
  }

  function handleResultClick() {
    console.log(items);

    if (items[0] === plusIcon) {
      items.shift();
    }

    // Check if icon exist

    const containsPlusIcon = items.some((e) => e === plusIcon);
    const containsMinusIcon = items.some((e) => e === minusIcon);

    // Convert all strings elements into numbers types

    let numbers = [];
    const itemsString = items.join("");

    if (containsPlusIcon) {
      numbers = itemsString.split(plusIcon).map((str) => parseFloat(str));
    }

    if (containsMinusIcon) {
      numbers = itemsString.split(minusIcon).map((str) => parseFloat(str));
    }

    if (numbers.length === 0) return;

    if (lastAddedItem !== plusIcon && lastAddedItem !== minusIcon) {
      // Sum the numbers
      const sum = numbers.reduce((acc, cur) => acc + cur, 0);

      // Diff the numbers
      const diff = numbers.reduce((acc, cur) => acc - cur);

      if (containsPlusIcon) {
        setItems([sum]);
      } else if (containsMinusIcon) {
        setItems([diff]);
      }
    }
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
          <div>
            <button>AC</button>
            <button>()</button>
            <button>%</button>
            <button>/</button>
          </div>
          <div>
            <CreateNumbers onClick={handleNumberClick} />
            <button>.</button>
            <button> &lt; </button>
          </div>
          <div className="">
            <button>x</button>
            <button onClick={handlePlusClick}>+</button>
            <button onClick={handleMinusClick}>-</button>
            <button onClick={handleResultClick}>=</button>
          </div>
        </div>
      </div>
    </>
  );
}
