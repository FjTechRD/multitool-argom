import React, { useState } from "react";
import "../css/components_css/MartinGalaCalc.css";

const MartinGalaSpecific = () => {
  const [numTiros, setNumTiros] = useState(6);
  const [apuestaInicial, setApuestaInicial] = useState(1);
  const [tiroFinal, setTiroFinal] = useState(null);
  const [apuestaFinal, setApuestaFinal] = useState(null);
  const [resultado, setResultado] = useState(null);

  const calcularApuestas = () => {
    let apuestas = [];
    let totalInvertido = 0;

    if (tiroFinal && apuestaFinal) {
      const multiplicador = apuestaFinal / Math.pow(2, tiroFinal - 1);
      for (let i = 0; i < tiroFinal; i++) {
        const apuesta = Math.pow(2, i) * multiplicador;
        apuestas.push(apuesta);
        totalInvertido += apuesta;
      }
    } else {
      for (let i = 0; i < numTiros; i++) {
        const apuesta = Math.pow(2, i) * apuestaInicial;
        apuestas.push(apuesta);
        totalInvertido += apuesta;
      }
    }

    setResultado({
      apuestas,
      totalInvertido,
    });
  };

  return (
    <div className="martingale-tool__container">
      <h1 className="martingale-tool__title">Estrategia Martingala</h1>
      <div className="martingale-tool__inputs">
        <label className="martingale-tool__content">
          Cantidad de tiros:
          <input
            type="number"
            value={numTiros}
            onChange={(e) => setNumTiros(Number(e.target.value))}
            disabled={tiroFinal && apuestaFinal}
          />
        </label>
        <label className="martingale-tool__content">
          Apuesta inicial:
          <input
            type="number"
            value={apuestaInicial}
            onChange={(e) => setApuestaInicial(Number(e.target.value))}
            disabled={tiroFinal && apuestaFinal}
          />
        </label>
        <label className="martingale-tool__content">
          Tiro final (opcional):
          <input
            type="number"
            value={tiroFinal || ""}
            onChange={(e) => setTiroFinal(Number(e.target.value) || null)}
          />
        </label>
        <label className="martingale-tool__content">
          Apuesta en el tiro final (opcional):
          <input
            type="number"
            value={apuestaFinal || ""}
            onChange={(e) => setApuestaFinal(Number(e.target.value) || null)}
          />
        </label>
      </div>
      <button className="martingale-tool__button" onClick={calcularApuestas}>
        Calcular
      </button>
      {resultado && (
        <div className="martingale-tool__results">
          <h2 className="martingale-tool__results-title">Resultados:</h2>
          <p>
            Apuestas realizadas:{" "}
            {resultado.apuestas
              .map((a, i) => `Tiro ${i + 1}: $${a.toFixed(2)}`)
              .join(" | ")}
          </p>
          <p>Total invertido: ${resultado.totalInvertido.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default MartinGalaSpecific;
