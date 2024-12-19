import React, { memo } from "react";
import "../../css/gestor/BetHistory.css";

const BetHistory = memo(({ history }) => {
  return (
    <div className="bet-history">
      <h2 className="history-title">Historial de Apuestas</h2>
      {history.length === 0 ? (
        <p className="no-history">No hay apuestas registradas.</p>
      ) : (
        <ul className="history-list">
          {history.map((bet, index) => (
            <li
              key={index}
              className={`history-item ${
                bet.result === "win" ? "win" : "lose"
              }`}
            >
              <span className="bet-amount">Apuesta: ${bet.amount}</span>
              <span className="bet-result">Resultado: {bet.result}</span>
              <span className="bet-category">
                Categoría: {bet.category || "N/A"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default BetHistory;
