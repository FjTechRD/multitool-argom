import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBet, updateBalance } from "../../store/slices/budgetSlice.slide"; // Ruta correcta

const BetForm = () => {
  const dispatch = useDispatch();
  const [balanceInput, setBalanceInput] = useState(""); // Para actualizar el balance
  const [betAmount, setBetAmount] = useState(""); // Para realizar una apuesta
  const [betResult, setBetResult] = useState("win"); // Para saber si la apuesta fue ganada o perdida
  const remainingCapital = useSelector(
    (state) => state.budget.remainingCapital
  ); // Obtener el balance actual

  // Actualiza el balance
  const handleUpdateBalance = (e) => {
    e.preventDefault();
    const newBalance = parseFloat(balanceInput);
    if (!isNaN(newBalance)) {
      dispatch(updateBalance(newBalance)); // Llamada a la acción para actualizar balance
      setBalanceInput(""); // Limpiar el input
    } else {
      alert("Por favor, introduce un número válido");
    }
  };

  // Realiza una apuesta
  const handlePlaceBet = (e) => {
    e.preventDefault();
    const amount = parseFloat(betAmount);

    if (isNaN(amount) || amount <= 0) {
      alert("Por favor, introduce un monto válido para la apuesta.");
      return;
    }

    if (amount > remainingCapital) {
      alert("No tienes suficiente capital para hacer esta apuesta.");
      return;
    }

    const result = betResult; // Determinar si la apuesta fue ganada o perdida
    dispatch(addBet({ amount, result })); // Llamada a la acción para añadir la apuesta
    setBetAmount(""); // Limpiar el input de la apuesta
  };

  return (
    <div>
      <h2>Actualizar Balance</h2>
      <form onSubmit={handleUpdateBalance}>
        <input
          type="number"
          placeholder="Nuevo Balance"
          value={balanceInput}
          onChange={(e) => setBalanceInput(e.target.value)}
        />
        <button type="submit">Actualizar</button>
      </form>

      <h2>Realizar Apuesta</h2>
      <form onSubmit={handlePlaceBet}>
        <input
          type="number"
          placeholder="Monto de la Apuesta"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
        />
        <select
          value={betResult}
          onChange={(e) => setBetResult(e.target.value)}
        >
          <option value="win">Ganada</option>
          <option value="lose">Perdida</option>
        </select>
        <button type="submit">Realizar Apuesta</button>
      </form>

      <div>
        <h3>Capital Restante: ${remainingCapital}</h3>
      </div>
    </div>
  );
};

export default BetForm;
