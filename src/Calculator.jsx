import { useState } from "react";
import { add, evaluate } from "mathjs";
import "./Calculator.css";

export default function Calculator() {
  const [items, setItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

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

  // Convert obj values to an array
  const iconsArray = Object.keys(icons).map((value) => icons[value]);

  function addItem(item) {
    setErrorMessage("");
    setItems((prevState) => [...prevState, item]);
  }

  function handleOperationClick(operation) {
    const lastItem = getLastAddedItem();

    if (items.length === 0) return;

    // Removing the same operation and replace diff operation
    if (lastItem === icons[operation] || iconsArray.includes(lastItem)) {
      setItems((prevState) => prevState.slice(0, -1));
    }

    if (lastItem === " ( ") {
      if (icons[operation] !== icons.minus) {
        return;
      }
    }

    addItem(icons[operation]);
  }

  function handleNumberClick(number) {
    addItem(number);
  }

  function handlePointClick() {
    const lastItem = getLastAddedItem();

    if (lastItem === ".") return;

    // determine the last operator index in items (expression)
    const lastOperatorIndex = iconsArray
      .map((operator) => items.lastIndexOf(operator))
      .reduce((maxIndex, currIndex) => Math.max(maxIndex, currIndex), -1);

    // identify the current number based on the last operator index
    const currentNumber = items.slice(lastOperatorIndex + 1).join("");

    // prevent add again the "point" in the current number (before or after a operator)
    if (currentNumber.includes(".")) return;

    addItem(".");
  }

  function handleAllClearClick() {
    setItems([]);
    setErrorMessage("");
  }

  function handleBackClick() {
    setItems((prevState) => prevState.slice(0, -1));
    setErrorMessage("");
  }

  function handleParenthesesClicK() {
    const openCount = items.filter((item) => item === " ( ").length;
    const closeCount = items.filter((item) => item === " ) ").length;
    const lastItem = getLastAddedItem();

    const regex = new RegExp("[+\\-x/]", "g");

    // add close parentheses if openCount is greater than closeCount (balance parentheses) and the last item is not a operator
    if (openCount > closeCount && !regex.test(lastItem)) {
      addItem(" ) ");
      return;
    }

    addItem(" ( ");
  }

  function handlePercentageClick() {
    const lastItem = getLastAddedItem();

    if (items.length === 0 || lastItem === " % " || lastItem === " ( ") return;

    addItem(" % ");
  }

  function handleResultClick() {
    const expression = getExpression();

    let safeExpression = expression
      // .replace(/\s+/g, "")
      .replace(/x/g, "*"); // replace 'x' with '*'

    let openCount = (safeExpression.match(/\(/g) || []).length;
    let closeCount = (safeExpression.match(/\)/g) || []).length;

    // Balance the expression if one is missing
    while (openCount > closeCount) {
      safeExpression += " ) ";
      closeCount++;
    }

    const regex = new RegExp(" % \\d", "g");

    if (regex.test(safeExpression)) {
      safeExpression += safeExpression.replace(/ % /g, "/ 100 *"); // replace '%' with division and multiplication
    }

    try {
      const result = evaluate(safeExpression);

      setErrorMessage("");
      setItems([result]);

      // Handle specific error cases
      if (!expression) {
        setErrorMessage("Error: empty expression");
        throw new Error("Empty expression");
      }

      const divideByZeroRegex = /\/\s*0/;
      if (divideByZeroRegex.test(expression)) {
        setErrorMessage("Error: division by zero");
        throw new Error("division by zero");
      }

      if (isNaN(result) || !isFinite(result)) {
        setErrorMessage("Error.");
        setItems([]);
        throw new Error("invalid calculation result");
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
      setItems([]);
    }
  }

  function RenderOutput() {
    const formatedItems = items
      .join("")
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

    return errorMessage ? (
      <strong className="danger">{errorMessage}</strong>
    ) : (
      <strong>{formatedItems}</strong>
    );
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
            <button onClick={handlePercentageClick}>%</button>
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
