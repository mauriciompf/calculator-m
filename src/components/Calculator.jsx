import { useState } from "react";
import { evaluate } from "mathjs";
import getExpression from "../utils/getExpression";
import getLastAddedItem from "../utils/getLastAddedItem";
import Display from "./Display";
import CalculatorButton from "./buttons/CalculatorButton";
import NumberButton from "./buttons/NumbersButton";
import calculator from "../styles/Calculator.module.css";

export default function Calculator({ className }) {
  const [expression, setExpression] = useState([]);
  const [error, setError] = useState("");

  // * Handle Numbers *

  function addItem(item) {
    setError("");
    setExpression((prevState) => [...prevState, item]);
  }

  function handleNumberClick(number) {
    addItem(number);
  }

  function removeLastItem() {
    setExpression((prevState) => prevState.slice(0, -1));
  }

  // * Handle Operations *

  const icons = {
    addition: " + ",
    subtraction: " - ",
    multiplication: " x ",
    division: " / ",
  };

  // Convert obj values to an array
  const iconsArray = Object.keys(icons).map((value) => icons[value]);

  function handleOperatorClick(operation) {
    const lastItem = getLastAddedItem(expression);

    // remove if is the same operation (and replace to a new one if click in another operator)
    if (lastItem === icons[operation] || iconsArray.includes(lastItem)) {
      removeLastItem();
    }

    // allow only " - " operator after a open parentheses " ( "
    if (
      expression.length === 0 ||
      (lastItem === " ( " && icons[operation] !== icons.subtraction)
    ) {
      return;
    }

    addItem(icons[operation]);
  }

  function handlePointClick() {
    const lastItem = getLastAddedItem(expression);

    // determine the last operator index in expression (expression)
    const lastOperatorIndex = iconsArray
      .map((operator) => expression.lastIndexOf(operator))
      .reduce((maxIndex, currIndex) => Math.max(maxIndex, currIndex), -1);

    // identify the current number based on the last operator index
    const currentNumber = expression.slice(lastOperatorIndex + 1).join("");

    // prevent add again the "point" in the current number (before or after a operator)
    if (lastItem === "." || currentNumber.includes(".")) return;

    addItem(".");
  }

  function handleParenthesesClick() {
    const openCount = expression.filter((item) => item === " ( ").length;
    const closeCount = expression.filter((item) => item === " ) ").length;
    const lastItem = getLastAddedItem(expression);

    // add close parentheses if openCount is greater than closeCount (balance parentheses) and the last item is not a operator
    const regex = new RegExp("[+\\-x/]", "g");
    if (openCount > closeCount && !regex.test(lastItem)) {
      addItem(" ) ");
      return;
    }

    addItem(" ( ");
  }

  function handlePercentageClick() {
    const lastItem = getLastAddedItem(expression);

    if (expression.length === 0 || lastItem === " % " || lastItem === " ( ")
      return;

    addItem(" % ");
  }

  // * Clear Items *

  function handleClearAll() {
    setExpression([]);
    setError("");
  }

  function handleBackspace() {
    removeLastItem();
    setError("");
  }

  // * Handle Result *

  async function handleResultClick() {
    try {
      const expressionString = getExpression(expression);
      let safeExpression = expressionString.replace(/x/g, "*"); // replace 'x' with '*'

      // balance the expression if one is missing
      let openCount = (safeExpression.match(/\(/g) || []).length;
      let closeCount = (safeExpression.match(/\)/g) || []).length;
      while (openCount > closeCount) {
        safeExpression += " ) ";
        closeCount++;
      }

      // replace percentage with correct operation
      const regexPercentage = new RegExp(" % \\d", "g");
      if (regexPercentage.test(safeExpression)) {
        safeExpression = safeExpression.replace(/ % /g, "/ 100 *"); // replace '%' with division and multiplication
      }

      // evaluate the expression
      const result = await evaluate(safeExpression);
      if (!expressionString) {
        setError("Error: empty expression");
        throw new Error("Empty expression");
      }

      // handle division by zero
      const divideByZeroRegex = /\/\s*0/;
      if (divideByZeroRegex.test(expressionString)) {
        setError("Error: division by zero");
        throw new Error("division by zero");
      }

      // check for invalid calculation results
      if (isNaN(result) || !isFinite(result)) {
        setError("Error.");
        setExpression([]);
        throw new Error("invalid calculation result");
      }

      setError("");
      setExpression([result]);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      setExpression([]);
    }
  }

  return (
    <div className={className}>
      <div className={calculator.wrapper}>
        <Display
          expression={expression}
          errorMessage={error}
          className={calculator.display}
        />

        <div className="btn-wrapper">
          <div className="top">
            <CalculatorButton onClick={handleClearAll} label={"AC"} />
            <CalculatorButton onClick={handleParenthesesClick} label={"()"} />
            <CalculatorButton onClick={handlePercentageClick} label={"%"} />
            <CalculatorButton
              onClick={() => handleOperatorClick("division")}
              label={"/"}
            />
          </div>

          <div className="col-digit">
            <NumberButton
              numbersOrder={[7, 8, 9, 4, 5, 6, 3, 2, 1, 0]}
              onClick={handleNumberClick}
            />
            <CalculatorButton onClick={handlePointClick} label={"."} />
            <CalculatorButton onClick={handleBackspace} label={"<"} />
          </div>

          <div className="col-4">
            <CalculatorButton
              onClick={() => handleOperatorClick("multiplication")}
              label={"x"}
            />
            <CalculatorButton
              onClick={() => handleOperatorClick("addition")}
              label={"+"}
            />
            <CalculatorButton
              onClick={() => handleOperatorClick("subtraction")}
              label={"-"}
            />
            <CalculatorButton onClick={handleResultClick} label={"="} />
          </div>
        </div>
      </div>
    </div>
  );
}
