import { useState } from "react";
import "./Calculator.css";

export default function Operation({ type }) {
  const [inputValue, setInputValue] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [result, setResult] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const digitRegEx = /[^-0-9.]/g;

  function changeInputOne(e) {
    const value = e.target.value.replace(digitRegEx, "");

    // prevent add more than one "."
    const counter = value.split("").reduce((total, letter) => {
      total[letter] ? total[letter]++ : (total[letter] = 1);
      return total;
    }, {});

    if (counter["."] > 1) {
      return;
    }

    setInputValue(value);
  }

  function changeInputTwo(e) {
    const value = e.target.value.replace(digitRegEx, "");

    // prevent add more than one "."
    const counter = value.split("").reduce((total, letter) => {
      total[letter] ? total[letter]++ : (total[letter] = 1);
      return total;
    }, {});

    if (counter["."] > 1) {
      return;
    }

    setInputValue2(value);
  }

  function handleChange(e) {
    e.preventDefault();

    const inputOne = parseFloat(inputValue);
    const inputTwo = parseFloat(inputValue2);
    // console.log(inputOne, inputTwo);

    if (isNaN(inputOne) || isNaN(inputTwo)) {
      setErrorMessage("Please enter valid numbers");
      setShowErrorMessage(true);
      setShowResult(false);
      return;
    }

    setErrorMessage("");

    let res = 0;

    switch (type) {
      case "Addition":
        res = inputOne + inputTwo;
        break;
      case "Subtraction":
        res = inputOne - inputTwo;
        break;
      case "Multiplication":
        res = inputOne * inputTwo;
        break;
      case "Division":
        res = inputOne / inputTwo;
        break;
    }

    setResult(res);
    setShowResult(true);
    setShowErrorMessage(false);
  }

  function handleType() {
    let operationName = "";

    switch (type) {
      case "Addition":
        operationName = "Sum";
        break;
      case "Subtraction":
        operationName = "Subtract";
        break;
      case "Multiplication":
        operationName = "Product";
        break;
      case "Division":
        operationName = "Division";
        break;
    }

    return operationName;
  }

  return (
    <div>
      <h2>{type}:</h2>
      <form action="#" onSubmit={handleChange}>
        <div>
          <label htmlFor="nn1" className="n1">
            Number 1:
          </label>
          <input
            type="text"
            onChange={changeInputOne}
            value={inputValue}
            name="nn1"
            placeholder="0"
            id="nn1"
          />
        </div>

        <div>
          <label htmlFor="nn2" className="n2">
            Number 2:
          </label>
          <input
            type="text"
            placeholder="0"
            onChange={changeInputTwo}
            value={inputValue2}
            name="nn2"
            id="nn2"
          />
        </div>

        <button type="submit" className="btn">
          {handleType(type)}
        </button>
      </form>

      {showResult ? <strong>Result:</strong> : null}
      {showResult && <span> {result}</span>}
      {showErrorMessage ? <strong> {errorMessage}</strong> : null}
    </div>
  );
}
