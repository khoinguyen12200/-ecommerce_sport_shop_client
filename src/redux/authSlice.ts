import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  accessToken: string;
  role: string;
  email: string;
  id: string;
}

const initialState: Partial<AuthState> = {
  accessToken: "",
  role: "",
  email: "",
  id: "",
};

export const authSlice = createSlice({
  name: "authenticate",
  initialState,
  reducers: {
    updateToken: (state, action: PayloadAction<AuthState>) => {
      state.accessToken = action.payload.accessToken;
      state.role = action.payload.role;
      state.email = action.payload.email;
      state.id = action.payload.id;
      //save accessToken to localStorage
      localStorage.setItem("accessToken", action.payload.accessToken);      
    },
    logout: (state) => {
      state.accessToken = "";
      state.role = "";
      state.email = "";
      state.id = "";
      //remove accessToken from localStorage
      localStorage.removeItem("accessToken");
    },
  },
});

export const { updateToken, logout } = authSlice.actions;
export default authSlice.reducer;
