import { useState } from "react";
import "./Calculator.css";

export default function Calculator() {
  const [inputValue, setInputValue] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [result, setResult] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  function changeInputOne(e) {
    const value = e.target.value.replace(/[^0-9.]/g, "");

    setInputValue(value);
  }

  function changeInputTwo(e) {
    const value = e.target.value.replace(/[^0-9.]/g, "");

    setInputValue2(value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const inputOne = parseFloat(inputValue);
    const inputTwo = parseFloat(inputValue2);

    if (isNaN(inputOne) || isNaN(inputTwo)) {
      setErrorMessage("Please enter valid numbers");
      setShowErrorMessage(true);
      setShowResult(false);
      return;
    }

    setErrorMessage("");

    const res = inputOne + inputTwo;

    setResult(res);
    setShowResult(true);
    setShowErrorMessage(false);
  }

  return (
    <main>
      <h1>Simple Calculator</h1>
      <h2>Addition:</h2>
      <form action="#" onSubmit={handleSubmit}>
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

        <button type="submit" className="btn btn-sum">
          Sum
        </button>
      </form>

      {showResult ? <strong>Result:</strong> : null}
      {showResult && <span> {result}</span>}
      {showErrorMessage ? <strong> {errorMessage}</strong> : null}
    </main>
  );
}
