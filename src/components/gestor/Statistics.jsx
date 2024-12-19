import React, { memo } from "react";
import "../../css/gestor/Statistics.css";

const Statistics = memo(({ history, balance }) => {
  const totalWins = history.filter((bet) => bet.result === "win").length;
  const totalLosses = history.filter((bet) => bet.result === "lose").length;

  return (
    <div className="statistics">
      <h2 className="statistics-title">Estadísticas</h2>
      <div className="statistics-grid">
        <div className="stat-item wins">
          <h3>Ganadas</h3>
          <p>{totalWins}</p>
        </div>
        <div className="stat-item losses">
          <h3>Perdidas</h3>
          <p>{totalLosses}</p>
        </div>
        <div className="stat-item balance">
          <h3>Balance Actual</h3>
          <p>${balance}</p>
        </div>
      </div>
    </div>
  );
});

export default Statistics;
