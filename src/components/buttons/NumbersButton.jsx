import keypad from "../../styles/Keypad.module.css";

export default function NumberButton({ onClick, numbersOrder }) {
  return numbersOrder.map((item) => {
    return (
      <button key={item} onClick={() => onClick(item)} className={keypad.btn}>
        {item}
      </button>
    );
  });
}
