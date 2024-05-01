import getExpression from "../utils/getExpression";

import display from "../styles/Display.module.css";
import { useEffect, useState } from "react";

export default function Display({ expression, errorMessage }) {
  const [fontSize, setFontSize] = useState("2.25em");

  const formattedExpression = getExpression(expression).replace(
    /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
    ","
  );

  useEffect(() => {
    const expressionWithoutSpace = formattedExpression.replace(/\s/g, "");

    if (expressionWithoutSpace.replace(/\s/g, "").length > 9) {
      setFontSize("1.25em");
    } else {
      setFontSize("2.25em");
    }
  }, [formattedExpression]);

  if (formattedExpression.replace(/\s/g, "").length === 34) {
  }

  return (
    <div className={display.wrapper}>
      {errorMessage ? (
        <strong className={display.error} style={{ fontSize: fontSize }}>
          {errorMessage}
        </strong>
      ) : (
        <strong className={display.expression} style={{ fontSize: fontSize }}>
          {formattedExpression}
        </strong>
      )}
    </div>
  );
}
