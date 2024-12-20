import { createSlice } from "@reduxjs/toolkit";
import scheduleData from "../../data/scheduleData2.json"; // Ajusta la ruta

const initialState = {
  scheduleData: scheduleData || [], // JSON precargado directamente en el estado inicial
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setScheduleData: (state, action) => {
      console.log("Reducer: Datos recibidos en la acción:", action.payload); // Comprobación
      if (Array.isArray(action.payload)) {
        state.scheduleData = [...action.payload];
        console.log(
          "Reducer: Estado actualizado correctamente:",
          state.scheduleData
        );
      } else {
        console.error(
          "Reducer: Payload no es un array válido:",
          action.payload
        );
      }
    },
  },
});

export const { setScheduleData } = scheduleSlice.actions;

// Acción asíncrona para actualizar el estado
export const updateScheduleData = (data) => (dispatch) => {
  console.log("Acción: Datos que se están despachando:", data); // Comprobación
  if (Array.isArray(data)) {
    dispatch(setScheduleData(data));
  } else {
    console.error("Acción: Los datos no son un array válido:", data);
  }
};

export default scheduleSlice.reducer;
