import { useState } from "react";
import "./Calculator.css";

export default function Calculator() {
  const [items, setItems] = useState([]);

  let lastAddedItem = items[items.length - 1];
  let expression = items.join("");
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

  // console.log(items);

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

  console.log(items);

  function handleResultClick() {
    if (lastAddedItem === "-") return;

    // Parentheses
    expression = expression.replace(/\)(\d)/g, ")*$1");
    expression = expression.replace(/x/g, "*");

    const parenthesisRegex = /\([^()]*\)/g;

    while (parenthesisRegex.test(expression)) {
      expression = expression.replace(parenthesisRegex, (match) => {
        return eval(match);
      });
    }

    setItems([eval(expression)]);

    // Check if icon exist
    const containsPlusIcon = items.includes(plusIcon);
    const containsMinusIcon = items.includes(minusIcon);
    const containsProductIcon = items.includes(productIcon);
    const containsDivideIcon = items.includes(divideIcon);

    // Convert all strings elements into numbers types
    let numbers = [];

    if (containsPlusIcon) {
      numbers = expression.split(plusIcon).map((str) => parseFloat(str));
    } else if (containsMinusIcon) {
      numbers = expression.split(minusIcon).map((str) => parseFloat(str));
    } else if (containsProductIcon) {
      numbers = expression.split(productIcon).map((str) => parseFloat(str));
    } else if (containsDivideIcon) {
      numbers = expression.split(divideIcon).map((str) => parseFloat(str));
    }

    if (numbers.length === 0) return;

    const sum = numbers.reduce((acc, cur) => acc + cur, 0);
    const diff = numbers.reduce((acc, cur) => acc - cur);
    const product = numbers.reduce((acc, cur) => acc * cur);
    const divide = numbers.reduce((acc, cur) => acc / cur);

    // The last item is can't be an operator
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

  function handleBackClick() {
    items.pop();
    setItems((prevState) => [...prevState]);
  }

  function handlePointClick() {
    if (lastAddedItem === ".") return;

    const lastOperatorIndex = Math.max(
      items.lastIndexOf(plusIcon),
      items.lastIndexOf(minusIcon),
      items.lastIndexOf(productIcon),
      items.lastIndexOf(divideIcon)
    );

    const currentNumber = items.slice(lastOperatorIndex + 1).join("");

    if (currentNumber.includes(".")) {
      return;
    }

    setItems((prevState) => [...prevState, "."]);
  }

  function handleAllClearClick() {
    setItems([]);
  }

  function RenderOutput() {
    const formatedItems = items
      .join("")
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

    return <strong>{formatedItems}</strong>;
  }

  function handleParenthesesClicK() {
    const openCount = items.filter((item) => item === "(").length;
    const closeCount = items.filter((item) => item === ")").length;

    if (openCount === closeCount) {
      setItems((prevState) => [...prevState, "("]);
    } else if (openCount > closeCount) {
      if (
        lastAddedItem !== "(" &&
        lastAddedItem !== plusIcon &&
        lastAddedItem !== minusIcon &&
        lastAddedItem !== productIcon &&
        lastAddedItem !== divideIcon
      ) {
        setItems((prevState) => [...prevState, ")"]);
      }
    }
  }

  return (
    <>
      <h1>Calculator</h1>
      <div className="calculator-wrapper">
        <div className="calculator-header">
          <RenderOutput />
        </div>
        <div className="btn-wrapper">
          <div className="top">
            <button onClick={handleAllClearClick}>AC</button>
            <button onClick={handleParenthesesClicK}>()</button>
            <button>%</button>
            <button onClick={handleDivideClick}>/</button>
          </div>
          <div className="col-digit">
            <CreateNumbers onClick={handleNumberClick} />
            <button onClick={handlePointClick}>.</button>
            <button onClick={handleBackClick}>{"<"}</button>
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
