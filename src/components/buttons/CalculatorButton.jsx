import keypad from "../../styles/Keypad.module.css";

export default function CalculatorButton({ label, onClick }) {
  return (
    <button onClick={onClick} className={keypad.btn}>
      {label}
    </button>
  );
}
