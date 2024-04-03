import { useState } from "react";
import "./Calculator.css";

export default function Calculator() {
  const [inputValue, setInputValue] = useState(null);
  const [inputValue2, setInputValue2] = useState(null);
  const [result, setResult] = useState(null);

  function changeInputOne(e) {
    e.preventDefault();
    setInputValue(e.target.value);
  }

  function changeInputTwo(e) {
    e.preventDefault();
    setInputValue2(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    setInputValue(null);
    setInputValue2(null);

    setResult(parseInt(inputValue) + parseInt(inputValue2));
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
            id="nn1"
          />
        </div>

        <div>
          <label htmlFor="nn2" className="n2">
            Number 2:
          </label>
          <input
            type="text"
            value={inputValue2}
            onChange={changeInputTwo}
            name="nn2"
            id="nn2"
          />
        </div>

        <button type="submit" className="btn btn-sum">
          Sum
        </button>
      </form>
      <strong>Result:</strong> {result}
    </main>
  );
}
