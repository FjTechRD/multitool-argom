import React, { useState } from "react";
import "../css/components_css/MartinGalaCalc.css";

const MartinGalaCalculator = () => {
  const [initialBet, setInitialBet] = useState(0);
  const [numberOfBets, setNumberOfBets] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [multiplier, setMultiplier] = useState(2); // Por defecto, Martingala normal

  const calculateMartingaleCost = () => {
    let total = 0;
    let bet = parseFloat(initialBet);

    for (let i = 0; i < numberOfBets; i++) {
      total += bet;
      bet *= multiplier; // Multiplica la apuesta por el multiplicador seleccionado
    }

    setTotalCost(total);
  };

  return (
    <div className="martingala__calculator">
      <h1>Calculadora de Martingala</h1>
      <div className="martingala__input">
        <label htmlFor="initialBet" style={{ marginRight: "10px" }}>
          Monto inicial de la apuesta:
        </label>
        <input
          type="number"
          id="initialBet"
          value={initialBet}
          onChange={(e) => setInitialBet(e.target.value)}
          placeholder="Ej: 10"
          style={{ padding: "5px", width: "100px" }}
        />
      </div>
      <div className="martingala__input">
        <label htmlFor="numberOfBets" style={{ marginRight: "10px" }}>
          Cantidad de tiros:
        </label>
        <input
          type="number"
          id="numberOfBets"
          value={numberOfBets}
          onChange={(e) => setNumberOfBets(e.target.value)}
          placeholder="Ej: 5"
          style={{ padding: "5px", width: "100px" }}
        />
      </div>
      <div className="martingala__input">
        <label htmlFor="multiplier" style={{ marginRight: "10px" }}>
          Seleccionar lógica:
        </label>
        <select
          id="multiplier"
          value={multiplier}
          onChange={(e) => setMultiplier(parseFloat(e.target.value))}
          style={{ padding: "5px", width: "120px" }}
        >
          <option value={2}>Duplicar (Martingala normal)</option>
          <option value={3}>Triplicar</option>
        </select>
      </div>
      <button onClick={calculateMartingaleCost} className="btn__martin-gala">
        Calcular costo total
      </button>
      {totalCost > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h2>Costo total: {totalCost.toFixed(2)}$</h2>
        </div>
      )}
    </div>
  );
};

export default MartinGalaCalculator;
