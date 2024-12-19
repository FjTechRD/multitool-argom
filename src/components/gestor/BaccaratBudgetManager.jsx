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
import "../../css/gestor/BaccaratBudgetManager.css";

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
    <div className="budget-manager">
      <h3 className="budget-manager-title">Gestor de Presupuesto</h3>

      {!initialCapital ? (
        <InitialCapitalForm onSetCapital={handleSetInitialCapital} />
      ) : (
        <div className="budget-info">
          <h4 className="budget-info-item">
            Capital Inicial: ${initialCapital}
          </h4>
          <h4 className="budget-info-item">
            Balance Actual: ${remainingCapital}
          </h4>
        </div>
      )}

      <BetForm onAddBet={handleAddBet} />
      <BetHistory history={bets} />
      <Statistics history={bets} balance={remainingCapital} />
    </div>
  );
};

export default BaccaratBudgetManager;
