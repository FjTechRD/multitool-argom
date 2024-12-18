import React, { memo } from "react";

const BetHistory = memo(({ history }) => {
  return (
    <ul>
      {history.map((bet, index) => (
        <li key={index}>
          Apuesta: ${bet.amount}, Resultado: {bet.result}, Categoría:{" "}
          {bet.category}
        </li>
      ))}
    </ul>
  );
});

export default BetHistory;
