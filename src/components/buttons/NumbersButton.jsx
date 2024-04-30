export default function NumberButton({ onClick, numbersOrder }) {
  return numbersOrder.map((item) => {
    return (
      <button key={item} onClick={() => onClick(item)}>
        {item}
      </button>
    );
  });
}
