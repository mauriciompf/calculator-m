import "./Calculator.css";
import Operation from "./Operation";

export default function Aritmetic() {
  return (
    <div>
      <h1>Simple Calculator</h1>
      <div className="simple-calculator">
        <Operation type="Addition" />
        <Operation type="Subtraction" />
        <Operation type="Multiplication" />
        <Operation type="Division" />
      </div>
    </div>
  );
}
