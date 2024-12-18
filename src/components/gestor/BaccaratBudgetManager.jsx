import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setInitialCapital,
  addBet,
} from "../../store/slices/budgetSlice.slide";
import InitialCapitalForm from "./InitialCapitalForm";
import BetForm from "./BetForm";
import BetHistory from "./BetHistory";
import Statistics from "./Statistics";

const BaccaratBudgetManager = () => {
  const dispatch = useDispatch();
  const { initialCapital, remainingCapital, bets } = useSelector(
    (state) => state.budget
  );

  const handleSetInitialCapital = (capital) => {
    dispatch(setInitialCapital(capital));
  };

  const handleAddBet = (bet) => {
    dispatch(addBet(bet));
  };

  return (
    <div>
      <h3>Gestor de Presupuesto</h3>

      {!initialCapital ? (
        <InitialCapitalForm onSetCapital={handleSetInitialCapital} />
      ) : (
        <div>
          <h4>Capital Inicial: ${initialCapital}</h4>
          <h4>Balance Actual: ${remainingCapital}</h4>
        </div>
      )}

      <BetForm onAddBet={handleAddBet} />
      <BetHistory history={bets} />
      <Statistics history={bets} balance={remainingCapital} />
    </div>
  );
};

export default BaccaratBudgetManager;
