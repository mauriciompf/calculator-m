import { useState } from "react";
import "./Calculator.css";

export default function Calculator() {
  const [items, setItems] = useState([]);

  let lastAddedItem = items[items.length - 1];
  const plusIcon = " + ";
  let minusIcon = " - ";
  const productIcon = " x ";
  const divideIcon = " / ";

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
    if (
      items.length === 0 ||
      lastAddedItem === "-" ||
      lastAddedItem === plusIcon
    ) {
      items.pop();
      return;
    }

    if (
      lastAddedItem === minusIcon ||
      lastAddedItem === productIcon ||
      lastAddedItem === divideIcon
    ) {
      items.pop();
    }

    setItems((prevState) => [...prevState, plusIcon]);
  }

  function handleMinusClick() {
    if (
      items.length === 0 ||
      lastAddedItem === productIcon ||
      lastAddedItem === "-" ||
      lastAddedItem === divideIcon
    ) {
      minusIcon = "-";
    }

    if (lastAddedItem === plusIcon) {
      items.pop();
    }

    if (lastAddedItem !== minusIcon) {
      setItems((prevState) => [...prevState, minusIcon]);
    }
  }

  function handleProductClick() {
    if (items.length === 0 || lastAddedItem === productIcon) return;

    if (
      lastAddedItem === plusIcon ||
      lastAddedItem === minusIcon ||
      lastAddedItem === divideIcon
    ) {
      items.pop();
    } else if (lastAddedItem === "-") {
      items.pop();
      items.pop();
    }

    setItems((prevState) => [...prevState, productIcon]);
  }

  function handleDivideClick() {
    if (items.length === 0 || lastAddedItem === divideIcon) return;

    if (
      lastAddedItem === plusIcon ||
      lastAddedItem === minusIcon ||
      lastAddedItem === productIcon
    ) {
      items.pop();
    } else if (lastAddedItem === "-") {
      items.pop();
      items.pop();
    }

    setItems((prevState) => [...prevState, divideIcon]);
  }

  function handleResultClick() {
    console.log(items);

    if (lastAddedItem === "-") return;

    // Check if icon exist
    const containsPlusIcon = items.includes(plusIcon);
    const containsMinusIcon = items.includes(minusIcon);
    const containsProductIcon = items.includes(productIcon);
    const containsDivideIcon = items.includes(divideIcon);

    // Convert all strings elements into numbers types
    const itemsString = items.join("");
    let numbers = [];

    if (containsPlusIcon) {
      numbers = itemsString.split(plusIcon).map((str) => parseFloat(str));
    } else if (containsMinusIcon) {
      numbers = itemsString.split(minusIcon).map((str) => parseFloat(str));
    } else if (containsProductIcon) {
      numbers = itemsString.split(productIcon).map((str) => parseFloat(str));
    } else if (containsDivideIcon) {
      numbers = itemsString.split(divideIcon).map((str) => parseFloat(str));
    }

    if (numbers.length === 0) return;

    const sum = numbers.reduce((acc, cur) => acc + cur, 0);
    const diff = numbers.reduce((acc, cur) => acc - cur);
    const product = numbers.reduce((acc, cur) => acc * cur);
    const divide = numbers.reduce((acc, cur) => acc / cur);

    if (
      lastAddedItem !== plusIcon &&
      lastAddedItem !== minusIcon &&
      lastAddedItem !== productIcon &&
      lastAddedItem !== divide
    ) {
      if (containsPlusIcon) {
        setItems([sum]);
      } else if (containsMinusIcon) {
        setItems([diff]);
      } else if (containsProductIcon) {
        setItems([product]);
      } else if (containsDivideIcon) {
        setItems([divide]);
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
          <div className="top">
            <button>AC</button>
            <button>()</button>
            <button>%</button>
            <button onClick={handleDivideClick}>/</button>
          </div>
          <div className="col-digit">
            <CreateNumbers onClick={handleNumberClick} />
            <button>.</button>
            <button> &lt; </button>
          </div>
          <div className="col-4">
            <button onClick={handleProductClick}>x</button>
            <button onClick={handlePlusClick}>+</button>
            <button onClick={handleMinusClick}>-</button>
            <button onClick={handleResultClick}>=</button>
          </div>
        </div>
      </div>
    </>
  );
}
