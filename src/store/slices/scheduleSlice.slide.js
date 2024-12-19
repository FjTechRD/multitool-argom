import { createSlice } from "@reduxjs/toolkit";
import scheduleData from "../../data/scheduleData.json"; // Ajusta la ruta

const initialState = {
  scheduleData, // JSON precargado directamente en el estado inicial
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setScheduleData: (state, action) => {
      state.scheduleData = action.payload;
    },
  },
});

export const { setScheduleData } = scheduleSlice.actions;
export default scheduleSlice.reducer;
