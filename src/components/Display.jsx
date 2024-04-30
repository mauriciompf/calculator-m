import getExpression from "../utils/getExpression";

import display from "../styles/Display.module.css";

export default function Display({ expression, errorMessage }) {
  const formattedExpression = getExpression(expression).replace(
    /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
    ","
  );

  return (
    <div className={display.wrapper}>
      {errorMessage ? (
        <strong className={display.error}>{errorMessage}</strong>
      ) : (
        <strong className={display.expression}>{formattedExpression}</strong>
      )}
    </div>
  );
}
