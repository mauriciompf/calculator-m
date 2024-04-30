import getExpression from "../utils/getExpression";

export default function Display({ expression, errorMessage, className }) {
  const formattedExpression = getExpression(expression).replace(
    /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
    ","
  );

  return (
    <div className={className}>
      {errorMessage ? (
        <strong className="danger">{errorMessage}</strong>
      ) : (
        <strong>{formattedExpression}</strong>
      )}
    </div>
  );
}
