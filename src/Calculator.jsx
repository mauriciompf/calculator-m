import { useState } from "react";
import { evaluate } from "mathjs";
import "./Calculator.css";

export default function Calculator() {
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

  const [items, setItems] = useState([]);

  function getLastAddedItem() {
    return items[items.length - 1];
  }

  function getExpression() {
    return items.join("");
  }

  const icons = {
    plus: " + ",
    minus: " - ",
    product: " x ",
    divide: " / ",
  };

  function addItem(item) {
    setItems((prevState) => [...prevState, item]);
  }

  function handleOperationClick(operation) {
    const lastItem = getLastAddedItem();

    if (
      items.length === 0 ||
      lastItem === icons[operation] ||
      lastItem in icons
    ) {
      setItems((prevState) => prevState.slice(0, -1));
    }

    addItem(icons[operation]);
  }

  function handleNumberClick(number) {
    addItem(number);
  }

  function handlePointClick() {
    const lastItem = getLastAddedItem();

    if (lastItem === ".") return;

    const lastOperatorIndex = Math.max(
      items.lastIndexOf(icons.plus),
      items.lastIndexOf(icons.minus),
      items.lastIndexOf(icons.product),
      items.lastIndexOf(icons.divide)
    );

    const currentNumber = items.slice(lastOperatorIndex + 1).join("");

    if (currentNumber.includes(".")) return;

    addItem(".");
  }

  function handleAllClearClick() {
    setItems([]);
  }

  function handleBackClick() {
    setItems((prevState) => prevState.slice(0, -1));
  }

  function handleParenthesesClicK() {
    const openCount = items.filter((item) => item === "(").length;
    const closeCount = items.filter((item) => item === ")").length;

    const lastItem = getLastAddedItem();

    if (openCount === closeCount) {
      addItem("(");
    } else if (openCount > closeCount) {
      if (lastItem !== "(" && !(lastItem in icons)) {
        addItem(")");
      }
    }
  }

  function handleResultClick() {
    const expression = getExpression();

    if (!expression) {
      console.error("Error: empty expression");
      return;
    }

    const safeExpression = expression
      .replace(/\s+/g, "")
      .replace(/x/g, "*")
      .replace(/\/\s*\0+/g, "/0");

    try {
      const result = evaluate(safeExpression);

      if (isNaN(result) || !isFinite(result)) {
        console.error("Error: invalid calculation result");
      } else {
        setItems([result]);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  console.log(items);

  function RenderOutput() {
    const formatedItems = items
      .join("")
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

    return <strong>{formatedItems}</strong>;
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
            <button onClick={() => handleOperationClick("divide")}>/</button>
          </div>
          <div className="col-digit">
            <CreateNumbers onClick={handleNumberClick} />
            <button onClick={handlePointClick}>.</button>
            <button onClick={handleBackClick}>{"<"}</button>
          </div>
          <div className="col-4">
            <button onClick={() => handleOperationClick("product")}>x</button>
            <button onClick={() => handleOperationClick("plus")}>+</button>
            <button onClick={() => handleOperationClick("minus")}>-</button>
            <button onClick={handleResultClick}>=</button>
          </div>
        </div>
      </div>
    </>
  );
}
