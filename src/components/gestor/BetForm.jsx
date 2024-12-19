import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBet, updateBalance } from "../../store/slices/budgetSlice.slide";
import "../../css/gestor/BetForm.css";

const BetForm = () => {
  const dispatch = useDispatch();
  const [balanceInput, setBalanceInput] = useState("");
  const [betAmount, setBetAmount] = useState("");
  const [betResult, setBetResult] = useState("win");
  const remainingCapital = useSelector(
    (state) => state.budget.remainingCapital
  );

  const handleUpdateBalance = (e) => {
    e.preventDefault();
    const newBalance = parseFloat(balanceInput);
    if (!isNaN(newBalance)) {
      dispatch(updateBalance(newBalance));
      setBalanceInput("");
    } else {
      alert("Por favor, introduce un número válido");
    }
  };

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

    const result = betResult;
    dispatch(addBet({ amount, result }));
    setBetAmount("");
  };

  return (
    <div className="bet-form">
      <h2 className="form-title">Actualizar Balance</h2>
      <form className="balance-form" onSubmit={handleUpdateBalance}>
        <input
          className="form-input"
          type="number"
          placeholder="Nuevo Balance"
          value={balanceInput}
          onChange={(e) => setBalanceInput(e.target.value)}
        />
        <button className="form-button" type="submit">
          Actualizar
        </button>
      </form>

      <h2 className="form-title">Realizar Apuesta</h2>
      <form className="bet-form-container" onSubmit={handlePlaceBet}>
        <input
          className="form-input"
          type="number"
          placeholder="Monto de la Apuesta"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
        />
        <select
          className="form-select"
          value={betResult}
          onChange={(e) => setBetResult(e.target.value)}
        >
          <option value="win">Ganada</option>
          <option value="lose">Perdida</option>
        </select>
        <button className="form-button" type="submit">
          Realizar Apuesta
        </button>
      </form>

      <div className="remaining-capital">
        <h3>Capital Restante: ${remainingCapital}</h3>
      </div>
    </div>
  );
};

export default BetForm;
