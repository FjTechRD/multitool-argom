import React, { useState } from "react";

const InitialCapitalForm = ({ onSetCapital }) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    const capital = parseFloat(input);
    if (!capital || capital <= 0) {
      alert("Por favor ingrese un capital válido.");
      return;
    }
    onSetCapital(capital);
    setInput("");
  };

  return (
    <div>
      <h4>Ingresar Capital Inicial</h4>
      <input
        type="number"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Capital inicial"
      />
      <button onClick={handleSubmit}>Establecer Capital</button>
    </div>
  );
};

export default InitialCapitalForm;
