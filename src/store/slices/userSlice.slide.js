import { createSlice } from "@reduxjs/toolkit";

// Recupera el estado desde localStorage si existe
const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
const storedLoggedInUser = localStorage.getItem("loggedInUser");

const initialState = {
  users: storedUsers,
  loggedInUser: storedLoggedInUser,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      const { username, password } = action.payload;
      const userExists = state.users.some((user) => user.username === username);

      if (!userExists) {
        state.users.push({ username, password });
        localStorage.setItem("users", JSON.stringify(state.users)); // Guarda en localStorage
      } else {
        throw new Error("El usuario ya está registrado");
      }
    },
    loginUser: (state, action) => {
      const { username, password } = action.payload;
      const user = state.users.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        state.loggedInUser = username;
        localStorage.setItem("loggedInUser", username); // Guarda el usuario logueado
      } else {
        throw new Error("Credenciales incorrectas");
      }
    },
    logoutUser: (state) => {
      state.loggedInUser = null;
      localStorage.removeItem("loggedInUser"); // Elimina el usuario logueado de localStorage
    },
  },
});

export const { registerUser, loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
