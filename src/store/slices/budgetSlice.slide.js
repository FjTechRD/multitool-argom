import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initialCapital: JSON.parse(localStorage.getItem("initialCapital")) || 0,
  remainingCapital: JSON.parse(localStorage.getItem("remainingCapital")) || 0,
  bets: JSON.parse(localStorage.getItem("bets")) || [],
};

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    setInitialCapital: (state, action) => {
      state.initialCapital = action.payload;
      state.remainingCapital = action.payload;

      localStorage.setItem("initialCapital", action.payload);
      localStorage.setItem("remainingCapital", action.payload);
    },
    addBet: (state, action) => {
      const { amount, result } = action.payload;
      const balanceChange = result === "win" ? amount : -amount;

      state.remainingCapital += balanceChange;
      state.bets.push(action.payload);

      localStorage.setItem("bets", JSON.stringify(state.bets));
      localStorage.setItem("remainingCapital", state.remainingCapital);
    },
    resetBudget: () => {
      localStorage.removeItem("initialCapital");
      localStorage.removeItem("remainingCapital");
      localStorage.removeItem("bets");
      return initialState;
    },
    updateBalance: (state, action) => {
      // Nueva acción para actualizar el balance manualmente
      state.remainingCapital = action.payload;
      localStorage.setItem("remainingCapital", action.payload);
    },
  },
});

// Exportar todas las acciones del slice
export const { setInitialCapital, addBet, resetBudget, updateBalance } =
  budgetSlice.actions;

// Exportar el reducer
export default budgetSlice.reducer;
