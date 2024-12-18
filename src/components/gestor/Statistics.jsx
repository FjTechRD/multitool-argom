import React, { memo } from "react";

const Statistics = memo(({ history, balance }) => {
  const totalWins = history.filter((bet) => bet.result === "win").length;
  const totalLosses = history.filter((bet) => bet.result === "lose").length;

  return (
    <div>
      <h4>Estadísticas</h4>
      <p>Ganadas: {totalWins}</p>
      <p>Perdidas: {totalLosses}</p>
      <p>Balance Actual: ${balance}</p>
    </div>
  );
});

export default Statistics;
